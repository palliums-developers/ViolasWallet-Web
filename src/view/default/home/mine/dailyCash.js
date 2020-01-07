import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { creat_account_mnemonic, get_address } from '../../../../utils/kulap-function';
import vAccount from '../../../../utils/violas';
import Account from '../../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
let bitcoin = require("bitcoinjs-lib");
let testnet = bitcoin.networks.testnet;
let decrypted;

@inject('index')
@observer

class DailyCash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balancedata1: [],
            balancedata2: []
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
        if (window.sessionStorage.getItem('data')) {
            decrypted = JSON.parse(window.sessionStorage.getItem('data'));
        }else{
            this.props.history.push('/welcome');
        }
    }
    async componentDidMount() {
        if(decrypted){
            let arr = creat_account_mnemonic(decrypted.mne_arr);
            let violas = new vAccount(decrypted.mne_arr);
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
    }
    getVioAddress() {
        let violas = new vAccount(decrypted.mne_arr);
        return violas.address;
    }
    // getBTCAddress(){
    //     let btc = new Account(decrypted.mne_arr);
    //     return btc.address;
    // }
    getBTCAddressData() {
        let btc = new Account(decrypted.mne_arr, testnet);
        return btc.address
    }
    render() {
        let { balancedata1, balancedata2 } = this.state;
        return (
            window.sessionStorage.getItem('data')&&
            <div className="dailyCash">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/home/mine')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Manage Wallet')}</span>
                    <span onClick={() => {
                        this.props.history.push('/addPurse')
                    }}><img src="/img/Close 2@2x.png" /></span>
                </header>
                <section>
                    <div className="identityWallet">
                        <h4>{intl.get('Identity Wallet')}</h4>
                        {
                            JSON.parse(window.sessionStorage.getItem('data')).wallet_name && JSON.parse(window.sessionStorage.getItem('data')).wallet_name.map((v, i) => {
                                return <div key={i} className={v.type == 'violas' ? 'identityContent vioBack' : v.type == 'libra' ? 'identityContent libBack' : v.type == 'BTC' ? 'identityContent btcBack' : null} >
                                    <div className="title">
                                        <label>{v.name}</label>
                                        <span onClick={() => {
                                            this.props.history.push({
                                                pathname: '/manage1',
                                                state: {
                                                    type: v.name,
                                                    addr: v.type == 'violas' ? balancedata1.address : v.type == 'libra' ? balancedata2.address : v.type == 'BTC' ? this.getBTCAddressData() : null
                                                }
                                            })
                                        }}><img src="/img/编组 142@2x.png" /></span>
                                    </div>
                                    <p>{v.type == 'violas' ? balancedata1.address : v.type == 'libra' ? balancedata2.address : v.type == 'BTC' ? this.getBTCAddressData() : null}</p>
                                </div>
                            })
                        }
                        {/* <div className="identityContent">
                          <div className="title">
                              <label>{JSON.parse(window.localStorage.getItem('data')).wallet_name[0].name}</label>
                              <span><img src="/img/编组 142@2x.png"/></span>
                          </div>
                          <p>{balancedata1.address}</p>
                       </div>
                       <div className="identityContent identityContent1">
                          <div className="title">
                              <label>{JSON.parse(window.localStorage.getItem('data')).wallet_name[1].name}</label>
                              <span><img src="/img/编组 142@2x.png"/></span>
                          </div>
                          <p>{balancedata2.address}</p>
                       </div>
                       <div className="identityContent identityContent2">
                          <div className="title">
                              <label>{JSON.parse(window.localStorage.getItem('data')).wallet_name[2].name}</label>
                              <span><img src="/img/编组 142@2x.png"/></span>
                          </div>
                          <p>{balancedata2.address}</p>
                       </div>*/}
                    </div>
                    <div className="identityWallet toIdentity">
                        <h4>{intl.get('Create/Import')}</h4>
                        {
                            JSON.parse(window.sessionStorage.getItem('data')).extra_wallet && JSON.parse(window.sessionStorage.getItem('data')).extra_wallet.map((v, i) => {
                                return <div className={v.type == 'violas' ? 'identityContent vioBack' : v.type == 'libra' ? 'identityContent libBack' : v.type == 'BTC' ? 'identityContent btcBack' : null} key={i}>
                                    <div className="title">
                                        <label>{v.name}</label>
                                        <span onClick={() => {
                                            this.props.history.push({
                                                pathname: '/manage1',
                                                state: {
                                                    type: v.name,
                                                    addr: v.type == 'violas' ? balancedata1.address : v.type == 'libra' ? balancedata2.address : v.type == 'BTC' ? this.getBTCAddressData() : null
                                                }
                                            })
                                        }}><img src="/img/编组 142@2x.png" /></span>
                                    </div>
                                    <p>{
                                        v.type == 'violas' ? get_address(creat_account_mnemonic(decrypted.mne_arr)) : v.type == 'libra' ?
                                            this.getVioAddress() : v.type == 'BTC' ? this.getBTCAddressData() : null
                                    }</p>
                                </div>
                            })
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default DailyCash;
