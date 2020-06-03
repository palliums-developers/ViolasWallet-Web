import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios'
import WalletConnect from "../../packages/browser/src/index";
// import {withRouter} from 'react-router-dom'
let url = "http://52.27.228.84:4000"
let url1 = "https://tbtc1.trezor.io"
let url2 = "https://api.violas.io"
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
      types: ["Violas", "Libra", "Bitcoin"],
      type: "Violas",
      showDealType: false,
      bridge: "https://bridge.walletconnect.org",
      walletConnector: {},
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
   
    // if (this.props.location.pathname.split("/")[5]) {
    //   let type = this.props.location.pathname.split("/")[5];
    //   this.setState(
    //     {
    //       title: type.replace(type[0], type[0].toUpperCase()),
    //     },
    //     () => {
    //       if (this.state.title.toLowerCase() == "violas") {
    //         this.getBalance();
    //       } else if (this.state.title.toLowerCase() == "libra") {
    //         this.getLibraBalance();
    //       } else if (this.state.title.toLowerCase() == "bitcoin") {
    //         this.getBTCBalance();
    //       }
    //     }
    //   );
    // }
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

  getLibraBalance = () => {
    if (window.sessionStorage.getItem("address")) {
      fetch(
        url +
          "/explorer/libra/address/" +
          window.sessionStorage.getItem("address")
      )
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            balance: res.data.status.balance / 1e6,
          });
        });
    }
  };
  getBTCBalance = () => {
    console.log(window.sessionStorage.getItem("address"));
    if (window.sessionStorage.getItem("address")) {
      fetch(url1 + "/api/address/" + window.sessionStorage.getItem("address"))
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            balance: Number(res.balance),
          });
        });
    }
  };
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