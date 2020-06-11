import React, { Component } from "react";
import "./app.scss";
import { localeLowerCase } from "lower-case";
import { connect } from 'react-redux'
import RouterView from '../router/routerView'
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";
import AddCurrency from "./components/addCurrency";
import CurrencyDetail from "./components/currencyDetail";
import Details from "./components/details";
import WalletConnect from "../packages/browser/src/index";
let url = "https://api.violas.io";
// let url1 = "http://52.27.228.84:4000"
let url1 = "https://tbtc1.trezor.io"

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      bridge: "https://bridge.walletconnect.org",
      walletConnector: {},
      active: "",
      showMineDialog: false,
      addCurrencyList: [],
      addCurrencyList1: [],
      balance1: 0,
      balance2: 0,
      balance3: 0,
      coinsBalance: 0,
    };
  }
  getActive = (ind, val) => {};
  getMineDialog = (event) => {
    // this.stopPropagation(event)
    this.setState({
      showMineDialog: !this.state.showMineDialog,
    });
  };
  async componentWillMount() {
    await this.getNewWalletConnect();
  }
  componentDidMount() {
    // document.addEventListener('click', this.closeDialog);
    this.setState({
      active: this.props.location.pathname.split("/")[3],
      addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
    },async () => {
      await this.getBalance()
      
    });
     this.state.walletConnector.on("disconnect", (error, payload) => {
       if (error) {
         throw error;
       }
       console.log("wallet disconnected");
     });
    // console.log(this.props.location.pathname.split("/"))
    // console.log(this.props.location.pathname.split("/")[3])
  }

  getBalance = () => {
    let { addCurrencyList, addCurrencyList1 } = this.state;
    fetch(url + "/explorer/violas/address/7f4644ae2b51b65bd3c9d414aa853407").then(res => res.json())
      .then(res => { 
        
        this.setState({
          balance1: Number(this.getFloat(res.data.status.balance / 1e6, 6)),
          addCurrencyList1: res.data.status.module_balande
        }, () => {
           
          let amount = 0;
          for (let i = 0; i < this.state.addCurrencyList1.length; i++) {
            amount += Number(this.getFloat(this.state.addCurrencyList1[i].balance / 1e6, 6))
          }
           
          this.setState({
            coinsBalance: amount
          })
        })
      })

    fetch(url + "/explorer/libra/address/7f4644ae2b51b65bd3c9d414aa853407").then(res => res.json())
      .then(res => {
        this.setState({
          balance2: Number(this.getFloat(res.data.status.balance / 1e6, 6))
        })

      })
    fetch(url1 + "/api/address/tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          balance3: Number(this.getFloat(res.balance, 8))
        },()=>{
            let balancesData = {
              addCurrencyList1: this.state.addCurrencyList1,
              balance1: this.state.balance1,
              balance2: this.state.balance2,
              balance3: this.state.balance3
            }
            window.sessionStorage.setItem('balances', JSON.stringify(balancesData))
        })
      });
    
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
  // stopPropagation(e) {
  //   e.nativeEvent.stopImmediatePropagation();
  // }
  // closeDialog = () => {
  //   this.setState({
  //     showMineDialog: false
  //   })
  // }
  onClose = () => {
    this.props.showPolling();
    this.props.showDetails();
  };
  
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  async logout() {
    await this.state.walletConnector.killSession();
    await this.getNewWalletConnect();
    this.props.history.push('/app')
    
  }
  
  render() {
    let { routes } = this.props;
    let { active, showMineDialog, coinsBalance,balance3,balance2,balance1 } = this.state;
    return (
      <div className="home">
        <div onClick={()=>this.logout()}>log out</div>
        <div className="header">
          <div
            className="logo"
            onClick={() => {
              this.props.history.push("/homepage/home");
            }}
          >
            <img src="/img/logo.png" />
          </div>
          <div className="navlist">
            {
              <div className="route">
                <span
                  onClick={() => {
                    this.props.history.push("/homepage/home/homeContent");
                    this.props.showDetails()
                    this.props.showPolling()
                  }}
                  className={
                    active == "homeContent"
                      ? "active"
                      : active == "transfer"
                      ? "active"
                      : active == "getMoney"
                      ? "active"
                      : null
                  }
                >
                  <i
                    className={
                      active == "homeContent"
                        ? "wal"
                        : active == "transfer"
                        ? "wal"
                        : active == "getMoney"
                        ? "wal"
                        : "noWal"
                    }
                  ></i>
                  <label>Wallet</label>
                </span>
                <span
                  onClick={() => {
                    this.props.history.push("/homepage/home/changeContent");
                    this.props.showDetails()
                    this.props.showPolling()
                  }}
                  className={active == "changeContent" ? "active" : null}
                >
                  <i
                    className={active == "changeContent" ? "mar" : "noMar"}
                  ></i>
                  <label>Market</label>
                </span>
              </div>
            }
            <div className="mine">
              {showMineDialog ? (
                <img
                  onClick={(e) => this.getMineDialog(e)}
                  src="/img/wode备份 3@2x.png"
                />
              ) : (
                <img
                  onClick={(e) => this.getMineDialog(e)}
                  src="/img/wode备份 2@2x.png"
                />
              )}
              {showMineDialog ? (
                <div className="mineList">
                  <div className="balanceList">
                    <div
                      className="balance"
                      onClick={() => {
                        this.props.history.push("/homepage/home");
                      }}
                    >
                      <label>总资产之和($)</label>
                      <span>{this.getFloat(coinsBalance + balance1 + balance2 + balance3, 6)}</span>
                    </div>
                    <div className="icon">
                      <img src="/img/Combined Shape 2@2x.png" />
                    </div>
                  </div>
                  <div className="btns">
                    <dl onClick={() => {
                      this.props.history.push({
                        pathname: '/homepage/home/transfer'
                      })
                      this.props.showDetails()
                      this.props.showPolling()
                    }} className={active == 'transfer'?'act':null}>
                      <dt>
                        <img src="/img/编组 13备份 4@2x.png" />
                      </dt>
                      <dd>Transfer</dd>
                    </dl>
                    <dl onClick={() => {
                      this.props.history.push({
                        pathname: '/homepage/home/getMoney'
                      })
                      this.props.showDetails()
                      this.props.showPolling()
                    }} className={active == 'getMoney' ? 'act' : null}>
                      <dt>
                        <img src="/img/编组 13备份 5@2x.png" />
                      </dt>
                      <dd>Receive</dd>
                    </dl>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <RouterView routes={routes}></RouterView>
        {/* 添加币种 */}
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.props.display}
          mask={false}
        >
          <AddCurrency></AddCurrency>
        </Drawer>
        {/* 币种详情 */}
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.props.display1}
          mask={false}
        >
          <CurrencyDetail></CurrencyDetail>
        </Drawer>
        {/* 详情 */}
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.props.display2}
          mask={false}
        >
          <Details></Details>
        </Drawer>
      </div>
    );
  }
}
let mapStateToProps = (state) =>{
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
 
    getTypes: (type) => {
      dispatch({
        type: "t_type",
        params: type.types,
      });
    },
    getTypes1: (type) => {
      dispatch({
        type: "t_types",
        params: type.types1,
      });
    },
    showDetails: () => {
      dispatch({
        type: "DISPLAY1",
        payload: false,
      });
    },
    showPolling: () => {
      dispatch({
        type: "DISPLAY",
        payload: false,
      });
    },
    showEveryDetail: () => {
      dispatch({
        type: "DISPLAY2",
        payload: false,
      });
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);