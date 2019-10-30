import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import 'antd-mobile/dist/antd-mobile.css';
import { Slider, WingBlank, WhiteSpace } from 'antd-mobile';

@inject('index')
@observer

class Transfar extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }
    }
    componentDidMount(){
    //    console.log(this.props.index.purse)
    }
    log = (name) => {
        return (value) => {
          console.log(`${name}: ${value}`);
        };
      }
    render() {
        let { purse } = this.props.index
        return (
            <div className="transfar">
                <header>
                    <span onClick={() => {
                    this.props.history.push({
                        pathname:'/home/wallet',
                        state:false
                    })
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    {
                       purse == 'violas钱包' ? <span>violas转账</span> : purse == 'BTC钱包' ? <span>BTC转账</span> : purse == 'libra钱包' ? <span>libra转账</span> : null
                    }
                    
                </header>
                <section>
                    <div className="transfarDescr">
                       <div className="form">
                        <div className="title">
                            <span>BTC</span>
                            <span>余额：<s>1.2</s>BTC</span>
                        </div>
                        <input type="text" placeholder="输入金额"/>
                        <div className="title">
                            <span>收款地址</span>
                            <span>地址簿</span>
                        </div>
                        <div className="ipt">
                          <input type="text" placeholder="输入BTC收款地址"/>
                          <span><img src="/img/编组 3复制@2x.png"/></span>
                        </div>
                       </div>
                       <div className="fees">
                            <div className="title">
                                <span>手续费</span>
                            </div>
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
                       </div>
                       <div className="btn">
                           确认转账
                       </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Transfar;
