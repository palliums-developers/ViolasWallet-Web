import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import 'antd-mobile/dist/antd-mobile.css';
import { Slider, WingBlank } from 'antd-mobile';
import { creat_account_mnemonic, balance, get_address, transfer } from '../../../../utils/kulap-function'
import vAccount from '../../../../utils/violas';
import Account from '../../../../utils/bitcoinjs-lib6';

@inject('index')
@observer

class Transfar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 6,
            violasAmount: '',
            libraAmount: '',
            btcAmount: '',
            address1: '',
            address2: '',
            address3: '',
            balancedata:[]
        }
    }
    async componentDidMount() {
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
        let decrypted = JSON.parse(window.localStorage.getItem('data'));
        let arr = creat_account_mnemonic(decrypted.mne_arr);
        let balanceData;
        if (window.localStorage.getItem('type') == 'Violas钱包') {
            let violas = new vAccount(decrypted.mne_arr);
            balanceData = await this.props.index.getBalance({
                address: violas.address,
                name: 'violas'
            })
            this.setState({
                balancedata: balanceData
            })

        } else if (window.localStorage.getItem('type') == 'Libra钱包') {
            let addressStr = get_address(arr);
            balanceData = await this.props.index.getBalance({
                address: addressStr,
                name: 'libra'
            })
            this.setState({
                balancedata: balanceData
            })
        } else if (window.localStorage.getItem('type') == 'BTC钱包') {
            let btc = new Account('sport chicken goat abandon actual extra essay build maid garbage ahead aim');
            console.log(btc.address)
            balanceData = await this.props.index.getBalance({
                address: btc.address,
                name: 'BTC'
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
        let account = creat_account_mnemonic(decrypted.mne_arr);
        let transFar;
        if (type == 'violas') {
            let violas = new vAccount(decrypted.mne_arr);
            transFar = await violas.transaction(address1, violasAmount, 'violas')
            console.log(transFar, '111')
            await this.props.index.starVTranfer({
                signedtxn: transFar
            })
        } else if (type == 'libra') {

            transFar = transfer(account, libraAmount, address2)
            console.log(transFar, '22')
        } else if (type == 'BTC') {
            transFar = transfer(account, btcAmount, address3)
        }
        // console.log(transFar)
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
                        window.localStorage.getItem('type') == 'Violas钱包' ? <span>violas转账</span> : window.localStorage.getItem('type') == 'BTC钱包' ? <span>BTC转账</span> : window.localStorage.getItem('type') == 'Libra钱包' ? <span>libra转账</span> : null
                    }

                </header>
                <section>
                    {
                        window.localStorage.getItem('type') == 'Violas钱包' ? <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                    <span>Vtoken</span>
                                    <span>余额：<s>{balancedata.balance}</s>Vtoken</span>
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
                                        defaultValue={6}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </WingBlank>
                                <div className="rate">{this.state.rate / 100000} Vtoken</div>
                            </div>
                            <div className="btn" onClick={() => this.confirmTrans('violas')}>
                                确认转账
                        </div>
                        </div> : window.localStorage.getItem('type') == "BTC钱包" ? <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                    <span>BTC</span>
                                    <span>余额：<s>{balancedata.balance}</s>BTC</span>
                                </div>
                                <input type="text" placeholder="输入金额" onChange={(e) => this.getBtcAm(e, 'amount')} />
                                <div className="title">
                                    <span>收款地址</span>
                                    <span>地址簿</span>
                                </div>
                                <div className="ipt">
                                    <input type="text" placeholder="输入收款地址" onChange={(e) => this.getBtcAm(e, 'address')} value={this.state.address3} />
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
                                确认转账
                        </div>
                        </div> : window.localStorage.getItem('type') == "Libra钱包" ? <div className="transfarDescr">
                            <div className="form">
                                <div className="title">
                                    <span>Lib</span>
                                    <span>余额：<s>{balancedata.balance}</s>Lib</span>
                                </div>
                                <input type="text" placeholder="输入金额" onChange={(e) => this.getLibraAm(e, 'amount')} />
                                <div className="title">
                                    <span>收款地址</span>
                                    <span>地址簿</span>
                                </div>
                                <div className="ipt">
                                    <input type="text" placeholder="输入收款地址" onChange={(e) => this.getLibraAm(e, 'address')} value={this.state.address2} />
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
                                        defaultValue={6}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </WingBlank>
                                <div className="rate">{this.state.rate / 100000} Lib</div>
                            </div>
                            <div className="btn" onClick={() => this.confirmTrans('libra')}>
                                确认转账
                        </div>
                        </div> : null
                    }
                </section>
            </div>
        );
    }
}

export default Transfar;
