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
let url = "http://52.27.228.84:4000"

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      bridge: "https://bridge.walletconnect.org",
      walletConnector: {},
      active: "",
      showMineDialog: false,
    };
  }
  getActive = (ind, val) => {};
  getMineDialog = (event) => {
    // this.stopPropagation(event)
    this.setState({
      showMineDialog: !this.state.showMineDialog,
    });
  };
  componentDidMount() {
    // document.addEventListener('click', this.closeDialog);
    this.setState({
      active: this.props.location.pathname.split("/")[3],
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
  async componentWillMount() {
    await this.getNewWalletConnect();
  }
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
    let { active, showMineDialog } = this.state;
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
                      <span>22311.11</span>
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