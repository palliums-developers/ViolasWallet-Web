import React, { Component } from "react";
import { connect } from "react-redux";
import { Drawer } from "antd";
import CurrencyDetail from "./components/currencyDetail";
import Details from "./components/details";
import intl from "react-intl-universal";
import AddCurrency from "./components/addCurrency";
import WalletconnectDialog from "./components/walletconnectDialog";
import "./app.scss";
let url1 = "https://api4.violas.io";
let url = "https://api.violas.io";
// let url1 = "https://tbtc1.trezor.io"

//钱包首页
class HomeContent extends Component {
  constructor() {
    super();
    this.state = {
      addCurrencyList: [],
      addCurrencyList1: [],
      coinsBalance: 0,
      balance1: 0,
      balance2: 0,
      balance3: 0,
      visible: true,
      checkData: [],
      balance: 0,
      arr1: [],
      arr2: [],
      BTCAddress: "",
      BTCBalances: [],
      BTCBalance: 0,
      totalAmount: 0.0,
      typeName: "",
      BTCRate: 0,
      display: false,
      display1: false,
      display2: false,
      disType: false,
      detailAddr: "",
      name: "",
      detailData: {},
      init: false,
      showWallet: false,
    };
  }
  stopPropagation(e) {
    e.nativeEvent.stopImmediatePropagation();
  }
  async componentWillMount() {
    if (window.sessionStorage.getItem("btc_address")) {
      this.getBalances();
    }
  }
  componentDidMount() {
    document.addEventListener("click", this.onClose);
    if (JSON.parse(window.localStorage.getItem("wallet_info"))) {
      this.setState({
        addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
        // typeName: JSON.parse(window.sessionStorage.getItem("typeName"))
      });
    }
  }
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    if (typeof number != parseFloat) {
      number.toFixed(2);
    }
    return number;
  }
  getBalanceList = async (chain) => {
    let temp = await fetch(
      url1 +
        "/1.0/" +
        chain +
        "/balance?addr=" +
        window.sessionStorage.getItem(chain + "_address")
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    return temp.data.balances;
  };
  getRateList = async (chain) => {
    let temp = await fetch(
      url1 +
        "/1.0/violas/value/" +
        chain +
        "?address=" +
        window.sessionStorage.getItem(chain + "_address")
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    return temp.data;
  };
  setAllCoinCheck = (balanceList, rateList, chain) => {
    let temp = [];
    for (let i in balanceList) {
      for (let j in rateList) {
        if (
          (chain === "violas" && balanceList[i].name === "VLS") ||
          (chain === "libra" && balanceList[i].name === "XUS")
        ) {
          if (balanceList[i].name === rateList[j].name) {
            temp[i] = balanceList[i];
            temp[i].rate = rateList[j].rate;
            temp[i].checked = true;
            temp[i].chain = chain;
            break;
          }
        }
      }
    }
    return temp;
  };
  initCheckData = async () => {
    let violas_balance_list = await this.getBalanceList("violas");
    let libra_balance_list = await this.getBalanceList("libra");
    let violas_rate_list = await this.getRateList("violas");
    let libra_rate_list = await this.getRateList("libra");
    let temp_arr1 = this.setAllCoinCheck(
      violas_balance_list,
      violas_rate_list,
      "violas"
    );
    let temp_arr2 = this.setAllCoinCheck(
      libra_balance_list,
      libra_rate_list,
      "libra"
    );
    let temp_checkData = temp_arr1.concat(temp_arr2);
    await this.setState({
      arr1: temp_arr1,
      arr2: temp_arr2,
      checkData: temp_checkData,
    });
    window.sessionStorage.setItem(
      "violas_Balances",
      JSON.stringify(temp_arr1.concat(temp_arr2))
    );
    window.sessionStorage.setItem("libra_Balances", JSON.stringify(temp_arr2));
    window.sessionStorage.setItem("checkData", JSON.stringify(temp_checkData));
  };
  getBalances = async () => {
    this.getBTCBalances();
    if (!window.sessionStorage.getItem("checkData")) {
      this.initCheckData();
    }
    this.getTotalAmount();
  };
  getTotalAmount() {
    let amount = 0;
    for (let i = 0; i < this.state.checkData.length; i++) {
      amount += Number(
        this.getFloat(
          (this.state.checkData[i].balance / 1e6) *
            this.state.checkData[i].rate,
          6
        )
      );
    }
    this.setState(
      {
        coinsBalance: amount,
      },
      () => {
        window.sessionStorage.setItem(
          "balances",
          this.state.coinsBalance + this.state.BTCBalance
        );
        this.setState(
          {
            totalAmount: this.getFloat(
              this.state.coinsBalance + this.state.BTCBalance,
              2
            ),
          },
          () => {}
        );
      }
    );
  }
  getBTCBalances() {
    fetch(
      url1 +
        "/1.0/btc/balance?address=" +
        window.sessionStorage.getItem("btc_address")
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState(
          {
            BTCBalances: res.data,
          },
          () => {
            fetch(url1 + "/1.0/violas/value/btc")
              .then((res) => res.json())
              .then((res) => {
                let btcRate = res.data;
                let { BTCBalances } = this.state;
                let BTCBalance = 0;
                for (let i = 0; i < BTCBalances.length; i++) {
                  for (let j = 0; j < btcRate.length; j++) {
                    if (BTCBalances[i].name == btcRate[i].name) {
                      BTCBalances[i].rate = btcRate[i].rate;
                    }
                  }
                }
                for (let i = 0; i < BTCBalances.length; i++) {
                  BTCBalance += Number(
                    this.getFloat(
                      (BTCBalances[i].BTC / 1e8) * BTCBalances[i].rate,
                      8
                    )
                  );
                }
                this.setState(
                  {
                    BTCBalance: BTCBalance,
                  },
                  () => {
                    this.getTotalAmount();
                  }
                );
              });
          }
        );
      });
  }
  //显示添加币种页面
  showAddCoins = (type) => {
    this.setState({
      display: type,
    });
  };
  //显示币种详情页面
  showDetails = (type) => {
    this.setState({
      display1: type,
    });
  };
  //显示详情页面
  showDetails1 = (type) => {
    this.setState({
      display2: type,
    });
  };

  curDataFun = (val) => {
    this.setState({
      detailData: val,
    });
  };
  showEveryDetail = (type) => {
    this.setState({
      display2: type,
      display1: true,
    });
  };
  onClose = () => {
    this.setState({
      display: false,
      // display1: false,
      display2: false,
    });
  };
  // onClose1 = () => {
  //   this.setState({
  //     display2: false
  //   })
  // };
  getInitTotal = (val) => {
    this.setState({
      totalAmount: val,
    });
  };
  closeWallet = (val) => {
    this.setState({
      showWallet: val,
    });
  };
  showWalletFun = (val) => {
    this.setState({
      showWallet: val,
    });
  };
  render() {
    let {
      BTCAddress,
      BTCBalances,
      visible,
      totalAmount,
      checkData,
      balance,
    } = this.state;
    return (
      <div className="content">
        <div className="contentWrap">
          <div className="apply">
            <p>
              {intl.get("Total assets")}
              <i>
                {visible ? (
                  <img
                    onClick={() => {
                      this.setState({
                        visible: !this.state.visible,
                      });
                    }}
                    src="/img/jurassic_openeyes 3@2x.png"
                  />
                ) : (
                  <img
                    onClick={() => {
                      this.setState({
                        visible: !this.state.visible,
                      });
                    }}
                    src="/img/biyanjing 2@2x.png"
                  />
                )}
              </i>
            </p>
            <div className="applyContent">
              {visible ? <span>$ {totalAmount}</span> : <span>******</span>}

              <div className="btns">
                <dl
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/homepage/home/transfer",
                    });
                    // this.props.showPolling(false);
                    // this.props.showDetails(false);
                  }}
                >
                  <dt></dt>
                  <dd>{intl.get("Transfer")}</dd>
                </dl>
                <dl
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/homepage/home/getMoney",
                    });
                    // this.props.showPolling(false);
                    // this.props.showDetails(false);
                  }}
                >
                  <dt></dt>
                  <dd>{intl.get("Receive")}</dd>
                </dl>
                <dl
                  onClick={() => {
                    this.props.history.push(
                      "/homepage/home/digitalBank/mapping"
                    );
                  }}
                >
                  <dt></dt>
                  <dd>{intl.get("Mapping")}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="assetList">
            <p>
              <label>{intl.get("Funds")}</label>
              <i
                onClick={(e) => {
                  this.stopPropagation(e);
                  this.setState({
                    display: true,
                  });
                  // this.props.showPolling(!this.props.display);
                }}
              >
                <img src="/img/编组 18@2x.png" />
              </i>
            </p>
            <div
              className="goMining"
              onClick={() => {
                this.props.history.push("/homepage/home/miningAwards");
              }}
            >
              <span>{intl.get("Mining Bonus")}</span>
            </div>
            <div className="assetLists">
              {BTCBalances.map((v, i) => {
                return (
                  <div
                    className="assetListsEvery"
                    key={i}
                    onClick={(e) => {
                      this.stopPropagation(e);
                      this.setState(
                        {
                          display1: !this.state.display1,
                          name: v.name,
                          detailAddr: sessionStorage.getItem("btc_address"),
                          rate:
                            v.BTC == 0
                              ? "0.00"
                              : v.rate == 0
                              ? "0.00"
                              : this.getFloat(v.rate * (v.BTC / 1e8), 2),
                          icon: v.show_icon,
                          balance:
                            v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 8),
                        },
                        () => {
                          window.sessionStorage.setItem(
                            "detailAddr",
                            BTCAddress
                          );
                        }
                      );
                    }}
                  >
                    <div className="leftAsset">
                      <i>
                        <img src={v.show_icon} />
                      </i>
                      <label>{v.show_name}</label>
                    </div>
                    <div className="rightAsset">
                      {visible ? (
                        <span>
                          {v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 8)}
                        </span>
                      ) : (
                        <span>******</span>
                      )}

                      {visible ? (
                        <label>
                          ≈$
                          {v.BTC == 0
                            ? "0.00"
                            : v.rate == 0
                            ? "0.00"
                            : this.getFloat(v.rate * (v.BTC / 1e8), 2)}
                        </label>
                      ) : (
                        <label>******</label>
                      )}
                    </div>
                  </div>
                );
              })}

              {JSON.parse(window.sessionStorage.getItem("checkData")) &&
                JSON.parse(window.sessionStorage.getItem("checkData")).map(
                  (v, i) => {
                    return (
                      <div
                        className="assetListsEvery"
                        style={
                          v.checked == false
                            ? { display: "none" }
                            : { display: "flex" }
                        }
                        key={i}
                        onClick={(e) => {
                          this.stopPropagation(e);
                          this.setState(
                            {
                              display1: !this.state.display1,
                              name: v.show_name,
                              detailAddr: v.address,
                              rate:
                                v.balance == 0
                                  ? "0.00"
                                  : v.rate == 0
                                  ? "0.00"
                                  : this.getFloat(
                                      v.rate * (v.balance / 1e6),
                                      6
                                    ),
                              icon: v.show_icon,
                              balance:
                                v.balance == 0
                                  ? 0
                                  : this.getFloat(v.balance / 1e6, 6),
                            },
                            () => {
                              window.sessionStorage.setItem(
                                "detailAddr",
                                v.address
                              );
                            }
                          );
                        }}
                      >
                        <div className="leftAsset">
                          <i>
                            <img src={v.show_icon} />
                          </i>
                          <label>{v.show_name}</label>
                        </div>
                        <div className="rightAsset">
                          {visible ? (
                            <span>
                              {v.balance == 0
                                ? 0
                                : this.getFloat(v.balance / 1e6, 6)}
                            </span>
                          ) : (
                            <span>******</span>
                          )}

                          {visible ? (
                            <label>
                              ≈$
                              {v.balance == 0
                                ? "0.00"
                                : v.rate == 0
                                ? "0.00"
                                : this.getFloat(v.rate * (v.balance / 1e6), 2)}
                            </label>
                          ) : (
                            <label>******</label>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
          <div className="freeWrap">
            <div
              className="free"
              onClick={() => {
                this.props.history.push("/homepage/home/userRewards");
              }}
            >
              <span>免费领取</span>
            </div>
          </div>
        </div>
        {/* 添加币种 */}
        <Drawer
          placement="right"
          closable={false}
          // onClose={this.onClose}
          visible={this.state.display}
          mask={false}
          getContainer={false}
        >
          <AddCurrency
            showAddCoins={this.showAddCoins}
            checkData={this.state.checkData}
            BTCBalance={this.state.BTCBalance}
            getInitTotal={this.getInitTotal}
            getBalances={this.getBalances}
            showWalletFun={this.showWalletFun}
          ></AddCurrency>
        </Drawer>
        {/* 币种详情 */}
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.display1}
          mask={false}
          getContainer={false}
        >
          <CurrencyDetail
            showDetails={this.showDetails}
            showDetails1={this.showDetails1}
            curDataFun={this.curDataFun}
            nameType={this.state.name}
            detailAddrs={this.state.detailAddr}
            rate={this.state.rate}
            icon={this.state.icon}
            balance={this.state.balance}
          ></CurrencyDetail>
        </Drawer>
        {/* 详情 */}
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose1}
          visible={this.state.display2}
          mask={false}
          getContainer={false}
        >
          <Details
            showEveryDetail={this.showEveryDetail}
            detailDatas={this.state.detailData}
          ></Details>
        </Drawer>
        {this.state.showWallet ? (
          <WalletconnectDialog
            getCloseWallet={this.closeWallet}
          ></WalletconnectDialog>
        ) : null}
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
  return {
    showPolling: (type) => {
      dispatch({
        type: "DISPLAY",
        payload: type,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
