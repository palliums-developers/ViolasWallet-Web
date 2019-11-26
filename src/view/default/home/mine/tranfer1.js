import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import 'antd-mobile/dist/antd-mobile.css';
import { Slider, WingBlank } from 'antd-mobile';
import { creat_account_mnemonic, balance, get_address, transfer } from '../../../../utils/kulap-function'
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
            balancedata:[],
            coinData:{}
        }
    }
    async componentDidMount() {
        this.setState({
            coinData:JSON.parse(window.localStorage.getItem('coinType'))
        })
        
        if (this.props.index.type) {
            if (this.props.index.type == 'vtoken' || 'lib') {
                this.setState({
                    address1: this.props.index.sweepCode,
                    address2: this.props.index.sweepCode
                })
            } else if (this.props.index.type == 'BTC') {
                this.setState({
                    address3: this.props.index.sweepCode
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
            this.setState({
                violasAmount: e.target.value
            })
        } else if (way == 'address') {
            this.setState({
                address1: e.target.value
            })
        }
    }
    
    confirmTrans = async (type) => {
        let { violasAmount, address1 } = this.state;
        let decrypted = JSON.parse(window.localStorage.getItem('data'));
        let violas = new vAccount(decrypted.mne_arr);
        let transFar = await violas.transaction(address1, violasAmount, 'S001_dtoken');
        let data = await this.props.index.starVTranfer({
                signedtxn: transFar,
                name:'violas'
            })
            console.log(data)
        if(data.message == 'ok'){
            alert('转账成功！！！');
            this.props.history.push('/home');
        }else{
            alert('转账失败！！！');
        }
    }

    render() {
        let { coinData } = this.state;
        return (
            <div className="transfar1">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/home')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{coinData.name}转账</span>

                </header>
                <section>
                       <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                <span>{coinData.name}</span>
                                <span>余额：<s>{coinData.balance}</s> {coinData.name}</span>
                                </div>
                                <input type="text" placeholder="输入金额" onChange={(e) => this.getViolasAm(e, 'amount')} />
                                <div className="title">
                                    <span>收款地址</span>
                                    <span>地址簿</span>
                                </div>
                                <div className="ipt">
                                    <input type="text" placeholder="输入收款地址" onChange={(e) => this.getViolasAm(e, 'address')} value={this.state.address1} />
                                    <span onClick={() => {
                                        this.props.history.push('/sweepCode1')
                                    }}><img src="/img/编组 3复制@2x.png" /></span>
                                </div>
                            </div>
                            <div className="fees">
                                <div className="title">
                                    <span>手续费</span>
                                </div>
                                <div className="speed">
                                    <p className="sub-title">慢</p>
                                    <p className="sub-title">快</p>
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
                                确认转账
                        </div>
                        </div>
                </section>
            </div>
        );
    }
}

export default Transfar1;
