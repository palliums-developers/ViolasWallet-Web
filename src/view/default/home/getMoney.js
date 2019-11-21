import React, { Component } from 'react';
// import '../default.scss';
import { inject,observer } from 'mobx-react';
import { creat_account_mnemonic,get_address } from '../../../utils/kulap-function'
import vAccount from '../../../utils/violas'
let QRCode = require('qrcode-react');
@inject('index')
@observer

class GetMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purseCoin:'',
            curWal:[]
        }
    }
    async componentDidMount(){
        let decrypted =  JSON.parse(window.localStorage.getItem('data'));
        let arr = creat_account_mnemonic(decrypted.mne_arr);
        let balanceData;
        if(window.localStorage.getItem('type') == 'Violas钱包'){
            let violas = new vAccount(decrypted.mne_arr);
            balanceData = await this.props.index.getBalance({
                address:violas.address,
                name:'violas'
            })
            this.setState({
                balancedata:balanceData,
                purseCoin:'vtoken'
            })
            let wal = JSON.parse(window.localStorage.getItem('data')).wallet_name.filter(v=>{
                if((v.name).indexOf(window.localStorage.getItem('type').slice(0,5))==0){
                    return v.name;
                }
            })
            this.setState({
                curWal:wal[0]
            })
            
        }else if(window.localStorage.getItem('type') == 'Libra钱包'){
            let addressStr = get_address(arr);
            balanceData = await this.props.index.getBalance({
                address:addressStr,
                name:'libra'
            })
            this.setState({
                balancedata:balanceData,
                purseCoin:'bitcoin',
            })
            let wal = JSON.parse(window.localStorage.getItem('data')).wallet_name.filter(v=>{
                if((v.name).indexOf(window.localStorage.getItem('type').slice(0,5))==0){
                    return v.name;
                }
            })
            this.setState({
                curWal:wal[0]
            })
        }else if(window.localStorage.getItem('type') == 'BTC钱包'){
            // balanceData = await this.props.index.getBalance({
            //     address:addressStr,
            //     name:'btc'
            // })
            let wal = JSON.parse(window.localStorage.getItem('data')).wallet_name.filter(v=>{
                if((v.name).indexOf(window.localStorage.getItem('type').slice(0,1))==0){
                        return v.name;
                    }
                })
            this.setState({
                curWal:wal[0]
            })
            this.setState({
                purseCoin:'libra'
            })
        }
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
        let { purseCoin,balancedata } = this.state;
        return (
            <div className="getMoney">
                <header>
                    <span onClick={() => {
                    this.props.history.push({
                        pathname:'/home/wallet',
                        state:false
                    })
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>收款</span>
                </header>
                <section>
                    <div className="box">
                        <h3>收款地址</h3>
                        <div className="code">
                        <QRCode value={`${purseCoin}:${balancedata && balancedata.address}`} size={164}  />
                        </div>
                        <div className="wName">
                            <label>{this.state.curWal.name}</label><span></span>
                        </div>
                        <p id='addressId'>{balancedata && balancedata.address}</p>
                        <div className="btn" onClick={()=>this.copyUrl2()}>复制地址</div>
                    </div>
                </section>
            </div>
        );
    }
}

export default GetMoney;
