import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import { Modal } from 'antd-mobile';
import vAccount from '../../../../utils/violas';
import Account from '../../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
let aes256 = require('aes256');
let bitcoin = require("bitcoinjs-lib");
let testnet = bitcoin.networks.testnet;
const prompt = Modal.prompt;
class Manage1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            address: '',
            wallet: '',
            curWal: []
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    componentDidMount() {
        if (this.props.location.state) {
            let { type, addr } = this.props.location.state;
            this.setState({
                curWal: type,
                address: addr
            })
        }else{
            this.props.history.push('/welcome');
        }
    }
    getValue = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    confirm = async () => {
        if (this.state.value == '') {
            alert(intl.get('Please input Access Code') + '!!!')
        } else if (this.state.value != JSON.parse(window.localStorage.getItem('data')).password1) {
            alert(intl.get('Access Code does not match,please Re_input') + '!!!')
        } else {
            this.setState({
                isShow: false
            })
            let userInfo = JSON.parse(window.localStorage.getItem('data'));
            let data = {
                name: userInfo.name,
                password1: userInfo.password1,
                mne_arr: userInfo.mne_arr,
                wallet_name: userInfo.wallet_name,
                extra_wallet: userInfo.extra_wallet,
                address_book: userInfo.address_book,
                backup: userInfo.backup
            }
            var jsonData = aes256.encrypt(userInfo.password1, JSON.stringify(data));
            var a = document.createElement("a");
            var file = new Blob([jsonData], { type: 'text/plain' });
            a.href = URL.createObjectURL(file);
            a.download = userInfo.name + '.json';
            a.click();
        }

    }
    delete = () => {
        window.localStorage.clear()
        this.props.history.push('/app')
    }
    render() {
        return (
            <div className="manage">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/dailyCash')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Manage')}</span>
                </header>
                <section>
                    <div className="lists">
                        <div className="list" onClick={() => {
                            this.props.history.push({
                                pathname: '/detailWallet1',
                                state: {
                                    name: this.state.curWal,
                                    address: this.state.address
                                }
                            })
                        }}>
                            <div className="listContent">
                                <h4>{this.state.curWal}</h4>
                                <p>{this.state.address}</p>
                            </div>
                            <div className="rightLogo"><img src="/img/路径复制 10@2x.png" /></div>
                        </div>
                        <div className="list" onClick={() => {
                            this.setState({
                                isShow: true
                            })
                        }}>
                            <h4>{intl.get('Export encrypted file')}</h4>
                            <div className="rightLogo"><img src="/img/路径复制 10@2x.png" /></div>
                        </div>
                    </div>
                    <div className="btn" onClick={() => this.delete()}>{intl.get('Remove Wallet')}</div>
                </section>
                {
                    this.state.isShow ? <div className="passDialog">
                        <div className="passContent">
                            <h4>{intl.get('Input  Access Code')}</h4>
                            <input type="text" placeholder="密码" onChange={(e) => this.getValue(e)} />
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

export default Manage1;
