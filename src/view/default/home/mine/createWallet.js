import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import intl from 'react-intl-universal';
let bip39 = require("bip39");

class CreateWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      wType: 'violas',
      name: '',
      pass1: '',
      pass2: '',
    }
  }
  componentWillMount() {
    intl.options.currentLocale = localStorage.getItem("local");
  }
  componentDidMount() {
    if(this.props.location.state){
      this.setState({
        wType: this.props.location.state.options
      })
    }else{
      this.props.history.push('/welcome');
    }
  }
  getList = (type) => {
    this.setState({
      isShow: type
    })
  }

  getValue = (e, type) => {
    if (type == 'name') {
      this.setState({
        name: e.target.value
      })
    } else if (type == 'pass1') {
      this.setState({
        pass1: e.target.value
      })
    } else if (type == 'pass2') {
      this.setState({
        pass2: e.target.value
      })
    }

  }

  createWallet = (type) => {
    let { name, pass1, pass2 } = this.state;
    let reg = new RegExp('^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$')
    if (name == '') {
      alert(intl.get('Please input nickname') + '!!!')
    } else if (pass1 == '') {
      alert(intl.get('Please set Wallet Access Code') + '!!!')
    } else if (pass2 == '') {
      alert(intl.get('Confirm Access Code') + '!!!')
    } else if (pass1.indexOf(pass2) == -1) {
      alert(intl.get('The passwords are different') + '!!!')
    } else if (!reg.test(pass1)) {
      alert(intl.get('Password setting does not match') + '！！！')
    } else {
      let extra_wallet = {}
      if (type == 'violas') {

        extra_wallet = {
          type: type,
          name: name,
          password: pass1,
          mnemoic: bip39.generateMnemonic()
        }
      } else if (type == 'libra') {
        extra_wallet = {
          type: type,
          name: name,
          password: pass1,
          mnemoic: bip39.generateMnemonic()
        }
      } else if (type == 'BTC') {
        extra_wallet = {
          type: type,
          name: name,
          password: pass1,
          mnemoic: bip39.generateMnemonic()
        }
      }
      let wallets = JSON.parse(window.localStorage.getItem('data'));
      wallets.extra_wallet.push(extra_wallet)
      window.localStorage.setItem('data', JSON.stringify(wallets))
      this.props.history.push('/dailyCash');

    }
  }
  render() {
    return (
      <div className="createWallet">
        <header>
          <span onClick={() => {
            this.props.history.push('/addPurse')
          }}><img src="/img/Combined Shape 1@2x.png" /></span>
          <span></span>
        </header>
        <section>
          <div className="createContent">
            <div className="head">
              <div className="logo">
                {
                  this.state.wType == 'violas' ? <img src="/img/vio@2x.png" /> : this.state.wType == 'lib' ? <img src="/img/lib@2x.png" /> : this.state.wType == 'btc' ? <img src="/img/BTC@2x.png" /> : null
                }
              </div>
              {
                this.state.wType == 'violas' ? <h4>{intl.get('Create VtokenWallet')}</h4> : this.state.wType == 'lib' ? <h4>{intl.get('Create LibraWallet')}</h4> : this.state.wType == 'btc' ? <h4>{intl.get('Create BTCWallet')}</h4> : null
              }
            </div>
            <div className="form">
              <input type="text" placeholder={intl.get('Input Nickname')} onChange={(e) => this.getValue(e, 'name')} />
              <div className="line"></div>
              <input type="password" placeholder={intl.get('Set Wallet Access Code')} onChange={(e) => this.getValue(e, 'pass1')} />
              <div className="line"></div>
              <input type="password" placeholder={intl.get('Confirm Wallet Access Code')} onChange={(e) => this.getValue(e, 'pass2')} />
              <div className="line"></div>
              {
                this.state.wType == 'violas' ? <div className="btn" onClick={() => this.createWallet('violas')}>{intl.get('Create')}</div> : this.state.wType == 'lib' ? <div className="btn" onClick={() => this.createWallet('libra')}>{intl.get('Create')}</div> : this.state.wType == 'btc' ? <div className="btn" onClick={() => this.createWallet('BTC')}>{intl.get('Create')}</div> : null
              }
            </div>
          </div>
        </section>

      </div>
    );
  }
}

export default CreateWallet;
