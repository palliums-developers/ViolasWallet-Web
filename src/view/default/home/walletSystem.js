import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { creat_account_mnemonic, get_address } from '../../../utils/kulap-function';
import vAccount from '../../../utils/violas';
import Account from '../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
let bitcoin = require("bitcoinjs-lib");
let testnet = bitcoin.networks.testnet;
let decrypted = JSON.parse(window.localStorage.getItem('data'));
@inject('index')
@observer

class WalletSystem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balancedata1: [],
            balancedata2: [],
            balancedata3: [],
            type: '',
            types: ''
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    async componentDidMount() {
        if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {
            this.setState({
                types: 'violas'
            })
        } else if (window.localStorage.getItem('type') == intl.get('LibraWallet')) {
            this.setState({
                types: 'libra'
            })
        } else if (window.localStorage.getItem('type') == intl.get('BTCWallet')) {
            this.setState({
                types: 'BTC'
            })
        }
        let arr = creat_account_mnemonic(decrypted.mne_arr);
        let violas = new vAccount(decrypted.mne_arr);
        let btc = new Account(decrypted.mne_arr);
        let balanceData1 = await this.props.index.getBalance({
            address: violas.address,
            name: 'violas'
        })
        this.setState({
            balancedata1: balanceData1
        })
        let addressStr = get_address(arr);
        let balanceData2 = await this.props.index.getBalance({
            address: addressStr,
            name: 'libra'
        })
        this.setState({
            balancedata2: balanceData2
        })
    }
    getVioAddress() {
        let violas = new vAccount(decrypted.mne_arr);
        return violas.address;
    }
    getBTCAddress() {
        let btc = new Account(decrypted.mne_arr, testnet);
        return btc.address;
    }
    getBTCAddressData() {
        let btc = new Account(decrypted.mne_arr, testnet);
        return btc.address
    }
    getWallets = (type) => {
        if (type) {
            this.setState({
                type: ''
            })
        }
        if (type == 'violas') {
            this.setState({
                types: 'violas'
            }, () => {
                this.props.index.changePurse(intl.get('ViolasWallet'))
            })

        } else if (type == 'libra') {
            this.setState({
                types: 'libra'
            }, () => {
                this.props.index.changePurse(intl.get('LibraWallet'))
            })
        } else if (type == 'BTC') {
            this.setState({
                types: 'BTC'
            }, () => {
                this.props.index.changePurse(intl.get('BTCWallet'))
            })
        }
    }
    getWallet = (type) => {
        if (type) {
            this.setState({
                types: ''
            })
        }
        if (type == 'violas') {
            this.setState({
                type: 'violas'
            }, () => {
                this.props.index.changePurse(intl.get('ViolasWallet'))
            })

        } else if (type == 'libra') {
            this.setState({
                type: 'libra'
            }, () => {
                this.props.index.changePurse(intl.get('LibraWallet'))
            })
        } else if (type == 'BTC') {
            this.setState({
                type: 'BTC'
            }, () => {
                this.props.index.changePurse(intl.get('BTCWallet'))
            })
        }
    }
    render() {
        let { balancedata1, balancedata2 } = this.state;
        return (
            <div className="walletSystem">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/home/wallet')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Select Wallet Category')}</span>

                </header>
                <section>
                    <div className="left">
                        <span><img src="/img/menu@2x.png" /></span>
                        <span><img src="/img/vio@2x.png" /></span>
                        <span><img src="/img/lib@2x.png" /></span>
                        <span><img src="/img/BTC@2x.png" /></span>
                    </div>
                    <div className="right">
                        <div className="rightContent">
                            <div className="identityWallet">
                                <h4>{intl.get('Identity Wallet')}</h4>
                                {
                                    JSON.parse(window.localStorage.getItem('data')).wallet_name && JSON.parse(window.localStorage.getItem('data')).wallet_name.map((v, i) => {
                                        return <div key={i} className={v.type == 'violas' ? 'identityContent vioBack' : v.type == 'libra' ? 'identityContent libBack' : v.type == 'BTC' ? 'identityContent btcBack' : null} onClick={() => this.getWallets(v.type)}>
                                            <div className="title">
                                                <label>{v.name}</label>
                                                <span className={this.state.types == v.type ? 'act' : ''}></span>
                                            </div>
                                            <p>{v.type == 'violas' ? balancedata1.address : v.type == 'libra' ? balancedata2.address : v.type == 'BTC' ? this.getBTCAddressData() : null}</p>
                                        </div>
                                    })
                                }

                                {/* <div className="identityContent" onClick={()=>{
                           this.props.index.changePurse(intl.get('ViolasWallet'))
                       }}>
                          <div className="title">
                              <label>{JSON.parse(window.localStorage.getItem('data')).wallet_name[0].name}</label>
                              <span className={window.localStorage.getItem('type')=="Violas钱包"?'act':''}></span>
                          </div>
                          <p>{balancedata1.address}</p>
                       </div>
                       <div className="identityContent identityContent1"  onClick={()=>{
                           this.props.index.changePurse(intl.get('BTCWallet'))
                       }}>
                          <div className="title">
                              <label>{JSON.parse(window.localStorage.getItem('data')).wallet_name[1].name}</label>
                              <span className={window.localStorage.getItem('type')=="BTC钱包"?'act':''}></span>
                          </div>
                          <p>{balancedata2.address}</p>
                       </div>
                       <div className="identityContent identityContent2" onClick={()=>{
                           this.props.index.changePurse(intl.get('LibraWallet'))
                       }}>
                          <div className="title">
                              <label>{JSON.parse(window.localStorage.getItem('data')).wallet_name[2].name}</label>
                              <span className={window.localStorage.getItem('type')=="Libra钱包"?'act':''}></span>
                          </div>
                          <p>{balancedata2.address}</p>
                       </div>
                    </div> */}
                            </div>
                            <div className="identityWallet toIdentity">
                                <h4>{intl.get('Create/Import')}</h4>
                                {
                                    JSON.parse(window.localStorage.getItem('data')).extra_wallet && JSON.parse(window.localStorage.getItem('data')).extra_wallet.map((v, i) => {
                                        return <div key={i} className={v.type == 'violas' ? 'identityContent vioBack' : v.type == 'libra' ? 'identityContent libBack' : v.type == 'BTC' ? 'identityContent btcBack' : null} onClick={() => this.getWallet(v.type)}>
                                            <div className="title">
                                                <label>{v.name}</label>
                                                <span className={this.state.type == v.type ? 'act' : ''}></span>
                                            </div>
                                            <p>{
                                                v.type == 'violas' ? get_address(creat_account_mnemonic(decrypted.mne_arr)) : v.type == 'libra' ?
                                                    this.getVioAddress() : v.type == 'BTC' ? this.getBTCAddress() : null
                                            }</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default WalletSystem;
