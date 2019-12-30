import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { creat_account_mnemonic, get_address } from '../../../../utils/kulap-function';
import vAccount from '../../../../utils/violas';
import { timeStamp2String } from '../../../../utils/timer';
import Account from '../../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
import BScroll from 'better-scroll';
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
            recordBData: [],
            off:0,
            lim:5
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
        !(window.localStorage.getItem('data'))&&this.props.history.push('/welcome');
    }
    async getVoHistory(){
        let violas = new vAccount(decrypted.mne_arr);
        let data = await this.props.index.getVioDealRecord({
            addr: violas.address,
            limit: 5,
            offset: 0
        })
        this.setState({
            recordData: data
        })
    }
    async getLiHistory() {
        let arr = creat_account_mnemonic(decrypted.mne_arr)
        let addressStr = get_address(arr);
        let data = await this.props.index.getLibDealRecord({
            addr: addressStr,
            limit: this.state.lim,
            offset: this.state.off
        })
        this.setState({
            recordData: data
        })
    }
    async getBTCHistory(){
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
    async componentDidMount() {
        let that = this;
        let Bscroll = new BScroll('.sec',{
            probeType: 1,
            click: true,
            scrollbar: true,
            mouseWheel: true
        })
        if (window.localStorage.getItem('type') == intl.get('LibraWallet')) {
            this.getLiHistory();
        } else if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {
            this.getVoHistory();
        } else if (window.localStorage.getItem('type') == intl.get('BTCWallet')) {
            this.getBTCHistory();
        }
        Bscroll.on('scroll', function () {
            if (this.y < this.maxScrollY - 44) {
                this.scroller.setAttribute('down', '加载更多');
            } else if (this.y > this.maxScrollY - 44) {
                this.scroller.setAttribute('down', '上拉加载');
            }
        })
        Bscroll.on('scrollEnd', function () {
            if (this.scroller.getAttribute('down') == '加载更多') {
                this.scroller.setAttribute('down', '上拉加载');
                that.setState({
                    recordData: [],
                    recordBData: []
                })
                that.state.lim += that.state.lim;
                if (window.localStorage.getItem('type') == intl.get('LibraWallet')) {
                    that.getLiHistory();
                } else if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {
                    that.getVoHistory();
                } else if (window.localStorage.getItem('type') == intl.get('BTCWallet')) {
                    that.getBTCHistory();
                }
            }
        })
    }
    e7e8(_num){
        let temp=_num;
        let temp1=(_num).toString().split('-')[1]
        if(temp1 && temp1==8){
            temp=_num.toFixed(8);
        }else if(temp1 && temp1==7)(
            temp=_num.toFixed(7)
        )
        return (temp)
    }
    render() {
        let { recordBData, recordData } = this.state;
        let btc = new Account(decrypted&&decrypted.mne_arr, testnet);
        console.log(recordData, recordBData,'333')
        return (
            btc&&
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
                <section className="sec">
                    <div className="secContent" down={recordData.length >= 6 ? '上拉加载' : null}>
                    {
                        recordData && recordData.map((v, i) => {
                            return <div className="recordDetail" key={i}>
                                <div className="title">
                                    <span>{intl.get('Date')}</span>
                                    <span>{intl.get('Amount')}</span>
                                    <span className={v.receiver == this.props.location.state.address ? 'greenC' : 'redC'}>{v.receiver == this.props.location.state.address ? intl.get('Receive') : intl.get('Transfer')}</span>
                                </div>
                                <div className="titleContent">
                                    <span>{timeStamp2String(v.expiration_time + '000')}</span>
                                    <span> {window.localStorage.getItem('type') == intl.get('LibraWallet') ? (v.value / 1e6) : (v.amount / 1e6)}
                                        {/* {
                                                window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                            } */}
                                    </span>
                                    <span>{
                                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                    }</span>
                                </div>
                                <div className="titleContent">
                                    <p>{window.localStorage.getItem('type') == intl.get('ViolasWallet') ? v.receiver : window.localStorage.getItem('type') == intl.get('LibraWallet') ? v.address : null}</p>
                                    <p onClick={()=>{
                                        if (window.localStorage.getItem('type') == intl.get('ViolasWallet')){
                                            window.open('http://47.52.66.26:30000/app/Violas_version/' + v.version)
                                        } else if (window.localStorage.getItem('type') == intl.get('LibraWallet')){
                                            window.open('http://47.52.66.26:30000/app/Libra_dealbox/' + v.version)
                                        }
                                       
                                    }}>{intl.get('Browser query')}</p>
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
                                    <span>{this.e7e8(v.inputs_count/1e8)} {
                                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                    }</span>
                                    <span>{
                                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'vtoken' : window.localStorage.getItem('type') == intl.get('LibraWallet') ? 'libra' : window.localStorage.getItem('type') == intl.get('BTCWallet') ? 'BTC' : null
                                    }</span>
                                </div>
                                <div className="titleContent">
                                    <p>{v.hash}</p>
                                    <p onClick={() => {
                                        if (window.localStorage.getItem('type') == intl.get('BTCWallet')) {
                                            window.open('http://47.52.66.26:30000/app/tBTC_transaction/' + v.hash)
                                        } 

                                    }}>{intl.get('Browser query')}</p>
                                </div>
                            </div>
                        })
                    }
                    </div>
                </section>
            </div>
        );
    }
}

export default Record;
