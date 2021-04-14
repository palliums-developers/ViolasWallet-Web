import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import WalletConnect from "../../packages/browser/index";
import WalletconnectDialog from "../components/walletconnectDialog";
import { digitalBank, getProductId } from "../../utils/bank";
import axios from "axios";
import intl from "react-intl-universal";
import code_data from "../../utils/code.json";
let url = "https://api4.violas.io";
let url1 = "https://api.violas.io";

//还款
class Repayment extends Component {
  constructor() {
    super();
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      name: "",
      showList: false,
      active: false,
      amount: "",
      warning: "",
      warning1: false,
      borrowList: {},
      showLists: [],
      showType: "",
      extra: 0,
      showWallet: false,
      borrowProduct: [],
      depositProduct: [],
      repayCurList: {},
      available: 0,
    };
  }
  stopPropagation(e) {
    e.nativeEvent.stopImmediatePropagation();
  }
  async componentWillMount() {
    this.setState({
      repayCurList: JSON.parse(sessionStorage.getItem("repayCurList")),
    });
    await this.getNewWalletConnect();
    await this.getDepositProduct();
    await this.getBorrowProduct();
    await this.getCurrenciesList();
  }
  async getDepositProduct() {
    axios(url + "/1.0/violas/bank/product/deposit").then(async (res) => {
      await this.setState({ depositProduct: res.data.data });
    });
  }
  async getBorrowProduct() {
    axios(url + "/1.0/violas/bank/product/borrow").then(async (res) => {
      await this.setState({ borrowProduct: res.data.data });
    });
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  async getCurrenciesList() {
    let { repayCurList } = this.state;
    //币种列表
    axios(
      url +
        "/1.0/violas/currency/published?addr=" +
        sessionStorage.getItem("violas_address")
    ).then(async (res) => {
      let temp = [];
      for (let i in this.state.depositProduct) {
        for (let j in res.data.data.published) {
          if (
            this.state.depositProduct[i].token_module ===
            res.data.data.published[j]
          ) {
            temp.push(this.state.depositProduct[i].token_module);
          }
        }
      }
      await this.setState(
        {
          showLists: temp,
        },
        () => {
          for (let i = 0; i < this.state.showLists.length; i++) {
            if (this.state.showLists[i] == repayCurList.coin) {
              this.setState(
                {
                  showType: this.state.showLists[i],
                },
                () => {
                  this.getAvailableQuantity(
                    this.state.showType,
                    this.state.borrowProduct
                  );
                }
              );
            }
          }
        }
      );
    });
  }
  componentDidMount() {
    document.addEventListener("click", this.onClose);
  }
  //获取还款产品信息
  async getAvailableQuantity(currency, borrowProductList) {
    // console.log(currency, borrowProductList);
    let product_id = 0;
    product_id = getProductId(currency, borrowProductList);

    if (product_id === 0) {
      await this.setState({ extra: 0 });
      return;
    }
    await axios
      .get(
        `${url}/1.0/violas/bank/borrow/repayment?id=${product_id}&address=${sessionStorage.getItem(
          "violas_address"
        )}`
      )
      .then(async (res) => {
        await this.setState({
          borrowList: res.data.data,
          extra: res.data.data.balance / 1e6,
        });
      });
  }
  //获取输入框value
  getInputValue = (e) => {
    // console.log(e.target.value,'.......')
    if (e.target.value) {
      this.setState({
        amount: e.target.value,
        warning: "",
      });
    } else {
      this.setState({
        amount: "",
      });
    }
  };
  //立即还款
  repaymentImmediately = () => {
    if (this.state.amount == "") {
      this.setState({
        warning: intl.get("Enter repayment amount"),
      });
    } else {
      this.setState({
        showWallet: true,
      });
      this.getDigitalBank();
    }
  };

  async getDigitalBank() {
    let productId = 0;
    let tx = "";
    productId = getProductId(this.state.showType, this.state.borrowProduct);
    tx = digitalBank(
      "repay",
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
    console.log("Digital Bank ", "repay", tx);
    this.state.walletConnector
      .signTransaction(tx)
      .then(async (res) => {
        // console.log('Digital Bank ', 'repay', res);
        await this.getBankBroadcast(
          sessionStorage.getItem("violas_address"),
          productId,
          Number(this.state.amount * 1e6),
          res
        );
      })
      .catch((err) => {
        console.log("Digital Bank ", "repay", err);
      });
  }
  async getBankBroadcast(address, product_id, value, sigtxn) {
    let api = code_data.bank.broadcast.repay;
    let parm = {
      address: address,
      product_id: product_id,
      value: parseInt(value),
      sigtxn: sigtxn,
    };
    console.log(parm);
    axios.post(`${url}${api}`, parm).then((res) => {
      if (res.data.code == 2000) {
        this.setState(
          {
            warning: intl.get("Repayment successful"),
            showWallet: false,
          },
          () => {
            window.location.reload();
          }
        );
      } else {
        this.setState(
          {
            warning: intl.get("Repayment failed"),
            showWallet: false,
          },
          () => {
            window.location.reload();
          }
        );
      }
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
    let { showList, borrowList, showLists, showType, extra } = this.state;
    // console.log(borrowList);
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
            <NavLink to="/homepage/home/digitalBank/borrowOrder">
              {intl.get("Borrowing Orders")}
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/saveDetails">
              {intl.get("Repayment")}
            </NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="saveDetailsWrap">
          <div className="saveDetailsList">
            <h4>
              <label>{intl.get("To payoff")}</label>
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
                                showType: v,
                                showList: false,
                              },
                              () => {
                                this.getAvailableQuantity(
                                  this.state.showType,
                                  this.state.borrowProduct
                                );
                              }
                            );
                          }}
                        >
                          <img src="/img/kyye.png" />
                          <label>{v}</label>
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
                this.state.warning == intl.get("Repayment failed")
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
                <label>{intl.get("Repay amount")} ：</label>{" "}
                <label>
                  {extra} {showType}
                </label>
                <span
                  onClick={() => {
                    this.setState({
                      amount: extra,
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
              <label>{intl.get("Loan rate")}</label>
              <span>
                {borrowList.rate
                  ? Number(borrowList.rate * 100).toFixed(2) + "%"
                  : "--"}
              </span>
            </p>
            <p>
              <p>
                <label>{intl.get("Gas fee")}</label>
                <span></span>
              </p>
              <span>--</span>
            </p>
            <p>
              <p>
                <label>{intl.get("Repayment account")}</label>
                <span></span>
              </p>
              <span>{intl.get("Account balance")}</span>
            </p>
          </div>
          <div className="foot">
            <p className="btn" onClick={() => this.repaymentImmediately()}>
              {intl.get("Repayment Now")}
            </p>
            <p
              className={
                this.state.warning == intl.get("Repayment successful")
                  ? "descr descrWarn"
                  : "descr descrRed"
              }
            >
              {this.state.warning}
            </p>
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

export default Repayment;