import React, { Component } from "react";
import { connect } from 'react-redux';
import code_data from '../../utils/code.json';
import WalletConnect from "../../packages/browser/src/index";
import TransfarDialog from './transfarDialog.js'
import { bytes2StrHex, string2Byte } from '../../utils/trans'
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
      bridge: 'https://walletconnect.violas.io',
      tyArgs: '',
      tyArgs1:'',
      balance: 0,
      title: "",
      warning: "",
      getAct: false,
      address: "",
      amount: "",
      type: "",
      gasCurrencyCode: 'LBR',
      showDealType: false,
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
      tranferDig:false,
      ind:0,
      opinionType:'',
      BTCArr:[]
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
      walletConnector: new WalletConnect({ bridge: this.state.bridge })
    });
  }
  componentDidMount() {
    document.addEventListener("click", this.closeDialog);
    if (JSON.parse(window.localStorage.getItem("wallet_info"))){
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
    

  }
  //获取到每个币种及余额
  getTypesBalance(){
    fetch(url1 + "/1.0/btc/balance?address=" + this.state.BTCAddress).then(res => res.json())
      .then(res => {
        if(res.data){
          this.setState({
            BTCArr: res.data
          })
        }
      })
    fetch(url + "/1.0/violas/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
      .then(res => {
        if (res.data) {
          this.setState({
            arr1: res.data.balances
          })
        }
      })
    fetch(url + "/1.0/libra/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
      .then(res => {
        if (res.data) {
          this.setState({
            arr2: res.data.balances
          }, () => {
            let arr = this.state.arr1.concat(this.state.arr2)
            let arrs = arr.concat(this.state.BTCArr)
            this.setState({
              selData: arrs
            }, () => {
              if (this.state.type == "") {
                this.setState({
                  type: this.state.selData[0].show_name,
                  coinName: this.state.selData[0].name,
                  balance: this.state.selData[0].balance,
                  opinionType: this.state.selData[0].show_icon.split('/')[this.state.selData[0].show_icon.split('/').length - 1]
                })
              }
            })
          })
        } else {
          if (this.state.arr2) {
            let arrs = this.state.arr2.concat(this.state.BTCArr)
            this.setState({
              selData: arrs
            }, () => {
              if (this.state.type == "") {
                this.setState({
                  type: this.state.selData[0].show_name,
                  coinName: this.state.selData[0].name,
                  balance: this.state.selData[0].balance,
                  opinionType: this.state.selData[0].show_icon.split('/')[this.state.selData[0].show_icon.split('/').length - 1]
                })
              }
            })
          }

        }

      })
  }
  getTypeShow = (event) => {
    this.stopPropagation(event);
    this.setState({
      showDealType: !this.state.showDealType,
    });
  };

  showTypes = (v,bal,name,ind,opinionType) => {
    console.log(opinionType,'...opinionType')
    this.setState({
      type: v,
      balance:bal,
      showDealType: false,
      coinName:name,
      ind:ind,
      opinionType: opinionType
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
          this.addressWarn()
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
        this.amountWarn()
      }
    );
  };
  //输入警告
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

  //获取violas的tyArgs,并转账
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
      this.getViolasNext()
    });
  }
  //获取libra的tyArgs,并转账
  async getTyArgs1(temp) {
    let address = '00000000000000000000000000000001';
    let result = {
      'module': temp,
      'address': address,
      'name': temp
    }
    await this.setState({ tyArgs1: result }, () => {
      this.getLibraNext()
    });
  }
  //violas转账
  async violas_sendTransaction(chainId){
    const tx = {
      from: window.localStorage.getItem('address'),
      payload: {
        code: code_data.violas_p2p,
        tyArgs: [this.state.tyArgs],
        args: [
          {
            type: 'Address',
            value: this.state.address
          },
          {
            type: 'U64',
            value: this.state.amount * 1e6
          },
          {
            type: 'Vector',
            value: ''
          },
          {
            type: 'Vector',
            value: ''
          }
        ],
        chainId: chainId
        // gasCurrencyCode: this.state.gasCurrencyCode,
      }
    };
    console.log(JSON.stringify(tx))
    this.state.walletConnector
      .sendTransaction('violas',tx)
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
  //libra转账
  async libra_sendTransaction(chainId) {
    const tx = {
      from: window.localStorage.getItem('address'),
      payload: {
        code: code_data.libra_p2p,
        tyArgs: [
          this.state.tyArgs1
        ],
        args: [
          {
            type: 'Address',
            value: this.state.address,
          },
          {
            type: 'U64',
            value: this.state.amount * 1e6
          },
          {
            type: 'Vector',
            value: '',
          },
          {
            type: 'Vector',
            value: '',
          }
        ]
      },
      chainId: chainId,
    }
    console.log('libra ', tx);
    this.state.walletConnector.sendTransaction('_libra', tx).then(res => {
      console.log('Libra transaction', res);
    }).catch(err => {
      console.log('Libra transaction ', err);
    });
  }
  //btc转账
  async bitcoin_sendTransaction() {
    const tx = {
      from: this.state.BTCAddress,
      amount: this.state.amount,
      changeAddress: this.state.BTCAddress,
      payeeAddress: this.state.address,
      // script: this.state.script
    }
    console.log('bitcoin ', tx);
    this.state.walletConnector.sendTransaction('_bitcoin', tx).then(res => {
      console.log('Bitcoin transaction ', res);
    }).catch(err => {
      console.log('Bitcoin transaction ', err);
    });
  }
  getViolasNext = () => {
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
        this.violas_sendTransaction(1)
        this.setState({
            warning: "",
          });
        }
    }
  }
  getLibraNext = () => {
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
        this.libra_sendTransaction(1)
        this.setState({
          warning: "",
        });
      }
    }
  }
  getBTCNext = () => {
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
        this.bitcoin_sendTransaction()
        this.setState({
          warning: "",
        });
      }
    }
  }
  getDisplays = (val) =>{
    this.setState({
      tranferDig:val
    })
  }
  //转账时判断是哪个币种然后在发起转账
  opinionCurNextContent = ()=>{
    // console.log(this.state.opinionType,'/.........')
    if (this.state.opinionType.indexOf('violas') == 0){
      this.getTyArgs(this.state.coinName)
    } else if (this.state.opinionType.indexOf('libra') == 0){
      this.getTyArgs1(this.state.coinName)
    }else{
      this.bitcoin_sendTransaction()
    }
  }
  render() {
    let { title, balance, warning, showDealType, type, selData, tranferDig } = this.state;
    // console.log(selData, tranferDig,this.state.coinName , this.state.address )
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
                          className={i == this.state.ind ? "active" : null}
                          onClick={() => {
                            v.show_name == 'BTC' ? this.showTypes(v.show_name, v.BTC, v.name, i, v.show_icon.split('/')[v.show_icon.split('/').length - 1]) : this.showTypes(v.show_name, v.balance, v.name, i, v.show_icon.split('/')[v.show_icon.split('/').length - 1])
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
                <p className="btn" onClick={() => this.opinionCurNextContent() }>
                  Next
                </p>
              ) : (
                  <p className="btn active" onClick={() => this.opinionCurNextContent()}>
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