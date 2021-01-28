import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import WalletConnect from "../../packages/browser/src/index";
import WalletconnectDialog from "../components/walletconnectDialog";
import { digitalBank, getProductId } from "../../utils/bank";
import axios from 'axios';
import code_data from "../../utils/code.json";
// let url = "https://api4.violas.io";
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
      showWallet: false,
      token_address: "",
      depositProduct: [],
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

    //获取存款产品信息
    fetch(
      url +
        "/1.0/violas/bank/deposit/info?id=" +
        sessionStorage.getItem("id") +
        "&&address=" +
        sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          console.log(res);
          this.setState({
            saveList: {
              limit:
                res.data.minimum_amount / 1e6 +
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
      this.setState({
        amount: e.target.value,
        warning: "",
      });
    }
  };
  //立即存款
  depositImmediately = () => {
    if (this.state.amount == "") {
      this.setState({
        warning: "请输入存款数量",
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
      this.state.amount * 1e6,
      sessionStorage.getItem("violas_address"),
      this.state.token_address,
      sessionStorage.getItem("violas_chainId")
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
          this.setState({
            warning: "存款成功",
            showWallet: false,
          });
          setTimeout(() => {
            this.setState({
              warning: "",
              amount: "",
            });
          }, 500);
        } else {
          this.setState({
            warning: "存款失败",
            showWallet: false,
          });
          setTimeout(() => {
            this.setState({
              warning: "",
              amount: "",
            });
          }, 500);
        }
      })
      .catch((error) => {
        this.setState({
          warning: "存款失败",
          showWallet: false,
        });
        setTimeout(() => {
          this.setState({
            warning: "",
            amount: "",
          });
        }, 500);
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
              数字银行
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/saveDetails">存款</NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="saveDetailsWrap">
          <div className="saveDetailsList">
            <h4>
              <label>我要存</label>
              <div className="dropdown1">
                <span
                  onClick={(e) => {
                    this.stopPropagation(e);
                    this.setState({
                      showList:!this.state.showList,
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
                            this.setState({
                              showType: v.type,
                              extra: v.balance,
                              showList: false,
                            });
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
              className={this.state.warning ? "activeInput" : null}
              onChange={(e) => this.getInputValue(e)}
            />
            <div className="saveDetailsShow">
              <p>
                <img src="/img/kyye.png" />
                <label>可用余额 ：</label>{" "}
                <label>
                  {extra} {showType}
                </label>
                <span>全部</span>
              </p>
              <p>
                <img src="/img/编组 15@2x.png" />
                <label>每日限额 ： </label>
                <label>
                  {saveList.limit} {saveList.saveName}
                </label>
              </p>
            </div>
          </div>
          <div className="saveDetailsList1">
            <p>
              <label>存款年利率</label>
              <span>{Number(saveList.rate * 100).toFixed(2)}%</span>
            </p>
            <p>
              <p>
                <label>质押率</label>
                <span>质押率=借贷数量/存款数量</span>
              </p>
              <span>{Number(saveList.pledge_rate * 100).toFixed(2)}%</span>
            </p>
            <p>
              <label>支付方式</label>
              <span>钱包余额</span>
            </p>
          </div>
          <div className="foot">
            <p className="btn" onClick={() => this.depositImmediately()}>
              立即存款
            </p>
            <p
              className={
                this.state.warning == "存款成功"
                  ? "descr descrWarn"
                  : "descr descrRed"
              }
            >
              {this.state.warning}
            </p>
          </div>
          <div className="productDescr">
            <div className="h3">
              <label>
                产品说明
                <img src="/img/编组 17@2x.png" />
              </label>
              <i
                onClick={() => {
                  this.setState({
                    descrContent: !this.state.descrContent,
                  });
                }}
              >
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
            <div className="h3">
              <label>
                常见问题
                <img src="/img/wenhao.png" />
              </label>
              <i
                onClick={() => {
                  this.setState({
                    descrContent1: !this.state.descrContent1,
                  });
                }}
              >
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