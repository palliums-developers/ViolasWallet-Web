import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import { Slider, WingBlank } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { timeStamp2String } from '../../../utils/timer';
import vAccount from '../../../utils/violas';
import CoinData from '../../../utils/currencyToken.json';
// let decrypted,violas;
let decrypted = JSON.parse(window.localStorage.getItem('data'));
// console.log(decrypted,'.......')
let violas = new vAccount(decrypted.mne_arr);
// if (window.localStorage.getItem('data')){
//     decrypted = JSON.parse(window.localStorage.getItem('data'));
//     violas = new vAccount(decrypted.mne_arr);
// }else{
//     window.location.href = '/app'
// }



@inject('dealIndex', 'index')
@observer

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            rate: 0,
            curEntrust: [],
            othersEntrust: [],
            condata: [],
            otherdata: [],
            dealData: [],
            leftCount: '',
            rightCount:'',
            value:'',
            disNone:false
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    async componentDidMount() {
        // let coinData = await this.props.dealIndex.getCoinMess();
        let othersData = await this.props.dealIndex.getOthersCoinMess();
        let violas = new vAccount(decrypted.mne_arr);
        let updateData = [];
        let newData = await this.props.index.updateCurCoin({
            addr: violas.address
        })
        // let coinsData = CoinData.data;
        for (let i = 0; i < othersData.length; i++) {
            for (let j = 0; j < newData.length; j++) {
                if (othersData[i].addr.indexOf(newData[j]) == 0) {
                    
                    updateData.push({
                        name: othersData[i].name
                    });
                    break;
                }
            }
        }

        this.setState({
            coindata: othersData,
            updatas: updateData,
            othersdata: othersData
        }, () => {
            this.getContent()
            
        })
        
    }
    stringEntFun(value) {
            value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
            value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
            value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入6个小数  
            if (value.indexOf(".") < 0 && value != "") {
                value = parseFloat(value);
            }
            return value;
        
    }
    getPrices(name){
        let { othersdata } = this.state;
        for (let i = 0; i < othersdata.length; i++) {
            if ((othersdata[i].name).indexOf(name) == 0) {
                return othersdata[i].price;
            }
        }
    }
    async getContent() {
        let { val, vals, stableDeal, selfDeal } = this.props.dealIndex;
        let { coindata, othersdata } = this.state;
        let data = await selfDeal({
            user: violas.address
        });
        this.setState({
            dealData: data.splice(0,3)
        })
        let dealData = [];
        if (coindata && coindata[val].addr < othersdata && othersdata[vals].addr) {
            dealData = await stableDeal({
                base: coindata && coindata[val].addr,
                quote: othersdata && othersdata[vals].addr
            });
            this.setState({
                curEntrust: dealData.buys
            })
        } else {
            dealData = await stableDeal({
                base: othersdata && othersdata[vals].addr,
                quote: coindata && coindata[val].addr
            });
            this.setState({
                othersEntrust: dealData.sells
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

    getChange = (type) => {
        let { coin } = this.props.dealIndex;
        console.log(coin)
        if (type == 'a') {
            if(coin){
                this.props.dealIndex.selectChange({
                    isShow: true
                })
            }else{
                this.props.dealIndex.selectChange({
                    isShow: true
                })
            }
            
        } else if (type == 'b') {
            if (coin) {
                this.props.dealIndex.selectsChange({
                    isShows: true
                })
                
            } else {
                this.props.dealIndex.selectsChange({
                    isShows: true
                })
            }
        }

    }

    getCount = (e,type) => {
        let {
            othersdata,
            coindata
        } = this.state;
        let { vals, val,coin } = this.props.dealIndex;
        //判断内容的格式
        //换算
        if(coin){
            let value = this.stringEntFun(e.target.value);
            if (type == 'left') {
                let rightcount = Number(value) * (othersdata[vals].price / coindata[val].price);
                this.setState({
                    leftCount: value,
                    rightCount: rightcount
                })

            } else if (type == 'right') {
                let leftcount = Number(value) * (coindata[val].price / othersdata[vals].price);
                this.setState({
                    leftCount: leftcount,
                    rightCount: value
                })
            }
        }else{
            let value = this.stringEntFun(e.target.value);
            if (type == 'left') {
                let leftcount = Number(value) * (coindata[val].price / othersdata[vals].price);
                this.setState({
                    leftCount: value,
                    rightCount: leftcount
                })
            } else if (type == 'right') {
                let rightcount = Number(value) * (othersdata[vals].price / coindata[val].price);
                this.setState({
                    leftCount:rightcount,
                    rightCount:  value
                }) 
            }
        }
        
    }
    getCoin = () => {
        let { coin } = this.props.dealIndex;
        this.props.dealIndex.updateCoin(!coin) 
        
            if (this.state.coin) {
                this.setState({
                    leftCount: this.state.leftCount,
                    rightCount: this.state.rightCount
                })

            } else {
                this.setState({
                    leftCount: this.state.rightCount,
                    rightCount: this.state.leftCount
                })
            }

    }
    getExchange = async () => {
        this.setState({
            disNone: true
        })
        
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
            let { vals, val, coin } = this.props.dealIndex;
            let { updatas, coindata, count, othersdata } = this.state;
            let violas = new vAccount(decrypted.mne_arr);
            let Transaction = '';
            let publishTranaction1 = '';
            let publishTranaction2 = '';
            if (coin) {
                Transaction = await violas.transactionEX(coindata[val].name, count, othersdata[vals].name, count);
                for (let i = 0; i < updatas.length; i++) {
                    if (updatas[i].name == coindata[val].name) {
                        publishTranaction1 = 'did';
                    }
                    if (updatas[i].name == othersdata[vals].name) {
                        publishTranaction2 = 'did';
                    }
                }
                console.log(publishTranaction1, '1')
                console.log(publishTranaction2, '2')
                console.log(Transaction, '3')
                if (publishTranaction1 !== 'did') {
                    publishTranaction1 = await violas.publish(coindata[val].name);
                    this.props.dealIndex.exchange({
                        signedtxn: publishTranaction1
                    })
                }

                if (publishTranaction2 !== 'did') {
                    publishTranaction2 = await violas.publish(othersdata[vals].name);
                    this.props.dealIndex.exchange({
                        signedtxn: publishTranaction2
                    })
                }
                let data = await this.props.dealIndex.exchange({
                    signedtxn: Transaction
                })
                console.log(data, '4')
                // if(data.code = 2000){
                // this.setState({
                //     disNone: false
                // })
                //     alert(intl.get('For successful')+'!!!')
                // }else{
                //     alert(intl.get('For failure') + '!!!')
                // }
            }
            else {
                Transaction = await violas.transactionEX(othersdata[vals].name, count, coindata[val].name, count);
                for (let i = 0; i < updatas.length; i++) {
                    if (updatas[i].name == coindata[val].name) {
                        publishTranaction1 = 'did';
                    }
                    if (updatas[i].name == othersdata[vals].name) {
                        publishTranaction2 = 'did';
                    }
                }
                if (publishTranaction1 !== 'did') {
                    publishTranaction1 = await violas.publish(othersdata[vals].name);
                    this.props.dealIndex.exchange({
                        signedtxn: publishTranaction1
                    })
                }
                if (publishTranaction2 !== 'did') {
                    publishTranaction2 = await violas.publish(othersdata[vals].name);
                    this.props.dealIndex.exchange({
                        signedtxn: publishTranaction2
                    })
                }
                let data = await this.props.dealIndex.exchange({
                    signedtxn: Transaction
                })
                if (data.code = 2000) {
                    alert(intl.get('For successful') + '!!!')
                } else {
                    alert(intl.get('For failure') + '!!!')
                }
            }
            
        }

    }
    render() {
        let {
            curEntrust,
            othersEntrust,
            dealData,
            othersdata,
            coindata
        } = this.state;
        let { vals, val, coin } = this.props.dealIndex;
        return (
            <div className="market">
                <header>
                    {intl.get('Market')}
                </header>
                <section>
                    <div className="marketDescr">
                        <div className="changeDescr">
                            <div className="change">
                                {
                                    coin ? <div id="select">
                                        <div onClick={() => this.getChange('a')}><label>{coindata && coindata[val].name}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                    </div> : <div id="select">
                                            <div onClick={() => this.getChange('b')}><label>{othersdata && othersdata[vals].name}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                        </div>
                                }
                                <div className={coin ? 'changeLogo noReturn' : 'changeLogo return'} onClick={() => this.getCoin()}></div>
                                {
                                    coin ? <div id="select">
                                        <div onClick={() => this.getChange('b')}><label>{othersdata && othersdata[vals].name}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                    </div> : <div id="select">
                                            <div onClick={() => this.getChange('a')}><label>{coindata && coindata[val].name}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                        </div>
                                }

                            </div>

                            <div className="title">
                                <input type="text" value={this.state.leftCount} placeholder={intl.get('Amount Transfered')} onChange={(e) => this.getCount(e,'left')} />
                                <input type="text"
                                    value={
                                        this.state.rightCount
                                    }
                                    placeholder={
                                        intl.get('Amount Received')
                                    }
                                    onChange={
                                        (e) => this.getCount(e,'right')
                                    }
                                />
                            </div>
                            {/* <div className="address">
                                <h4>{intl.get('Receving Address')}</h4>
                                <div className="ipt">
                                    <input type="text" placeholder={intl.get('Input Receving Account')}/>
                                </div>
                            </div> */}
                            <div className="rate">
                                <h4>{intl.get('Exchange Rate')}</h4>
                                {
                                    coin ? <span>{coindata && 1 / coindata[val].price}{coindata && coindata[val].name}={othersdata && 1 / othersdata[vals].price}{othersdata && othersdata[vals].name}</span> : <span>{othersdata && 1 / othersdata[vals].price}{othersdata && othersdata[vals].name}={coindata && 1 /coindata[val].price}{coindata && coindata[val].name}</span>
                                }

                            </div>
                            <div className="line"></div>
                            <div className="fees">
                                <h4>{intl.get('Transaction Fee')}</h4>
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
                                <div className="rate">{this.state.rate / 100000} Vtoken</div>
                            </div>
                            <div className="btn" onClick={() => this.getExchange()}>{intl.get('Exchange')}</div>
                        </div>
                    </div>
                    <div className="commissioned ">
                        <div className="head">
                            <h4>{intl.get('Current Commission')}</h4>
                            <span onClick={() => {
                                this.props.history.push({
                                        pathname: '/orderForm'
                                    })

                            }}>{intl.get('All')}</span>
                        </div>
                        <div className="list">
                            <div className="title">
                                <span>{intl.get('Market')}</span>
                                <span>{intl.get('Amount')}</span>
                                <span>{intl.get('Price')}</span>
                            </div>
                            <div className="lists">
                                {
                                    dealData && dealData.map((v, i) => {
                                        return <div className="listRecord" key={i}>
                                            <div className="deal">
                                                <p><span>{v.tokenGiveSymbol}/</span><label>{v.tokenGetSymbol}</label></p>
                                                <p>{v.amountGet}</p>
                                                <p>{this.getPrices(v.tokenGetSymbol)}</p>
                                            </div>
                                            <div className="time">
                                                {v.state == 'OPEN' ? timeStamp2String(v.date - 300 + '000') : v.state == 'FILLED' ? timeStamp2String(v.date + '000') : null}
                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                        </div>
                    </div>
                    <div className="commissioneds ">
                        <div className="head">
                            <div id="select">
                                <div><label style={{ fontSize: '0.43rem', fontWeight: 600, color: 'rgba(96, 96, 109, 1)' }}>{intl.get('Commissioned ByOther')}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                            </div>
                        </div>
                        <div className="list">
                            <div className="title">
                                <span>{intl.get('Amount')}</span>
                                <span>{intl.get('Price')}(USD)</span>
                            </div>
                            <div className="lists">
                                {/* {
                                    curEntrust && curEntrust.map((v, i) => {
                                        return <div className="listRecord" key={i}>
                                            <p><i><img src="/img/编组 17@2x.png" /></i><span>{v.amountGet}</span></p>
                                            <p>{v.amountGet / v.amountGive}</p>
                                        </div>
                                    })
                                } */}
                                {
                                    othersEntrust && othersEntrust.map((v, i) => {
                                        return <div className="listRecord" key={i}>
                                            <p><span>{v.amountGet}</span></p>
                                            <p>{v.amountGet / v.amountGive}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
                {
                    this.state.disNone ? <div className="passDialog">
                        <div className="passContent">
                            <h4>输入密码</h4>
                            <input type="text" placeholder="密码" onChange={(e) => this.getValue(e)} />
                            <div className="btns">
                                <span onClick={() => {
                                    this.setState({
                                        disNone: false
                                    })
                                }}>取消</span>
                                <span onClick={() => this.confirm()}>确认</span>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        );
    }

}

export default Market;
