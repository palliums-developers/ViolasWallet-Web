import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios'
import WalletConnect from "../../packages/browser/src/index";
import TransfarDialog from './transfarDialog.js'
// import {withRouter} from 'react-router-dom'
let url = "https://api.violas.io"
let url1 = "https://tbtc1.trezor.io"
// let url = "https://api.violas.io"
let WAValidator = require('wallet-address-validator');

class Transfer extends Component {
  constructor(props) {
    super();
    this.state = {
      bridge: 'https://bridge.walletconnect.org',
      code:'a11ceb0b01000701000202020403061004160205181d07356f08a4011000000001010000020001000003020301010004010300010501060c0108000506080005030a020a020005060c05030a020a020109000c4c696272614163636f756e741257697468647261774361706162696c6974791b657874726163745f77697468647261775f6361706162696c697479167061795f66726f6d5f776974685f6d657461646174611b726573746f72655f77697468647261775f6361706162696c69747900000000000000000000000000000001010104010c0b0011000c050e050a010a020b030b0438000b05110202',
      tyArgs: '',
      balance: 0,
      title: "",
      warning: "",
      getAct: false,
      address: "",
      amount: "",
      type: "",
      gasCurrencyCode: 'LBR',
      showDealType: false,
      bridge: "https://bridge.walletconnect.org",
      walletConnector: {},
      getTypeBalance1:0,
      getTypeBalance2:0,
      arr1:[],
      arr2:[],
      selData:[],
      addCurrencyList:[],
      BTCAddress: '',
      warning1:'',
      coinName:'',
      tranferDig:false
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
  componentDidMount() {
    document.addEventListener("click", this.closeDialog);
    
    this.setState({
      addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
    }, () => {
      this.state.addCurrencyList.map((v, i) => {
        if (v.coinType == 'bitcoin') {
          this.setState({
            BTCAddress: v.address
          }, () => {
              this.getTypesBalance()
          })
        }
      })
    });

  }
  getTypesBalance(){
    fetch(url + "/1.0/btc/balance?address=" + this.state.BTCAddress).then(res => res.json())
      .then(res => {
        this.setState({
         BTCArr: res.data
        },()=>{
            fetch(url + "/1.0/violas/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
              .then(res => {
                this.setState({
                  arr1: res.data.balances
                }, () => {
                    this.state.arr1.map((v, i) => {
                      if (v.show_name == 'LBR') {
                        v.show_name = 'VLS'
                      }
                    })
                  if (this.state.type == "") {
                    this.setState({
                      type: res.data.balances[0].show_name,
                      coinName: res.data.balances[0].name,
                      balance: res.data.balances[0].balance
                    })
                  }
                })
              })
            fetch(url + "/1.0/libra/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
              .then(res => {
                this.setState({
                  arr2: res.data.balances
                }, () => {
                  let arr = this.state.arr1.concat(this.state.arr2)
                  let arrs = arr.concat(this.state.BTCArr)
                  console.log(arrs)
                  this.setState({
                    selData: arrs
                  })
                })
        })
        
      })
      })
  }
  getTypeShow = (event) => {
    this.stopPropagation(event);
    this.setState({
      showDealType: !this.state.showDealType,
    });
  };

  showTypes = (v,bal,name) => {
    this.setState({
      type: v,
      balance:bal,
      showDealType: false,
      coinName:name
    },()=>{
        // this.getTypeBalance()
        this.getTypesBalance()
    });
  };
  closeDialog = () => {
    this.setState({
      showDealType: false,
    });
  };
  stopPropagation(e) {
    e.nativeEvent.stopImmediatePropagation();
  }
  
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = Number(number).toFixed(n); //补足位数
    return number;
  }
  getTransAddress = (e) => {
    this.setState(
      {
        address: e.target.value,
      },
      () => {
        if (this.state.address) {
          this.addressWarn()
        } else {
          this.setState({
            warning: "",
          });
        }
      }
    );
  };
  addressWarn(){
    if (this.state.type == "BTC") {
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
          warning: "address error",
        });
      }

    } else {
      if (this.state.address.length != 32) {
        this.setState({
          warning: "address error",
        });
      } else {
        this.setState({
          warning: "",
        });
      }
    }
  }
  amountWarn(){
    if (Number(this.state.amount) > Number(this.getFloat(this.state.balance / 1e6, 6))) {
      this.setState({
        warning: "Insufficient available balance",
      });
    } else {
      this.setState({
        warning: "",
      });
    }
  }
  getTransAmount = (e) => {
    this.setState(
      {
        amount: e.target.value,
      },
      () => {
       this.amountWarn()
      }
    );
  };
  string2Byte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;
  }
  bytes2StrHex(arrBytes) {
    var str = "";
    for (var i = 0; i < arrBytes.length; i++) {
      var tmp;
      var num = arrBytes[i];
      if (num < 0) {
        //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
        tmp = (255 + num + 1).toString(16);
      } else {
        tmp = num.toString(16);
      }
      if (tmp.length == 1) {
        tmp = "0" + tmp;
      }
      if (i > 0) {
        str += tmp;
      } else {
        str += tmp;
      }
    }
    return str;
  }
  async getTyArgs(_name) {
    // console.log(_name)
    let address = '00000000000000000000000000000001';
    let prefix = '07';
    let suffix = '00';
    let name_length = _name.length;
    if (name_length < 10) {
      name_length = '0' + name_length;
    }
    let _name_hex = this.bytes2StrHex(this.string2Byte(_name));
    let result = prefix + address + name_length + _name_hex + name_length + _name_hex + suffix;
    // console.log(_name_hex);
    // console.log(result);
    this.setState({ tyArgs: result },()=>{
      this.getNext()
    });
  }
  getNext = () => {
    if (this.state.address == "") {
      this.setState({
        warning: "Please input address",
      });
      // alert('Please input address')
    } else if (this.state.amount == "") {
      this.setState({
        warning: "Please input amount",
      });
      // alert('Please input amount')
    } else {
      if (Number(this.state.amount) > Number(this.getFloat(this.state.balance / 1e6, 6))) {
        this.setState({
          warning: "Insufficient available balance",
        });
      } else {
        this.setState({
            warning: "",
          });
        // console.log(this.state.type,this.state.coinName)
        if (this.state.type == 'VLS' || this.state.type === 'LBR' || this.state.type === 'BTC'){
          if (this.state.type == 'VLS'){
            // console.log('wallet connect')
            const tx = {
              from: window.localStorage.getItem('address'),
              payload: {
                code: this.state.code,
                tyArgs: [this.state.tyArgs],
                args: [
                  {
                    type: "Address",
                    value: this.state.address,
                  },
                  {
                    type: "Number",
                    value: "" + (this.state.amount * 1e6)
                  },
                  {
                    type: "Bytes",
                    value: "",
                  },
                  {
                    type: 'Bytes',
                    value: ""
                  },
                ],
                // gasCurrencyCode: this.state.gasCurrencyCode,
              }
            };
            console.log(JSON.stringify(tx))
            this.state.walletConnector
              .sendTransaction(tx)
              .then((res) => {
                this.setState({
                  warning: "Transfer success",
                });
                // alert('Transfer success！！！！')
                console.log("send transaction ", res);
              })
              .catch((err) => {
                this.setState({
                  warning: "Transfer failed",
                });
                console.log("send transaction ", err);
              });
          }else{
            if (this.state.coinName.indexOf('VLS') == 0) {
              // console.log('wallet connect')
              const tx = {
                from: window.localStorage.getItem('address'),
                payload: {
                  code: this.state.code,
                  tyArgs: [this.state.tyArgs],
                  args: [
                    {
                      type: "Address",
                      value: this.state.address,
                    },
                    {
                      type: "Number",
                      value: "" + (this.state.amount * 1e6)
                    },
                    {
                      type: "Bytes",
                      value: "",
                    },
                    {
                      type: 'Bytes',
                      value: ""
                    },
                  ],
                  // gasCurrencyCode: this.state.gasCurrencyCode,
                }
              };
              console.log(JSON.stringify(tx))
              this.state.walletConnector
                .sendTransaction(tx)
                .then((res) => {
                  this.setState({
                    warning: "Transfer success",
                  });
                  // alert('Transfer success！！！！')
                  console.log("send transaction ", res);
                })
                .catch((err) => {
                  this.setState({
                    warning: "Transfer failed",
                  });
                  console.log("send transaction ", err);
                });
            } else if (this.state.coinName == 'BTC'){
                this.setState({
                  tranferDig:true
                })
            }else{
              this.setState({
                tranferDig: true
              })
            }
          }
        }else{
          if (this.state.coinName === 'coni1' || this.state.coinName === 'coin2') {
            this.setState({
              tranferDig: true
            })
          }else{
            const tx = {
              from: window.localStorage.getItem('address'),
              payload: {
                code: this.state.code,
                tyArgs: [this.state.tyArgs],
                args: [
                  {
                    type: "Address",
                    value: this.state.address,
                  },
                  {
                    type: "Number",
                    value: "" + (this.state.amount * 1e6)
                  },
                  {
                    type: "Bytes",
                    value: "",
                  },
                  {
                    type: 'Bytes',
                    value: ""
                  },
                ],
                // gasCurrencyCode: this.state.gasCurrencyCode,
              }
            };
            console.log(JSON.stringify(tx))
            this.state.walletConnector
              .sendTransaction(tx)
              .then((res) => {
                this.setState({
                  warning: "Transfer success",
                });
                // alert('Transfer success！！！！')
                console.log("send transaction ", res);
              })
              .catch((err) => {
                this.setState({
                  warning: "Transfer failed",
                });
                console.log("send transaction ", err);
              });
          }
          }
        }
    }
    }
  getDisplays = (val) =>{
    this.setState({
      tranferDig:val
    })
  }
  render() {
    let { title, balance, warning, showDealType, type, selData, tranferDig } = this.state;
    // console.log(selData, tranferDig,this.state.coinName , this.state.address )
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
            <h4>{title}Transfer</h4>
            <div className="iptAddress">
              <textarea
                placeholder={"Please input your " + title + " address"}
                onChange={(e) => this.getTransAddress(e)}
              ></textarea>
            </div>
            <div className="iptAmount">
              <input
                placeholder="Please input amount"
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
                      <img src="/img/路径备份 6@2x.png" />
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
                    {selData.map((v, i) => {
                      return (
                        <span
                          key={i}
                          className={v.show_name == type ? "active" : null}
                          onClick={() => {
                            v.show_name == 'BTC' ? this.showTypes(v.show_name, v.BTC, v.name) : this.showTypes(v.show_name, v.balance,v.name)
                          }}
                        >
                          {v.show_name}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="amountShow">
              <p>
                Balance{" "}
                <span>
                  {balance == 0 ? 0 : this.getFloat(balance/1e6,6)}
                </span>
              </p>
            </div>
            <div className="foot">
              {this.state.getAct == false ? (
                <p className="btn" onClick={() => this.getTyArgs(this.state.coinName)}>
                  Next
                </p>
              ) : (
                  <p className="btn active" onClick={() => this.getTyArgs(this.state.coinName)}>
                  Next
                </p>
              )}
              <p className={warning == "Transfer success" ? "descr descrWarn" : "descr descrRed"}>{warning}</p>
            </div>
          </div>
        </div>
        {
          tranferDig == true ? <TransfarDialog getDisplays={this.getDisplays} coinName={this.state.coinName} address={this.state.address} amount={this.state.amount}></TransfarDialog> : null
        }
        {/*  */}
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