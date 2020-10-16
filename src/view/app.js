import React, { Component } from "react";
import WalletConnect from "../packages/browser/src/index";
// import WalletConnectQRCodeModal from "../packages/qrcode-modal/src/index";
import webStorage from "../packages/browser/src/webStorage";
import intl from "react-intl-universal";
import "./app.scss";
import QRCode from "qrcode.react"
let url = "https://api4.violas.io"

//登录页面
class App extends Component {
  constructor() {
    super();
    this.state = {
      bridge: 'https://bridge.walletconnect.org',
      // bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      session_id: "",
      status: 0,
      wallet_info: {},
      time: 0,
      login: false,
      uri: "",
    };
  }
  componentDidMount() {
    this.QRCode();
    console.log('版本号:0.1.0！！！！！')
  }
  async componentWillMount() {
    let lang = intl.options.currentLocale;
    console.log(lang);
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
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  QRCode() {
    if (!this.state.walletConnector.connected) {
      this.state.walletConnector.createSession().then(async () => {
        const uri = this.state.walletConnector.uri;
        webStorage.setSession(this.state.walletConnector.session);
        await this.setState({
          uri: uri,
        });
      });
    }
    this.state.walletConnector.on("connect", (error, payload) => {
      if (error) {
        this.setState({
          status: 2,
        });
        throw error;
      }
      const { accounts, chainId } = payload.params[0];
      this.getAccount();
      this.setState(
        {
          status: 1,
        },
        () => {
          setTimeout(() => {
            this.props.history.push("/homepage");
          }, 1000);

          // console.log("you have connected ");
        }
      );
    });
    this.state.walletConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts, chainId } = payload.params[0];
      this.getAccount();
      // console.log("session update ");
    });
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.props.history.push("/app");
      // console.log("wallet disconnected");
    });
  }

  getAccount() {
    this.state.walletConnector
      .get_accounts()
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("wallet_info", JSON.stringify(res));
        for (let i of res) {
          if (i.coinType === "violas") {
            window.sessionStorage.setItem("violas_address", i.address);
            window.sessionStorage.setItem("violas_chainId", i.chainId);
          } else if (i.coinType === "libra") {
            window.sessionStorage.setItem("libra_address", i.address);
            window.sessionStorage.setItem("libra_chainId", i.chainId);
          } else if (i.coinType === "bitcoin") {
            window.sessionStorage.setItem("btc_address", i.address);
          }
        }
      })
      .catch((err) => {
        console.log("get account ", err);
      });
  }
  // changeLang(lang) {
  //   intl.options.currentLocale = lang;
  //   this.forceUpdate();
  // }
  render() {
    let { uri } = this.state;
    return (
      <div className="app">
        <div className="appContent">
          {/* <span
            onClick={() => {
              this.changeLang("EN");
              localStorage.setItem("local", "EN");
            }}
          >
            英
          </span> */}
          <div className="logo">
            <img src="/img/编组 10复制 4@2x.png" />
          </div>
          <div className="app_link">
            <div className="link_logo">
              <img src="/img/编组复制 11@2x.png" />
            </div>
            {/* <h3>ViolasPay</h3> */}
            <div
              className="qrCode"
              onClick={() => {
                window.localStorage.clear();
                window.sessionStorage.clear();
                this.props.history.push("/app");
              }}
            >
              <QRCode value={uri}></QRCode>
              {this.state.status == 1 ? (
                <div className="dialog">
                  <p>
                    <img src="/img/saomachenggong 2@2x.png" />
                    <label className="success">{intl.get("Success")}</label>
                  </p>
                </div>
              ) : this.state.status == 2 ? (
                <div className="dialog">
                  <p>
                    <img src="/img/saomashibai 2@2x.png" />
                    <label className="fail">{intl.get("Failed")}</label>
                  </p>
                </div>
              ) : null}
            </div>
            <p>{intl.get("Please use your ViolasPay scan code to log in")}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
// : this.state.status == 3 ? (
//   <img
//     onClick={() => {
//       window.location.reload();
//     }}
//     src="/img/erweimashixiao 2@2x.png"
//   />
// ) 