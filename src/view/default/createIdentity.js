import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../app.scss';
import intl from 'react-intl-universal';
import vAccount from '../../utils/violas';
let aes256 = require('aes256');

@inject('index')
@observer

class CreateIdentity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pass1: '',
      pass2: '',
      mne_Arr: ''

    }
  }
  componentWillMount() {
    intl.options.currentLocale = localStorage.getItem("local");
  }
  componentDidMount() {
    let violas = new vAccount('');
    this.setState({
      mne_Arr: violas.getmne()
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
  createFun = async () => {
    let { name, pass1, pass2, mne_Arr } = this.state;
    // let reg = new RegExp('^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$');
    // let reg = new RegExp('^(?![a-z]+$)(?![A-z]+$)(?!\d+$)(?!^[_#@]+$)(?![a-zA-z]+$)(?![a-z]^[_#@]+$)(?![A-Z]^[_#@]+$)[a-zA-Z\d]+$.{8,20}$');
    let reg=new RegExp('^(?![A-Za-z]+$)(?![A-Z\\d]+$)(?![A-Z\\W]+$)(?![a-z\\d]+$)(?![a-z\\W]+$)(?![\\d\\W]+$)\\S{8,20}$')
    if (name == '') {
      alert(intl.get('Input Nickname') + '!!!')
    } else if (pass1 == '') {
      alert(intl.get('Please set Wallet Access Code') + '!!!')
    }
    else if (pass2 == '') {
      alert(intl.get('Confirm Access Code') + '!!!')
    } else if (pass1.indexOf(pass2) == -1) {
      alert(intl.get('The passwords are different') + '!!!')
    }
    else if (!reg.test(pass1)) {
      alert(intl.get('Password setting does not match') + '！！！')
    } else {
      window.sessionStorage.setItem('data', JSON.stringify({
        name: name,
        password1: pass1,
        mne_arr: mne_Arr,
        wallet_name: [
          { name: 'Violas-Wallet', type: 'violas' }, { name: 'Bitcoin', type: 'BTC' }, { name: 'Libra-Wallet', type: 'libra' }
        ],
        extra_wallet: [],
        address_book: [],
        backup: true
      }))
      window.localStorage.setItem('type', intl.get('ViolasWallet'));
      this.props.history.push('/backup')
    }
  }
  render() {
    return (
      <div className="createIdentity">
        <header>
          <span onClick={() => {
            this.props.history.push('/welcome')
          }}><img src="/img/Combined Shape 2@2x.png" /></span>
          <span>{intl.get('Create Identity')}</span>
        </header>
        <section>
          <div className="form">
            <input type="text" placeholder={intl.get('Input Nickname')} onChange={(e) => this.getValue(e, 'name')} />
            <input type="password" placeholder={intl.get('Set Wallet Access Code')} onChange={(e) => this.getValue(e, 'pass1')} />
            <input type="password" placeholder={intl.get('Confirm Access Code')} onChange={(e) => this.getValue(e, 'pass2')} />
            <div className="btn" onClick={() => this.createFun()}>{intl.get('Create')}</div>
          </div>
        </section>
      </div>
    );
  }
}

export default CreateIdentity;
