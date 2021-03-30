import React from "react";
import "./App.css";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnect from "./packages/browser/dist/index";
import webStorage from "./packages/browser/dist/webStorage";
// import Connector from "./packages/core/src";

import Violas from "./wc_protocol/Violas";
import Libra from "./wc_protocol/Libra";
import Bitcoin from "./wc_protocol/Bitcoin";
import Market from "./wc_protocol/Market";
import Bank from "./wc_protocol/Bank";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
    };
    this.QRCode = this.QRCode.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.logout = this.logout.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.checkNotificationPermission = this.checkNotificationPermission.bind(
      this
    );
    this.showUri = this.showUri.bind(this);
    this.getNewWalletConnect = this.getNewWalletConnect.bind(this);
  }
  async componentWillMount() {
    let wc_session = JSON.parse(localStorage.getItem("walletconnect"));
    if (wc_session && wc_session.connected) {
      await this.setState({
        walletConnector: new WalletConnect({ session: wc_session }),
      });
    } else {
      await this.getNewWalletConnect();
    }
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  async componentDidMount() {
    // console.log(JSON.stringify(this.state.walletConnector));
  }
  QRCode() {
    // let this.state.walletConnector = new WalletConnect({ bridge: this.state.bridge });
    if (!this.state.walletConnector.connected) {
      this.state.walletConnector.createSession().then(() => {
        const uri = this.state.walletConnector.uri;
        webStorage.setSession(this.state.walletConnector.session);
        WalletConnectQRCodeModal.open(uri, () => {
          console.log("QRCode closed");
        });
      });
    }
    this.state.walletConnector.on("connect", async (error, payload) => {
      if (error) {
        throw error;
      }
      WalletConnectQRCodeModal.close();
      this.getAccount();
      const { accounts, chainId } = payload.params[0];
      console.log("you have connected ", accounts[0], chainId);
      this.forceUpdate();
    });
    this.state.walletConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts, chainId } = payload.params[0];
      console.log("session update ", accounts, chainId);
    });
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      console.log("wallet disconnected " + JSON.stringify(payload));
    });
  }
  async showUri() {
    console.log("uri is: ", this.state.walletConnector.uri);
  }
  getAccount() {
    this.state.walletConnector
      .get_accounts()
      .then(async (res) => {
        console.log("get account ", res);
        for (let i of res) {
          if (i.coinType === "violas") {
            await sessionStorage.setItem("violas_address", i.address);
            await sessionStorage.setItem("violas_chainId", i.chainId);
          } else if (i.coinType === "libra") {
            await sessionStorage.setItem("libra_address", i.address);
            await sessionStorage.setItem("libra_chainId", i.chainId);
          } else if (i.coinType === "bitcoin") {
            await sessionStorage.setItem("bitcoin_address", i.address);
          }
        }
      })
      .catch((err) => {
        console.log("get account ", err);
      });
  }
  async logout() {
    // await this.state.walletConnector.connected && this.state.walletConnector.killSession();
    await this.state.walletConnector.killSession();
    await this.setState({ walletConnector: {} });
    await this.getNewWalletConnect();
    // await sessionStorage.setItem("violas_address", "");
    // await sessionStorage.setItem("bitcoin_address", "");
    // await sessionStorage.setItem("libra_address", "");
    await sessionStorage.clear();
  }
  checkNotificationPermission() {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        console.log("we are granted");
      } else {
        Notification.requestPermission()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
  showNotification() {
    this.checkNotificationPermission();
    let title = "This is title";
    let delayTime = Date.now() + 120000;
    let options = {
      body: "This is body",
      data: { prop1: 123, prop2: "wryyyyyyyyy" },
      lang: "en-US",
      icon: "/images/hexiangu.jpg",
      timestamp: delayTime,
      vibrate: [100, 200, 100],
    };
    let myNotification = new Notification(title, options);
    myNotification.addEventListener("show", function (ev) {
      console.log("show", ev.currentTarget.data);
    });
    myNotification.addEventListener("close", function (ev) {
      console.log("close", ev.currentTarget.body);
    });
    setTimeout(myNotification.close.bind(myNotification), 3000);
  }
  render() {
    // console.log(this.state.walletConnector.connected)
    return (
      <div className="App">
        <header className="App-header">
          <h2>WalletConnect Demo Internal</h2>
          <div>
            <button onClick={this.QRCode}>QRCode</button>
            <button onClick={this.showUri}>Show URI</button>
            {/* <button onClick={()=>{console.log(this.state.walletConnector.connected)}}>get wc</button> */}
            {/* <button onClick={this.getAccount}>get accounts</button> */}
          </div>
          <div>
            <button onClick={this.logout}>Log out</button>
            <button onClick={this.showNotification}>Show Notification</button>
          </div>
          <Bank
            walletConnector={
              this.state.walletConnector.connected && this.state.walletConnector
            }
          />
          <Market
            walletConnector={
              this.state.walletConnector.connected && this.state.walletConnector
            }
          />
          <Violas
            walletConnector={
              this.state.walletConnector.connected && this.state.walletConnector
            }
          />
          <div className="lb">
            <Libra
              walletConnector={
                this.state.walletConnector.connected &&
                this.state.walletConnector
              }
            />
            <Bitcoin
              walletConnector={
                this.state.walletConnector.connected &&
                this.state.walletConnector
              }
            />
          </div>
        </header>
      </div>
    );
  }
}
export default App;
