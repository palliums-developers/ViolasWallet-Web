import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import {timeStamp2String} from '../../../../utils/timer';

@inject('index')
@observer

class Record1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordsdata:[]
        }
    }
    async componentDidMount(){
       let recordsData = await this.props.index.getDealRecord()
       this.setState({
        recordsdata:recordsData
       })
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
                    {
                        this.state.recordsdata && this.state.recordsdata.map((v,i)=>{
                            return <div className="recordDetail" key={i}>
                                        <div className="title">
                                            <span>日期</span>
                                            <span>数量</span>
                                            <span>转账</span>
                                        </div>
                                        <div className="titleContent">
                                            <span>{timeStamp2String(v.date+'000')}</span>
                                            <span>{v.value} BTC</span>
                                            <span>BTC</span>
                                        </div>
                                        <div className="titleContent">
                                            <p>{v.address}</p>
                                            <p>浏览器查询</p>
                                        </div>
                                    </div>
                        })
                    }
                </section>
            </div>
        );
    }
}

export default Record1;
