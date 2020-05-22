import React from 'react';
import './App.css';
// import WalletConnect from  '@walletconnect/browser'
import WalletConnect from './packages/browser/src/index'
import WalletConnectQRCodeModal from './packages/qrcode-modal/src/index'
// import WalletConnect1 from '@walletconnect/browser'
// import WalletConnectQRCodeModal1 from '@walletconnect/qrcode-modal'

import Wallet from './Wallet';
import {BrowserRouter as Router,Route} from 'react-router-dom'

const walletConnector = new WalletConnect({ bridge: 'https://bridge.walletconnect.org' })
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bridge: 'https://bridge.walletconnect.org',
      walletConnect: null,
    }
  }
  async componentDidMount() {
    console.log(walletConnector.consoleLog('aaa'));
    // this.checkNotificationPermission();
  }
  QRCode() {
    // walletConnector.peerId().then(res=>console.log(res))
    if (!walletConnector.connected) {
      walletConnector.createSession().then(() => {
        // walletConnector.consoleLog('aaa').then(res=>console.log(res))
        const uri = walletConnector.uri;
        console.log(uri)
        WalletConnectQRCodeModal.open(uri, () => {
          console.log('QRCode closed')
        })
      })
    }
    walletConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      WalletConnectQRCodeModal.close();
      console.log('you have connected')
      const { accounts, chainId } = payload.params[0]
    })
    walletConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts, chainId } = payload.params[0];
    });
  }
  getAccount() {
    walletConnector.get_accounts().then(res => {
      console.log('get account ', res)
    }).catch(err => {
      console.log('get account ', err)
    })
  }
  sendTransaction() {
    const tx = {
      from: '4fcdb78dbb64eef68229f498f641babe',
      payload: {
        code: '0x123',
        tyArgs: [
          '0x1234ABCD'
        ],
        args: [
          {
            type: 'Address',
            value: '4fcdb78dbb64eef68229f498f641babe'
          },
          {
            type: 'Number',
            value: '1000000'
          }
        ]
      },
      maxGasAmount: 400000,
      gasUnitPrice: 0,
      sequenceNUmber: 2
    }
    walletConnector.sendTransaction(tx).then(res => {
      console.log('send transaction ', res);
    }).catch(err => {
      console.log('send transaction ', err);
    })
  }
  logout() {
    walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      console.log('wallet disconnected')
    })
  }
  // QRCode1() {
  //   const walletConnector1 = new WalletConnect1({ bridge: 'https://bridge.walletconnect.org' })
  //   if (!walletConnector1.connected) {
  //     walletConnector1.createSession().then(() => {
  //       const uri = walletConnector1.uri;
  //       console.log(uri)
  //       WalletConnectQRCodeModal1.open(uri, () => {
  //         console.log('QRCode closed')
  //       });
  //     });
  //   }
  //   walletConnector1.on('connect', (error, payload) => {
  //     if (error) {
  //       throw error
  //     }
  //     WalletConnectQRCodeModal1.close();
  //     const { accounts, chainId } = payload.params[0];
  //     console.log(accounts, ' ', chainId);
  //   });
  //   walletConnector1.on("session_update", (error, payload) => {
  //     if (error) {
  //       throw error;
  //     }
  //     const { accounts, chainId } = payload.params[0]
  //     console.log(accounts, ' ', chainId);
  //   });
  // }
  // sendTransaction1() {
  //   const tx = {
  //     from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
  //     to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
  //     data: "0x", // Required
  //     gasPrice: "0x02540be400", // Optional
  //     gasLimit: "0x9c40", // Optional
  //     value: "0x00", // Optional
  //     nonce: "0x0114" // Optional
  //   };
  //   // Send transaction
  //   walletConnector
  //     .sendTransaction(tx)
  //     .then(result => {
  //       // Returns transaction id (hash)
  //       console.log(result);
  //     })
  //     .catch(error => {
  //       // Error returned when rejected
  //       console.error(error);
  //     });
  // }
  // logout1() {
  //   walletConnector.on("disconnect", (error, payload) => {
  //     if (error) {
  //       throw error;
  //     }
  //   })
  // }
  checkNotificationPermission() {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        console.log('we are granted')
      } else {
        Notification.requestPermission().then(res => {
          console.log(res);
        }).catch((err) => {
          console.log(err)
        });
      }
    }
  }
  showNotification() {
    let title = 'This is title';
    let delayTime = Date.now() + 120000;
    let options = {
      body: 'This is body',
      data: { prop1: 123, prop2: 'wryyyyyyyyy' },
      lang: "en-US",
      icon: '../public/logo192.png',
      timestamp: delayTime,
      vibrate: [100, 200, 100],
    };
    let myNotification = new Notification(title, options);
    myNotification.addEventListener('show', function (ev) {
      console.log('show', ev.currentTarget.data);
    });
    myNotification.addEventListener('close', function (ev) {
      console.log('close', ev.currentTarget.body)
    });
    setTimeout(myNotification.close.bind(myNotification), 3000)
  }
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <button onClick={this.QRCode}>QRCode</button>
          <button onClick={this.getAccount}>get accounts</button>
          <button onClick={this.sendTransaction}>send transaction</button>
          <button onClick={this.logout}>log out</button>
          {/* <button onClick={this.showNotification}>Show Notification</button> */}

          {/* <Router>
            <Route path='/wallet' component={Wallet}/>
          </Router> */}
          {/* <Wallet/> */}
          {/* <section>
            <button onClick={this.QRCode1}>walletConnect QRCode</button>
            <button onClick={this.sendTransaction1}>walletConnect QRCode</button>
            <button onClick={this.logout1}>walletConnect log out</button>
          </section> */}
        </header>
      </div>
    )
  }
}
export default App;
