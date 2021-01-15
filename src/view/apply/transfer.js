import React, { Component } from "react";
import { connect } from 'react-redux';
import code_data from '../../utils/code.json';
import WalletConnect from "../../packages/browser/src/index";
import TransfarDialog from './transfarDialog.js';
import { bytes2StrHex, string2Byte } from '../../utils/trans';
import intl from "react-intl-universal";
import WalletconnectDialog from '../components/walletconnectDialog'
// import {withRouter} from 'react-router-dom'
let url1 = "https://api.violas.io"
let url = "https://api4.violas.io"
// let url1 = "https://tbtc1.trezor.io"
let WAValidator = require('wallet-address-validator');

class Transfer extends Component {
  constructor(props) {
    super();
    this.state = {
      // bridge: 'http://47.52.66.26:5000',
      bridge: "https://walletconnect.violas.io",
      tyArgs: "",
      tyArgs1: "",
      balance: 0,
      title: "",
      warning: "",
      getAct: false,
      address: "",
      amount: "",
      type: "",
      gasCurrencyCode: "LBR",
      showDealType: false,
      walletConnector: {},
      getTypeBalance1: 0,
      getTypeBalance2: 0,
      arr1: [],
      arr2: [],
      selData: [],
      BTCAddress: "",
      warning1: "",
      coinName: "",
      tranferDig: false,
      ind: 0,
      opinionType: "",
      BTCArr: [],
      showWallet: false,
    };
  }

