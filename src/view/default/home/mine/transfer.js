import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import 'antd-mobile/dist/antd-mobile.css';
import { Slider, WingBlank } from 'antd-mobile';
import vAccount from '../../../../utils/violas';
import Account from '../../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
let bitcoin = require("bitcoinjs-lib");
let testnet = bitcoin.networks.testnet;
let fee = 1;
@inject('index')
@observer

class Transfar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 6,
            violasAmount: '',
            libraAmount: '',
            btcAmount: '',
            address1: '',
            address2: '',
            address3: '',
            balancedata:[],
            balance:Number
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    async componentDidMount() {
        if (this.props.index.type) {
            if (this.props.index.type == 'vtoken' || 'lib') {
                this.setState({
                    address1: this.props.index.sweepCode,
                    address2: this.props.index.sweepCode
                })
            } else if (this.props.index.type == 'BTC') {
                this.setState({
                    address3: this.props.index.sweepCode
                })
            }
        }
        let decrypted = JSON.parse(window.localStorage.getItem('data'));
        let balanceData;
        if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {
            let violas = new vAccount(decrypted.mne_arr);
            balanceData = await this.props.index.getBalance({
                address: violas.address,
                name: 'violas'
            })
            this.setState({
                balancedata: balanceData.balance/1e6
            })

        } else if (window.localStorage.getItem('type') == intl.get('LibraWallet')) {
            let libra = new vAccount(decrypted.mne_arr);
            balanceData = await this.props.index.getBalance({
                address: libra.address,
                name: 'libra'
            })
            this.setState({
                balancedata: balanceData.balance / 1e6
            })
        } else if (window.localStorage.getItem('type') == intl.get('BTCWallet')) {
            let btc = new Account(decrypted.mne_arr,testnet);
            balanceData = await this.props.index.getBTCBalance({
                address: btc.address,
                page:1,
                name: 'BTC'
            })
            this.setState({
                balancedata: balanceData.balance / 1e8
            })
        }
    }
    log = (name) => {
        return (value) => {
            //   console.log(`${name}: ${value}`);
            this.setState({
                rate: value
            })

        };
    }
    //violas转账
    getViolasAm = (e, way) => {
        if (way == 'amount') {
            this.setState({
                violasAmount: e.target.value
            })
        } else if (way == 'address') {
            this.setState({
                address1: e.target.value
            })
        }
    }
    //libra转账
    getLibraAm = (e, way) => {
        if (way == 'amount') {
            this.setState({
                libraAmount: e.target.value
            })
        } else if (way == 'address') {
            this.setState({
                address2: e.target.value
            })
        }
    }

    //BTC转账
    getBtcAm = (e, way) => {
        if (way == 'amount') {
            this.setState({
                btcAmount: e.target.value
            })
        } else if (way == 'address') {
            this.setState({
                address3: e.target.value
            })
        }
    }
    confirmTrans = async (type) => {
        let { violasAmount, libraAmount, btcAmount, address1, address2, address3 } = this.state;
        let decrypted = JSON.parse(window.localStorage.getItem('data'));
        let transFar;
        if (type == 'violas') {
            let violas = new vAccount(decrypted.mne_arr);
            transFar = await violas.transaction_violas(address1, violasAmount, 'violas')
            let data = await this.props.index.starVTranfer({
                signedtxn: transFar,
                name:type
            })
            if(data.message == 'ok'){
               alert(intl.get('Transfer success')+'!!!');
               this.props.history.push('/home');
            }else{
                alert(intl.get('Transfer failed')+'!!!');
            }
        } else if (type == 'libra') {
            let libra = new vAccount(decrypted.mne_arr);
            transFar = await libra.transaction_libra(address2, libraAmount);
            let data = await this.props.index.starVTranfer({
                signedtxn: transFar,
                name:type
            })
            if(data.message == 'ok'){
                alert(intl.get('Transfer success')+'!!!');
                this.props.history.push('/home');
            }else{
                alert(intl.get('Transfer failed')+'!!!');
            }
            
        } else if (type == 'BTC') {
            let account = new Account(decrypted.mne_arr, testnet);
            transFar = await account.transaction( address3,btcAmount,fee)
            console.log(transFar)
        }
    }

    render() {
        let { balancedata } = this.state;
        return (
            <div className="transfar">
                <header>
                    <span onClick={() => {
                        this.props.history.push({
                            pathname: '/home/wallet',
                            state: false
                        })
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    {
                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? <span>{intl.get('Transfer Vtoken')}</span> : window.localStorage.getItem('type') == intl.get('BTCWallet') ? <span>{intl.get('Transfer BTC')}</span> : window.localStorage.getItem('type') == intl.get('LibraWallet') ? <span>{intl.get('Transfer libra')}</span> : null
                    }

                </header>
                <section>
                    {
                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                    <span>Vtoken</span>
                                    <span>{intl.get('Balance')}：<s>{balancedata}</s> Vtoken</span>
                                </div>
                                <input type="text" placeholder={intl.get('Input Amount')} onChange={(e) => this.getViolasAm(e, 'amount')} />
                                <div className="title">
                                    <span>{intl.get('Receving Address')}</span>
                                    <span>{intl.get('Address Book')}</span>
                                </div>
                                <div className="ipt">
                                    <input type="text" placeholder={intl.get('Input Receving Address')} onChange={(e) => this.getViolasAm(e, 'address')} value={this.state.address1} />
                                    <span onClick={() => {
                                        this.props.history.push('/sweepCode1')
                                    }}><img src="/img/编组 3复制@2x.png" /></span>
                                </div>
                            </div>
                            <div className="fees">
                                <div className="title">
                                    <span>{intl.get('Transaction Fee')}</span>
                                </div>
                                <div className="speed">
                                    <p className="sub-title">{intl.get('Slow')}</p>
                                    <p className="sub-title">{intl.get('Fast')}</p>
                                </div>
                                <WingBlank size="lg">

                                    <Slider
                                        style={{ marginLeft: 30, marginRight: 30 }}
                                        defaultValue={6}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </WingBlank>
                                <div className="rate">{this.state.rate / 100000} Vtoken</div>
                            </div>
                            <div className="btn" onClick={() => this.confirmTrans('violas')}>
                            {intl.get('Confirm Transfer')}
                        </div>
                        </div> : window.localStorage.getItem('type') == intl.get('BTCWallet') ? <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                    <span>BTC</span>
                                    <span>{intl.get('Input Amount')}：<s>{balancedata}</s> BTC</span>
                                </div>
                                <input type="text" placeholder={intl.get('Input Amount')} onChange={(e) => this.getBtcAm(e, 'amount')} />
                                <div className="title">
                                    <span>{intl.get('Receving Address')}</span>
                                    <span>{intl.get('Address Book')}</span>
                                </div>
                                <div className="ipt">
                                    <input type="text" placeholder={intl.get('Input Receving Address')} onChange={(e) => this.getBtcAm(e, 'address')} value={this.state.address3} />
                                    <span onClick={() => {
                                        this.props.history.push('/sweepCode1')
                                    }}><img src="/img/编组 3复制@2x.png" /></span>
                                </div>
                            </div>
                            <div className="fees">
                                <div className="title">
                                    <span>{intl.get('Transaction Fee')}</span>
                                </div>
                                <div className="speed">
                                    <p className="sub-title">{intl.get('Slow')}</p>
                                    <p className="sub-title">{intl.get('Fast')}</p>
                                </div>
                                <WingBlank size="lg">

                                    <Slider
                                        style={{ marginLeft: 30, marginRight: 30 }}
                                        defaultValue={6}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </WingBlank>
                                <div className="rate">{this.state.rate / 100000} BTC</div>
                            </div>
                            <div className="btn" onClick={() => this.confirmTrans('BTC')}>
                                {intl.get('Confirm Transfer')}
                        </div>
                        </div> : window.localStorage.getItem('type') == intl.get('LibraWallet') ? <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                    <span>Lib</span>
                                    <span>{intl.get('Input Amount')}：<s>{balancedata}</s> Lib</span>
                                </div>
                                <input type="text" placeholder={intl.get('Input Amount')} onChange={(e) => this.getLibraAm(e, 'amount')} />
                                <div className="title">
                                    <span>{intl.get('Receving Address')}</span>
                                    <span>{intl.get('Address Book')}</span>
                                </div>
                                <div className="ipt">
                                    <input type="text" placeholder={intl.get('Input Receving Address')} onChange={(e) => this.getLibraAm(e, 'address')} value={this.state.address2} />
                                    <span onClick={() => {
                                        this.props.history.push('/sweepCode1')
                                    }}><img src="/img/编组 3复制@2x.png" /></span>
                                </div>
                            </div>
                            <div className="fees">
                                <div className="title">
                                    <span>{intl.get('Transaction Fee')}</span>
                                </div>
                                <div className="speed">
                                    <p className="sub-title">{intl.get('Slow')}</p>
                                    <p className="sub-title">{intl.get('Fast')}</p>
                                </div>
                                <WingBlank size="lg">

                                    <Slider
                                        style={{ marginLeft: 30, marginRight: 30 }}
                                        defaultValue={6}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </WingBlank>
                                <div className="rate">{this.state.rate / 100000} Lib</div>
                            </div>
                            <div className="btn" onClick={() => this.confirmTrans('libra')}>
                                {intl.get('Confirm Transfer')}
                        </div>
                        </div> : null
                    }
                </section>
            </div>
        );
    }
}

export default Transfar;
