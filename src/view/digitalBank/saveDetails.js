import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
let url = "https://api4.violas.io";

//存款详情
class SaveDetails extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            showList:false,
            descrContent: true,
            descrContent1: true,
            saveList: '',
            productIntor: [],
            question: [],
            amount:'',
            warning:''
        }
    }
    componentDidMount() {
        //获取存款产品信息
        fetch(url + "/1.0/violas/bank/deposit/info?id=" +sessionStorage.getItem('id')+'&&address='+sessionStorage.getItem('violas_address')).then(res => res.json()).then(res => {
            if (res.data) {
                this.setState({
                    saveList:{
                        limit: res.data.minimum_amount + '/' + res.data.quota_limit,
                        saveName: res.data.name,
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
    getInputValue = (e) =>{
        // console.log(e.target.value,'.......')
        if (e.target.value){
            this.setState({
                amount: e.target.value,
                warning:''
            })
        }
      
    }
    //立即存款
    depositImmediately = () =>{
       if(this.state.amount == ''){
          this.setState({
              warning:'请输入存款数量'
          })
       }
    }
    render() {
        let { routes } = this.props;
        let { showList, saveList, productIntor, question} = this.state;
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
                        <input placeholder="500 V-AAA起，每1V-AAA递增" className={this.state.warning ? 'activeInput':null} onChange={(e)=>this.getInputValue(e)}/>
                        <div className="saveDetailsShow">
                            <p><img src="/img/kyye.png" /><label>可用余额 ：</label> <label>0V-AAA</label><span>全部</span></p>
                            <p><img src="/img/编组 15@2x.png" /><label>每日限额 ： </label><label>{saveList.limit} {saveList.saveName}</label></p>
                        </div>
                    </div>
                    <div className="saveDetailsList1">
                        <p><label>存款年利率</label><span>{saveList.rate}%</span></p>
                        <p><p><label>质押率</label><span>质押率=借贷数量/存款数量</span></p><span>{saveList.pledge_rate}%</span></p>
                        <p><label>支付方式</label><span>钱包余额</span></p>
                    </div>
                    <div className="foot">
                        <p className="btn" onClick={() => this.depositImmediately()}>立即存款</p>
                        <p className="descr">{this.state.warning}</p>
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

                              {
                                    productIntor.map((v,i) => {
                                       return <div key={i}>
                                              {v.tital ?<h4> {v.tital}</h4> : null}
                                              {v.text ? <p>{v.text}</p> : null}
                                       </div>
                                    })
                              }
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
                                {
                                    question.map((v, i) => {
                                        return <div key={i}>
                                            {v.tital ? <h4> {v.tital}</h4> : null}
                                            {v.text ? <p>{v.text}</p> : null}
                                        </div>
                                    })
                                }
                                {/* // <h4>我能获得多少收益？</h4>
                                // <p>用户的收益取决于所存资产的数量，并且每种资产都有自己的供需市场，可用流动资金的借贷资金越多，利率增加的幅度就越大，反之亦然。</p> */}
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