import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import { inject, observer } from 'mobx-react';
import 'antd/dist/antd.css';
import vAccount from '../../../utils/violas';
import coinData from '../../../utils/currencyToken.json';
import Account from '../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
let bitcoin = require("bitcoinjs-lib");
let testnet = bitcoin.networks.testnet;
let aes256 = require('aes256');

@inject('index')
@observer

class AddCurrency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coindata: [],
            mne: '',
            isShow: false,
            value: '',
            name: '',
            ind: Number,
            balancedata:''
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    async componentDidMount() {
        if (window.localStorage.getItem('data')) {
            let decrypted = JSON.parse(window.localStorage.getItem('data'));
            let violas = new vAccount(decrypted.mne_arr);
            let newData = await this.props.index.updateCurCoin({
                addr: violas.address
            })
            let data = coinData.data.map((v, i) => {
                if (v.checked) {
                    return v;
                } else {
                    return Object.assign(v, { checked: false })
                }
            })
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < newData.length; j++) {
                    if (data[i].address.indexOf(newData[j]) == 0) {
                        data[i].checked = true;
                        break;
                    } else {
                        data[i].checked = false;
                    }
                }
            }
            this.setState({
                coindata: data,
                mne: decrypted.mne_arr
            })
            let balanceData;
            if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {
                let violas = new vAccount(decrypted.mne_arr);
                balanceData = await this.props.index.getBalance({
                    address: violas.address,
                    name: 'violas'
                })
                this.setState({
                    balancedata: balanceData.balance / 1e6
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
                let btc = new Account(decrypted.mne_arr, testnet);
                balanceData = await this.props.index.getBTCBalance({
                    address: btc.address,
                    page: 1,
                    name: 'BTC'
                })
                this.setState({
                    balancedata: balanceData.balance / 1e8
                })
            }
        } else {
            this.props.history.push('/welcome');
        }
    }
    onChange = (i, name) => {
        if(this.state.balancedata == 0){
            alert(intl.get('vtoken not enough'))
        }else{
            this.setState({
                isShow: true,
                ind: i,
                name: name
            })
        }
    }
    getValue = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    confirm = async () => {
        if (this.state.value == '') {
            alert(intl.get('Please input Access Code'))
        } else if (this.state.value != JSON.parse(window.localStorage.getItem('data')).password1) {
            alert(intl.get('Access Code does not match,please Re_input'))
        } else {
            this.setState({
                isShow: false
            })
            this.state.coindata[this.state.ind].checked = true;
            let violas = new vAccount(this.state.mne);
            // console.log(violas)
            let arr = await violas.publish(this.state.name);
            this.props.index.starVTranfer({
                signedtxn: arr,
                name: 'violas'
            })
        }

    }
    render() {
        let { coindata } = this.state;
        return (
            <div className="addCurrency">
                <header>
                    <span onClick={() => {
                        this.props.history.push({
                            pathname: '/home/wallet',
                            state: false
                        })
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Add Digital Currency')}</span>
                </header>
                <section>
                    <div className="classify">
                        <div className="eachcoin">
                            <div className="logo"><img src="/img/vio@2x.png" /></div>
                            <div className="coinDescr">
                                <h4>{window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'Vtoken' : null}</h4>
                                <p>{window.localStorage.getItem('type') == intl.get('ViolasWallet') ? 'violas' : null}</p>
                            </div>
                        </div>
                        {
                            coindata && coindata.map((v, i) => {
                                return <div className="eachcoin" key={i}>
                                    <div className="logo"><img src="/img/BTC@2x.png" /></div>
                                    <div className="coinDescr">
                                        <h4>{v.name}</h4>
                                        <p>{v.description}</p>
                                    </div>
                                    <div className="switch">
                                        {
                                            v.checked == false ? <img src="/img/编组 4复制 2@2x.png" onClick={() => this.onChange(i, v.name)} /> : <img src="/img/Rectangle 2@2x.png" />
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </section>
                {
                    this.state.isShow ? <div className="passDialog">
                        <div className="passContent">
                            <h4>{intl.get('This operation requires the consumption of gas fee, if you want to carry out this operation, please enter the password')}</h4>
                            <input type="password" placeholder={intl.get('Access Code')} onChange={(e) => this.getValue(e)} />
                            <div className="btns">
                                <span onClick={() => {
                                    this.setState({
                                        isShow: false
                                    })
                                }}>{intl.get('Cancel')}</span>
                                <span onClick={() => this.confirm()}>{intl.get('Confirm')}</span>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        );
    }
}

export default AddCurrency;
