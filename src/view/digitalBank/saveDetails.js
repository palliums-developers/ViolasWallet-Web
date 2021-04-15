import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import WalletConnect from "../../packages/browser/index";
import WalletconnectDialog from "../components/walletconnectDialog";
import { digitalBank, getProductId } from "../../utils/bank";
import intl from "react-intl-universal";
import axios from 'axios';
import code_data from "../../utils/code.json";
let url1 = "https://api4.violas.io";
let url = "https://api.violas.io";

//存款详情
class SaveDetails extends Component {
  constructor() {
    super();
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      name: "",
      showList: false,
      descrContent: true,
      descrContent1: true,
      saveList: "",
      productIntor: [],
      question: [],
      showLists: [],
      showType: "",
      extra: 0,
      amount: "",
      warning: "",
      warning1: false,
      showWallet: false,
      token_address: "",
      depositProduct: [],
      idx: "",
    };
  }
  stopPropagation(e) {
    e.nativeEvent.stopImmediatePropagation();
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
    await this.getDepositProduct();
    this.getCurrenciesList();
  }
  getCurrenciesList() {
    fetch(
      url+"/1.0/violas/balance?addr=" +
        sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.balances.length > 0) {
          let temp = [];
          for (let i = 0; i < this.state.depositProduct.length; i++) {
            for (let j = 0; j < res.data.balances.length; j++) {
              if (
                this.state.depositProduct[i].token_module ===
                res.data.balances[j].show_name
              ) {
                temp.push({
                  type: this.state.depositProduct[i].token_module,
                  balance: res.data.balances[j].balance / 1e6,
                  id: this.state.depositProduct[i].id,
                });
              }
            }
          }
          this.setState(
            {
              showLists: temp,
            },
            () => {
              for (let i = 0; i < this.state.showLists.length; i++) {
                if (
                  this.state.showLists[i].type ==
                  sessionStorage.getItem("token_module")
                ) {
                  this.setState({
                    showType: this.state.showLists[i].type,
                    extra: this.state.showLists[i].balance,
                  });
                }
              }
            }
          );
        }
      });
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  componentDidMount() {
    document.addEventListener("click", this.onClose);
    //获取币种列表
    this.getSaveAllMessage(sessionStorage.getItem("id"));
    
  }
  getSaveAllMessage(id){
    //获取存款产品信息
    fetch(
      url +
        "/1.0/violas/bank/deposit/info?id=" +
         id+
        "&&address=" +
        sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            saveList: {
              limit:
                (res.data.quota_limit - res.data.quota_used) / 1e6 +
                "/" +
                res.data.quota_limit / 1e6,
              saveName: res.data.token_name,
              pledge_rate: res.data.pledge_rate,
              token_address: res.data.token_address,
              rate: res.data.rate,
            },
            productIntor: res.data.intor,
            question: res.data.question,
          });
        }
      });
  }
  //获取输入框value
  getInputValue = (e) => {
    if (e.target.value) {
      e.target.value = e.target.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      e.target.value = e.target.value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      e.target.value = e.target.value.replace(
        /^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/,
        "$1$2.$3"
      ); //只能输入两个小数
      if (e.target.value.indexOf(".") < 0 && e.target.value != "") {
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        e.target.value = parseFloat(e.target.value);
      }
      if (Number(e.target.value) > Number(this.state.extra)) {
        this.setState({
          warning: intl.get("Insufficient available balance"),
        });
      }else{
        this.setState({
          amount: e.target.value,
          warning: "",
        });
      }
     
    }
  };
  //立即存款
  depositImmediately = () => {
    if (this.state.amount == "") {
      this.setState({
        warning: intl.get("Please enter the deposit amount"),
      });
    }else if (Number(this.state.amount) > Number(this.state.extra)) {
      this.setState({
        warning: intl.get("Insufficient available balance"),
      });
    } else {
      this.setState({
        showWallet: true,
      });
      this.getDigitalBank();
    }
  };
  async getDepositProduct() {
    axios(url+"/1.0/violas/bank/product/deposit").then(
      async (res) => {
        await this.setState({ depositProduct: res.data.data });
      }
    );
  }

  async getDigitalBank() {
    let productId = 0;
    let tx = "";
    productId = getProductId(this.state.showType, this.state.depositProduct);
    tx = digitalBank(
      "lock",
      this.state.showType,
      "" + this.state.amount * 1e6,
      sessionStorage.getItem("violas_address"),
      this.state.saveList.token_address,
      parseInt(sessionStorage.getItem("violas_chainId"))
    );
    console.log("Digital Bank ", "lock", tx);
    this.state.walletConnector
      .signTransaction(tx)
      .then(async (res) => {
        await this.getBankBroadcast(
          sessionStorage.getItem("violas_address"),
          productId,
          Number(this.state.amount * 1e6),
          res
        );
      })
      .catch((err) => {
        console.log("Digital Bank ", this.state.digitalBankOperation, err);
      });
  }
  async getBankBroadcast(address, product_id, value, sigtxn) {
    let api = code_data.bank.broadcast.lock;
    let parm = {
      address: address,
      product_id: product_id,
      value: parseInt(value),
      sigtxn: sigtxn,
    };
    // console.log(parm)
    axios
      .post(`${url}${api}`, parm)
      .then((res) => {
        if (res.data.code == 2000) {
          this.setState(
            {
              warning: intl.get("Deposit successful"),
              showWallet: false,
            },
            () => {
              window.location.reload();
            }
          );
        } else {
          this.setState(
            {
              warning: intl.get("Deposit failed"),
              showWallet: false,
            },
            () => {
              window.location.reload();
            }
          );
        }
      })
      .catch((error) => {
        this.setState(
          {
            warning: intl.get("Deposit failed"),
            showWallet: false,
          },
          () => {
            window.location.reload();
          }
        );
      });
  }
  //显示关闭侧边栏
  onClose = () => {
    this.setState({
      showList: false,
    });
  };
  closeWallet = (val) => {
    this.setState({
      showWallet: val,
    });
  };
  render() {
    let {
      showList,
      saveList,
      productIntor,
      question,
      showLists,
      showType,
      extra,
    } = this.state;
    return (
      <div className="saveDetails">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank">
              {" "}
              <img src="/img/fanhui 2@2x.png" />
              {intl.get("Bank")}
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/saveDetails">
              {intl.get("Deposit")}
            </NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="saveDetailsWrap">
          <div className="saveDetailsList">
            <h4>
              <label>{intl.get("To deposit")}</label>
              <div className="dropdown1">
                <span
                  onClick={(e) => {
                    this.stopPropagation(e);
                    this.setState({
                      showList: !this.state.showList,
                    });
                  }}
                >
                  <img src="/img/kyye.png" />
                  {showType}
                  <i>
                    <img src="/img/rightArrow1.png" />
                  </i>
                </span>
                {showList ? (
                  <div className="dropdown-content1">
                    {showLists.map((v, i) => {
                      return (
                        <span
                          key={i}
                          onClick={() => {
                            this.setState(
                              {
                                idx: v.id,
                                showType: v.type,
                                extra: v.balance,
                                showList: false,
                              },
                              () => {
                                if (this.state.idx) {
                                  this.getSaveAllMessage(this.state.idx);
                                }
                              }
                            );
                          }}
                        >
                          <img src="/img/kyye.png" />
                          <label>{v.type}</label>
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </h4>
            <input
              placeholder={"1" + showType + "起，每0" + showType + "递增"}
              className={
                this.state.warning == intl.get("Deposit failed")
                  ? "activeInput"
                  : this.state.warning1 == true
                  ? "iptRepay1"
                  : "iptRepay"
              }
              onFocus={() => {
                this.setState({
                  warning1: true,
                });
              }}
              onBlur={() => {
                this.setState({
                  warning1: false,
                });
              }}
              onChange={(e) => this.getInputValue(e)}
            />
            <div className="saveDetailsShow">
              <p>
                <img src="/img/kyye.png" />
                <label>{intl.get("Available Balance")}：</label>{" "}
                <label>
                  {extra} {showType}
                </label>
                <span>{intl.get("All")}</span>
              </p>
              <p>
                <img src="/img/编组 15@2x.png" />
                <label>{intl.get("Daily limit")} ： </label>
                <label>
                  {saveList.limit} {saveList.saveName}
                </label>
              </p>
            </div>
          </div>
          <div className="saveDetailsList1">
            <p>
              <label>{intl.get("Lending APY")}</label>
              <span>{Number(saveList.rate * 100).toFixed(2)}%</span>
            </p>
            <p>
              <p>
                <label>{intl.get("Loan-to-value Ratio")}</label>
                <span>
                  {intl.get("Loan-to-value ratio = borrowing/lending")}
                </span>
              </p>
              <span>{Number(saveList.pledge_rate * 100).toFixed(2)}%</span>
            </p>
            <p>
              <label>{intl.get("Payment method")}</label>
              <span>{intl.get("Payment amount")}</span>
            </p>
          </div>
          <div className="foot">
            <p className="btn" onClick={() => this.depositImmediately()}>
              {intl.get("Deposit Now")}
            </p>
            <p
              className={
                this.state.warning == intl.get("Deposit successful")
                  ? "descr descrWarn"
                  : "descr descrRed"
              }
            >
              {this.state.warning}
            </p>
          </div>
          <div className="productDescr">
            <div
              className="h3"
              onClick={() => {
                this.setState({
                  descrContent: !this.state.descrContent,
                });
              }}
            >
              <label>
                {intl.get("Product Description")}
                <img src="/img/编组 17@2x.png" />
              </label>
              <i>
                {this.state.descrContent ? (
                  <img src="/img/descrxia.png" />
                ) : (
                  <img src="/img/rightArrow1.png" />
                )}
              </i>
            </div>
            {this.state.descrContent ? (
              <div className="descr">
                {productIntor.map((v, i) => {
                  return (
                    <div key={i}>
                      {v.tital ? <h4> {v.tital}</h4> : null}
                      {v.text ? <p>{v.text}</p> : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="question">
            <div
              className="h3"
              onClick={() => {
                this.setState({
                  descrContent1: !this.state.descrContent1,
                });
              }}
            >
              <label>
                {intl.get("FAQ")}
                <img src="/img/wenhao.png" />
              </label>
              <i>
                {this.state.descrContent1 ? (
                  <img src="/img/descrxia.png" />
                ) : (
                  <img src="/img/rightArrow1.png" />
                )}
              </i>
            </div>
            {this.state.descrContent1 ? (
              <div className="descr">
                {question.map((v, i) => {
                  return (
                    <div key={i}>
                      {v.title ? <h4> {v.title}</h4> : null}
                      {v.text ? <p>{v.text}</p> : null}
                    </div>
                  );
                })}
                {/* // <h4>我能获得多少收益？</h4>
                                // <p>用户的收益取决于所存资产的数量，并且每种资产都有自己的供需市场，可用流动资金的借贷资金越多，利率增加的幅度就越大，反之亦然。</p> */}
              </div>
            ) : null}
            {/* {this.state.descrContent1 ? (
                  <div className="descr">
                    <h4>为什么我的可提取额度小于存款额度？</h4>
                    <p>
                      您当前可能有借贷中的产品，借贷时系统会自动将您的部分存款进行抵押，抵押资产待还款后才可提取。
                    </p>
                  </div>
                ) : null} */}
          </div>
        </div>
        {this.state.showWallet ? (
          <WalletconnectDialog
            getCloseWallet={this.closeWallet}
          ></WalletconnectDialog>
        ) : null}
      </div>
    );
  }
}

export default SaveDetails;