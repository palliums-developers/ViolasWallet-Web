import React from 'react';
import './App.css';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';
// import WalletConnect from './packages/browser/src/index';
// import webStorage from './packages/browser/src/webStorage';
import WalletConnect from './packages/browser/dist/index';
import webStorage from './packages/browser/dist/webStorage';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // bridge: 'http://192.168.1.151:5000',
      bridge: 'https://bridge.walletconnect.org',
      // code: 'a11ceb0b010007014600000004000000034a0000000c000000045600000002000000055800000009000000076100000029000000068a00000010000000099a0000001200000000000001010200010101000300010101000203050a020300010900063c53454c463e0c4c696272614163636f756e740f7061795f66726f6d5f73656e646572046d61696e00000000000000000000000000000000010000ffff030005000a000b010a023e0002',
      code: 'a11ceb0b010007014600000002000000034800000006000000044e0000000200000005500000000d000000075d000000240000000881000000100000000991000000130000000000000100010101000205060c05030a020a02000109000c4c696272614163636f756e74167061795f66726f6d5f776974685f6d65746164617461000000000000000000000000000000000101000107000b000a010a020b030b04380002',
      walletConnector: {},
      violas_address: '',
      libra_address: '',
      BTC_address: '',
      from: '',
      code: '',
      tyArgs: '',
      address: '',
      value: 0,
      message: '',
      gasCurrencyCode: 'LBR',
    }
    this.QRCode = this.QRCode.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.getSeqNumb = this.getSeqNumb.bind(this);
    this.logout = this.logout.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.checkNotificationPermission = this.checkNotificationPermission.bind(this);
    this.showUri = this.showUri.bind(this);
    this.getNewWalletConnect = this.getNewWalletConnect.bind(this);
    this.signTransaction = this.signTransaction.bind(this);
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
    await this.setState({ violas_address: sessionStorage.getItem('violas_address') ? sessionStorage.getItem('violas_address') : '' });
    console.log('current violas address is ', this.state.violas_address);
  }
  async getNewWalletConnect() {
    await this.setState({ walletConnector: new WalletConnect({ bridge: this.state.bridge }) });
  }
  async componentDidMount() {
    // console.log(walletConnector.consoleLog('starting'));
  }
  QRCode() {
    if (!this.state.walletConnector.connected) {
      this.state.walletConnector.createSession().then(() => {
        const uri = this.state.walletConnector.uri;
        console.log(uri);
        webStorage.setSession(this.state.walletConnector.session);
        WalletConnectQRCodeModal.open(uri, () => {
          console.log('QRCode closed')
        })
      })
    }
    this.state.walletConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      WalletConnectQRCodeModal.close();
      this.getAccount();
      const { accounts, chainId } = payload.params[0];
      console.log('you have connected ', accounts[0], chainId);
    })
    this.state.walletConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts, chainId } = payload.params[0];
      console.log('session update ', accounts, chainId);
    });
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      console.log('wallet disconnected')
    })
  }
  showUri() {
    console.log('uri is: ', this.state.walletConnector.uri)
  }
  getAccount() {
    this.state.walletConnector.get_accounts().then(async res => {
      console.log('get account ', res);
      for (let i of res) {
        if (i.coinType === 'violas') {
          await sessionStorage.setItem('violas_address', i.address);
          await this.setState({ violas_address: i.address });
          console.log(this.state.violas_address)
        }
      }
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
    // const seq = await this.getSeqNumb(this.state.from).then(res => {
    //   return res
    // }).catch(err => {
    //   console.log(err)
    // })
    console.log('Please confirm current violas address is ', this.state.violas_address);
    const tx = {
      from: this.state.violas_address,
      // from: this.state.from,
      payload: {
        // code: 'a11ceb0b010007014600000004000000034a0000000c000000045600000002000000055800000009000000076100000029000000068a00000010000000099a0000001200000000000001010200010101000300010101000203050a020300010900063c53454c463e0c4c696272614163636f756e740f7061795f66726f6d5f73656e646572046d61696e00000000000000000000000000000000010000ffff030005000a000b010a023e0002',
        code: this.state.code,
        tyArgs: [
          '0600000000000000000000000000000000034c4252015400'
        ],
        args: [
          {
            type: 'Address',
            value: this.state.address
          },
          {
            type: 'Number',
            value: this.state.value
          },
          {
            type: 'Bytes',
            value: ''
          },
          {
            type: 'Bytes',
            value: ''
          },
        ]
      },
      // maxGasAmount: 400000,
      // gasUnitPrice: 0,
      // sequenceNumber: seq,
      gasCurrencyCode: this.state.currencyCode,
    }
    this.state.walletConnector.sendTransaction(tx).then(res => {
      console.log('send transaction ', res);
    }).catch(err => {
      console.log('send transaction ', err);
    })
  }
  async signTransaction() {
    console.log('Please confirm current violas address is ', this.state.violas_address);
    this.state.walletConnector.signTransaction({ address: this.state.violas_address, message: this.state.message }).then(res => {
      console.log('sign transaction ', res);
    }).catch(err => {
      console.log('sign transaction ', err);
    })
  }
  async logout() {
    await this.state.walletConnector.killSession();
    await this.getNewWalletConnect();
    await sessionStorage.setItem('violas_address', '');
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
      icon: "/images/hexiangu.jpg",
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
      case 'msg':
        await this.setState({ message: e.target.value });
        break;
      case 'gasCurrencyCode':
        await this.setState({ gasCurrencyCode: e.target.value });
        break;
    }
  }
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <button onClick={this.QRCode}>QRCode</button>
          <button onClick={this.showUri}>show URI</button>
          {/* <button onClick={this.getAccount}>get accounts</button> */}
          <div className='boxs'>
            <div className='tx'>
              {/* <p>From: <input type="text" onChange={this.handelChange.bind(this, 'from')} /></p> */}
              {/* <p>Code: <input type="text" onChange={this.handelChange.bind(this, 'code')} /></p> */}
              {/* <p>tyArgs: <input type="text" onChange={this.handelChange.bind(this, 'tyArgs')} /></p> */}
              <p>Address: <input type="text" onChange={this.handelChange.bind(this, 'address')} /></p>
              <p>Value: <input type="text" onChange={this.handelChange.bind(this, 'value')} /></p>
              <p>gasCurrencyCode: <input type="text" onChange={this.handelChange.bind(this, 'gasCurrencyCode')} /></p>
              <button onClick={this.sendTransaction}>send transaction</button>
            </div>
            <div className='tx'>
              <p>Message: <input type="text" onChange={this.handelChange.bind(this, 'msg')} /></p>
              <button onClick={this.signTransaction}>sign transaction</button>
            </div>
          </div>
          <button onClick={this.logout}>log out</button>
          <button onClick={this.showNotification}>Show Notification</button>
        </header>
      </div>
    )
  }
}
export default App;
