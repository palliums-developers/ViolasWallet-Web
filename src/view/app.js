import React, { Component } from "react";
import WalletConnect from "../packages/browser/src/index";
// import WalletConnectQRCodeModal from "../packages/qrcode-modal/src/index";
import webStorage from "../packages/browser/src/webStorage";
import "./app.scss";
import QRCode from "qrcode.react"
let url = "https://api4.violas.io"

class App extends Component {
  constructor() {
    super();
    this.state = {
      bridge: 'https://bridge.walletconnect.org',
      walletConnector: {},
      session_id: "",
      status:0,
      wallet_info: {},
      time: 0,
      login: false,
      uri:''
    };
  }
  componentDidMount() {
   this.QRCode();
  }
  async componentWillMount() {
    await this.getNewWalletConnect(); 
  }
  async getNewWalletConnect() {
    await this.setState({ walletConnector: new WalletConnect({ bridge: this.state.bridge }) });
  }
  QRCode() {
    if (!this.state.walletConnector.connected) {
      this.state.walletConnector.createSession().then(async () => {
        const uri = this.state.walletConnector.uri;
        webStorage.setSession(this.state.walletConnector.session);
        await this.setState({
          uri:uri
        })

      });
    }
    this.state.walletConnector.on("connect", (error, payload) => {
      if (error) {
        this.setState({
          status: 2
        });
        throw error;
      }
      const { accounts, chainId } = payload.params[0];
      this.getAccount()
      this.setState({
        status: 1,
      },()=>{
          setTimeout(() => {
            this.props.history.push("/homepage");
          }, 5000);
          window.localStorage.setItem(
            "address",
            accounts[0]
          );
          console.log("you have connected ");
      });
      
    });
    this.state.walletConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts, chainId } = payload.params[0];
      this.getAccount()
      console.log("session update ");
    });
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      console.log("wallet disconnected");
    });
  }
  
  getAccount() {
    this.state.walletConnector.get_accounts().then(res => {
      window.localStorage.setItem(
        "wallet_info",
        JSON.stringify(res)
      );
    }).catch(err => {
      console.log('get account ', err)
    })
  }
  render() {
    let {uri} = this.state;
    return (
      <div className="app">
        <div className="appContent">
          <div className="logo">
            <img src="/img/编组 10复制 4@2x.png" />
          </div>
          <div className="app_link">
            <div className="link_logo">
              <img src="/img/编组复制 11@2x.png" />
            </div>
            <h3>ViolasPay</h3>
            <div className="qrCode">
              <QRCode value={uri}></QRCode>
              {this.state.status == 1 ?  (
                <div className="dialog">
                  <p><img src="/img/saomachenggong 2@2x.png" /><label className="success">Success</label></p>
                  
                </div> 
              ) : this.state.status == 2 ? <div className="dialog"><p><img src="/img/saomashibai 2@2x.png" /><label className="fail">failed</label></p></div> : null}
            </div>
            <p>Please use your ViolasPay scan code to log in</p>
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