import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb,message } from "antd";
import { NavLink } from "react-router-dom";
import { timeStamp2String } from '../../utils/timer';
import { getBitcoinScript, getLibraScript, getMapScript } from '../../utils/trans'
import getBTCTx from '../../utils/btc_trans';
import getLibraTx from '../../utils/libra_trans';
import getViolasTx from '../../utils/violas_trans';
import WalletConnect from "../../packages/browser/src/index";
import WalletconnectDialog from "../components/walletconnectDialog";
import { CopyToClipboard } from "react-copy-to-clipboard";
import code_data from '../../utils/code.json';
let url1 = "https://api.violas.io"
let url = "https://api4.violas.io"

//映射
class DigitalBank extends Component {
  constructor() {
    super();
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      type: "",
      amount: "",
      amount1: 0,
      warning: "",
      showDealType: false,
      balance: 0,
      ind: 0,
      coinName: "",
      arr1: [],
      arr2: [],
      selData: [],
      BTCAddress: "",
      opinionType: "",
      BTCArr: [],
      mappingRecord: [],
      mappingInfo: [],
      mappingCoinType: {},
      violas_mappingInfo: [],
      libra_mappingInfo: [],
      btc_mappingInfo: [],
      focusActive: false,
      showWallet: false,
    };
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  stopPropagation(e) {
    e.nativeEvent.stopImmediatePropagation();
  }
  componentDidMount() {
    document.addEventListener("click", this.closeDialog);
    this.getMappingRecord();
    //获取到三种钱包
    if (window.sessionStorage.getItem("btc_address")) {
      this.setState(
        {
          BTCAddress: window.sessionStorage.getItem("btc_address"),
        },
        () => {
          this.getMappingInfo();
        }
      );
    }
  }
  //获取映射记录
  getMappingRecord = () => {
    fetch(
      url +
        "/1.0/mapping/transaction?addresses=" +
        sessionStorage.getItem("violas_address") +
        "_violas," +
        sessionStorage.getItem("libra_address") +
        "_libra," +
        sessionStorage.getItem("btc_address") +
        "_btc" +
        "&offset=0&limit=5"
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          mappingRecord: res.data,
        });
      });
  };
  closeDialog = () => {
      this.setState({
        showDealType: false
      })
    }
  //获取币种信息 切换币种
  getMappingInfo() {
    fetch(url + "/1.0/mapping/address/info")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          let violasArr = [],
            libraArr = [],
            btcArr = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].from_coin.coin_type == "violas") {
              violasArr.push(res.data[i]);
            } else if (res.data[i].from_coin.coin_type == "libra") {
              libraArr.push(res.data[i]);
            } else if (res.data[i].from_coin.coin_type == "btc") {
              btcArr.push(res.data[i]);
            }
          }
          this.setState(
            {
              violas_mappingInfo: violasArr,
              libra_mappingInfo: libraArr,
              btc_mappingInfo: btcArr,
              mappingInfo: res.data,
              
            },
            () => {
              
              this.getBalances();
            }
          );
        }
      });
  }
  //获取到每个币种及余额
  //获取余额
  getBalances = () => {
    //获取violas币种的余额
    fetch(
      url +
        "/1.0/violas/balance?addr=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then(async (res) => {
        if (res.data) {
          let arr = this.state.violas_mappingInfo;
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j <= res.data.balances.length; j++) {
              if (!res.data.balances[j]) {
                arr[i].balance = 0;
                break;
              } else if (
                arr[i].from_coin.assert.name == res.data.balances[j].name
              ) {
                arr[i].balance = res.data.balances[j].balance;
                break;
              }
            }
          }
          await this.setState(
            {
              violas_mappingInfo: arr,
            },
            () => {
              let arr = this.state.violas_mappingInfo.concat(
                this.state.libra_mappingInfo
              );
              let newArr = arr.concat(this.state.btc_mappingInfo);
              // console.log(newArr[0] && newArr[0].balance)
              this.setState(
                {
                  selData: newArr,
                },
                () => {
                  if (this.state.selData) {
                    if (this.state.type == "") {
                      this.setState(
                        {
                          type: this.state.selData[0].from_coin.assert
                            .show_name,
                          coinName: this.state.selData[0].from_coin.assert.name,
                          balance: this.state.selData[0].balance / 1e6,
                          mappingCoinType: this.state.selData[0],
                          // opinionType: this.state.selData[0].show_icon.split('/')[this.state.selData[0].show_icon.split('/').length - 1]
                        },
                      );
                    }
                  }
                }
              );
            }
          );
        }
      });
    //获取libra币种的余额
    fetch(
      url +
        "/1.0/libra/balance?addr=" +
        window.sessionStorage.getItem("libra_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          let arr1 = this.state.libra_mappingInfo;
          for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j <= res.data.balances.length; j++) {
              if (!res.data.balances[j]) {
                arr1[i].balance = 0;
                break;
              } else if (
                arr1[i].from_coin.assert.name == res.data.balances[j].name
              ) {
                arr1[i].balance = res.data.balances[j].balance;
                break;
              }
            }
          }
        }
      });
    //获取btc的余额
    fetch(url + "/1.0/btc/balance?address=" + this.state.BTCAddress)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.state.btc_mappingInfo[0].balance = res.data[0].BTC;
        } else {
          return;
        }
      });
  };

  //获取到输出数量
  getTransAmount = (e) => {
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
    this.setState(
      {
        amount: e.target.value,
        amount1: e.target.value,
      },
      () => {
        this.amountWarn();
      }
    );
  };
  //输出数量提示
  amountWarn() {
    if (
      Number(this.state.amount / 1e8) > Number(this.getFloat(this.state.balance, 6))
    ) {
      this.setState({
        warning: "余额不足",
      });
    } else {
      this.setState({
        warning: "",
      });
    }
  }
  getTypeShow = (event) => {
    this.stopPropagation(event);
    this.setState({
      showDealType: !this.state.showDealType,
    });
  };
  //转出数量选中
  showTypes = (v, bal, name, ind, val) => {
    // console.log(val.from_coin.coin_type, "........");
    this.setState(
      {
        type: v,
        balance: val.from_coin.coin_type == 'btc' ? bal / 1e8 : bal / 1e6,
        showDealType: false,
        coinName: name,
        ind: ind,
        mappingCoinType: val,
      },
      () => {
        // this.getTypeBalance()
        this.getBalances();
      }
    );
  };
  //确认映射
  confirmMapping = () => {
    if (this.state.amount == "") {
      this.setState({
        warning: "请输入转出数量",
        focusActive: true
      });
    } else {
      this.setState({
        showWallet: true
      });
      this.getMap();
    }
  };
  //确认映射
  async getMap() {
    let to_address = "";
    // console.log(this.state.mappingCoinType, "......");
    switch (this.state.mappingCoinType.to_coin.coin_type) {
      case "btc":
        to_address = sessionStorage.getItem("btc_address");
        break;
      case "libra":
        to_address = sessionStorage.getItem("libra_address");
        break;
      case "violas":
        to_address = sessionStorage.getItem("violas_address");
        break;
      default:
        to_address = "";
        return;
    }
    if (this.state.mappingCoinType.from_coin.coin_type === "btc") {
      // let script = getBitcoinScript(this.state.mappingCoinType.lable, sessionStorage.getItem('bitcoin_address'), parseInt(this.state.mappingCoinAmount)/100);
      let script = getBitcoinScript(
        this.state.mappingCoinType.lable,
        to_address,
        this.state.amount * 1e6
      );
      console.log('script: ', script);
      let tx = getBTCTx(
        sessionStorage.getItem("btc_address"),
        this.state.mappingCoinType.receiver_address,
        this.state.amount * 1e8,
        script
      );
      console.log("bitcoin: ", tx);
      this.state.walletConnector
        .sendTransaction("_bitcoin", tx)
        .then((res) => {
          // console.log("Bitcoin mapping ", res);
          this.setState({
            warning: "映射成功",
            showWallet: false,
          });
          setTimeout(() => {
            this.setState({
              warning: "",
              amount: "",
              amount1: 0,
            });
          }, 1000);
        })
        .catch((err) => {
          // console.log("Bitcoin mapping ", err);
          this.setState({
            warning: "映射失败",
            showWallet: false,
          });
          setTimeout(() => {
            this.setState({
              warning: "",
              amount: "",
              amount1: 0,
            });
          }, 1000);
        });
    } else if (this.state.mappingCoinType.from_coin.coin_type === "libra") {
      let script = getMapScript(
        this.state.mappingCoinType.from_coin.coin_type,
        this.state.mappingCoinType.lable,
        to_address
      );
      let tx = getLibraTx(
        sessionStorage.getItem("libra_address"),
        this.state.mappingCoinType.receiver_address,
        this.state.amount * 1e6,
        this.state.mappingCoinType.from_coin.assert.module,
        this.state.mappingCoinType.from_coin.assert.name,
        sessionStorage.getItem("libra_chainId"),
        script
      );
      console.log("libra: ", tx);
      this.state.walletConnector
        .sendTransaction("_libra", tx)
        .then((res) => {
          // console.log("Libra mapping ", res);
          this.setState({
            warning: "映射成功",
            showWallet: false,
          });
          setTimeout(() => {
            this.setState({
              warning: "",
              amount: "",
              amount1: 0,
            });
          }, 1000);
        })
        .catch((err) => {
          // console.log("Libra mapping ", err);
          this.setState({
            warning: "映射失败",
            showWallet: false,
          });
          setTimeout(() => {
            this.setState({
              warning: "",
              amount: "",
              amount1: 0,
            });
          }, 1000);
        });
    } else if (this.state.mappingCoinType.from_coin.coin_type === "violas") {
      let script = getMapScript(
        this.state.mappingCoinType.from_coin.coin_type,
        this.state.mappingCoinType.lable,
        to_address
      );
      let tx = getViolasTx(
        sessionStorage.getItem("violas_address"),
        this.state.mappingCoinType.receiver_address,
        this.state.amount * 1e6,
        this.state.mappingCoinType.from_coin.assert.module,
        this.state.mappingCoinType.from_coin.assert.name,
        sessionStorage.getItem("violas_chainId"),
        script
      );
      console.log("violas: ", tx);
      this.state.walletConnector
        .sendTransaction("violas", tx)
        .then((res) => {
          // console.log("Violas mapping ", res);
          this.setState({
            warning: "映射成功",
            showWallet: false,
          });
          setTimeout(() => {
            this.setState({
              warning: "",
              amount: "",
              amount1: 0,
            });
          }, 1000);
        })
        .catch((err) => {
          // console.log("Violas mapping ", err);
          this.setState({
            warning: "映射失败",
            showWallet: false,
          });
          setTimeout(() => {
            this.setState({
              warning: "",
              amount: "",
              amount1: 0,
            });
          }, 1000);
        });
    } else {
      return;
    }
  }
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    return number;
  }
  //下拉框搜索
  getSearchList = (e) => {
    if (e.target.value) {
      let arr = this.state.selData.filter((v) => {
        if (
          v.from_coin.assert.show_name.indexOf(e.target.value.toUpperCase()) >=
          0
        ) {
          return v;
        }
      });
      this.setState({
        selData: arr,
      });
    } else {
      this.getBalances();
    }
  };
  closeWallet = (val) => {
    this.setState({
      showWallet: val,
    });
  };
  render() {
    let {
      showDealType,
      type,
      warning,
      selData,
      ind,
      balance,
      mappingRecord,
      focusActive,
    } = this.state;
    return (
      <div className="mapping">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <NavLink to="/homepage">
              {" "}
              <img src="/img/fanhui 2@2x.png" />
              钱包
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/mapping">映射</NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="mappingContent">
          <div className="mappingList">
            <h3>
              <img src="/img/kyye.png" />
              可用余额：
              <label>
                {balance} {type}
              </label>
            </h3>
            <div className="iptAmount">
              <input
                value={this.state.amount}
                placeholder="转出数量"
                onChange={(e) => this.getTransAmount(e)}
              />
              <div className="dropdown1">
                {showDealType ? (
                  <span onClick={(e) => this.getTypeShow(e)}>
                    {type}
                    <i>
                      <img src="/img/路径备份 3@2x.png" />
                    </i>
                  </span>
                ) : (
                  <span onClick={(e) => this.getTypeShow(e)}>
                    {type}
                    <i>
                      <img src="/img/路径 7@2x.png" />
                    </i>
                  </span>
                )}
                {showDealType ? (
                  <div className="dropdown-content1">
                    <div className="formSearch">
                      <img src="/img/sousuo 2@2x.png" />
                      <input
                        placeholder="Search"
                        onChange={(e) => this.getSearchList(e)}
                      />
                    </div>
                    {selData.map((v, i) => {
                      return (
                        <div
                          className="searchList"
                          key={i}
                          onClick={() =>
                            this.showTypes(
                              v.from_coin.assert.show_name,
                              v.balance,
                              v.from_coin.assert.name,
                              i,
                              v
                            )
                          }
                        >
                          <div className="searchEvery">
                            <img src={v.from_coin.assert.icon} />
                            <div className="searchEvery1">
                              <div>
                                <h4>{v.from_coin.assert.show_name}</h4>
                                <p>
                                  余额：
                                  {v.from_coin.coin_type == "btc"
                                    ? v.balance / 1e8
                                    : v.balance / 1e6}{" "}
                                  {v.from_coin.assert.show_name}
                                </p>
                              </div>
                              <span
                                className={ind == i ? "check active" : "check"}
                              ></span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="arrow">
              <img src="/img/ai28 4@2x.png" />
            </div>
            <div className="showAmount">
              <label>{this.state.amount1}</label>
              <span>{type}</span>
            </div>
            <div className="line"></div>
            <p>
              <label>汇率：</label>
              <span>
                {this.state.amount == ""
                  ? "-- "
                  : this.state.amount == "0"
                  ? "--"
                  : this.state.amount / this.state.amount +
                    type +
                    "=" +
                    this.state.amount / this.state.amount +
                    type}
              </span>
            </p>
            <p>
              <label>矿工费用：</label>
              <span>--</span>
            </p>
            <div className="foot">
              <p
                className={focusActive == false ? "btn" : "btn focusActive"}
                onClick={() => this.confirmMapping()}
              >
                确定映射
              </p>
              <p
                className={
                  warning == "映射成功" ? "descr descrWarn" : "descr descrRed"
                }
              >
                {warning}
              </p>
            </div>
          </div>
          <div className="ETHTokenWrap">
            <h4>如何映射 ETH 代币？</h4>
            <div className="ETHTokenWrapList">
              <div className="tokenList1">
                <p>将链接复制到以下钱包，即可将ETH代币映射至violas钱包</p>
                <CopyToClipboard
                  text="localhost:12222/violasMapping"
                  onCopy={() => message.success("复制成功")}
                >
                  <a>
                    localhost:12222/violasMapping
                    <img src="/img/fuzhi 3@2x.png" />
                  </a>
                </CopyToClipboard>
              </div>
              <div className="tokenList2">
                <span>
                  <img src="/img/eth1.png" />
                </span>
                <span>
                  <img src="/img/eth2.png" />
                </span>
                <span>
                  <img src="/img/eth3.png" />
                </span>
                <span>
                  <img src="/img/eth4.png" />
                </span>
                <span>
                  <img src="/img/eth5.png" />
                </span>
                <span>
                  <img src="/img/eth6.png" />
                </span>
              </div>
            </div>
          </div>
          <div className="mappingRecord">
            <h4>映射记录</h4>
            <div className="recordLists">
              {mappingRecord.map((item, index) => {
                return (
                  <div className="recordList" key={index}>
                    <div>
                      <span
                        className={
                          item.state == "start"
                            ? "spanYel"
                            : item.state == "end"
                            ? "spanGre"
                            : "spanRed"
                        }
                      >
                        {item.state == "start"
                          ? "映射中"
                          : item.state == "end"
                          ? "映射成功"
                          : "映射失败"}
                      </span>
                      <label>
                        {timeStamp2String(item.expiration_time + "000")}
                      </label>
                    </div>
                    <div>
                      <p>
                        {item.in_amount / 1e6}
                        {item.in_show_name}
                        <img src="/img/路径 2@2x.png" />
                        {item.out_amount / 1e6}
                        {item.out_show_name}
                      </p>
                      <label>旷工费：--</label>
                    </div>
                  </div>
                );
              })}
              {/* 
              <div className="recordList">
                <div>
                  <span className="spanRed">映射失败</span>
                  <label>18:22 01/24</label>
                </div>
                <div>
                  <p>
                    999BTC
                    <img src="/img/路径 2@2x.png" />
                    99900V-BTC
                  </p>
                  <label>旷工费：0.01 BTC</label>
                </div>
              </div> */}
            </div>
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

export default DigitalBank;
