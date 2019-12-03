import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
// import { creat_account_mnemonic,get_address } from '../../../../utils/kulap-function';
// import vAccount from '../../../../utils/violas';
// import {timeStamp2String} from '../../../../utils/timer';
import intl from 'react-intl-universal';
@inject('dealIndex')
@observer

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status:['未完成','已完成'],
            ind:0,
            detailData:[]
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    async componentDidMount(){
        let data = await this.props.dealIndex.selfDeal();
        let datas = data.filter(v=>v.id == this.props.location.state.id);
        this.setState({
            detailData:datas
        })
        console.log(datas,'data.....')
    }
    getIndex = (i) =>{
       this.setState({
           ind:i
       })
    }
    render() {
        let { detailData } = this.state;
        return (
            <div className="orderDetail">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/orderForm')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>{intl.get('The order details')}</span>
                </header>
                <section>
                       {
                           detailData && detailData.map((v,i)=>{
                               return <div className="first" onClick={()=>{
                                this.props.history.push('/orderDetail')
                            }} key={i}>
                               <div className="head">
                                 <p><i><img src="/img/编组 17@2x.png"/></i><span>wBBBUSD /</span><label> AAAUSD</label></p>
                                 <span>{intl.get('Completed')}</span>
                               </div>
                               <div className="firstContents">
                                     <div className="firstContentL">
                                         <div className="title">
                                             <span>{intl.get('Price')}</span>
                                             <span>{intl.get('Amount')}</span>
                                             <span>{intl.get('Time')}</span>
                                         </div>
                                         <div className="list">
                                             <span>{v.amountGet/v.amountGive}</span>
                                             <span>{v.amountGet}</span>
                                             <span>{v.date}</span>
                                         </div>
                                     </div>
                                     <div className="firstContentL firstContentL1">
                                         <div className="title">
                                             <span>{intl.get('Amount Completed')}</span>
                                             <span>{intl.get('Transaction Fee')}</span>
                                             <span></span>
                                         </div>
                                         <div className="listCon">
                                             <div className="list">
                                                 <span>{v.amountFilled}</span>
                                                 <span>0.01Vtoken</span>
                                                 <span></span>
                                             </div>
                                             <p>{intl.get('Browser query')}</p>
                                         </div>
                                     </div>
                               </div>
                            </div>
                           })
                       }
                       
                       <div className="line"></div>
                       <div className="bidHistory">
                          <h3>{intl.get('Browser query')}</h3>
                          <div className="bidHistoryList">
                              <div className="lists">
                                  <dl>
                                      <dt>{intl.get('Time')}</dt>
                                      <dd>10/17 12:06:23</dd>
                                  </dl>
                                  <dl>
                                      <dt>{intl.get('Price')}（Atoken）</dt>
                                      <dd>2000.8232</dd>
                                  </dl>
                                  <dl>
                                      <dt>{intl.get('Amount')}</dt>
                                      <dd>40.0000</dd>
                                  </dl>
                              </div>
                              <p>{intl.get('Browser query')}</p>
                          </div>
                          <div className="bidHistoryList">
                             <div className="lists">
                                  <dl>
                                      <dt>{intl.get('Time')}</dt>
                                      <dd>10/17 12:06:23</dd>
                                  </dl>
                                  <dl>
                                      <dt>{intl.get('Price')}（Atoken）</dt>
                                      <dd>2000.8232</dd>
                                  </dl>
                                  <dl>
                                      <dt>{intl.get('Amount')}</dt>
                                      <dd>40.0000</dd>
                                  </dl>
                              </div>
                              <p>{intl.get('Browser query')}</p>
                          </div>
                          <div className="bidHistoryList">
                              <div className="lists">
                                  <dl>
                                      <dt>{intl.get('Time')}</dt>
                                      <dd>10/17 12:06:23</dd>
                                  </dl>
                                  <dl>
                                      <dt>{intl.get('Price')}（Atoken）</dt>
                                      <dd>2000.8232</dd>
                                  </dl>
                                  <dl>
                                      <dt>{intl.get('Amount')}</dt>
                                      <dd>40.0000</dd>
                                  </dl>
                               </div>
                               <p>{intl.get('Browser query')}</p>
                          </div>
                       </div>
                </section>
            </div>
        );
    }
}

export default OrderDetail;
