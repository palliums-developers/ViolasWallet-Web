import React, { Component } from 'react';

class Record1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="record">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/home/mine')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>交易记录</span>
                </header>
                <section>
                    <div className="recordDetail">
                        <div className="title">
                            <span>日期</span>
                            <span>数量</span>
                            <span>转账</span>
                        </div>
                        <div className="titleContent">
                            <span>18.05.23 15:42</span>
                            <span>1.906321 BTC</span>
                            <span>BTC</span>
                        </div>
                        <div className="titleContent">
                            <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                            <p>浏览器查询</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Record1;
