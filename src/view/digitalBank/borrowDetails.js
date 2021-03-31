import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import WalletConnect from "../../packages/browser/src/index";
import WalletconnectDialog from "../components/walletconnectDialog";
import { digitalBank, getProductId } from "../../utils/bank";
import intl from "react-intl-universal";
import axios from "axios";
import code_data from "../../utils/code.json";
let url = "https://api4.violas.io";
let url1 = "https://api.violas.io";

//借款详情
class BorrowDetails extends Component {
  constructor() {
    super();
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      name: "",
      showList: false,
      active: false,
      descrContent: true,
      descrContent1: true,
      borrowList: {},
      productIntor: [],
      question: [],
      amount: "",
      warning: "",
      showLists: [],
      showType: "",
      extra: 0,
      showWallet: false,
      borrowProduct: [],
      token_address: "",
      depositProduct: [],
      idx:""
    };
  }
  stopPropagation(e) {
    e.nativeEvent.stopImmediatePropagation();
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
    await this.getBorrowProduct();
    this.getCurrenciesList();
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  //获取币种列表
  getCurrenciesList() {
    fetch(
      url+"/1.0/violas/balance?addr=" +
        sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.balances.length > 0) {
          let temp = [];
          for (let i = 0; i < this.state.borrowProduct.length; i++) {
            for (let j = 0; j < res.data.balances.length; j++) {
              if (
                this.state.borrowProduct[i].token_module ===
                res.data.balances[j].show_name
              ) {
                temp.push({
                  type: this.state.borrowProduct[i].token_module,
                  balance: res.data.balances[j].balance / 1e6,
                  id: this.state.borrowProduct[i].id,
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
  componentDidMount() {
    document.addEventListener("click", this.onClose);
    this.getBorrowAllMessage(sessionStorage.getItem("id"));
  }
  getBorrowAllMessage(id){
    //获取借款产品信息
    fetch(
      url +
        "/1.0/violas/bank/borrow/info?id=" +
         id+
        "&&address=" +
        sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          this.setState({
            borrowList: {
              limit:
                (res.data.quota_limit - res.data.quota_used) / 1e6 +
                "/" +
                res.data.quota_limit / 1e6,
              limit1: (res.data.quota_limit - res.data.quota_used) / 1e6,
              pledge_rate: res.data.pledge_rate,
              rate: res.data.rate,
              token_address: res.data.token_address,
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
    } else {
      this.setState({
        amount: "",
        warning: "",
      });
    }
  };
  //立即借款
  borrowingImmediately = () => {
    if (this.state.amount == "") {
      this.setState({
        warning: "请输入借款数量",
      });
    }
    else if (this.state.active == false) {
      this.setState({
        warning: "请阅读并同意《质押借款服务协议》",
      });
    } else {
      this.setState({
        showWallet: true,
        warning:""
      });
      this.getDigitalBank();
    }
  };
  async getBorrowProduct() {
    axios(url+"/1.0/violas/bank/product/borrow").then(
      async (res) => {
        await this.setState({ borrowProduct: res.data.data });
      }
    );
  }
  async getDigitalBank() {
    let productId = 0;
    let tx = "";
    productId = getProductId(this.state.showType, this.state.borrowProduct);
    tx = digitalBank(
      "borrow",
      this.state.showType,
      "" + this.state.amount * 1e6,
      sessionStorage.getItem("violas_address"),
      this.state.borrowList.token_address,
      parseInt(sessionStorage.getItem("violas_chainId"))
    );
    if (productId === 0) {
      console.log("Cannot find match product, please select other coin.");
      return;
    }
    console.log("Digital Bank ", "borrow", tx);
    this.state.walletConnector
      .signTransaction(tx)
      .then(async (res) => {
        // console.log('Digital Bank ', 'borrow', res);
        await this.getBankBroadcast(
          sessionStorage.getItem("violas_address"),
          productId,
          Number(this.state.amount * 1e6),
          res
        );
      })
      .catch((err) => {
        console.log("Digital Bank ", "borrow", err);
      });
  }
  async getBankBroadcast(address, product_id, value, sigtxn) {
    let api = code_data.bank.broadcast.borrow;
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
        // console.log(res.data)
        if (res.data.code == 2000) {
          this.setState({
            warning: "借款成功",
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
            warning: "借款失败",
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
          warning: "借款失败",
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
      borrowList,
      productIntor,
      question,
      showLists,
      showType,
      extra,
      limit
    } = this.state;
    return (
      <div className="borrowDetails">
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
              {intl.get("Borrow")}
            </NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="saveDetailsWrap">
          <div className="saveDetailsList">
            <h4>
              <label>{intl.get("To borrow")}</label>
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
                                  this.getBorrowAllMessage(this.state.idx);
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
              className={this.state.warning ? "activeInput" : null}
              value={this.state.amount}
              onChange={(e) => this.getInputValue(e)}
            />
            <div className="saveDetailsShow">
              <p>
                <img src="/img/kyye.png" />
                <label>{intl.get("Daily limit")} ：</label>{" "}
                <label>
                  {borrowList.limit} {showType}
                </label>
                <span
                  onClick={() => {
                    this.setState({
                      amount: borrowList.limit1,
                    });
                  }}
                >
                  {intl.get("All")}
                </span>
              </p>
            </div>
          </div>
          <div className="saveDetailsList1">
            <p>
              <label>{intl.get("Borrowing rate")}</label>
              <span>
                {Number(borrowList.rate * 100).toFixed(2)}%/
                {intl.get("Day")}
              </span>
            </p>
            <p>
              <p>
                <label>{intl.get("Loan-to-value Ratio")}</label>
                <span>
                  {" "}
                  {intl.get("Loan-to-value ratio = borrowing/lending")}
                </span>
              </p>
              <span>{Number(borrowList.pledge_rate * 100).toFixed(2)}%</span>
            </p>
            <p>
              <p>
                <label>{intl.get("Pledge account")}</label>
                <span>
                  {intl.get(
                    "The liquidation part will be deducted from the deposit account"
                  )}
                </span>
              </p>
              <span>{intl.get("Account balance")}</span>
            </p>
          </div>
          <div className="agreest">
            {this.state.active ? (
              <img
                src="/img/xuanze-2@2x.png"
                onClick={() => {
                  this.setState({
                    active: false,
                  });
                }}
              />
            ) : (
              <img
                src="/img/xuanze@2x.png"
                onClick={() => {
                  this.setState({
                    active: true,
                  });
                }}
              />
            )}
            {intl.get("I have read and agree with the")}
            <span>&nbsp;{intl.get("Loan Servicing Agreement")}</span>
          </div>
          <div className="foot">
            <p className="btn" onClick={() => this.borrowingImmediately()}>
              {intl.get("Borrow Now")}
            </p>
            <p
              className={
                this.state.warning == "借款成功"
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
                {/* <h4>① 最大可借额度：用户所有币种价值乘以抵押率的总和就是最大可贷款价值。 例如： 用户存款有价值100$的日元(抵押率10%)，价值100$的欧元(抵押率20%)，此时，用户最大可贷款价值为 100*10%+100*20% == 30 $</h4>
                                <h4>② 抵押率：目前区块链上没有负债和信用的概念，需要超额抵押资产才能完成借贷行为。例如 想要借出价值100美元的资产B，则需要抵押价值150美元的资产A。抵押率是币种可贷价值与存款价值的比例， 例如：存款100美元，抵押率设定为0.2，则最大可贷款20美元，每个币种都有自己的抵押率。 </h4>
                                <h4>③ 清算罚金：清算发生时，清算人代表借款人偿还部分或全部未偿还的借款额，作为回报，他们可以收取额外的清算价值的10%罚金 </h4> */}
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
              <div className="descrs">
                {question.map((v, i) => {
                  return (
                    <div key={i}>
                      {v.title ? <h4> {v.title}</h4> : null}
                      {v.text ? <p>{v.text}</p> : null}
                    </div>
                  );
                })}
                {/* <div className="descr">
                                    <h4>如何增加可借额度？</h4>
                                    <p>可通过存款增加可借额度</p>
                                </div>
                                <div className="descr">
                                    <h4>借款有时间限制吗？</h4>
                                    <p>借款限制固定的时间周期，但是，随着时间的流逝，借贷利息会相应增加</p>
                                </div>
                                <div className="descr">
                                    <h4>需要支付多少利息？</h4>
                                    <p>借贷利率是不断变化的，用户所需支付的利息取决于该资产的供求关系。</p>
                                </div>
                                <div className="descr">
                                    <h4>什么情况下资产将被清算？</h4>
                                    <p>用户当前已借贷价值超过了最大可借贷价值，则可被清算，清算只清算超出最大可借贷价值的部分</p>
                                </div> */}
              </div>
            ) : null}
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

export default BorrowDetails;