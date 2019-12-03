import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import { Slider, WingBlank } from 'antd-mobile';
import { inject,observer } from 'mobx-react';
import intl from 'react-intl-universal';

@inject('dealIndex')
@observer

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            coin:true,
            rate: 0,
            curEntrust:[],
            othersEntrust:[],
            dealData:[]
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    async componentDidMount(){
        this.getContent()
        
    }
    async getContent(){
        let { ind,inds,list,stableDeal,selfDeal }= this.props.dealIndex;
        let data = await selfDeal()
        this.setState({
            dealData:data
        })
        let dealData = [];
        if(list[ind].addr < list[inds].addr){
            dealData = await stableDeal({
                base:list[ind].addr,
                quote:list[inds].addr
             });
            this.setState({
                curEntrust:dealData.buys
            })
        }else{
            dealData = await stableDeal({
                base:list[inds].addr,
                quote:list[ind].addr
             });
            this.setState({
                othersEntrust:dealData.sells
            })
        }
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

    getChange = (type) =>{
       if(type == 'a'){
            this.props.dealIndex.selectChange({
                isShow:true
            })
       }else if(type == 'b'){
        this.props.dealIndex.selectsChange({
            isShows:true
        })
       }
       
    }

    render() {
        let {curEntrust,othersEntrust,dealData} = this.state;
        let {vals,val} = this.props.dealIndex;
        console.log(dealData,'dealData......')
        return (
            <div className="market">
                <header>
                    {intl.get('Market')}
                </header>
                <section>
                    <div className="marketDescr">
                        <div className="changeDescr">
                            <div className="change">
                                {
                                    this.state.coin ? <div id="select">
                                  <div onClick={() => this.getChange('a')}><label>{this.props.dealIndex.val}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div> : <div id="select">
                                    <div onClick={() => this.getChange('b')}><label>{this.props.dealIndex.vals}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div>
                                }
                                <div className={this.state.coin ? 'changeLogo noReturn' : 'changeLogo return'} onClick={()=>this.getCoin()}></div>
                                {
                                    this.state.coin ? <div id="select">
                                    <div onClick={() => this.getChange('b')}><label>{this.props.dealIndex.vals}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div> : <div id="select">
                                    <div onClick={() => this.getChange('a')}><label>{this.props.dealIndex.val}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div>
                                }
                                
                            </div>
                            
                            <div className="title">
                                <span>{intl.get('Amount Transfered')}</span>
                                <span>{intl.get('Amount Received')}</span>
                            </div>
                            <div className="address">
                                <h4>{intl.get('Receving Address')}</h4>
                                <div className="ipt">
                                    <input type="text" placeholder={intl.get('Input Receving Account')}/>
                                </div>
                            </div>
                            <div className="rate">
                               <h4>{intl.get('Exchange Rate')}</h4>
                               <span>1AAAUSD=1BBBUSD</span>
                            </div>
                            <div className="line"></div>
                            <div className="fees">
                                <h4>{intl.get('Transaction Fee')}</h4>
                                <div className="speed">
                                    <p className="sub-title">{intl.get('Slow')}</p>
                                    <p className="sub-title">{intl.get('Fast')}</p>
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
                            <div className="btn">{intl.get('Exchange')}</div>
                        </div>
                    </div>
                    <div className="commissioned ">
                        <div className="head">
                            <h4>{intl.get('Market')}</h4>
                            <span onClick={()=>{
                                  this.props.history.push('/orderForm')
                              }}>{intl.get('All')}</span>
                        </div>
                        <div className="list">
                            <div className="title">
                                <span>{intl.get('Market')}</span>
                                <span>{intl.get('Amount')}({val})</span>
                                <span>{intl.get('Exchange Rate')}</span>
                            </div>
                            <div className="lists">
                                {
                                    dealData && dealData.map((v,i)=>{
                                        return <div className="listRecord" key={i}>
                                                    <div className="deal">
                                                    <p><i><img src="/img/编组 17@2x.png"/></i><span>{val}/</span><label>{vals}</label></p>
                                                    <p>{v.amountGet}</p>
                                                    <p>{v.amountGet/v.amountGive}</p>
                                                    </div>
                                                    <div className="time">
                                                    {v.date}
                                                    </div>
                                                </div>
                                    })
                                }
                              
                            </div>
                        </div>
                    </div>
                    <div className="commissioneds ">
                        <div className="head">
                            <div id="select">
                                <div><label style={{fontSize:'0.43rem',fontWeight:600,color:'rgba(96, 96, 109, 1)'}}>{intl.get('Commissioned ByOther')}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                            </div>
                        </div>
                        <div className="list">
                            <div className="title">
                                <span>{intl.get('Amount')}({vals})</span>
                                <span>{intl.get('Price')}({val}/{vals})</span>
                            </div>
                            <div className="lists">
                                {
                                    curEntrust && curEntrust.map((v,i)=>{
                                        return <div className="listRecord" key={i}>
                                                    <p><i><img src="/img/编组 17@2x.png"/></i><span>{v.amountGet}</span></p>
                                                    <p>{v.amountGet/v.amountGive}</p>
                                                </div>
                                    })
                                }
                                {
                                    othersEntrust && othersEntrust.map((v,i)=>{
                                        return <div className="listRecord" key={i}>
                                                    <p><i><img src="/img/编组 14复制 2@2x.png"/></i><span>{v.amountGet}</span></p>
                                                    <p style={{color:'rgba(255, 88, 88, 1)'}}>{v.amountGet/v.amountGive}</p>
                                                </div>
                                    })
                                }
                            </div>
                        </div>
                     </div>    
                </section>
            </div>
        );
    }

}

export default Market;
