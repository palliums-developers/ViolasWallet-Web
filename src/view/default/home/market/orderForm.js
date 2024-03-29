import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import { creat_account_mnemonic,get_address } from '../../../../utils/kulap-function';
import { timeStamp2String } from '../../../../utils/timer';
import intl from 'react-intl-universal';
import vAccount from '../../../../utils/violas';
import BScroll from 'better-scroll'
let decrypted, violas;

@inject('dealIndex')
@observer

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ['Incomplete', 'Completed'],
            ind: 0,
            othersList: [],
            datas: []
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
        if (window.sessionStorage.getItem('data')) {
            decrypted = JSON.parse(window.sessionStorage.getItem('data'));
            violas = new vAccount(decrypted.mne_arr);
        }else{
            this.props.history.push('/welcome');
        }
    }
    async componentDidMount() {
        this.getDatas(this.state.ind)
        this.setState({
            othersList: await this.props.dealIndex.getOthersCoinMess()
        })
        let scroll = new BScroll(this.refs.content, {
            probeType: 1,
            click: true,
            scrollbar: true,
            mouseWheel: true
        })
    }
    getPrices(name) {
        let { othersList } = this.state;
        for (let i = 0; i < othersList.length; i++) {
            if ((othersList[i].name).indexOf(name) == 0) {
                return othersList[i].price;
            }
        }
    }
    getIndex = (i) => {
        this.setState({
            ind: i
        }, () => {
            this.getDatas(this.state.ind)
        })
    }
    async getDatas(ind) {
        let { selfDeal } = this.props.dealIndex;
        let data = await selfDeal({
            user: violas&&violas.address
        });
        let undoneData = data&&data.filter(v => v.state == 'OPEN' || v.state == 'CANCELLING');
        let completedData = data&&data.filter(v => v.state == 'FILLED' || v.state == 'CANCELED');
        if (ind == 0) {
            this.setState({
                datas: undoneData
            })

        } else if (ind == 1) {
            this.setState({
                datas: completedData
            })
        }
    }

    cancel = async (name, version) => {
        let Transaction = await violas.transactionEXWithdraw(name, version);
        let data1 = await this.props.dealIndex.cancleFun({
          version: version,
          signedtxn: Transaction
        });
        let data = await this.props.dealIndex.exchange({
          signedtxn: Transaction
        });
        // if (data.code = 2000) {
        //     alert(intl.get('For successful') + '!!!')
        // } else {
        //     alert(intl.get('For failure') + '!!!')
        // }
    }
    ifCancle(sta) {
        if (sta == 'CANCELED') {
            return intl.get('canceled')
        } else if (sta == 'FILLED') {
            return intl.get('canceled')
        }
        if (sta == 'CANCELLING') {
            return intl.get('canceling')
        } else if (sta == 'OPEN') {
            return intl.get("cancel");
        } else {
            return intl.get('cancel')
        }

    }
    render() {
        let { datas } = this.state;
        return (
            <div className="orderForm">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/home/market')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Order')}</span>
                </header>
                <section>
                    <div className="navlists">
                        <div className="navList">
                            {
                                this.state.status.map((v, i) => {
                                    return <span onClick={() => this.getIndex(i)} key={i}><label className={this.state.ind == i ? 'active' : ''}>{intl.get(v)}</label></span>
                                })
                            }
                        </div>
                    </div>
                    <div className="finishedContent" ref='content'>
                        <div className='unfinishedList'>
                            {
                                datas && datas.map((v, i) => {
                                    return <div className="first" key={i}>
                                        <div className="head">
                                            <p><i><img src="/img/编组 17@2x.png" /></i><span>{v.tokenGiveSymbol}/</span><label>{v.tokenGetSymbol}</label></p>
                                            <span onClick={() => this.cancel(v.tokenGiveSymbol, v.version)}>{this.ifCancle(v.state)}</span>
                                        </div>
                                        <div className="firstContents" onClick={() => {
                                            this.props.history.push('/orderDetail/' + v.id)
                                        }}>
                                            <div className="firstContent">
                                                <div className="firstContentL">
                                                    <div className="title">
                                                        <span>{intl.get('Price')}</span>
                                                        <span>{intl.get('Amount')}</span>
                                                        <span>{intl.get('Time')}</span>
                                                    </div>
                                                    <div className="list">
                                                        <span>{this.getPrices(v.tokenGetSymbol)}</span>
                                                        <span>{v.amountGet / 1e6}</span>
                                                        <span>{v.state == 'OPEN' ? timeStamp2String(v.date - 300 + '000') : v.state == 'FILLED' ? timeStamp2String(v.date + '000') : null}</span>
                                                    </div>
                                                </div>
                                                <div className="firstContentL">
                                                    <div className="title">
                                                        <span>{intl.get('Amount Completed')}</span>
                                                        <span>{intl.get('Transaction Fee')}</span>
                                                        <span></span>
                                                    </div>
                                                    <div className="list">
                                                        <span>{v.amountFilled / 1e6}</span>
                                                        <span>0.01Vtoken</span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rightLogo"><img src="/img/Shape@2x.png" /></div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default OrderForm;
