import React, { Component } from "react";
import "./app.scss";
import { connect } from "react-redux";
import RouterView from "../router/routerView";
import WalletConnect from "../packages/browser/src/index";
import intl from "react-intl-universal";
import "antd/dist/antd.css";

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
    await this.getNewWalletConnect();
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.props.history.push("/app");
    });
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
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
    if (
      window.localStorage !== null &&
      window.localStorage.setItem !== undefined
    ) {
      localStorage.setItem("local", lang);
      intl.options.currentLocale = localStorage.getItem("local");
    }
    // if (
    //   typeof window=='object' &&
    //   typeof window.localStorage == "object" &&
    //   typeof window.localStorage.setItem == "function"
    // ) {
    //   localStorage.setItem("local", lang);
    //   intl.options.currentLocale =localStorage.getItem("local");
    // }

    // if(localStorage.setItem !== null ){
    //  localStorage.setItem("local", lang);
    //  if (localStorage.getItem !== null) {
    //    intl.options.currentLocale =
    //    localStorage.getItem && localStorage.getItem("local");
    //  }

    // }

    // await this.ifNotLogin();
  }

  checkURL = () => {
    let temp = this.props.location.pathname;
    let urls = [
      "/homepage/home/miningAwards",
      "/homepage/home/ruleDescription",
      "/homepage/home/rankingList",
      "/homepage/home/inviteRewards",
      "/homepage/home/invitationList",
    ];
    for (let i = urls.length - 1; i >= 0; i--) {
      if (temp === urls[i]) {
        return true;
      }
    }
    return false;
  };

  checkMobile = () => {
    let isMobile = true;
    this.props.location.search === "" ? (isMobile = false) : (isMobile = true);
    return isMobile;
  };

  redirect2login = (reload) => {
    window.localStorage.clear();
    this.props.history.push("/app");
    reload === "reload" && window.location.reload();
  };

  async ifNotLogin() {
    // mobile use web page
    if (!this.state.walletConnector.connected) {
      if (this.checkURL()) {
        if (this.checkMobile()) {
          console.log("mobile use it");
        } else {
          this.redirect2login();
        }
      } else {
        this.redirect2login();
      }
    } else {
      // web page close by accident and reopen it
      // sessionStorage will be blank and localStorage not
      if (window.sessionStorage.length === 0) {
        if (this.checkURL()) {
          if (!this.checkMobile) {
            this.redirect2login("reload");
          }
        } else {
          this.redirect2login("reload");
        }
      }
    }
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
    this.ifNotLogin();
    return (
      <div className="homePage">
        <RouterView routes={routes}></RouterView>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
