import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import vAccount from '../../../utils/violas';
import Account from '../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
import coinData from '../../../utils/currencyToken.json';
import BScroll from 'better-scroll'
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
            balance:0,
            nameData: []
        }
    }
    componentWillMount() {
        if (window.sessionStorage.getItem('data')) {
            decrypted = JSON.parse(window.sessionStorage.getItem('data'));
        } else {
            this.props.history.push('/welcome');
        }
        intl.options.currentLocale = localStorage.getItem("local");
    }
    async componentDidMount() {
        let balanceData;
        if(!decrypted){
            this.props.history.push('/welcome');
        }else if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {
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
                    for (let z = 0; z < balanceData.modules.length; z++) {

                        if (coinsData[i].address.indexOf(data[j]) == 0) {
                            if (coinsData[i].address.indexOf(balanceData.modules[z].address) == 0) {
                                namData.push({
                                    name: coinsData[i].name,
                                    price: balanceData.modules[z].balance
                                });
                            }
                        }
                    }
                }
            }
            this.setState({
                balancedata: balanceData,
                nameData: namData,
                balance: balanceData.balance / 1e6,
                curWal: window.sessionStorage.getItem('data') && JSON.parse(window.sessionStorage.getItem('data')).name
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
                curWal: JSON.parse(window.sessionStorage.getItem('data')).wallet_name[2].name
            })
        } else if (window.localStorage.getItem('type') == intl.get('BTCWallet')) {
            let btc = new Account(decrypted.mne_arr, testnet);
            // console.log(btc)
            balanceData = await this.props.index.getBTCBalance({
                address: btc.address,
                page: 1,
                name: 'BTC'
            })
            this.setState({
                balancedata: balanceData,
                balance: balanceData && balanceData.balance / 1e8,
                curWal: JSON.parse(window.sessionStorage.getItem('data')).wallet_name[1].name
            })
        }
        if (window.localStorage.getItem('name')) {
            this.setState({
                curWal: window.localStorage.getItem('name')
            })
        }
    }
    getChange = () => {
        this.props.history.push('/walletSystem')
    }
    getBTCAddress() {
        let btc = new Account(decrypted.mne_arr, testnet)
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
            decrypted ?
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
                                <span>{balance ? balance : 0}</span><label>{
                                    window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                }</label>
                            </div>
                            <div className="userDescr">
                                <span>{curWal}</span>
                                    <span id='addressId'>{balancedata && balancedata.address}</span>
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
                                    pathname: '/record',
                                    state: {
                                        address: balancedata.address ? balancedata.address : this.getBTCAddress()
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
                                    <p ><label>{window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : 'BTC'}
                                    </label><span>{balance ? balance : 0}</span></p>
                                </div>
                                {
                                    window.localStorage.getItem('type') == intl.get('ViolasWallet') ? <div className="mList">
                                        {
                                            nameData && nameData.map((v, i) => {
                                                return <p key={i} onClick={() => {
                                                    this.props.history.push('/stablecoin')
                                                    window.localStorage.setItem('coinType', JSON.stringify({
                                                        name: v.name,
                                                        balance: v.price
                                                    }))
                                                }}><label>{v.name.toLowerCase()}</label><span>{v.price / 1e6}</span></p>
                                            })
                                        }
                                    </div> : null
                                }

                            </div>
                        </div>
                    </div>
                    {
                            JSON.parse(window.sessionStorage.getItem('data')).backup ? <div className="warning">
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
            </div>:<p>please login</p>
        );
    }

}

export default Wallet;
