import React, { Component } from 'react';
// import { inject,observer } from 'mobx-react';
// import { creat_account_mnemonic,get_address } from '../../../../utils/kulap-function';
// import vAccount from '../../../../utils/violas';
// import {timeStamp2String} from '../../../../utils/timer';

// @inject('index')
// @observer

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status:['未完成','已完成'],
            ind:0
        }
    }
    async componentDidMount(){
       
    }
    getIndex = (i) =>{
       this.setState({
           ind:i
       })
    }
    render() {
        
        return (
            <div className="orderDetail">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/orderForm')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>订单详情</span>
                </header>
                <section>
                       <div className="first" onClick={()=>{
                           this.props.history.push('/orderDetail')
                       }}>
                          <div className="head">
                            <p><i><img src="/img/编组 17@2x.png"/></i><span>wBBBUSD /</span><label> AAAUSD</label></p>
                            <span>已完成</span>
                          </div>
                          <div className="firstContents">
                                <div className="firstContentL">
                                    <div className="title">
                                        <span>价格</span>
                                        <span>数量</span>
                                        <span>时间</span>
                                    </div>
                                    <div className="list">
                                        <span>9.2</span>
                                        <span>2000.82</span>
                                        <span>01/18 12:06:23</span>
                                    </div>
                                </div>
                                <div className="firstContentL firstContentL1">
                                    <div className="title">
                                        <span>已成交数量</span>
                                        <span>手续费</span>
                                        <span></span>
                                    </div>
                                    <div className="listCon">
                                        <div className="list">
                                            <span>50</span>
                                            <span>0.01Vtoken</span>
                                            <span></span>
                                        </div>
                                        <p>浏览器查询</p>
                                    </div>
                                </div>
                          </div>
                       </div>
                       <div className="line"></div>
                       <div className="bidHistory">
                          <h3>成交记录</h3>
                          <div className="bidHistoryList">
                              <div className="lists">
                                  <dl>
                                      <dt>时间</dt>
                                      <dd>10/17 12:06:23</dd>
                                  </dl>
                                  <dl>
                                      <dt>价格（Atoken）</dt>
                                      <dd>2000.8232</dd>
                                  </dl>
                                  <dl>
                                      <dt>数量</dt>
                                      <dd>40.0000</dd>
                                  </dl>
                              </div>
                              <p>浏览器查询</p>
                          </div>
                          <div className="bidHistoryList">
                              <div className="lists">
                                  <dl>
                                      <dt>时间</dt>
                                      <dd>10/17 12:06:23</dd>
                                  </dl>
                                  <dl>
                                      <dt>价格（Atoken）</dt>
                                      <dd>2000.8232</dd>
                                  </dl>
                                  <dl>
                                      <dt>数量</dt>
                                      <dd>40.0000</dd>
                                  </dl>
                              </div>
                              <p>浏览器查询</p>
                          </div>
                          <div className="bidHistoryList">
                              <div className="lists">
                                  <dl>
                                      <dt>时间</dt>
                                      <dd>10/17 12:06:23</dd>
                                  </dl>
                                  <dl>
                                      <dt>价格（Atoken）</dt>
                                      <dd>2000.8232</dd>
                                  </dl>
                                  <dl>
                                      <dt>数量</dt>
                                      <dd>40.0000</dd>
                                  </dl>
                              </div>
                              <p>浏览器查询</p>
                          </div>
                       </div>
                </section>
            </div>
        );
    }
}

export default OrderDetail;
