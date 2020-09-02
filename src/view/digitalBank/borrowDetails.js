import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
let url = "https://api4.violas.io";

//借款详情
class BorrowDetails extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            showList: false,
            active:false,
            descrContent: true,
            descrContent1: true, 
            borrowList:{},
            productIntor: [],
            question:[],
            amount:'',
            warning: ''
        }
    }
    componentDidMount() {
        //获取借款产品信息
        fetch(url + "/1.0/violas/bank/borrow/info?id=" + sessionStorage.getItem('id') + '&&address=' + sessionStorage.getItem('violas_address')).then(res => res.json()).then(res => {
            if (res.data) {
                this.setState({
                    borrowList: {
                        pledge_rate: res.data.pledge_rate,
                        rate: res.data.rate
                    },
                    productIntor: res.data.intor,
                    question: res.data.question,
                })
            }
        })
    }
    //获取输入框value
    getInputValue = (e) => {
        // console.log(e.target.value,'.......')
        if (e.target.value) {
            this.setState({
                amount: e.target.value,
                warning: ''
            })
        }

    }
    //立即借款
    borrowingImmediately = () => {
        if (this.state.amount == '') {
            this.setState({
                warning: '请输入借款数量'
            })
        }
    }
    render() {
        let { showList, borrowList, productIntor,question } = this.state;
        return (
            <div className="borrowDetails">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank"> <img src="/img/fanhui 2@2x.png" />
              数字银行</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank/saveDetails">借款</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="saveDetailsWrap">
                    <div className="saveDetailsList">
                        <h4>
                            <label>我要借</label>
                            <div className="dropdown1">
                                <span onClick={() => {
                                    this.setState({
                                        showList: !this.state.showList
                                    })
                                }}>
                                    <img src="/img/kyye.png" />VLS
                                    <i>
                                        <img src="/img/rightArrow1.png" />
                                    </i>
                                </span>
                                {
                                    showList ? <div className="dropdown-content1">
                                        <span><img src="/img/kyye.png" /><label>VLS</label></span>
                                        <span><img src="/img/kyye.png" /><label>BLR</label></span>
                                    </div> : null
                                }
                            </div>
                        </h4>
                        <input placeholder="500 V-AAA起，每1V-AAA递增" className={this.state.warning ? 'activeInput' : null} onChange={(e) => this.getInputValue(e)}/>
                        <div className="saveDetailsShow">
                            <p><img src="/img/kyye.png" /><label>可借额度 ：</label> <label>0V-AAA</label><span>全部</span></p>
                        </div>
                    </div>
                    <div className="saveDetailsList1">
                        <p><label>借款利率</label><span>{borrowList.pledge_rate}%</span></p>
                        <p><p><label>质押率</label><span>质押率=借贷数量/存款数量</span></p><span>{borrowList.rate}%</span></p>
                        <p><p><label>质押账户</label><span>清算部分将从存款账户扣除</span></p><span>银行余额</span></p>
                    </div>
                    <div className="agreest">
                            {
                            this.state.active ? <img src="/img/xuanze-2@2x.png" onClick={() => {
                                this.setState({
                                    active: false
                                })
                            }} /> : <img src="/img/xuanze@2x.png" onClick={() => {
                                this.setState({
                                    active: true
                                })
                            }} />
                            }我已阅读并同意<span>《质押借款服务协议》</span>
                    </div>
                    <div className="foot">
                        <p className="btn" onClick={() => this.borrowingImmediately()}>立即借款</p>
                        <p className="descr">{this.state.warning}</p>
                    </div>
                    <div className="productDescr">
                        <div className="h3">
                            <label>产品说明<img src="/img/编组 17@2x.png" /></label>
                            <i onClick={() => {
                                this.setState({
                                    descrContent: !this.state.descrContent
                                })
                            }}>{
                                    this.state.descrContent ? <img src="/img/descrxia.png" /> : <img src="/img/rightArrow1.png" />
                                }</i>
                        </div>
                        {
                            this.state.descrContent ? <div className="descr">
                                {
                                    productIntor.map((v, i) => {
                                        return <div key={i}>
                                            {v.tital ? <h4> {v.tital}</h4> : null}
                                            {v.text ? <p>{v.text}</p> : null}
                                        </div>
                                    })
                                }
                                {/* <h4>① 最大可借额度：用户所有币种价值乘以抵押率的总和就是最大可贷款价值。 例如： 用户存款有价值100$的日元(抵押率10%)，价值100$的欧元(抵押率20%)，此时，用户最大可贷款价值为 100*10%+100*20% == 30 $</h4>
                                <h4>② 抵押率：目前区块链上没有负债和信用的概念，需要超额抵押资产才能完成借贷行为。例如 想要借出价值100美元的资产B，则需要抵押价值150美元的资产A。抵押率是币种可贷价值与存款价值的比例， 例如：存款100美元，抵押率设定为0.2，则最大可贷款20美元，每个币种都有自己的抵押率。 </h4>
                                <h4>③ 清算罚金：清算发生时，清算人代表借款人偿还部分或全部未偿还的借款额，作为回报，他们可以收取额外的清算价值的10%罚金 </h4> */}
                            </div> : null
                        }

                    </div>
                    <div className="question">
                        <div className="h3">
                            <label>常见问题<img src="/img/wenhao.png" /></label>
                            <i onClick={() => {
                                this.setState({
                                    descrContent1: !this.state.descrContent1
                                })
                            }}>{
                                    this.state.descrContent1 ? <img src="/img/descrxia.png" /> : <img src="/img/rightArrow1.png" />
                                }</i>
                        </div>
                        {
                            this.state.descrContent1 ? <div className="descrs">
                                {
                                    question.map((v, i) => {
                                        return <div key={i}>
                                            {v.tital ? <h4> {v.tital}</h4> : null}
                                            {v.text ? <p>{v.text}</p> : null}
                                        </div>
                                    })
                                }
                                {/* <div className="descr">
                                    <h4>如何增加可借额度？</h4>
                                    <p>可通过存款增加可借额度</p>
                                </div>
                                <div className="descr">
                                    <h4>借款有时间限制吗？</h4>
                                    <p>借款限制固定的时间周期，但是，随着时间的流逝，借贷利息会相应增加</p>
                                </div>
                                <div className="descr">
                                    <h4>需要支付多少利息？</h4>
                                    <p>借贷利率是不断变化的，用户所需支付的利息取决于该资产的供求关系。</p>
                                </div>
                                <div className="descr">
                                    <h4>什么情况下资产将被清算？</h4>
                                    <p>用户当前已借贷价值超过了最大可借贷价值，则可被清算，清算只清算超出最大可借贷价值的部分</p>
                                </div> */}
                            </div> : null
                        }
                    </div>
                </div>

            </div>
        )
    }


}

export default BorrowDetails;