import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { creat_account_mnemonic, get_address } from '../../../../utils/kulap-function';
import vAccount from '../../../../utils/violas';
import { timeStamp2String } from '../../../../utils/timer';
import Account from '../../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
let bitcoin = require("bitcoinjs-lib");
let testnet = bitcoin.networks.testnet;
let decrypted = JSON.parse(window.localStorage.getItem('data'));

@inject('index')
@observer

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordData: [],
            recordBData: []
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    async componentDidMount() {
        let arr = creat_account_mnemonic(decrypted.mne_arr)
        let addressStr = get_address(arr);
        if (window.localStorage.getItem('type') == intl.get('LibraWallet')) {
            let data = await this.props.index.getLibDealRecord({
                addr: addressStr,
                limit: 5,
                offset: 0
            })
            this.setState({
                recordData: data
            })
            console.log(this.state.recordData)
        } else if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {
            let violas = new vAccount(decrypted.mne_arr);
            let data = await this.props.index.getVioDealRecord({
                addr: violas.address,
                limit: 5,
                offset: 0
            })
            this.setState({
                recordData: data
            })
        } else if (window.localStorage.getItem('type') == intl.get('BTCWallet')) {
            let btc = new Account(decrypted.mne_arr, testnet);
            let data = await this.props.index.getBTCDealRecords({
                address: btc.address,
                page: 1,
                name: 'BTC'
            })
            this.setState({
                recordBData: data
            })
        }
    }
    render() {
        let { recordBData, recordData } = this.state;
        let btc = new Account(decrypted.mne_arr, testnet);
        return (
            <div className="record">
                <header>
                    <span onClick={() => {
                        this.props.history.push({
                            pathname: '/home/wallet',
                            state: false
                        })
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Transfer History')}</span>
                </header>
                <section>
                    {
                        recordData && recordData.map((v, i) => {
                            return <div className="recordDetail" key={i}>
                                <div className="title">
                                    <span>{intl.get('Date')}</span>
                                    <span>{intl.get('Amount')}</span>
                                    <span className='redC'>{intl.get('Transfer')}</span>
                                </div>
                                <div className="titleContent">
                                    <span>{timeStamp2String(v.expiration_time + '000')}</span>
                                    <span> {v.amount}
                                        {/* {
                                                window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                            } */}
                                    </span>
                                    <span>{
                                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                    }</span>
                                </div>
                                <div className="titleContent">
                                    <p>{v.address}</p>
                                    <p>{intl.get('Browser query')}</p>
                                </div>
                            </div>
                        })
                    }
                    {
                        recordBData && recordBData.map((v, i) => {
                            return <div className="recordDetail" key={i}>
                                <div className="title">
                                    <span>{intl.get('Date')}</span>
                                    <span>{intl.get('Amount')}</span>
                                    {
                                        v.inputs.map((val, ind) => {
                                            return val.prev_addresses.map((va, index) => {
                                                return <span key={i} className={va.address ? (va.address.indexOf(btc.address) == 0 ? 'redC' : 'greenC') : (va.indexOf(btc.address) == 0 ? 'redC' : 'greenC')}>{va.address ? (va.address.indexOf(btc.address) == 0 ? intl.get('Transfer') : intl.get('Receive')) : (va.indexOf(btc.address) == 0 ? intl.get('Transfer') : intl.get('Receive'))}</span>
                                            })
                                        })
                                    }
                                    {/* <span className={recordBData.recs[i]&&recordBData.recs[i] ? 'redC' : 'greenC'}>{recordBData.recs[i]&&recordBData.recs[i] ? intl.get('Transfer') : intl.get('Receive')}</span> */}
                                </div>
                                <div className="titleContent">
                                    <span>{timeStamp2String(v.block_time + '000')}</span>
                                    <span>{v.inputs_count} {
                                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                    }</span>
                                    <span>{
                                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                    }</span>
                                </div>
                                <div className="titleContent">
                                    <p>{v.hash}</p>
                                    <p>{intl.get('Browser query')}</p>
                                </div>
                            </div>
                        })
                    }
                </section>
            </div>
        );
    }
}

export default Record;
