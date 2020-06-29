import React, { Component } from "react";
import "./app.scss";
import { connect } from 'react-redux'
import RouterView from '../router/routerView'
import { Drawer } from "antd";
import AddCurrency from "./components/addCurrency";
import CurrencyDetail from "./components/currencyDetail";
import Details from "./components/details";
import ExchangeDialog from './market/exchangeDialog'
import ExchangeDetail from './market/exchangeDetail'
import MyPoolDialog from './market/myPoolDialog'
import PoolingDetail from './market/poolingDetail'
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
      showMineDialog: false
    };
  }
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
      active: this.props.location.pathname.split("/")[3]
    });
     this.state.walletConnector.on("disconnect", (error, payload) => {
       if (error) {
         throw error;
       }
       console.log("wallet disconnected");
     });

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
    window.localStorage.clear()
    this.props.history.push('/app')
    
  }
  
  render() {
    let { routes } = this.props;
    let { active, showMineDialog } = this.state;
    return (
      <div className="home">
        <div onClick={()=>this.logout()} style={{position:'absolute'}}>log out</div>
        <div className="header">
          <div
            className="logo"
            onClick={() => {
              this.props.history.push("/homepage/home");
            }}
          >
            <img src="/img/logo1.png" />
          </div>
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
                  className="noWal"
                  // {
                  //   active == "homeContent"
                  //     ? "wal"
                  //     : active == "transfer"
                  //       ? "wal"
                  //       : active == "getMoney"
                  //         ? "wal"
                  //         : "l"
                  // }
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
                  className="noMar"
                  // className={active == "changeContent" ? "mar" : "noMar"}
                ></i>
                <label>Market</label>
              </span>
            </div>
          }
          {/* <div className="navlist"> */}
            
            {/*  */}
          {/* </div> */}
        </div>

        <div className="box">
          <div className="boxHead">
            <div className="boxHeadList">
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
                        <span>{window.sessionStorage.getItem('balances') && window.sessionStorage.getItem('balances')}</span>
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
                      }} className={active == 'transfer' ? 'act' : null}>
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
              <span>下载</span>
            </div>
            
          </div>
          <RouterView routes={routes}></RouterView>
        </div>
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
        {/* 兑换详情 */}
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.props.visible}
          mask={false}
        >
          <ExchangeDetail></ExchangeDetail>
        </Drawer>
        {/* 我的资金池 */}
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          // onClose={this.onClose}
          mask={false}
          visible={this.props.showpooling}
        >
          <MyPoolDialog></MyPoolDialog>
        </Drawer>
        {/* 资金池详情 */}
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          visible={this.props.visible1}
          mask={false}
        >
          <PoolingDetail></PoolingDetail>
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