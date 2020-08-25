import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

//还款
class Repayment extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            showList: false,
            active: false
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
                        <NavLink to="/homepage/home/digitalBank/borrowOrder">借款订单</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank/saveDetails">还款</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="saveDetailsWrap">
                    <div className="saveDetailsList">
                        <h4>
                            <label>我要还</label>
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
                            <p><img src="/img/kyye.png" /><label>待还余度 ：</label> <label>0V-AAA</label><span>全部</span></p>
                        </div>
                    </div>
                    <div className="saveDetailsList1">
                        <p><label>借贷率</label><span>0.50%</span></p>
                        <p><p><label>旷工费</label><span></span></p><span>50%</span></p>
                        <p><p><label>还款账户</label><span></span></p><span>银行余额</span></p>
                    </div>
                    <div className="foot">
                        <p className="btn" onClick={() => { }}>立即还款</p>
                        <p className="descr">{'请输入借款数量'}</p>
                    </div>
                   
                </div>

            </div>
        )
    }


}

export default Repayment;