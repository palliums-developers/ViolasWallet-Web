import React, { Component } from 'react';
// import '../default.scss';

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }
    componentDidMount(){
        
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
                                <p><img src="/img/BTC@2x.png"/><span>BTC</span></p>
                                <p><img src="/img/vio@2x.png"/><span>Violas</span></p>
                                <div class="changeLogo"><img src="/img/编组 2@2x.png"/></div>
                            </div>
                            <div className="title">
                                <span>转出数量</span>
                                <span>收到数量</span>
                            </div>
                            <div className="address">
                                <h4>收款地址</h4>
                                <div className="ipt">
                                    <input type="text" placeholder="请输入收款账户"/>
                                    <span><img src="/img/编组 4@2x.png"/></span>
                                </div>
                            </div>
                            <div className="rate">
                               <h4>汇率</h4>
                               <span>1BTC=1Violas</span>
                            </div>
                        </div>
                        <div className="btn">闪电兑换</div>
                    </div>
                </section>
            </div>
        );
    }

}

export default Market;
