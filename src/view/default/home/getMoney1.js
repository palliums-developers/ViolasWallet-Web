import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import { creat_account_mnemonic,get_address } from '../../../utils/kulap-function'
import vAccount from '../../../utils/violas'
let QRCode = require('qrcode-react');

@inject('index')
@observer

class GetMoney1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinData:{}
        }
    }
    async componentDidMount(){
        this.setState({
            coinData:JSON.parse(window.localStorage.getItem('coinType'))
        })
        
        let decrypted =  JSON.parse(window.localStorage.getItem('data'));
        let violas = new vAccount(decrypted.mne_arr);
        let balanceData = await this.props.index.getBalance({
                address:violas.address,
                name:'violas'
            })
            this.setState({
                balancedata:balanceData
            })
            
    }
    copyUrl2 = () =>{
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
        let { balancedata,coinData } = this.state;
        return (
            <div className="getMoney">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/stablecoin')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>收款</span>
                </header>
                <section>
                    <div className="box">
                        <h3>收款地址</h3>
                        <div className="code">
                        <QRCode value={`${coinData.name}:${balancedata && balancedata.address}`} size={164}  />
                        </div>
                        <div className="wName">
                            <label>{coinData.name}</label><span></span>
                        </div>
                        <p id='addressId'>{balancedata && balancedata.address}</p>
                        <div className="btn" onClick={()=>this.copyUrl2()}>复制地址</div>
                    </div>
                </section>
            </div>
        );
    }
}

export default GetMoney1;
