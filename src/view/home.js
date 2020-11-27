import React from "react";
import "./app.scss";
import { connect } from 'react-redux'
import RouterView from '../router/routerView'
import WalletConnect from "../packages/browser/src/index";
import intl from "react-intl-universal";
import Head from './components/head'
import LangPage from './components/langPage'
let url = "https://api.violas.io";

//首页
class Home extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      // bridge: "http://47.52.66.26:5000",
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      active: "",
      showMineDialog: false,
      ind: 0,
    };
  }
  getMineDialog = (event) => {
    // event.stopPropagation();
    this.setState({
      showMineDialog: !this.state.showMineDialog
    });
  };
  // getMineDialog1 = (event) => {
  //   // event.stopPropagation();
  //   this.setState({
  //     showMineDialog: false
  //   });
  // };
  // shouldComponentUpdate(nextProps,nextState) {
  //   return nextProps.location !== this.props.location;
  // }
  async componentWillMount() {
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
    window.localStorage.clear();
    window.sessionStorage.clear();
    await this.state.walletConnector.killSession();
    await this.getNewWalletConnect();
    this.props.history.push("/app");
  }

  render() {
    let { routes } = this.props;
    let { active } = this.state;
    return (
      <div className="home">
        {/* <div style={{position:'absolute'}}>log out</div> */}
        <div className="header header1">
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
                    : active == "pushMessage"
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
              {/* <div className="badge" onClick={()=>{
                this.props.history.push(
                  "/homepage/home/pushMessage"
                );
              }}>
                <Badge count={100}>
                  <img src="/img/编组 12@2x.png" />
                </Badge>
              </div> */}
             <Head></Head>
              {/* <span>Download</span> */}
             <LangPage></LangPage>
              
            </div>
          </div>
          <RouterView routes={routes}></RouterView>
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