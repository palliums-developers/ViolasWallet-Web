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
      balance: 0,
      title: "",
      warning: "",
      getAct: false,
      address: "",
      amount: "",
      types: [],
      type: "",
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
        console.log('111')
      const tx = {
        from:window.localStorage.getItem('address'),
        payload: {
          code:
            "a11ceb0b010007014600000004000000034a0000000c000000045600000002000000055800000009000000076100000029000000068a00000010000000099a0000001200000000000001010200010101000300010101000203050a020300010900063c53454c463e0c4c696272614163636f756e740f7061795f66726f6d5f73656e646572046d61696e00000000000000000000000000000000010000ffff030005000a000b010a023e0002",
          tyArgs: ["0600000000000000000000000000000000034c4252015400"],
          args: [
            {
              type: "Address",
              value: this.state.address,
            },
            {
              type: "Bytes",
              value: "",
            },
            {
              type: "Number",
              value: this.state.amount,
            },
          ],
        }
      };
      console.log(tx)
      this.state.walletConnector
        .sendTransaction(tx)
        .then((res) => {
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
                <p className="btn" onClick={() => this.getNext()}>
                  Next
                </p>
              ) : (
                <p className="btn active" onClick={() => this.getNext()}>
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