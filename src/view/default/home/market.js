import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import { Slider, WingBlank } from 'antd-mobile';
import { inject,observer } from 'mobx-react';

@inject('dealIndex')
@observer

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            coin:true,
            rate: 0,
        }
    }
    componentDidMount(){
        
    }

    getCoin = () =>{
      this.setState({
        coin:!this.state.coin
      })
    }
    log = (name) => {
        return (value) => {
            //   console.log(`${name}: ${value}`);
            this.setState({
                rate: value
            })

        };
    }

    getChange = () =>{
       this.props.dealIndex.selectChange(true)
    }

    render() {
        return (
            <div className="market">
                <header>
                    市场
                </header>
                <section>
                    <div className="marketDescr">
                        <div className="changeDescr">
                            <div className="change">
                                <div id="select">
                                    <div onClick={() => this.getChange()}><label>AAAUSD</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div>
                                <div className="changeLogo" onClick={()=>this.getCoin()}><img src="/img/编组 2@2x.png"/></div>
                                <div id="select">
                                    <div onClick={() => this.getChange()}><label>BBBUSD</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div>
                            </div>
                            
                            <div className="title">
                                <span>转出数量</span>
                                <span>收到数量</span>
                            </div>
                            <div className="address">
                                <h4>收款地址</h4>
                                <div className="ipt">
                                    <input type="text" placeholder="请输入收款账户"/>
                                </div>
                            </div>
                            <div className="rate">
                               <h4>汇率</h4>
                               <span>1AAAUSD=1BBBUSD</span>
                            </div>
                            <div className="line"></div>
                            <div className="fees">
                                <h4>手续费</h4>
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
                            <div className="btn">兑换</div>
                        </div>
                    </div>
                    <div className="commissioned ">
                        <div className="head">
                            <h4>当前委托</h4>
                            <span>全部</span>
                        </div>
                        <div className="list">
                            <div className="title">
                                <span>市场</span>
                                <span>数量(BBBUSD)</span>
                                <span>价格(BBBUSD)</span>
                            </div>
                            <div className="lists">
                              <div className="listRecord" onClick={()=>{
                                  this.props.history.push('/orderForm')
                              }}>
                                  <div className="deal">
                                    <p><i><img src="/img/编组 17@2x.png"/></i><span>BBBUSD/</span><label>AAAUSD</label></p>
                                    <p>200</p>
                                    <p>7.1</p>
                                  </div>
                                  <div className="time">
                                    01/18   12:06:23
                                  </div>
                              </div>
                              <div className="listRecord">
                                  <div className="deal">
                                    <p><i><img src="/img/编组 17@2x.png"/></i><span>BBBUSD/</span><label>AAAUSD</label></p>
                                    <p>200</p>
                                    <p>7.1</p>
                                  </div>
                                  <div className="time">
                                    01/18   12:06:23
                                  </div>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="commissioneds ">
                        <div className="head">
                            <div id="select">
                                <div><label style={{fontSize:'0.43rem',fontWeight:600,color:'rgba(96, 96, 109, 1)'}}>他人委托</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                            </div>
                        </div>
                        <div className="list">
                            <div className="title">
                                <span>数量(BBBUSD)</span>
                                <span>价格(BBBUSD)</span>
                            </div>
                            <div className="lists">
                                <div className="listRecord">
                                    <p><i><img src="/img/编组 17@2x.png"/></i><span>200</span></p>
                                    <p>7.1</p>
                                </div>
                                <div className="listRecord">
                                    <p><i><img src="/img/编组 17@2x.png"/></i><span>200</span></p>
                                    <p>7.1</p>
                                </div>
                                <div className="listRecord">
                                    <p><i><img src="/img/编组 17@2x.png"/></i><span>200</span></p>
                                    <p>7.1</p>
                                </div>
                            </div>
                        </div>
                     </div>    
                </section>
            </div>
        );
    }

}

export default Market;
