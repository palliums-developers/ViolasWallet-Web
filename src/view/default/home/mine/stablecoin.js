import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import { creat_account_mnemonic,get_address } from '../../../../utils/kulap-function';
import vAccount from '../../../../utils/violas';
import Account from '../../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
let decrypted =  JSON.parse(window.localStorage.getItem('data'));
// let aes256 = require('aes256');

@inject('index','dealIndex')
@observer

class stablecoin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balancedata:[]
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    async componentDidMount(){
        let violas = new vAccount(decrypted.mne_arr);
        let balanceData = await this.props.index.getBalance({
            address:violas.address,
            name:'violas'
        })
        this.setState({
            balancedata:balanceData
        })
        await this.props.dealIndex.stableDeal()
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
        let { balancedata } = this.state;
        return (
            <div className="stablecoin">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/home')
                    }}><img src="/img/Combined Shape 2@2x.png"/></span>
                    <span>{JSON.parse(window.localStorage.getItem('coinType')).name}</span>
                </header>
                
                <section>
                    <div className="walletContent">
                        <div className="showBanlance">
                           <div className="banlanceDescr">
                                <span>{JSON.parse(window.localStorage.getItem('coinType')).balance}</span><label> {JSON.parse(window.localStorage.getItem('coinType')).name}</label>
                            </div>
                            <div className="userDescr">
                                <span id="addressId">{balancedata.address}</span>
                                <span onClick={()=>this.copyUrl2()}><img src="/img/Fill 3@2x.png"/></span>
                            </div>
                           
                        </div>
                        <div className="btns">
                            <dl onClick={() => {
                                this.props.history.push('/transfar1')
                            }}>
                                <dt><img src="/img/编组@2x.png"/></dt>
                                <dd>{intl.get('Transfer')}</dd>
                            </dl>
                            <span></span>
                            <dl onClick={() => {
                                this.props.history.push('/getMoney1')
                            }}>
                                <dt><img src="/img/编组 .png"/></dt>
                                <dd>{intl.get('Receive')}</dd>
                            </dl>
                         </div>
                      </div>  
                      <div className="dealRecord">
                          <h4>{intl.get('Transfer History')}</h4>
                          <div className="recordDetails">
                              <div className="recordDetail">
                                        <div className="title">
                                            <span>{intl.get('Date')}</span>
                                            <span>{intl.get('Amount')}</span>
                                            <span className="redC">{intl.get('Transfer')}</span>
                                        </div>
                                        <div className="titleContent">
                                            <span>18.05.23 15:42</span>
                                            <span>1.906321</span>
                                            <span>BTC</span>
                                        </div>
                                        <div className="titleContent">
                                            <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                                            <p>{intl.get('Browser query')}</p>
                                        </div>
                                </div>
                                <div className="recordDetail">
                                        <div className="title">
                                            <span>{intl.get('Date')}</span>
                                            <span>{intl.get('Amount')}</span>
                                            <span className="greenC">{intl.get('Receive')}</span>
                                        </div>
                                        <div className="titleContent">
                                            <span>18.05.23 15:42</span>
                                            <span>1.906321</span>
                                            <span>BTC</span>
                                        </div>
                                        <div className="titleContent">
                                            <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                                            <p>{intl.get('Browser query')}</p>
                                        </div>
                                </div>
                          </div>
                      </div>
                </section>
            </div>
        );
    }
    
}

export default stablecoin;
