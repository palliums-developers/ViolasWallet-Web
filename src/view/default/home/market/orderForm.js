import React, { Component } from 'react';
// import { inject,observer } from 'mobx-react';
// import { creat_account_mnemonic,get_address } from '../../../../utils/kulap-function';
// import vAccount from '../../../../utils/violas';
// import {timeStamp2String} from '../../../../utils/timer';
import intl from 'react-intl-universal';

// @inject('index')
// @observer

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status:['Incomplete','Completed'],
            ind:0
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    getIndex = (i) =>{
       this.setState({
           ind:i
       })
    }
    render() {
        
        return (
            <div className="orderForm">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/home/market')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>{intl.get('Order')}</span>
                </header>
                <section>
                   <div className="navList">
                       {
                           this.state.status.map((v,i)=>{
                           return <span onClick={()=>this.getIndex(i)} key={i}><label className={this.state.ind ==i ? 'active': ''}>{intl.get(v)}</label></span>
                           })
                       }
                   </div>
                   <div className={this.state.ind == 0 ? 'unfinishedList' : 'unfinishedList dis'}>
                       <div className="first" onClick={()=>{
                           this.props.history.push('/orderDetail')
                       }}>
                          <div className="head">
                            <p><i><img src="/img/编组 17@2x.png"/></i><span>wBBBUSD/</span><label>AAAUSD</label></p>
                            <span>{intl.get('cancel')}</span>
                          </div>
                          <div className="firstContents">
                            <div className="firstContent">
                                <div className="firstContentL">
                                    <div className="title">
                                        <span>{intl.get('Price')}</span>
                                        <span>{intl.get('Amount')}</span>
                                        <span>{intl.get('Time')}</span>
                                    </div>
                                    <div className="list">
                                        <span>9.2</span>
                                        <span>2000.82</span>
                                        <span>01/18 12:06:23</span>
                                    </div>
                                </div>
                                <div className="firstContentL">
                                    <div className="title">
                                        <span>{intl.get('Amount Completed')}</span>
                                        <span>{intl.get('Transaction Fee')}</span>
                                        <span></span>
                                    </div>
                                    <div className="list">
                                        <span>50</span>
                                        <span>0.01Vtoken</span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div className="rightLogo"><img src="/img/Shape@2x.png"/></div>
                          </div>
                       </div>
                       <div className="first">
                       <div className="head">
                            <p><i><img src="/img/编组 17@2x.png"/></i><span>wBBBUSD/</span><label>AAAUSD</label></p>
                            <span>{intl.get('cancel')}</span>
                          </div>
                          <div className="firstContents">
                            <div className="firstContent">
                                <div className="firstContentL">
                                    <div className="title">
                                        <span>{intl.get('Price')}</span>
                                        <span>{intl.get('Amount')}</span>
                                        <span>{intl.get('Time')}</span>
                                    </div>
                                    <div className="list">
                                        <span>9.2</span>
                                        <span>2000.82</span>
                                        <span>01/18 12:06:23</span>
                                    </div>
                                </div>
                                <div className="firstContentL">
                                    <div className="title">
                                        <span>{intl.get('Amount Completed')}</span>
                                        <span>{intl.get('Transaction Fee')}</span>
                                        <span></span>
                                    </div>
                                    <div className="list">
                                        <span>50</span>
                                        <span>0.01Vtoken</span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div className="rightLogo"><img src="/img/Shape@2x.png"/></div>
                          </div>
                       </div>
                   </div>
                   <div className={this.state.ind == 1 ? 'unfinishedList' : 'unfinishedList dis'}>
                       <div className="first">
                       <div className="head">
                            <p><i><img src="/img/编组 17@2x.png"/></i><span>wBBBUSD2/</span><label>AAAUSD</label></p>
                            <span>{intl.get('cancel')}</span>
                          </div>
                          <div className="firstContents">
                            <div className="firstContent">
                                <div className="firstContentL">
                                    <div className="title">
                                        <span>{intl.get('Price')}</span>
                                        <span>{intl.get('Amount')}</span>
                                        <span>{intl.get('Time')}</span>
                                    </div>
                                    <div className="list">
                                        <span>9.2</span>
                                        <span>2000.82</span>
                                        <span>01/18 12:06:23</span>
                                    </div>
                                </div>
                                <div className="firstContentL">
                                    <div className="title">
                                        <span>{intl.get('Amount Completed')}</span>
                                        <span>{intl.get('Transaction Fee')}</span>
                                        <span></span>
                                    </div>
                                    <div className="list">
                                        <span>50</span>
                                        <span>0.01Vtoken</span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div className="rightLogo"><img src="/img/Shape@2x.png"/></div>
                          </div>
                       </div>
                       <div className="first">
                       <div className="head">
                            <p><i><img src="/img/编组 17@2x.png"/></i><span>wBBBUSD/</span><label>AAAUSD</label></p>
                            <span>{intl.get('cancel')}</span>
                          </div>
                          <div className="firstContents">
                            <div className="firstContent">
                                <div className="firstContentL">
                                    <div className="title">
                                        <span>{intl.get('Price')}</span>
                                        <span>{intl.get('Amount')}</span>
                                        <span>{intl.get('Time')}</span>
                                    </div>
                                    <div className="list">
                                        <span>9.2</span>
                                        <span>2000.82</span>
                                        <span>01/18 12:06:23</span>
                                    </div>
                                </div>
                                <div className="firstContentL">
                                    <div className="title">
                                        <span>{intl.get('Amount Completed')}</span>
                                        <span>{intl.get('Transaction Fee')}</span>
                                        <span></span>
                                    </div>
                                    <div className="list">
                                        <span>50</span>
                                        <span>0.01Vtoken</span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div className="rightLogo"><img src="/img/Shape@2x.png"/></div>
                          </div>
                       </div>
                   </div>
                </section>
            </div>
        );
    }
}

export default OrderForm;
