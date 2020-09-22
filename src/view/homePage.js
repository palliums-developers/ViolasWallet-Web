import React, { Component } from "react";
import "./app.scss";
import { connect } from 'react-redux';
import RouterView from '../router/routerView';
import WalletConnect from "../packages/browser/src/index";
import intl from "react-intl-universal";
import 'antd/dist/antd.css'
//首页 首个路由
class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      // bridge: 'http://47.52.66.26:5000',
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
    };
  }
  async componentWillMount() {
    let lang = intl.options.currentLocale;
    // console.log(lang);
    switch (lang) {
      case "zh":
        lang = "CN";
        break;
      case "CN":
        lang = "CN";
        break;
      default:
        lang = "EN";
        break;
    }
    localStorage.setItem("local", lang);
    intl.options.currentLocale = localStorage.getItem("local");
    await this.getNewWalletConnect();
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.props.history.push('/app')
      // console.log("wallet disconnected", "////////////");
    });
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  
  componentDidMount() {
    window.addEventListener("onbeforeunload", () => {
      this.state.walletConnector.killSession();
      this.getNewWalletConnect();
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.props.history.push("/app");
    });
  }
  componentWillUnmount() {
    window.removeEventListener("onbeforeunload", () => {
      this.state.walletConnector.killSession();
      this.getNewWalletConnect();
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.props.history.push("/app");
    });
  }
  onClose = () => {};
  render() {
    let { routes } = this.props;

    return (
      <div className="homePage">
        <RouterView routes={routes}></RouterView>
      </div>
    );
  }
}
let mapStateToProps = (state) =>{
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
  
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);