  async componentWillMount() {
    if (this.props.display) {
      this.props.showPolling();
    }
    // if (this.props.display1) {
    //   this.props.showDetails();
    // }
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
    if (window.sessionStorage.getItem("btc_address")) {
      this.setState(
        {
          BTCAddress: window.sessionStorage.getItem("btc_address"),
        },
        () => {
          this.getTypesBalance();
        }
      );
    }
  }
  //获取到每个币种及余额
  getTypesBalance() {
    fetch(url + "/1.0/btc/balance?address=" + this.state.BTCAddress)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState(
            {
              BTCArr: res.data,
            },
            () => {
              this.getVLBalance();
            }
          );
        } else {
          this.getVLBalance();
        }
      });
  }
  getVLBalance() {
    fetch(
      url +
        "/1.0/violas/balance?addr=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            arr1: res.data.balances,
          },()=>{
            if (this.state.arr2.length == 0) {
            let arrs = this.state.arr1.concat(this.state.BTCArr);
            this.setState(
              {
                selData: arrs,
              },
              () => {
                  this.setState({
                    type: this.state.selData[0].show_name,
                    coinName: this.state.selData[0].name,
                    balance: this.state.selData[0].show_icon
                      .split("/")
                      [
                        this.state.selData[0].show_icon.split("/").length - 1
                      ].split(".")[0] == 'btc' ? this.getFloat(this.state.selData[0].balance / 1e8, 8) : this.getFloat(this.state.selData[0].balance / 1e6, 6),
                    opinionType: this.state.selData[0].show_icon
                      .split("/")
                      [
                        this.state.selData[0].show_icon.split("/").length - 1
                      ].split(".")[0],
                  });
              }
            );
          }
          });
        }
      });
    fetch(
      url +
        "/1.0/libra/balance?addr=" +
        window.sessionStorage.getItem("libra_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState(
            {
              arr2: res.data.balances,
            },
            () => {
              
              let arr = [],arrs = [];
              if (JSON.stringify(this.state.arr1)!="[]") {
                arr = this.state.arr1.concat(this.state.arr2);
                arrs = arr.concat(this.state.BTCArr);
              }else{
                arrs = this.state.arr2.concat(this.state.BTCArr);
              }
              
              this.setState(
                {
                  selData: arrs,
                },
                () => {
                 
                  this.setState({
                    type: this.state.selData[0].show_name,
                    coinName: this.state.selData[0].name,
                    balance: this.state.selData[0].show_icon
                      .split("/")
                      [
                        this.state.selData[0].show_icon.split("/").length - 1
                      ].split(".")[0] == 'btc' ? this.getFloat(this.state.selData[0].balance / 1e8, 8) : this.getFloat(this.state.selData[0].balance / 1e6, 6),
                    opinionType: this.state.selData[0].show_icon
                      .split("/")
                      [
                        this.state.selData[0].show_icon.split("/").length - 1
                      ].split(".")[0],
                  });
                }
              );
            }
          );
        } else {
          if (this.state.arr1) {
            let arrs = this.state.arr1.concat(this.state.BTCArr);
            this.setState(
              {
                selData: arrs,
              },
              () => {
               if (this.state.type == "") {
                  this.setState({
                    type: this.state.selData[0].show_name,
                    coinName: this.state.selData[0].name,
                    balance: this.state.selData[0].show_icon
                      .split("/")
                      [
                        this.state.selData[0].show_icon.split("/").length - 1
                      ].split(".")[0] == 'btc' ? this.getFloat(this.state.selData[0].balance / 1e8, 8) : this.getFloat(this.state.selData[0].balance / 1e6, 6),
                    opinionType: this.state.selData[0].show_icon
                      .split("/")
                      [
                        this.state.selData[0].show_icon.split("/").length - 1
                      ].split(".")[0],
                  });
                }
              }
            );
          }
        }
      });
  }
  getTypeShow = (event) => {
    this.stopPropagation(event);
    this.setState({
      showDealType: !this.state.showDealType,
    });
  };

  showTypes = (v, bal, name, ind, opinionType) => {
    this.setState(
      {
        type: v,
        balance: opinionType == 'btc' ? this.getFloat(bal / 1e8, 8) : this.getFloat(bal / 1e6, 6),
        showDealType: false,
        coinName: name,
        ind: ind,
        opinionType: opinionType,
      },
      () => {
        // this.getTypeBalance()
        this.getTypesBalance();
      }
    );
  };
  closeDialog = () => {
    this.setState({
      showDealType: false,
    });
  };

  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    return number;
  }
  //获取到输入地址
  getTransAddress = (e) => {
    this.setState(
      {
        address: e.target.value,
      },
      () => {
        if (this.state.address) {
          this.addressWarn();
        } else {
          this.setState({
            warning: "",
          });
        }
      }
    );
  };
  //获取到输入数量
  getTransAmount = (e) => {
    this.setState(
      {
        amount: e.target.value,
      },
      () => {
        this.amountWarn();
      }
    );
  };
  //输入警告
  addressWarn() {
    // console.log(this.state.opinionType)
    if (this.state.opinionType == "btc") {
      let valid = WAValidator.validate(
        this.state.address,
        "bitcoin",
        "testnet"
      );
      if (valid) {
        this.setState({
          warning: "",
        });
      } else {
        this.setState({
          warning: intl.get("address error"),
        });
      }
    } else {
      this.setState({
          warning: "",
        });
    }
  }
  amountWarn() {
    if (
      Number(this.state.amount) >
      Number(this.state.balance)
    ) {
      this.setState({
        warning: intl.get("Insufficient available balance"),
      });
    } else {
      this.setState({
        warning: "",
      });
    }
  }

  //获取violas的tyArgs,并转账
  async getTyArgs(_name) {
    let address = "00000000000000000000000000000001";
    let prefix = "07";
    let suffix = "00";
    let name_length = _name.length;
    if (name_length < 10) {
      name_length = "0" + name_length;
    }
    let _name_hex = bytes2StrHex(string2Byte(_name));
    let result =
      prefix +
      address +
      name_length +
      _name_hex +
      name_length +
      _name_hex +
      suffix;
    this.setState({ tyArgs: result }, () => {
      this.getViolasNext();
    });
  }
  //获取libra的tyArgs,并转账
  async getTyArgs1(temp) {
    let address = "00000000000000000000000000000001";
    let result = {
      module: temp,
      address: address,
      name: temp,
    };
    await this.setState({ tyArgs1: result }, () => {
      this.getLibraNext();
    });
  }
  //violas转账
  async violas_sendTransaction(chainId) {
    const tx = {
      from: window.sessionStorage.getItem("violas_address"),
      payload: {
        code: code_data.violas.p2p,
        tyArgs: [this.state.tyArgs],
        args: [
          {
            type: "Address",
            value: this.state.address,
          },
          {
            type: "U64",
            value: this.state.amount * 1e6,
          },
          {
            type: "Vector",
            value: "",
          },
          {
            type: "Vector",
            value: "",
          },
        ],
      },
      chainId: chainId,
    };
    console.log(tx, "violas");
    this.state.walletConnector
      .sendTransaction("violas", tx)
      .then((res) => {
        this.setState({
          warning: intl.get("Transfer success"),
          showWallet: false,
        });

        // console.log("send transaction ", res);
      })
      .catch((err) => {
        this.setState({
          warning: intl.get("Transfer failed"),
          showWallet: false,
        });

        // console.log("send transaction ", err);
      });
  }
  //libra转账
  async libra_sendTransaction(chainId) {
    const tx = {
      from: window.sessionStorage.getItem("libra_address"),
      payload: {
        code: code_data.libra.p2p,
        tyArgs: [this.state.tyArgs1],
        args: [
          {
            type: "Address",
            value: this.state.address,
          },
          {
            type: "U64",
            value: this.state.amount * 1e6,
          },
          {
            type: "Vector",
            value: "",
          },
          {
            type: "Vector",
            value: "",
          },
        ],
      },
      chainId: chainId,
    };
    console.log("libra ", tx);
    this.state.walletConnector
      .sendTransaction("_libra", tx)
      .then((res) => {
        // console.log("Libra transaction", res);
        this.setState({
          warning: intl.get("Transfer success"),
          showWallet: false,
        });
      })
      .catch((err) => {
        this.setState({
          warning: intl.get("Transfer failed"),
          showWallet: false,
        });

        // console.log("Libra transaction ", err);
      });
  }
  //btc转账
  async bitcoin_sendTransaction() {
    const tx = {
      from: this.state.BTCAddress,
      amount: this.state.amount * 1e8,
      changeAddress: this.state.BTCAddress,
      payeeAddress: this.state.address,
      // script: this.state.script
    };
    console.log("bitcoin ", tx);
    this.state.walletConnector
    .sendTransaction("_bitcoin", tx)
    .then((res) => {
      // console.log("Bitcoin transaction ", res);
      this.setState({
        warning: intl.get("Transfer success"),
        showWallet: false,
      });
    })
    .catch((err) => {
      // console.log("Bitcoin transaction ", err);
      this.setState({
        warning: intl.get("Transfer failed"),
        showWallet: false,
      });
    });
  }
  getViolasNext = () => {
    if (this.state.address == "") {
      this.setState({
        warning: intl.get("Please input address"),
      });
    } else if (this.state.amount == "") {
      this.setState({
        warning: intl.get("Please input amount"),
      });
    } else if (this.state.amount == "0") {
      this.setState({
        warning: intl.get("Please input amount"),
      });
    } else {
      if (
        Number(this.state.amount) >
        Number(this.state.balance)
      ) {
        this.setState({
          warning: intl.get("Insufficient available balance"),
        });
      } else {
        this.setState({
          warning: "",
          showWallet: true
        },()=>{
          this.violas_sendTransaction(sessionStorage.getItem("violas_chainId"));
        });
      }
    }
  };
  getLibraNext = () => {
    if (this.state.address == "") {
      this.setState({
        warning:  intl.get("Please input address"),
      });
    } else if (this.state.amount == "") {
      this.setState({
        warning: intl.get("Please input amount"),
      });
    } else {
      if (
        Number(this.state.amount) >
        Number(this.state.balance)
      ) {
        this.setState({
          warning: intl.get("Insufficient available balance"),
        });
      } else {
       
        this.setState({
          warning: "",
          showWallet: true
        },()=>{
           this.libra_sendTransaction(sessionStorage.getItem("libra_chainId"));
        });
      }
    }
  };
  getBTCNext = () => {
    console.log(this.state.amount,this.state.balance)
    if (this.state.address == "") {
      this.setState({
        warning: intl.get("Please input address"),
      });
    } else if (this.state.amount == "") {
      this.setState({
        warning:  intl.get("Please input amount"),
      });
    } else {
      if (
        Number(this.state.amount) >
        Number(this.state.balance)
      ) {
        this.setState({
          warning: intl.get("Insufficient available balance"),
        });
      } else {
        
        this.setState({
          warning: "",
          showWallet: true
        },()=>{
          this.bitcoin_sendTransaction();
        });
      }
    }
  };
  getDisplays = (val) => {
    this.setState({
      tranferDig: val,
    });
  };
  //转账时判断是哪个币种然后在发起转账
  opinionCurNextContent = () => {
    if (this.state.opinionType == "violas") {
      this.getTyArgs(this.state.coinName);
    } else if (this.state.opinionType == "libra") {
      this.getTyArgs1(this.state.coinName);
    } else {
      this.getBTCNext();
    }
  };
  getSearchList = (e) => {
    if (e.target.value) {
      let arr = this.state.selData.filter((v) => {
        if (v.show_name.indexOf(e.target.value.toUpperCase()) >= 0) {
          return v;
        }
      });
      this.setState({
        selData: arr,
      });
    } else {
      this.getTypesBalance();
    }
  };
  closeWallet = (val) => {
    this.setState({
      showWallet: val,
    });
  };
  render() {
    let {
      title,
      balance,
      warning,
      showDealType,
      type,
      selData,
      tranferDig,
      ind,
    } = this.state;
    // console.log(selData,'.....')
    return (
      <div className="transfer">
        <div className="transferContent">
          <i
            className="jt"
            onClick={() => {
              window.history.go(-1);
            }}
          >
            <img src="/img/编组 10@2x.png" />
          </i>
          <div className="transferList">
            <h4>
              {title}
              {intl.get("Transfer")}
            </h4>
            <div className="iptAddress">
              <textarea
                placeholder={intl.get("Input Receving Address")}
                onChange={(e) => this.getTransAddress(e)}
              ></textarea>
            </div>
            <div className="iptAmount">
              <input
                placeholder={intl.get("Input Amount")}
                onChange={(e) => this.getTransAmount(e)}
              />
              <div className="dropdown1">
                {showDealType ? (
                  <span
                    className="showClick"
                    onClick={(e) => this.getTypeShow(e)}
                  >
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
                        placeholder={intl.get("Search")}
                        onChange={(e) => this.getSearchList(e)}
                      />
                    </div>
                    <div className="searchWrap">
                    {selData.map((v, i) => {
                      return (
                        <div
                          className="searchList"
                          key={i}
                          onClick={() =>
                            v.show_name == "BTC"
                              ? this.showTypes(
                                  v.show_name,
                                  v.BTC,
                                  v.name,
                                  i,
                                  v.show_icon
                                    .split("/")
                                    [v.show_icon.split("/").length - 1].split(
                                      "."
                                    )[0]
                                )
                              : this.showTypes(
                                  v.show_name,
                                  v.balance,
                                  v.name,
                                  i,
                                  v.show_icon
                                    .split("/")
                                    [v.show_icon.split("/").length - 1].split(
                                      "."
                                    )[0]
                                )
                          }
                        >
                          <div className="searchEvery">
                            <img src={v.show_icon} />
                            <div className="searchEvery1">
                              <div>
                                <h4>{v.show_name}</h4>
                                <p>
                                  {intl.get("Balance")}：
                                  {v.show_icon
                                    .split("/")
                                    [v.show_icon.split("/").length - 1].split(
                                      "."
                                    )[0] == "btc"
                                    ? v.BTC == 0
                                      ? 0
                                      : this.getFloat(v.BTC / 1e8, 8)
                                    : v.balance == 0
                                    ? 0
                                    : this.getFloat(v.balance / 1e6, 6)}{" "}
                                  {v.show_name}
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
                  </div>
                ) : null}
              </div>
            </div>
            <div className="amountShow">
              <p>
                {intl.get("Balance")}{" "}
                <span>
                  {balance == 0 ? 0 : balance}
                </span>
              </p>
            </div>
            <div className="foot">
              {this.state.getAct == false ? (
                <p className="btn" onClick={() => this.opinionCurNextContent()}>
                  {intl.get("Transfer")}
                </p>
              ) : (
                <p
                  className="btn active"
                  onClick={() => this.opinionCurNextContent()}
                >
                  {intl.get("Transfer")}
                </p>
              )}
              <p
                className={
                  warning == intl.get("Transfer success")
                    ? "descr descrWarn"
                    : "descr descrRed"
                }
              >
                {warning}
              </p>
            </div>
          </div>
        </div>
        {tranferDig == true ? (
          <TransfarDialog
            getDisplays={this.getDisplays}
            coinName={this.state.coinName}
            address={this.state.address}
            amount={this.state.amount}
          ></TransfarDialog>
        ) : null}
        {/*  */}
        {this.state.showWallet ? (
          <WalletconnectDialog getCloseWallet={this.closeWallet}></WalletconnectDialog>
        ) : null}
      </div>
    );
  }
}
let mapStateToProps = (state) =>{
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
     getDisplay1:(params)=>{
        dispatch({
            type:'DISPLAY1',
            params:{
                type:true,
                address:params.address,
                amount:Number(params.amount)
            }
        })
     },
     showPolling: () => {
      dispatch({
        type: "DISPLAY",
        payload: false,
      });
    },
    // showDetails: () => {
    //   dispatch({
    //     type: "DISPLAY1",
    //     payload: false,
    //   });
    // },
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Transfer);