import React from 'react';
import './App.css';
// import WalletConnect from  '@walletconnect/browser'
import WalletConnect from './packages/browser/src/index';
import WalletConnectQRCodeModal from './packages/qrcode-modal/src/index';
import axios from 'axios';
// import WalletConnect1 from '@walletconnect/browser';
// import WalletConnectQRCodeModal1 from '@walletconnect/qrcode-modal';

import Wallet from './Wallet';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const walletConnector = new WalletConnect({ bridge: 'https://bridge.walletconnect.org' })
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bridge: 'https://bridge.walletconnect.org',
      walletConnect: null,
      from: '',
      code: '',
      tyArgs: '',
      address: '',
      value: 0,
    }
    this.getSeqNumb = this.getSeqNumb.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.checkNotificationPermission = this.checkNotificationPermission.bind(this);
  }
  async componentDidMount() {
    console.log(walletConnector.consoleLog('test tsc -p tsconfig.json'));
    // this.getSeqNumb('4fcdb78dbb64eef68229f498f641babe');
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
  async getSeqNumb(_address) {
    await axios(`https://api.violas.io/1.0/violas/seqnum?addr=${_address}`).then(res => {
      return res.data.data + 1
    });
  }
  async sendTransaction() {
    const seq = await this.getSeqNumb(this.state.from).then(res => {
      return res
    }).catch(err => {
      console.log(err)
    })
    // console.log(this.state.from)
    // const seq = await axios('https://api.violas.io/1.0/violas/seqnum?addr=' + this.state.from).then(res => {
    //   return res.data.data + 1
    // });
    const tx = {
      from: this.state.from,
      payload: {
        code: 'a11ceb0b010007014600000004000000034a0000000c000000045600000002000000055800000009000000076100000029000000068a00000010000000099a0000001200000000000001010200010101000300010101000203050a020300010900063c53454c463e0c4c696272614163636f756e740f7061795f66726f6d5f73656e646572046d61696e00000000000000000000000000000000010000ffff030005000a000b010a023e0002',
        tyArgs: [
          '0600000000000000000000000000000000034c4252015400'
        ],
        args: [
          {
            type: 'Address',
            value: this.state.address
          },
          {
            type: 'Bytes',
            value: ''
          },
          {
            type: 'Number',
            value: this.state.value
          }
        ]
      },
      maxGasAmount: 400000,
      gasUnitPrice: 0,
      sequenceNumber: seq
    }
    console.log(JSON.stringify(tx))
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
    walletConnector.killSession();
  }
  checkNotificationPermission() {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        console.log('we are granted')
      } else {
        Notification.requestPermission().then(res => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }
  showNotification() {
    this.checkNotificationPermission();
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
  async handelChange(_type, e) {
    switch (_type) {
      case 'from':
        await this.setState({ from: e.target.value });
        break;
      case 'code':
        await this.setState({ code: e.target.value });
        break;
      case 'tyArgs':
        await this.setState({ tyArgs: e.target.value });
        break;
      case 'address':
        await this.setState({ address: e.target.value });
        break;
      case 'value':
        await this.setState({ value: e.target.value });
        break;
    }
  }
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <button onClick={this.QRCode}>QRCode</button>
          <button onClick={this.getAccount}>get accounts</button>
          <div className='tx'>
            <p>From: <input type="text" onChange={this.handelChange.bind(this, 'from')} /></p>
            {/* <p>Code: <input type="text" onChange={this.handelChange.bind(this, 'code')} /></p> */}
            {/* <p>tyArgs: <input type="text" onChange={this.handelChange.bind(this, 'tyArgs')} /></p> */}
            <p>Address: <input type="text" onChange={this.handelChange.bind(this, 'address')} /></p>
            <p>Value: <input type="text" onChange={this.handelChange.bind(this, 'value')} /></p>
          </div>
          <button onClick={this.sendTransaction}>send transaction</button>
          <button onClick={this.logout}>log out</button>
          <button onClick={this.showNotification}>Show Notification</button>
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
