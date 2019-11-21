import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import { creat_account_mnemonic,get_address } from '../../../utils/kulap-function';
import vAccount from '../../../utils/violas';
import Account from '../../../utils/bitcoinjs-lib6';
let aes256 = require('aes256');

@inject('index')
@observer

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            balancedata:[],
            curWal:[]
        }
    }
    async componentDidMount(){
        let { purse } = this.props.index
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
                curWal:JSON.parse(window.localStorage.getItem('data')).wallet_name[0].name
            })
            let arrs = await this.props.index.checkCurNewCoin({
                addr:balanceData.address,
                modu:'05599ef248e215849cc599f563b4883fc8aff31f1e43dff1e3ebe4de1370e054'
            })
            
        }else if(window.localStorage.getItem('type') == 'Libra钱包'){
            let addressStr = get_address(arr);
            balanceData = await this.props.index.getBalance({
                address:addressStr,
                name:'libra'
            })
            this.setState({
                balancedata:balanceData,
                curWal:JSON.parse(window.localStorage.getItem('data')).wallet_name[1].name
            })
        }else if(window.localStorage.getItem('type') == 'BTC钱包'){
            let btc = new Account('sport chicken goat abandon actual extra essay build maid garbage ahead aim');
            console.log(btc.address)
            balanceData = await this.props.index.getBalance({
                address:btc.address,
                name:'BTC'
            })
            
            this.setState({
                curWal:JSON.parse(window.localStorage.getItem('data')).wallet_name[2].name
            })
        }
        
        
    }
    getData = () =>{
        
    }
    getChange = () => {
        this.props.history.push('/walletSystem')
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
        let { purse } = this.props.index
        let { balancedata,curWal } = this.state
        return (
            <div className="wallet">
                <header>
                    <div id="select">
                        <div onClick={() => this.getChange()}><label>{window.localStorage.getItem('type')}</label><img src="/img/路径 3@2x.png" /></div>
                    </div>
                    <span onClick={() => {
                    this.props.history.push('/sweepcode')
                    }}><img src="/img/编组 3@2x.png"/></span>
                </header>
                
                <section>
                    <div className="walletContent">
                        <div className="showBanlance">
                           <div className="title">
                             <span>当前资产</span>
                             <span onClick={() => {
                                this.props.history.push('/manage')
                                }}><img src="/img/编组 14@2x.png"/></span>
                           </div>
                           <div className="banlanceDescr">
                                <span>{balancedata.balance}</span><label>{
                                     window.localStorage.getItem('type') == 'Violas钱包' ? 'vtoken' : window.localStorage.getItem('type') == 'Libra钱包' ? 'libra' : window.localStorage.getItem('type') == 'BTC钱包' ? 'BTC' : null  
                                    }</label>
                            </div>
                            <div className="userDescr">
                                <span>{curWal}</span>
                                <span id='addressId'>{balancedata.address}</span>
                                <span onClick={()=>this.copyUrl2()}><img src="/img/Fill 3@2x.png"/></span>
                            </div>
                           
                        </div>
                        <div className="btns">
                            <dl onClick={() => {
                                this.props.history.push('/transfar')
                            }}>
                                <dt><img src="/img/编组@2x.png"/></dt>
                                <dd>转账</dd>
                            </dl>
                            <span></span>
                            <dl onClick={() => {
                                this.props.history.push('/getMoney')
                            }}>
                                <dt><img src="/img/编组 .png"/></dt>
                                <dd>收款</dd>
                            </dl>
                         </div>
                        <div className="dealRecord">
                           <div className="title" onClick={() => {
                                this.props.history.push('/record')
                                }}>
                               <span>交易记录</span>
                               <span>2019-09-10<i><img src="/img/路径复制 4@2x.png"/></i></span>
                           </div>
                           <div className="dealContent">
                               {
                                   window.localStorage.getItem('type') == 'Violas钱包' ? <div className="head">
                                        <label>资产</label>
                                        <span onClick={() => {
                                            this.props.history.push('/addCurrency')
                                            }}><img src="/img/编组 9@2x.png"/>
                                        </span>
                                    </div> : null
                               }
                               {
                                    window.localStorage.getItem('type') == 'Violas钱包' ? <div className="mList">
                                            <p onClick={()=>{
                                                this.props.history.push('/stablecoin')
                                            }}><label>Vcoin</label><span>0.102</span></p>
                                            {/* <p><label>Zcoin</label><span>1</span></p>
                                            <p><label>Ycoin</label><span>1</span></p>
                                            <p><label>Lcoin</label><span>1</span></p> */}
                                        </div> : null
                               }
                              
                           </div>
                        </div>
                    </div>
                    {
                        JSON.parse(window.localStorage.getItem('data')).backup ? <div className="warning">
                        <div className="head">
                            <label><img src="/img/编组 5@2x.png"/></label>
                            <span>安全提醒</span>
                        </div>
                        <div className="warnText">
                            <p>您的身份助记词未备份，请务必备份助记词</p>
                            <p>助记词可用于恢复身份下钱包资产，防止忘记密码、应用删r、手机丢失等情况导致资产损失</p>
                        </div>
                        <div className="btn"  onClick={() => {
                            this.props.history.push({
                            pathname:'/codeBackup',
                            state:{
                                id:0
                            }
                            })}}>立即备份</div>
                    </div> : null
                    }
                </section>
            </div>
        );
    }
    
}

export default Wallet;
