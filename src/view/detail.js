import React, { Component } from "react";
import {timeStamp2String} from '../utils/timer';
import { connect } from 'react-redux';
import "./app.scss";
let url = "http://52.27.228.84:4000"
let url1 = "https://tbtc1.trezor.io"

class Detail extends Component {
    constructor(props){
      super()
      this.state = {
        // type:['Violas','Libra','Bitcoin'],
        // ind:0,
        name:'Violas',
        balance:0,
        transList:[],
        transList1:[],
        transList2:[],
        copy:false,
        btcTime:'',
        gas:0
      }
    }
    componentDidMount(){
      
      this.setState({
        name:this.props.match.params.type
      },()=>{
        if(this.state.name == 'violas'){
          this.getBalance()
        }else if(this.state.name == 'libra'){
          this.getLibraBalance()
        }else if(this.state.name == 'bitcoin'){
          this.getBTCBalance()
        }
      })
      

    }
    getBalance = () =>{
        fetch(url +"/explorer/violas/address/"+this.props.match.params.address).then(res => res.json())
        .then(res => { 
          this.setState({
            balance:res.data.status.balance / 1e6 / 10 / 10,
            transList:res.data.transactions && res.data.transactions
          })
          
        })
        .catch(e => console.log(e))
    }
    getLibraBalance = () =>{
      fetch(url +"/explorer/violas/address/"+this.props.match.params.address).then(res => res.json())
        .then(res => { 
          this.setState({
            balance:res.data.status.balance / 1e6,
            transList:res.data.transactions && res.data.transactions
          })
          
        })
        .catch(e => console.log(e))
    }
    getBTCBalance = () =>{
      fetch(url1+'/api/address/mnfvtvx49DLM6PQ5MSaHJiVWeF2A3EqjNX').then(res => res.json())
      .then(res => { 
        this.setState({
          balance:Number(res.balance) / 1e6 / 10 / 10
        },()=>{
          res.transactions.map((item,index)=>{
            fetch(url1 +"/api/tx/1dc46f1648b1a4d4828cbe4c7614c607d6da82b9112109d057344e16d19480e2").then(res => res.json())
            .then(res => { 
              this.setState({
                btcTime:res.time,
                gas:(res.valueIn-res.valueOut).toFixed(8),
                transList1:res.vin,
                transList2:res.vout
              })
            })
          })
        })
        
      })
      .catch(e => console.log(e))
  }
    // getActive = (ind,val) =>{
    //    this.setState({
    //      ind:ind,
    //      name:val
    //    })
    // }
    handleCopy = () => {
      this.setState({
        copy:true
      },()=>{
        const spanText = document.getElementById('add').innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        let Timer = setInterval(() => {
          this.setState({
            copy:false
          })
      }, 500);
      })
        
      };
    goWebsite = (version) =>{
      if(this.props.match.params.type == 'violas'){
        window.open('https://testnet.violas.io/app/Violas_version/'+version)
      }else if(this.props.match.params.type == 'bitcoin'){
        window.open('https://testnet.violas.io/app/BTC_block/'+version)
      }else if(this.props.match.params.type == 'libra'){
        window.open('https://testnet.violas.io/app/Libra_dealbox/'+version)
      }
    }
    getPayType = (address) =>{
      let addresses = [];
      addresses.push(address[0])
      for( let i=0;i<addresses.length;i++){
        if(addresses[i].indexOf('mnfvtvx49DLM6PQ5MSaHJiVWeF2A3EqjNX')==0){
            return 'transfar'
        }else{
          return 'getMoney'
        }
      }
    }
    getPayType1 = (address) =>{
      let addresses = [];
      addresses.push(address[0])
      for( let i=0;i<addresses.length;i++){
        if(addresses[i].indexOf('mnfvtvx49DLM6PQ5MSaHJiVWeF2A3EqjNX')==0){
            return 'getMoney'
        }else{
          return 'transfar'
        }
      }
    }
    render(){
        let { balance,transList,name,transList1,btcTime,gas,transList2 } = this.state;
        return (
          <div className="rightContent">
          <div className="back" onClick={()=>{
            window.history.go(-1);
            // this.props.getType(this.props.match.params.type)
            
           }}><i><img src="/img/xiala@2x.png"/></i><label>Violas</label></div>
          <div className="balanceList">
            <h4>当前资产</h4>
            <div className="balance">
              <span>{balance }&nbsp;</span>
              <span> {name == 'violas' ? 'Vtoken' : name == 'libra' ? 'Libra' : name == 'bitcoin' ? 'BTC' : null}</span>
            </div>
            <div className="list">
               <p>{this.props.match.params.nikename}</p>
               <div className="addressCode">
                 <span id="add">{this.props.match.params.address}</span>
                 
                 {
                   this.state.copy ? <i onClick={()=>this.handleCopy()}><img src="/img/Fill 32@2x.png"/></i> : <i onClick={()=>this.handleCopy()}><img src="/img/Fill 3@2x.png"/></i>
                 }
                 
               </div>
            </div>
            <div className="btns">
              <dl onClick={()=>{
                this.props.history.push({
                  pathname:'/homepage/home/homeContent/transfar/'+name,
                  state:{
                    address:this.props.match.params.address
                  }
                })
              }}>
                <dt></dt>
                <dd>转账</dd>
              </dl>
              <dl onClick={()=>{
                this.props.getDisplay(true)
              }}>
                <dt></dt>
                <dd>收款</dd>
              </dl>
            </div>
          </div>
          <div className="dealList">
             <h3><i></i>交易记录</h3>
             <div className="dealContent">
             {
              name == 'bitcoin' ? transList1.map((v,i)=>{
                return <div className="dealLists" key={i}>
                <div className="title">
                  <span>日期</span>
                  <span>消耗</span>
                  {
                    this.getPayType(v.addresses) == 'transfar' ? <span className="tranfer">转账</span> : this.getPayType(v.addresses) == 'getMoney' ? <span className="getMoney">收款</span> : null 
                    
                    // v.receiver == this.props.match.params.address ? <span className="getMoney">收款</span>  : v.sender == this.props.match.params.address ? <span className="tranfer">转账</span> : null
                  }
                  </div>
                  <div className="titleContent">
                  <span>{timeStamp2String(btcTime + '000')}</span>
                  <span>{gas}{name == 'violas' ? 'Vtoken' : name == 'libra' ? 'Libra' : name == 'bitcoin' ? 'BTC' : null}</span>
                  <span></span>
                  </div>
                  <div className="check">
                      <span>{v.addresses[0]}</span>
                      <span onClick={()=>this.goWebsite(v.version)}>浏览器查询</span>
                  </div>
              </div>
              })
               :
              transList.map((v,i)=>{
                return <div className="dealLists" key={i}>
                <div className="title">
                  <span>日期</span>
                  <span>消耗</span>
                  {
                    v.receiver == this.props.match.params.address ? <span className="getMoney">收款</span>  : v.sender == this.props.match.params.address ? <span className="tranfer">转账</span> : <span className="kai">开启</span>
                  }
                  </div>
                  <div className="titleContent">
                  <span>{timeStamp2String(v.expiration_time + '000')}</span>
                  <span>{v.gas}{name == 'violas' ? 'Vtoken' : name == 'libra' ? 'Libra' : name == 'bitcoin' ? 'BTC' : null}</span>
                  <span></span>
                  </div>
                  <div className="check">
                      <span>{v.receiver}</span>
                      <span onClick={()=>this.goWebsite(v.version)}>浏览器查询</span>
                  </div>
              </div>
              })
             }
             {
              name == 'bitcoin' ? transList2.map((v,i)=>{
                return <div className="dealLists" key={i}>
                <div className="title">
                  <span>日期</span>
                  <span>消耗</span>
                  {
                    this.getPayType1(v.scriptPubKey.addresses) == 'transfar' ? <span className="tranfer">转账</span> : this.getPayType1(v.scriptPubKey.addresses) == 'getMoney' ? <span className="getMoney">收款</span> : null 
                    
                    // v.receiver == this.props.match.params.address ? <span className="getMoney">收款</span>  : v.sender == this.props.match.params.address ? <span className="tranfer">转账</span> : null
                  }
                  </div>
                  <div className="titleContent">
                  <span>{timeStamp2String(btcTime + '000')}</span>
                  <span>{gas}{name == 'violas' ? 'Vtoken' : name == 'libra' ? 'Libra' : name == 'bitcoin' ? 'BTC' : null}</span>
                  <span></span>
                  </div>
                  <div className="check">
                      <span>{v.scriptPubKey.addresses[0]}</span>
                      <span onClick={()=>this.goWebsite(v.version)}>浏览器查询</span>
                  </div>
              </div> 
              }) : null
             }
             </div>
          </div>
          </div>
        )
    }
}

let mapStateToProps = (state) =>{
  return state.ListReducer;
}

let mapDispatchToProps = (dispatch) =>{
    return {
      getDisplay:(type)=>{
        dispatch({
           type:"DISPLAY",
           params:type
        })
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail);