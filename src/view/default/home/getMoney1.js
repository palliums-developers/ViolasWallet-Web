import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { creat_account_mnemonic, get_address } from '../../../utils/kulap-function'
import vAccount from '../../../utils/violas';
import intl from 'react-intl-universal';
let QRCode = require('qrcode-react');

@inject('index')
@observer

class GetMoney1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinData: {}
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    async componentDidMount() {
        if(window.localStorage.getItem('coinType')){
            this.setState({
                coinData: JSON.parse(window.localStorage.getItem('coinType'))
            })
            let decrypted = JSON.parse(window.sessionStorage.getItem('data'));
            let violas = new vAccount(decrypted.mne_arr);
            let balanceData = await this.props.index.getBalance({
                address: violas.address,
                name: 'violas'
            })
            this.setState({
                balancedata: balanceData
            })
        }else{
            this.props.history.push('/welcome');
        }
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
        let { balancedata, coinData } = this.state;
        return (
            <div className="getMoney">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/stablecoin')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Receive')}</span>
                </header>
                <section>
                    <div className="box">
                        <h3>{intl.get('Receving Address')}</h3>
                        <div className="code">
                            <QRCode value={`${coinData.name}:${balancedata && balancedata.address}`} size={164} />
                        </div>
                        <div className="wName">
                            <label>{coinData.name}</label><span></span>
                        </div>
                        <p id='addressId'>{balancedata && balancedata.address}</p>
                        <div className="btn" onClick={() => this.copyUrl2()}>{intl.get('Copy Address')}</div>
                    </div>
                </section>
            </div>
        );
    }
}

export default GetMoney1;
