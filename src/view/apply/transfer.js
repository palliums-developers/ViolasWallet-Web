import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios'
import WalletConnect from "../../packages/browser/src/index";
// import {withRouter} from 'react-router-dom'
let url2 = "http://52.27.228.84:4000"
let url1 = "https://tbtc1.trezor.io"
let url = "https://api.violas.io"
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
      types: [],
      type: "",
      gasCurrencyCode: 'LBR',
      showDealType: false,
      bridge: "https://bridge.walletconnect.org",
      walletConnector: {},
      getTypeBalance1:0,
      getTypeBalance2:0
    };
  }
  componentWillMount() {
    if (this.props.display) {
      this.props.showPolling();
    }
    if (this.props.display1) {
      this.props.showDetails();
    }
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  componentDidMount() {
    document.addEventListener("click", this.closeDialog);
    fetch(url2 + "/1.0/violas/currency/published?addr=7f4644ae2b51b65bd3c9d414aa853407").then(res => res.json())
      .then(res => {
        console.log(res.data.published)
        this.setState({
          types: res.data.published,
          type: res.data.published[0]
        },()=>{
            this.getTypesBalance()
        })
      })
    this.getTypeBalance()
  }
  getTypesBalance(){
    fetch(url2 + "/1.0/violas/balance?addr=7f4644ae2b51b65bd3c9d414aa853407").then(res => res.json())
    .then(res => {
      console.log(res.data.balances)
      for (let i = 0; i < res.data.balances.length;i++){
        if (this.state.type == res.data.balances[i].name){
          this.setState({
            balance: this.getFloat(res.data.balances[i].balance / 1e6, 6)
          });
         }
      }
      
    })
    // fetch(url2 + "/1.0/libra/balance?addr=7f4644ae2b51b65bd3c9d414aa853407").then(res => res.json())
    //   .then(res => {
    //     for (let i = 0; i < res.data.balances.length; i++) {
    //       if (this.state.type == res.data.balances[i].name) {
    //         this.setState({
    //           balance: this.state.balance+this.getFloat(res.data.balances[i].balance / 1e6, 6)
    //         });
    //       }
    //     }
    //   })
  }
  getTypeShow = (event) => {
    this.stopPropagation(event);
    this.setState({
      showDealType: !this.state.showDealType,
    });
  };

  showTypes = (v) => {
    this.setState({
      type: v,
      showDealType: false,
    },()=>{
        this.getTypeBalance()
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
  
  getTypeBalance = () => {
    let {type} = this.state;
    let wallet_info = JSON.parse(window.localStorage.getItem("wallet_info"));
    for(let i =0;i< wallet_info.length;i++){
      if (wallet_info[i].coinType == 'violas' && wallet_info[i].coinType == type.toLowerCase()) {
        fetch(
          url +
          "/explorer/violas/address/7f4644ae2b51b65bd3c9d414aa853407"
          // window.sessionStorage.getItem("wallet_info")[1].address
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              balance: this.getFloat(res.data.status.balance / 1e6,6)
            });
          });
      } else if (wallet_info[i].coinType == 'libra' && wallet_info[i].coinType == type.toLowerCase()){
        fetch(
          url +
          "/explorer/libra/address/7f4644ae2b51b65bd3c9d414aa853407" 
          // window.sessionStorage.getItem("wallet_info")[1].address
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              balance: this.getFloat(res.data.status.balance / 1e6, 6)
            });
          });
      } else if (wallet_info[i].coinType == 'bitcoin' && wallet_info[i].coinType == type.toLowerCase()) {
        fetch(url1 + "/api/address/tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee")
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              balance: this.getFloat(Number(res.balance), 8),
            });
          });
      }
    }
    
  };
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
          if (this.state.title == "Violas") {
            if (this.state.address.length != 32) {
              this.setState({
                warning: "address error",
              });
            } else {
              this.setState({
                warning: "",
              });
            }
          } else if (this.state.title == "Libra") {
            if (this.state.address.length != 32) {
              this.setState({
                warning: "address error",
              });
            } else {
              this.setState({
                warning: "",
              });
            }
          } else if (this.state.title == "Bitcoin") {
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
          }
        } else {
          this.setState({
            warning: "",
          });
        }
      }
    );
  };
  getTransAmount = (e) => {
    this.setState(
      {
        amount: e.target.value,
      },
      () => {
        if (Number(this.state.amount) > Number(this.state.balance)) {
          this.setState({
            warning: "Insufficient available balance",
          });
        } else {
          this.setState({
            warning: "",
          });
        }
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
    console.log(_name)
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
      const tx = {
        from:window.localStorage.getItem('address'),
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
              value: Number(this.state.amount),
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
          gasCurrencyCode: this.state.gasCurrencyCode,
        }
      };
      console.log(JSON.stringify(tx))
      this.state.walletConnector
        .sendTransaction(tx)
        .then((res) => {
          console.log('111')
          console.log("send transaction ", res);
        })
        .catch((err) => {
          console.log("send transaction ", err);
        });
    }
    if (this.state.warning == "") {
    }
  };
  render() {
    let { title, balance, warning, showDealType, types, type } = this.state;
    // console.log(type)
    return (
      <div className="transfer">
        {/* <div className="back" onClick={()=>{
                window.history.go(-1);
                // this.props.getType(this.props.match.params.type)
                
            }}><i><img src="/img/xiala@2x.png"/></i><label>Violas</label></div> */}
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
                    {types.map((v, i) => {
                      return (
                        <span
                          key={i}
                          className={v == type ? "active" : null}
                          onClick={() => this.showTypes(v)}
                        >
                          {v}
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
                  {balance}
                  {title == "Violas"
                    ? "vtoken"
                    : title == "Libra"
                    ? "libra"
                    : title == "Bitcoin"
                    ? "BTC"
                    : null}
                </span>
              </p>
            </div>
            <div className="foot">
              {this.state.getAct == false ? (
                <p className="btn" onClick={() => this.getTyArgs(this.state.type)}>
                  Next
                </p>
              ) : (
                  <p className="btn active" onClick={() => this.getTyArgs(this.state.type)}>
                  Next
                </p>
              )}
              <p className="descr">{warning}</p>
            </div>
          </div>
        </div>
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
    showDetails: () => {
      dispatch({
        type: "DISPLAY1",
        payload: false,
      });
    },
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Transfer);