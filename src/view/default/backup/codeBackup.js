import React, { Component } from 'react';
import '../default.scss';
import { inject, observer } from 'mobx-react';
import intl from 'react-intl-universal';
let aes256 = require('aes256');

@inject('index')
@observer

class CodeBackup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnes_arr: []
    }
  }
  componentWillMount() {
    intl.options.currentLocale = localStorage.getItem("local");
    this.forceUpdate();
  }
  componentDidMount() {
    let decrypted;
    if (window.sessionStorage.getItem('data')) {
      decrypted = JSON.parse(window.sessionStorage.getItem('data'));
      this.setState({ mnes_arr: decrypted.mne_arr.split(" ") });
    } else {
      this.props.history.push('/welcome');
    }
  }
  stateCode = () => {
    if (this.props.location.state.id) {
      if (this.props.location.state.id == 0) {
        this.props.history.push('/backup')
      } else if (this.props.location.state.id == 1) {
        this.props.history.push('/home/wallet')
      }
    } else {
      this.props.history.push('/backup')
    }
  }

  render() {
    return (
      <div className="codeBackup">
        <header>
          <span onClick={() => this.stateCode()}><img src="/img/Combined Shape 1@2x.png" /></span>
          <span>{intl.get('Backup Mnemonic Words')}</span>
        </header>
        <section>
          <div className="backupPaper">
            <h4>{intl.get('Please write down these words in order on a paper')}</h4>
            <div className="words">
              {
                this.state.mnes_arr && this.state.mnes_arr.map((v, i) => {
                  return <p key={i}>{v}</p>
                })
              }
            </div>
            <div className="warning">
              <div className="warnLogo"><img src="/img/编组 4slice@2x.png" /></div>
              <div className="warnDescr">
                <p>{intl.get('Do not make screenshot or copy to clipboard.')} </p>
                <p>{intl.get('It might be collected by a third party software')} </p>
                <p>{intl.get('to cause loss of funds.')}</p>
              </div>
            </div>
            <div className="btn" onClick={() => {
              this.props.history.push('/confirmWords')
            }}>
              {intl.get('Next')}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CodeBackup;
