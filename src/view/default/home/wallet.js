import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import vAccount from '../../../utils/violas';
import Account from '../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
import coinData from '../../../utils/currencyToken.json';
let bitcoin = require("bitcoinjs-lib");
let testnet = bitcoin.networks.testnet;
let aes256 = require('aes256');
let decrypted;

@inject('index')
@observer

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            balancedata: [],
            curWal: '',
            dealdata: {},
            coindata: [],
            balance: Number,
            nameData: []
        }
    }
    componentWillMount() {
        if (window.localStorage.getItem('data')) {
            decrypted = JSON.parse(window.localStorage.getItem('data'));
        }
        intl.options.currentLocale = localStorage.getItem("local");
    }
    async componentDidMount() {
        let balanceData;
        if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {

            let violas = new vAccount(decrypted.mne_arr);
            let data = await this.props.index.updateCurCoin({
                addr: violas.address
            })
            let coinAddr = data.join(',');
            let balanceData = await this.props.index.getBalance({
                address: violas.address,
                name: 'violas',
                modu: coinAddr
            })
            let coinsData = coinData.data;
            let namData = [];
            for (let i = 0; i < coinsData.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (coinsData[i].address.indexOf(data[j]) == 0) {
                        namData.push(coinsData[i].name);
                        break;
                    }
                }
            }

            this.setState({
                balancedata: balanceData,
                nameData: namData,
                balance: balanceData.balance / 1e6,
                curWal: JSON.parse(window.localStorage.getItem('data')).name
            })
        } else if (window.localStorage.getItem('type') == intl.get('LibraWallet')) {
            let libra = new vAccount(decrypted.mne_arr);
            balanceData = await this.props.index.getBalance({
                address: libra.address,
                name: 'libra'
            })
            this.setState({
                balancedata: balanceData,
                balance: balanceData.balance / 1e6,
                curWal: JSON.parse(window.localStorage.getItem('data')).wallet_name[2].name
            })
        } else if (window.localStorage.getItem('type') == intl.get('BTCWallet')) {
            // console.log(JSON.parse(window.localStorage.getItem('data')).wallet_name[1].name)
            let btc = new Account(decrypted.mne_arr, testnet);
            // console.log(btc)
            balanceData = await this.props.index.getBTCBalance({
                address: btc.address,
                page: 1,
                name: 'BTC'
            })
            this.setState({
                balancedata: balanceData,
                balance: balanceData.balance / 1e8,
                curWal: JSON.parse(window.localStorage.getItem('data')).wallet_name[1].name
            })
        }
    }
    getChange = () => {
        this.props.history.push('/walletSystem')
    }
    getBTCAddress() {
        let btc = new Account(decrypted.mne_arr, testnet);
        return btc.address
    }
    copyUrl2 = () => {
        let text = document.getElementById("addressId");
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        document.execCommand("Copy"); // 执行浏览器复制命令
    }
    render() {
        let { balancedata, curWal, nameData, balance } = this.state;
        return (
            <div className="wallet">
                <header>
                    <div id="select">
                        <div onClick={() => this.getChange()}><label>{window.localStorage.getItem('type')}</label><img src="/img/路径 3@2x.png" /></div>
                    </div>
                    <span onClick={() => {
                        this.props.history.push('/sweepcode')
                    }}><img src="/img/编组 3@2x.png" /></span>
                </header>

                <section>
                    <div className="walletContent">
                        <div className="showBanlance">
                            <div className="title">
                                <span>{intl.get('Current Balances')}</span>
                                <span onClick={() => {
                                    this.props.history.push('/manage')
                                }}><img src="/img/编组 14@2x.png" /></span>
                            </div>
                            <div className="banlanceDescr">
                                <span>{balance}</span><label>{
                                    window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                }</label>
                            </div>
                            <div className="userDescr">
                                <span>{curWal}</span>
                                <span id='addressId'>{balancedata.address ? balancedata.address : this.getBTCAddress()}</span>
                                <span onClick={() => this.copyUrl2()}><img src="/img/Fill 3@2x.png" /></span>
                            </div>

                        </div>
                        <div className="btns">
                            <dl onClick={() => {
                                this.props.history.push('/transfar')
                            }}>
                                <dt><img src="/img/编组@2x.png" /></dt>
                                <dd>{intl.get('Transfer')}</dd>
                            </dl>
                            <span></span>
                            <dl onClick={() => {
                                this.props.history.push('/getMoney')
                            }}>
                                <dt><img src="/img/编组 .png" /></dt>
                                <dd>{intl.get('Receive')}</dd>
                            </dl>
                        </div>
                        <div className="dealRecord">
                            <div className="title" onClick={() => {
                                this.props.history.push({
                                    pathname:'/record',
                                    state:{
                                        address:balancedata.address ? balancedata.address : this.getBTCAddress()
                                    }
                                })
                            }}>
                                <span>{intl.get('Transfer History')}</span>
                                <span><img src="/img/路径复制 4@2x.png" /></span>
                            </div>
                            <div className="dealContent">
                                <div className="head">
                                    <label>{intl.get('Fund')}</label>
                                    {
                                        window.localStorage.getItem('type') && window.localStorage.getItem('type') == intl.get('ViolasWallet') ? <span onClick={() => {
                                            this.props.history.push('/addCurrency')
                                        }}><img src="/img/编组 9@2x.png" />
                                        </span> : null
                                    }
                                </div>
                                <div className="mList">
                                    <p ><label>{window.localStorage.getItem('type')==intl.get('ViolasWallet')?'vtoken':window.localStorage.getItem('type')==intl.get('LibraWallet')?'libra':'BTC'}
                                    </label><span>{balance}</span></p>
                                </div>
                                {
                                    window.localStorage.getItem('type') == intl.get('ViolasWallet') ? <div className="mList">
                                        {
                                            balancedata.modules && balancedata.modules.map((v, i) => {
                                                return <p key={i} onClick={() => {
                                                    this.props.history.push('/stablecoin')
                                                    window.localStorage.setItem('coinType', JSON.stringify({
                                                        name: nameData && nameData[i],
                                                        balance: v.balance
                                                    }))
                                                }}><label>{nameData && nameData[i].toLowerCase()}</label><span>{v.balance / 1e6}</span></p>
                                            })
                                        }
                                    </div> : null
                                }

                            </div>
                        </div>
                    </div>
                    {
                        JSON.parse(window.localStorage.getItem('data')).backup ? <div className="warning">
                            <div className="head">
                                <label><img src="/img/编组 5@2x.png" /></label>
                                <span>{intl.get('Safety Reminder')}</span>
                            </div>
                            <div className="warnText">
                                <p>{intl.get('You have not backup your Identity Mnemonic Words，Please backup your Mnemonic Words')}</p>
                                <p>{intl.get('Mnemonic Words can be used to recover funds in the Identity Wallet in case you forgot Access Code, removed the App, lost phone.')}</p>
                                <div className="btn" onClick={() => {
                                    this.props.history.push({
                                        pathname: '/codeBackup',
                                        state: {
                                            id: 0
                                        }
                                    })
                                }}>{intl.get('Backup Now')}</div>
                            </div>
                        </div> : null
                    }
                </section>
            </div>
        );
    }

}

export default Wallet;
