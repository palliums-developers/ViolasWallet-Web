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
            condata:[],
            otherdata:[],
            dealData:[],
            count:''
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    async componentDidMount(){
        
        let coinData = await this.props.dealIndex.getCoinMess();
        let othersData = await this.props.dealIndex.getOthersCoinMess();
        this.setState({
            coindata: coinData,
            othersdata: othersData
        },()=>{
         this.getContent()   
        })
        
    }
    async getContent(){
        let { val,vals,stableDeal,selfDeal }= this.props.dealIndex;
        let { coindata,othersdata } = this.state;
        let data = await selfDeal();
        this.setState({
            dealData:data
        })
        let dealData = [];
            if (coindata && coindata[val].address < othersdata && othersdata[vals].addr) {
                dealData = await stableDeal({
                    base: coindata && coindata[val].address,
                    quote: othersdata && othersdata[vals].addr
                });
                console.log(dealData, 'dealData........')
                this.setState({
                    curEntrust:dealData.buys
                })
            } else {
                dealData = await stableDeal({
                    base: othersdata && othersdata[vals].addr,
                    quote: coindata && coindata[val].address
                });
                console.log(dealData, 'dealData2........')
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
   getCount = (e) =>{
     this.setState({
         count:e.target.value
     })
   }
    render() {
        let {
            curEntrust,
            othersEntrust,
            dealData,
            othersdata,
            coindata
        } = this.state;
        let {vals,val} = this.props.dealIndex;
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
                                  <div onClick={() => this.getChange('a')}><label>{coindata && coindata[val].name}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div> : <div id="select">
                                    <div onClick={() => this.getChange('b')}><label>{othersdata && othersdata[vals].name}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div>
                                }
                                <div className={this.state.coin ? 'changeLogo noReturn' : 'changeLogo return'} onClick={()=>this.getCoin()}></div>
                                {
                                    this.state.coin ? <div id="select">
                                    <div onClick={() => this.getChange('b')}><label>{othersdata && othersdata[vals].name}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div> : <div id="select">
                                    <div onClick={() => this.getChange('a')}><label>{coindata && coindata[val].name}</label><img src="/img/Combined Shape复制 3@2x.png" /></div>
                                </div>
                                }
                                
                            </div>
                            
                            <div className="title">
                                <input type="text" value={this.state.count} placeholder={intl.get('Amount Transfered')} onChange={(e)=>this.getCount(e)}/>
                                <input type = "text"
                                 value = {
                                     this.state.count
                                 }
                                placeholder = {
                                    intl.get('Amount Received')
                                }
                                onChange = {
                                    (e) => this.getCount(e)
                                }
                                />
                            </div>
                            <div className="address">
                                <h4>{intl.get('Receving Address')}</h4>
                                <div className="ipt">
                                    <input type="text" placeholder={intl.get('Input Receving Account')}/>
                                </div>
                            </div>
                            <div className="rate">
                               <h4>{intl.get('Exchange Rate')}</h4>
                               {
                                   this.state.coin ? <span>1{coindata && coindata[val].name}=1{othersdata && othersdata[vals].name}</span> : <span>1{othersdata && othersdata[vals].name}=1{coindata && coindata[val].name}</span> 
                               }
                               
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
                            <h4>{intl.get('Current Commission')}</h4>
                            <span onClick={()=>{
                                if(this.state.coin){
                                    this.props.history.push({
                                        pathname: '/orderForm',
                                        state:{
                                            selfCoin: coindata && coindata[val].name,
                                            othersCoin: othersdata && othersdata[vals].name,
                                            price: othersdata && othersdata[vals].price
                                        }
                                    })
                                }else{
                                    this.props.history.push({
                                        pathname: '/orderForm',
                                        state: {
                                            selfCoin: othersdata && othersdata[vals].name,
                                            othersCoin: coindata && coindata[val].name,
                                            price: othersdata && othersdata[vals].price
                                        }
                                    })
                                }
                                  
                              }}>{intl.get('All')}</span>
                        </div>
                        <div className="list">
                            <div className="title">
                                <span>{intl.get('Market')}</span>
                                <span>{intl.get('Amount')}</span>
                                <span>{intl.get('Price')}</span>
                            </div>
                            <div className="lists">
                                {
                                    dealData && dealData.map((v,i)=>{
                                        return <div className="listRecord" key={i}>
                                                    <div className="deal">
                                                    <p><i><img src="/img/编组 17@2x.png" /></i><span>{othersdata && othersdata[vals].name}/</span><label>{coindata && coindata[val].name}</label></p>
                                                    <p>{v.amountGet}</p>
                                                    <p>{othersdata && othersdata[vals].price}</p>
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
                                <span>{intl.get('Amount')}</span>
                                <span>{intl.get('Price')}(USD)</span>
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
