import React, { Component,PureComponent } from "react";
import "./app.scss";
import { connect } from 'react-redux'
import RouterView from '../router/routerView'
import { Drawer } from "antd";
import AddCurrency from "./components/addCurrency";
import ExchangeDialog from './market/exchangeDialog'
import MyPoolDialog from './market/myPoolDialog'
import WalletConnect from "../packages/browser/src/index";
import intl from "react-intl-universal";
let url = "https://api.violas.io";

//首页 包括左侧栏，头部我的
class Home extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      // bridge: "http://47.52.66.26:5000",
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      active: "",
      showMineDialog: false,
      changeLang: false,
      changeLangLists: [
        {
          local: "简体中文",
          lang: "CN",
        },
        {
          local: "English",
          lang: "EN",
        },
      ],
      local: "",
      ind: 0,
    };
  }
  getMineDialog = (event) => {
    // event.stopPropagation();
    this.setState({
      showMineDialog: !this.state.showMineDialog,
    });
  };
  // shouldComponentUpdate(nextProps,nextState) {
  //   return nextProps.location !== this.props.location;
  // }
  async componentWillMount() {
    intl.options.currentLocale = localStorage.getItem("local");
    let lang = intl.options.currentLocale;
    switch (lang) {
      case "zh":
        this.setState({ local: "简体中文", ind: 0 });
        break;
      case "CN":
        this.setState({ local: "简体中文", ind: 0 });
        break;
      default:
        this.setState({ local: "English", ind: 1 });
        break;
    }
    await this.getNewWalletConnect();
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      window.localStorage.clear();
      window.sessionStorage.clear();
      // this.props.history.push('/app')
    });
  }
  componentDidMount() {
    // document.addEventListener('click', this.closeDialog);
    // console.log(window.localStorage.getItem('walletconnector'),'..............')
    this.setState({
      active: this.props.location.pathname.split("/")[3],
    });
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      console.log("wallet disconnected");
    });
  }

  // closeDialog = () => {
  //   this.setState({
  //     showMineDialog: false
  //   })
  // }
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    return number;
  }

  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  async logout() {
    await this.state.walletConnector.killSession();
    await this.getNewWalletConnect();
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.props.history.push("/app");
  }
  changeLanguage(lang) {
    intl.options.currentLocale = lang;
    this.forceUpdate();
  }
  render() {
    let { routes } = this.props;
    let { active, showMineDialog, local, changeLangLists } = this.state;
    // console.log(showMineDialog, "..........");
    return (
      <div className="home">
        {/* <div style={{position:'absolute'}}>log out</div> */}
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
                <label>{intl.get("Wallet")}</label>
              </span>
              <span
                onClick={() => {
                  this.props.history.push("/homepage/home/changeContent");
                  // this.props.showDetails()
                  // this.props.showPolling()
                }}
                className={active == "changeContent" ? "active" : null}
              >
                <i className="noMar"></i>
                <label>{intl.get("Market")}</label>
              </span>
              <span
                onClick={() => {
                  this.props.history.push("/homepage/home/digitalBank");
                }}
                className={active == "digitalBank" ? "active" : null}
              >
                <i className="noBank"></i>
                <label>{intl.get("Bank")}</label>
              </span>
            </div>
          }
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
                        <label>{intl.get("Total assets")}($)</label>
                        <span>
                          {window.sessionStorage.getItem("balances")
                            ? this.getFloat(
                                window.sessionStorage.getItem("balances"),
                                2
                              )
                            : "0"}
                        </span>
                      </div>
                      <div className="icon">
                        <img src="/img/Combined Shape 2@2x.png" />
                      </div>
                    </div>
                    <div className="btns">
                      <dl
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/homepage/home/transfer",
                          });
                        }}
                        className={active == "transfer" ? "act" : null}
                      >
                        <dt>
                          <img src="/img/编组 13备份 4@2x.png" />
                        </dt>
                        <dd>{intl.get("Transfer")}</dd>
                      </dl>
                      <dl
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/homepage/home/getMoney",
                          });
                        }}
                        className={active == "getMoney" ? "act" : null}
                      >
                        <dt>
                          <img src="/img/编组 13备份 5@2x.png" />
                        </dt>
                        <dd>{intl.get("Receive")}</dd>
                      </dl>
                    </div>
                    <p onClick={() => this.logout()}>
                      <img src="/img/tuichu 2@2x.png" />
                      {intl.get("Logout")}
                    </p>
                  </div>
                ) : null}
              </div>
              {/* <span>Download</span> */}
              <div className="changeLangList">
                {this.state.changeLang ? (
                  <div
                    className="changeLang changeLangAct"
                    onClick={() => {
                      this.setState({
                        changeLang: !this.state.changeLang,
                      });
                    }}
                  >
                    <label>{local}</label>
                    <img src="/img/qiehuan-2 2@2x (1).png" />
                  </div>
                ) : (
                  <div
                    className="changeLang"
                    onClick={() => {
                      this.setState({
                        changeLang: !this.state.changeLang,
                      });
                    }}
                  >
                    <label>{local}</label>
                    <img src="/img/qiehuan-2 2@2x.png" />
                  </div>
                )}
                {this.state.changeLang ? (
                  <div className="changeLangLists">
                    {changeLangLists.map((v, i) => {
                      return (
                        <span
                          key={i}
                          className={i == this.state.ind ? "active" : ""}
                          onClick={() => {
                            this.changeLanguage(v.lang);
                            localStorage.setItem("local", v.lang);
                            this.setState({
                              local: v.local,
                              ind: i,
                              changeLang: false,
                            });
                          }}
                        >
                          {v.local}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <RouterView routes={routes}></RouterView>
        </div>
        {/* 添加币种 */}
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          // onClose={this.onClose}
          visible={this.props.display}
          mask={false}
          getContainer={false}
        >
          <AddCurrency></AddCurrency>
        </Drawer>

        {/* 我的资金池 */}
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          // onClose={this.onClose}
          mask={false}
          visible={this.props.showpooling}
          getContainer={false}
        >
          <MyPoolDialog></MyPoolDialog>
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
    showEveryDetail: () => {
      dispatch({
        type: "DISPLAY2",
        payload: false,
      });
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);