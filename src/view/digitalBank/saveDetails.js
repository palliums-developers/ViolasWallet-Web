import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

//存款详情
class SaveDetails extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            showList:false,
            descrContent: true,
            descrContent1: true
        }
    }
    componentDidMount() {

    }

    render() {
        let { routes } = this.props;
        let {showList} = this.state;
        return (
            <div className="saveDetails">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank"> <img src="/img/fanhui 2@2x.png" />
              数字银行</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank/saveDetails">存款</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="saveDetailsWrap">
                    <div className="saveDetailsList">
                       <h4>
                           <label>我要存</label>
                            <div className="dropdown1">
                                <span onClick={()=>{
                                    this.setState({
                                        showList:!this.state.showList
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
                        <input placeholder="500 V-AAA起，每1V-AAA递增"/>
                        <div className="saveDetailsShow">
                            <p><img src="/img/kyye.png" /><label>可用余额 ：</label> <label>0V-AAA</label><span>全部</span></p>
                            <p><img src="/img/编组 15@2x.png" /><label>可用余额 ： </label><label>0V-AAA</label></p>
                        </div>
                    </div>
                    <div className="saveDetailsList1">
                        <p><label>存款年利率</label><span>0.50%</span></p>
                        <p><p><label>存款年利率</label><span>质押率=借贷数量/存款数量</span></p><span>50%</span></p>
                        <p><label>支付方式</label><span>钱包余额</span></p>
                    </div>
                    <div className="foot">
                        <p className="btn" onClick={() => {}}>立即存款</p>
                        <p className="descr">{'warning'}</p>
                    </div>
                    <div className="productDescr">
                      <div className="h3">
                        <label>产品说明<img src="/img/编组 17@2x.png"/></label>
                        <i onClick={()=>{
                            this.setState({
                                descrContent:!this.state.descrContent
                            })
                        }}>{
                                    this.state.descrContent ? <img src="/img/descrxia.png" /> : <img src="/img/rightArrow1.png" />
                        }</i>
                      </div>
                      {
                          this.state.descrContent ? <div className="descr">
                            <h4>① 存入银行的资产立即开始计息，随存随取，灵活便捷 </h4>
                            <h4>② 存款产生的收益来自借款市场中贷款人支付的贷款利息，因此存款收益率是浮动的 </h4>
                            <h4>③ 在银行存款同时也可作为借贷的抵押资产，每增加一笔银行存款都会提高增加您的借贷额度 </h4>
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
                            this.state.descrContent1 ? <div className="descr">
                                <h4>我能获得多少收益？</h4>
                                <p>用户的收益取决于所存资产的数量，并且每种资产都有自己的供需市场，可用流动资金的借贷资金越多，利率增加的幅度就越大，反之亦然。</p>
                            </div> : null
                        }
                        {

                            this.state.descrContent1 ? <div className="descr">
                                <h4>为什么我的可提取额度小于存款额度？</h4>
                                <p>您当前可能有借贷中的产品，借贷时系统会自动将您的部分存款进行抵押，抵押资产待还款后才可提取。</p>

                            </div> : null
                        }
                    </div>
                </div>
               
            </div>
        )
    }


}

export default SaveDetails;