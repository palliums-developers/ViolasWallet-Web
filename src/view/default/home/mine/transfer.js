import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import 'antd-mobile/dist/antd-mobile.css';
import { Slider, WingBlank } from 'antd-mobile';
import vAccount from '../../../../utils/violas';
import Account from '../../../../utils/bitcoinjs-lib6';
import intl from 'react-intl-universal';
let bitcoin = require("bitcoinjs-lib");
let testnet = bitcoin.networks.testnet;
let fee = 1;

@inject('index')
@observer

class Transfar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            violasAmount: '',
            libraAmount: '',
            btcAmount: '',
            address1: '',
            address2: '',
            address3: '',
            balancedata:[],
            balance:Number
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    async componentDidMount() {
        if (this.props.index.type) {
            if (this.props.index.type == "vtoken") {
              this.setState({
                address1: this.props.index.sweepCode
              });
            } else if (this.props.index.type == "libra") {
              this.setState({
                address2: this.props.index.sweepCode
              });
            } else if (this.props.index.type == "bitcoin") {
                     this.setState({
                       address3: this.props.index.sweepCode
                     });
                   }
        }
        let decrypted = JSON.parse(window.localStorage.getItem('data'));
        let balanceData;
        if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {
            let violas = new vAccount(decrypted.mne_arr);
            balanceData = await this.props.index.getBalance({
                address: violas.address,
                name: 'violas'
            })
            this.setState({
                balancedata: balanceData.balance/1e6
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
            let btc = new Account(decrypted.mne_arr,testnet);
            balanceData = await this.props.index.getBTCBalance({
                address: btc.address,
                page:1,
                name: 'BTC'
            })
            this.setState({
                balancedata: balanceData.balance / 1e8
            })
        }
    }
    log = (name) => {
        return (value) => {
            //   console.log(`${name}: ${value}`);
            this.setState({
                rate: value
            })

        };
    }

    //violas转账
    getViolasAm = (e, way) => {
        if (way == 'amount') {
            e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
            e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
            e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数  
            if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                e.target.value = parseFloat(e.target.value);
            }
            this.setState({
                violasAmount: e.target.value
            })
        } else if (way == 'address') {
            this.setState({
                address1: e.target.value
            })
        }
    }
    //libra转账
    getLibraAm = (e, way) => {
        if (way == 'amount') {
            e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
            e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
            e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数  
            if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                e.target.value = parseFloat(e.target.value);
            }
            this.setState({
                libraAmount: e.target.value
            })
        } else if (way == 'address') {
            this.setState({
                address2: e.target.value
            })
        }
    }

    //BTC转账
    getBtcAm = (e, way) => {
        e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
        e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
        e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数  
        if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
            e.target.value = parseFloat(e.target.value);
        }
        if (way == 'amount') {
            this.setState({
                btcAmount: e.target.value
            })
        } else if (way == 'address') {
            this.setState({
                address3: e.target.value
            })
        }
    }
    confirmTrans = async (type) => {
        let { violasAmount, libraAmount, btcAmount, address1, address2, address3 } = this.state;
        let decrypted = JSON.parse(window.localStorage.getItem('data'));
        let transFar;
        if (type == 'violas') {
            if (violasAmount == '') {
                alert(intl.get("Input Amount")+'!!!');
            }else if (address1 == '') {
                alert(intl.get("Input Receving Address") + "!!!");
            }else{
            let violas = new vAccount(decrypted.mne_arr);
            transFar = await violas.transaction_violas(address1, Number(violasAmount) * 1e6, 'violas')
            let data = await this.props.index.starVTranfer({
                signedtxn: transFar,
                name:type
            })
            if(data.message == 'ok'){
               alert(intl.get('Transfer success')+'!!!');
               this.props.history.push('/home');
            }else{
                this.refs.bal.style.color = "red";
            } 
            }
            
        } else if (type == 'libra') {
            if (libraAmount == "") {
              alert(intl.get("Input Amount") + "!!!");
            } else if (address2 == "") {
              alert(intl.get("Input Receving Address") + "!!!");
            } else {
                let libra = new vAccount(decrypted.mne_arr);
                transFar = await libra.transaction_libra(
                  address2,
                  Number(libraAmount) * 1e6
                );
                let data = await this.props.index.starVTranfer({
                  signedtxn: transFar,
                  name: type
                });
                if (data.message == "ok") {
                  alert(intl.get("Transfer success") + "!!!");
                  this.props.history.push("/home");
                } else {
                  this.refs.bal.style.color = "red";
                }
            }
            
            
        } else if (type == 'BTC') {
            if (btcAmount == "") {
              alert(intl.get("Input Amount") + "!!!");
            } else if (address3 == "") {
              alert(intl.get("Input Receving Address") + "!!!");
            } else {
                let account = new Account(decrypted.mne_arr, testnet);
                transFar = await account.transaction(
                  address3,
                  Number(btcAmount) * 1e8,
                  fee
                );
                console.log(transFar);
            }
            
        }
    }

    render() {
        let { balancedata } = this.state;
        return (
            <div className="transfar">
                <header>
                    <span onClick={() => {
                        this.props.history.push({
                            pathname: '/home/wallet',
                            state: false
                        })
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    {
                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? <span>{'vtoken'+intl.get('Transfer')}</span> : window.localStorage.getItem('type') == intl.get('BTCWallet') ? <span>{intl.get('Transfer BTC')}</span> : window.localStorage.getItem('type') == intl.get('LibraWallet') ? <span>{intl.get('Transfer libra')}</span> : null
                    }

                </header>
                <section>
                    {
                        window.localStorage.getItem('type') == intl.get('ViolasWallet') ? <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                    <span>vtoken</span>
                                    <span ref="bal">{intl.get('Balance')}：<s>{balancedata}</s> vtoken</span>
                                </div>
                                <input type="text" placeholder={intl.get('Input Amount')} onChange={(e) => this.getViolasAm(e, 'amount')} />
                                <div className="title">
                                    <span>{intl.get('Receving Address')}</span>
                                    <span onClick={()=>{
                                        this.props.history.push({
                                          pathname: "/directoryInquiries1",
                                          state:{
                                              type:'officialCoin'
                                          }
                                        });
                                    }}>{intl.get('Address Book')}</span>
                                </div>
                                <div className="ipt">
                                    <input type="text" placeholder={intl.get('Input Receving Address')} onChange={(e) => this.getViolasAm(e, 'address')} value={this.state.address1} />
                                    <span onClick={() => {
                                        this.props.history.push('/sweepCode')
                                    }}><img src="/img/编组 3复制@2x.png" /></span>
                                </div>
                            </div>
                            <div className="fees">
                                <div className="title">
                                    <span>{intl.get('Transaction Fee')}</span>
                                </div>
                                <div className="speed">
                                    <p className="sub-title">{intl.get('Slow')}</p>
                                    <p className="sub-title">{intl.get('Fast')}</p>
                                </div>
                                <WingBlank size="lg">

                                    <Slider
                                        style={{ marginLeft: 30, marginRight: 30 }}
                                        defaultValue={6}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </WingBlank>
                                <div className="rate">{this.state.rate / 100000} vtoken</div>
                            </div>
                            <div className="btn" onClick={() => this.confirmTrans('violas')}>
                            {intl.get('Confirm Transfer')}
                        </div>
                        </div> : window.localStorage.getItem('type') == intl.get('BTCWallet') ? <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                    <span>BTC</span>
                                    <span>{intl.get('Input Amount')}：<s>{balancedata}</s> BTC</span>
                                </div>
                                <input type="text" placeholder={intl.get('Input Amount')} onChange={(e) => this.getBtcAm(e, 'amount')} />
                                <div className="title">
                                    <span>{intl.get('Receving Address')}</span>
                                    <span onClick={()=>{
                                        this.props.history.push({
                                          pathname: "/directoryInquiries1",
                                          state:{
                                              type:'officialCoin'
                                          }
                                        });
                                    }}>{intl.get('Address Book')}</span>
                                </div>
                                <div className="ipt">
                                    <input type="text" placeholder={intl.get('Input Receving Address')} onChange={(e) => this.getBtcAm(e, 'address')} value={this.state.address3} />
                                    <span onClick={() => {
                                        this.props.history.push('/sweepCode')
                                    }}><img src="/img/编组 3复制@2x.png" /></span>
                                </div>
                            </div>
                            <div className="fees">
                                <div className="title">
                                    <span>{intl.get('Transaction Fee')}</span>
                                </div>
                                <div className="speed">
                                    <p className="sub-title">{intl.get('Slow')}</p>
                                    <p className="sub-title">{intl.get('Fast')}</p>
                                </div>
                                <WingBlank size="lg">

                                    <Slider
                                        style={{ marginLeft: 30, marginRight: 30 }}
                                        defaultValue={6}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </WingBlank>
                                <div className="rate">{this.state.rate / 100000} BTC</div>
                            </div>
                            <div className="btn" onClick={() => this.confirmTrans('BTC')}>
                                {intl.get('Confirm Transfer')}
                        </div>
                        </div> : window.localStorage.getItem('type') == intl.get('LibraWallet') ? <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                    <span>libra</span>
                                    <span>{intl.get('Input Amount')}：<s>{balancedata}</s> libra</span>
                                </div>
                                <input type="text" placeholder={intl.get('Input Amount')} onChange={(e) => this.getLibraAm(e, 'amount')} />
                                <div className="title">
                                    <span>{intl.get('Receving Address')}</span>
                                    <span onClick={()=>{
                                        this.props.history.push({
                                          pathname: "/directoryInquiries1",
                                          state:{
                                              type:'officialCoin'
                                          }
                                        });
                                    }}>{intl.get('Address Book')}</span>
                                </div>
                                <div className="ipt">
                                    <input type="text" placeholder={intl.get('Input Receving Address')} onChange={(e) => this.getLibraAm(e, 'address')} value={this.state.address2} />
                                    <span onClick={() => {
                                        this.props.history.push('/sweepCode')
                                    }}><img src="/img/编组 3复制@2x.png" /></span>
                                </div>
                            </div>
                            <div className="fees">
                                <div className="title">
                                    <span>{intl.get('Transaction Fee')}</span>
                                </div>
                                <div className="speed">
                                    <p className="sub-title">{intl.get('Slow')}</p>
                                    <p className="sub-title">{intl.get('Fast')}</p>
                                </div>
                                <WingBlank size="lg">

                                    <Slider
                                        style={{ marginLeft: 30, marginRight: 30 }}
                                        defaultValue={6}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </WingBlank>
                                <div className="rate">{this.state.rate / 100000} libra</div>
                            </div>
                            <div className="btn" onClick={() => this.confirmTrans('libra')}>
                                {intl.get('Confirm Transfer')}
                        </div>
                        </div> : null
                    }
                </section>
            </div>
        );
    }
}
export default Transfar;
