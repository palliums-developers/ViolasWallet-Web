import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import { creat_account_mnemonic } from '../../../utils/test_kulap'
let aes256 = require('aes256');

@inject('index')
@observer

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            wallets:['violas钱包','BTC钱包','libra钱包']
        }
    }
    componentDidMount(){
        document.addEventListener('click',()=>{
            this.setState({
              isShow: false
            })
        })
        let decrypted = JSON.parse(aes256.decrypt('mnes', window.localStorage.getItem('mnes')));
        let arr = creat_account_mnemonic(decrypted.mne_arr)
        console.log(arr,'.......')
    }

    getChange = (e) => {
        this.setState({
          isShow: !this.state.isShow
        })
        e.nativeEvent.stopImmediatePropagation();
      }
    getCurIndex = (val, ind) => {
        this.props.index.changePurse(val)
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
        let { wallets } = this.state;
        let { purse } = this.props.index
        return (
            <div className="wallet">
                <header>
                    <div id="select">
                        <div onClick={(e) => this.getChange(e)}><label>{purse}</label><img src="/img/路径 3@2x.png" /></div>
                            {
                                this.state.isShow ? <ul className="selectList">
                                {
                                    wallets && wallets.map((v, i) => {
                                    return <li key={i} className={purse == v ? 'act' : ''} onClick={() => this.getCurIndex(v, i)}>{v}</li>
                                    })
                                }
                            </ul> : null
                            }
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
                              <span>8.8888888</span><label>Vtoken</label>
                           </div>
                           <div className="userDescr">
                              <span>xxxxxx</span>
                              <span id='addressId'>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</span>
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
                              <div className="head">
                                  <label>资产</label>
                                  <span onClick={() => {
                                    this.props.history.push('/addCurrency')
                                    }}><img src="/img/编组 9@2x.png"/>
                                  </span>
                              </div>
                              <div className="mList">
                                  <p><label>Vcoin</label><span>0.102</span></p>
                                  {/* <p><label>Zcoin</label><span>1</span></p>
                                  <p><label>Ycoin</label><span>1</span></p>
                                  <p><label>Lcoin</label><span>1</span></p> */}
                              </div>
                           </div>
                        </div>
                    </div>
                    <div className="warning">
                        <div className="head">
                            <label><img src="/img/编组 5@2x.png"/></label>
                            <span>安全提醒</span>
                        </div>
                        <div className="warnText">
                            <p>您的身份助记词未备份，请务必备份助记词</p>
                            <p>助记词可用于恢复身份下钱包资产，防止忘记密码、应用删除、手机丢失等情况导致资产损失</p>
                        </div>
                        <div className="btn">立即备份</div>
                    </div>
                </section>
            </div>
        );
    }
    
}

export default Wallet;
