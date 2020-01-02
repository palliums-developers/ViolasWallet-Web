import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import 'antd-mobile/dist/antd-mobile.css';
import { Slider, WingBlank } from 'antd-mobile';
import intl from 'react-intl-universal';
import vAccount from '../../../../utils/violas';
import Account from '../../../../utils/bitcoinjs-lib6';

@inject('index')
@observer

class Transfar1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            violasAmount: '',
            address1: '',
            balancedata: [],
            coinData: {}
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
        !(window.localStorage.getItem('data')) && this.props.history.push('/welcome');
    }
    async componentDidMount() {
        this.setState({
            coinData: JSON.parse(window.localStorage.getItem('coinType'))
        })
        if (this.props.index.type1) {
            if (this.props.index.type1 == 'vtoken') {
                this.setState({
                    address1: this.props.index.sweepCode1

                })
            } else if (this.props.index.type1 == 'libra') {
                this.setState({
                    address2: this.props.index.sweepCode1
                });
            } else if (this.props.index.type1 == 'bitcoin') {
                this.setState({
                    address3: this.props.index.sweepCode1
                })
            }
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
            if (e.target.value * 1 > 1e13) {
                alert(intl.get('type number please'))
                e.target.value=0;
            }else{
                this.setState({
                    violasAmount: e.target.value
                })
            }
        } else if (way == 'address') {
            this.setState({
                address1: e.target.value
            })
        }
    }

    confirmTrans = async (type) => {
        let { violasAmount, address1, coinData } = this.state;
        let decrypted = JSON.parse(window.localStorage.getItem('data'));
        let violas = new vAccount(decrypted.mne_arr);
        let reg = /^.*(?!0).$/;
        if (violasAmount == "") {
          alert(intl.get("Input Amount") + "!!!");
        } else if (reg.test(violasAmount) == false) {
          alert(intl.get("The amount cannot be zero") + "!!!");
        } else if (address1 == "") {
          alert(intl.get("Input Receving Address") + "!!!");
        }else{
            let transFar = await violas.transaction_violas(
              address1,
              Number(violasAmount) * 1e6,
              coinData.name
            );
            let data = await this.props.index.starVTranfer({
            signedtxn: transFar,
            name: "violas"
            });
            if (data.message == "ok") {
            alert(intl.get("Transfer success") + "!!!");
            this.props.history.push("/home");
            } else {
            this.refs.bal.style.color = "red";
            }
        }
        
    }

    render() {
        let { coinData } = this.state;
        console.log(coinData.balance);
        return (
            <div className="transfar1">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/home')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{coinData.name}{intl.get('Market')}</span>

                </header>
                <section>
                    <div className="transfarDescr">
                        <div className="form">
                            <div className="title">
                                <span>{coinData.name}</span>
                                <span ref="bal">{intl.get('Balance')}：<s>{coinData.balance / 1e6}</s> {(coinData.name) && (coinData.name).toLowerCase()}</span>
                            </div>
                            <input type="text" placeholder={intl.get('Input Amount')} onChange={(e) => this.getViolasAm(e, 'amount')} />
                            <div className="title">
                                <span>{intl.get('Receving Address')}</span>
                                <span onClick={() => {
                                    this.props.history.push({
                                        pathname: "/directoryInquiries1",
                                        state: {
                                            type: 'stableCoin'
                                        }
                                    });
                                }}>{intl.get('Address Book')}</span>
                            </div>
                            <div className="ipt">
                                <input type="text" placeholder={intl.get('Input Receving Address')} onChange={(e) => this.getViolasAm(e, 'address')} value={this.state.address1} />
                                <span onClick={() => {
                                    this.props.history.push('/sweepCode1')
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
                                    defaultValue={0}
                                    min={0}
                                    max={30}
                                    onChange={this.log('change')}
                                    onAfterChange={this.log('afterChange')}
                                />
                            </WingBlank>
                            <div className="rate">{this.state.rate / 100000} {coinData.name}</div>
                        </div>
                        <div className="btn" onClick={() => this.confirmTrans('violas')}>
                            {intl.get('Confirm Transfer')}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Transfar1;