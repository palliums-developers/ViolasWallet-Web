import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

//借款详情
class BorrowDetails extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            showList: false,
            active:false
        }
    }
    componentDidMount() {

    }

    render() {
        let { routes } = this.props;
        let { showList } = this.state;
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
                        <input placeholder="500 V-AAA起，每1V-AAA递增" />
                        <div className="saveDetailsShow">
                            <p><img src="/img/kyye.png" /><label>可借额度 ：</label> <label>0V-AAA</label><span>全部</span></p>
                        </div>
                    </div>
                    <div className="saveDetailsList1">
                        <p><label>借款利率</label><span>0.50%</span></p>
                        <p><p><label>质押率</label><span>质押率=借贷数量/存款数量</span></p><span>50%</span></p>
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
                        <p className="btn" onClick={() => { }}>立即借款</p>
                        <p className="descr">{'请输入借款数量'}</p>
                    </div>
                    <div className="productDescr">
                        <div className="h3">
                            <label>产品说明<img src="/img/编组 17@2x.png" /></label>
                            <i><img src="/img/descrxia.png" /></i>
                        </div>
                        <div className="descr">
                            <h4>计息规则</h4>
                            <p>T+0转入，T+1计息，T+2到账至钱包账户。</p>
                            <p>提现当日不计利息。</p>
                        </div>
                        <div className="descr">
                            <h4>安全保障</h4>
                            <p>平台将使用理财资金做基础业务和流动性提供，不会挪作其他用途。基础业务和流动性提供都是钱包的低风险稳定利润的业务，对小概率情况下产生的任何资金风险，都由平台负责兜底。用户的资金不会有损失。</p>

                        </div>
                    </div>
                    <div className="question">
                        <div className="h3">
                            <label>常见问题<img src="/img/wenhao.png" /></label>
                            <i><img src="/img/rightArrow1.png" /></i>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


}

export default BorrowDetails;