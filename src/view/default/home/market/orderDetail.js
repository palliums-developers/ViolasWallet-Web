import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import { creat_account_mnemonic,get_address } from '../../../../utils/kulap-function';
import vAccount from '../../../../utils/violas';
import { timeStamp2String } from '../../../../utils/timer';
import intl from 'react-intl-universal';
let decrypted, violas;

@inject('dealIndex')
@observer

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ['未完成', '已完成'],
            ind: 0,
            detailData: [],
            othersList: [],
            browerData: [],
            price: ''
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
        let data = await this.props.dealIndex.selfDeal({
            user: violas&&violas.address
        });
        let datas = data&&data.filter(v => v.id == this.props.match.params.id);
        let dataB = await this.props.dealIndex.getCurVersion({
            version: datas&&datas[0].version
        })
        console.log(dataB);

        this.setState({
            othersList: await this.props.dealIndex.getOthersCoinMess(),
            detailData: datas,
            browerData: dataB
        }, () => {
            let price = this.getPrices(this.state.detailData[0].tokenGetSymbol)
            this.setState({
                price: price
            })
        })
    }
    getIndex = (i) => {
        this.setState({
            ind: i
        })
    }
    getPrices = (name) => {
        let { othersList } = this.state;
        for (let i = 0; i < othersList.length; i++) {
            if ((othersList[i].name).indexOf(name) == 0) {
                return othersList[i].price;
            }
        }

    }
    render() {
        let { detailData, browerData, price } = this.state;
        console.log(browerData);
        return (
            <div className="orderDetail">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/orderForm')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('The order details')}</span>
                </header>
                <section>
                    {
                        detailData && detailData.map((v, i) => {
                            return <div className="first" key={i}>
                                <div className="head">
                                    <p><i><img src="/img/编组 17@2x.png" /></i><span>{v.tokenGiveSymbol}/</span><label>{v.tokenGetSymbol}</label></p>
                                    <span>{v.state == 'OPEN' || v.state == 'CANCELLING' ? intl.get('Incomplete') : v.state == 'FILLED' || v.state == 'CANCELED' ? intl.get('Completed') : null}</span>
                                </div>
                                <div className="firstContents">
                                    <div className="firstContentL">
                                        <div className="title">
                                            <span>{intl.get('Price')}</span>
                                            <span>{intl.get('Amount')}</span>
                                            <span>{intl.get('Time')}</span>
                                        </div>
                                        <div className="list">
                                            <span>{price}</span>
                                            <span>{v.amountGet}</span>
                                            <span>{v.state == 'OPEN' ? timeStamp2String(v.date - 300 + '000') : v.state == 'FILLED' ? timeStamp2String(v.date + '000') : null}</span>
                                        </div>
                                    </div>
                                    <div className="firstContentL firstContentL1">
                                        <div className="title">
                                            <span>{intl.get('Amount Completed')}</span>
                                            <span>{intl.get('Transaction Fee')}</span>
                                            <span></span>
                                        </div>
                                        <div className="listCon">
                                            <div className="list">
                                                <span>{v.amountFilled}</span>
                                                <span>0.01Vtoken</span>
                                                <span></span>
                                            </div>
                                            <p>{intl.get('Browser query')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                    <div className="line"></div>
                    <div className="bidHistory">
                        <h3>{intl.get('Browser query')}</h3>
                        {
                            browerData && browerData.map((v, i) => {
                                return <div className="bidHistoryList" key={i}>
                                    <div className="lists">
                                        <dl>
                                            <dt>{intl.get('Time')}</dt>
                                            <dd>{timeStamp2String(v.date + '000')}</dd>
                                        </dl>
                                        <dl>
                                            <dt>{intl.get('Price')}（vtoken）</dt>
                                            <dd>{price}</dd>
                                        </dl>
                                        <dl>
                                            <dt>{intl.get('Amount')}</dt>
                                            <dd>{v.amount}</dd>
                                        </dl>
                                    </div>
                                    <p>{intl.get('Browser query')}</p>
                                </div>
                            })
                        }

                    </div>
                </section>
            </div>
        );
    }
}

export default OrderDetail;
