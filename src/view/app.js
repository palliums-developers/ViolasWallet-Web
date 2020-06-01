import React, { Component } from "react";
import WalletConnect from "../packages/browser/src/index";
// import WalletConnectQRCodeModal from "../packages/qrcode-modal/src/index";
import webStorage from "../packages/browser/src/webStorage";
import "./app.scss";
import QRCode from "qrcode.react"
let url = "http://52.27.228.84:4000"

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
      this.state.walletConnector.createSession().then(() => {
        const uri = this.state.walletConnector.uri;
        console.log(uri);
        webStorage.setSession(this.state.walletConnector.session);
        // WalletConnectQRCodeModal.open(uri, () => {
        //   console.log("QRCode closed");
        // });
      });
    }
    this.state.walletConnector.on("connect", (error, payload) => {
      if (error) {
        this.setState({
          status: 2
        });
        throw error;
      }
      // WalletConnectQRCodeModal.close();
      const { accounts, chainId } = payload.params[0];
      this.getAccount()
      this.setState({
        status: 1,
      },()=>{
          setTimeout(() => {
            this.props.history.push("/homepage");
          }, 5000);
          window.sessionStorage.setItem(
            "address",
            accounts[0]
          );
          console.log("you have connected ", accounts, chainId);
      });
      
    });
    this.state.walletConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts, chainId } = payload.params[0];
      this.getAccount()
      console.log("session update ", accounts, chainId);
    });
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      console.log("wallet disconnected1");
    });
  }
  getAccount() {
    this.state.walletConnector.get_accounts().then(res => {
      window.sessionStorage.setItem(
        "wallet_info",
        res
      );
    }).catch(err => {
      console.log('get account ', err)
    })
  }
  render() {
    console.log(this.state.walletConnector.uri, this.state.status)
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
              <QRCode value={this.state.walletConnector.uri}></QRCode>
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
  // ask_login_state() {
  //   let count = this.state.time;
  //   let Timer = setInterval(() => {
  //     if (this.state.login) {
  //       clearInterval(Timer);
  //     } else if (count === 60) {
  //       this.setState({
  //         status: 3,
  //       });
  //       clearInterval(Timer);
  //     } else {
  //       this.login_state();
  //       count++;
  //     }
  //   }, 1000);
  //   // setTimeout(() => { this.setState({ session_id: "" }) }, 5000);
  // }
  // login_state() {
  //   // http://125.39.5.57:38080/app/mock/16/1.0/violas/singin
  //   fetch(url + "/explorer/violas/singin?session_id=" + this.state.session_id)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.data.status == 1) {
  //         this.setState(
  //           {
  //             login: true,
  //             status: res.data.status,
  //             wallet_info: JSON.stringify(res.data.wallets),
  //           },
  //           () => {
  //             window.sessionStorage.setItem(
  //               "wallet_info",
  //               this.state.wallet_info
  //             );
  //             setTimeout(() => {
  //               this.props.history.push("/homepage");
  //             }, 5000);
  //           }
  //         );
  //       } else if (res.data.status == 2) {
  //         this.setState({
  //           login: false,
  //           status: res.data.status,
  //         });
  //       } else if (res.data.status == 3) {
  //         this.setState({
  //           login: false,
  //           status: res.data.status,
  //         });
  //       } else {
  //         this.setState({
  //           login: false,
  //         });
  //       }
  //     })
  //     .catch((e) => console.log(e));
  // }
  // json2String = (_id) => {
  //   let _temp = {
  //     session_id: _id,
  //     type: 2,
  //   };
  //   return JSON.stringify(_temp);
  // };
  // getQR = () => {
  //   return fetch(url + "/explorer/violas/singin/qrcode")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       // console.log(res.data.qr_code.session_id.toString())
  //       this.setState(
  //         {
  //           session_id: res.data.qr_code.session_id.toString(),
  //         },
  //         () => {
  //           window.sessionStorage.setItem("session_id", this.state.session_id);
  //           this.ask_login_state();
  //         }
  //       );
  //     });
  // };
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