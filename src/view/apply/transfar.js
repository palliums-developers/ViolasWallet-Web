import React, { Component } from "react";
// import "./app.scss";
import { connect } from 'react-redux';
// import {withRouter} from 'react-router-dom'
let url = "http://52.27.228.84:4000"

class Transfar extends Component {
    constructor(props){
      super()
      this.state = {
        balance:0,
        title:'',
        warning:'',
        getAct:false,
        address:'',
        amount:''
      }
    }
    componentDidMount(){
        this.getBalance()
        if(this.props.location.pathname.split("/")[5]){
            let type = this.props.location.pathname.split("/")[5]
            this.setState({
              title:type.replace(type[0],type[0].toUpperCase())
            })
          }
    }
    getBalance = () =>{
        if(this.props.location.state.address){
            fetch(url +"/explorer/violas/address/"+this.props.location.state.address).then(res => res.json())
                .then(res => { 
                if(this.props.match.params.type == 'bitcoin'){
                    this.setState({
                    balance:res.data.status.balance / 1e6 / 10 / 10
                    })
                }else{
                    this.setState({
                    balance:res.data.status.balance / 1e6
                    })
                }
                
                })
                .catch(e => console.log(e))
        }
    }
    getTransAddress = (e) =>{
        this.setState({
            address:e.target.value
        },()=>{
            if(this.state.address){
                if(this.state.title == 'Violas'){
                    if(this.state.address.length != 32){
                     this.setState({
                         warning:'地址错误'
                     })
                    }else{
                     this.setState({
                         warning:''
                     })
                    }
                 }else if(this.state.title == 'Libra'){
                     if(this.state.address.length != 32){
                         this.setState({
                             warning:'地址错误'
                         })
                     }else{
                         this.setState({
                             warning:''
                         })
                        }
                 }else if(this.state.title == 'Bitcoin'){
                     if(this.state.address.length != 35){
                         this.setState({
                             warning:'地址错误'
                         })
                     }else{
                         this.setState({
                             warning:''
                         })
                     }
                 }
            }
        })
     
    }
    getTransAmount = (e) =>{
        this.setState({
            amount:e.target.value
        },()=>{
            if(Number(this.state.amount) > Number(this.state.balance)){
                this.setState({
                    warning:'可用余额不足'
                })
             }else{
                 this.setState({
                     warning:''
                 })
             }
        })
    }
    getNext = () =>{
        
      if(this.state.address == ''){
        alert('请输入您的转账地址')
      }else if(this.state.amount == ''){
        alert('请输入金额')
      }else{
        
        if(this.state.warning == ''){
            this.setState({
                getAct:!this.state.getAct
            },()=>{
                
                this.props.getDisplay1({
                    address:this.state.address
                })
                // this.props.getAddress({
                //     address:this.state.address
                // })
            })
        }
        
      }
      
      
    }
    render(){
        let { title,balance,warning } = this.state;
        return (
          <div className="rightContent transfar">
            <div className="back" onClick={()=>{
                window.history.go(-1);
                // this.props.getType(this.props.match.params.type)
                
            }}><i><img src="/img/xiala@2x.png"/></i><label>Violas</label></div>
            <div className="transfarContent">
              <div className="transfarList">
                <h4>{title}转账</h4>
                <div className="iptAddress">
                  <textarea placeholder="请输入您的Violas转账地址" onChange={(e)=>this.getTransAddress(e)}></textarea>
                </div>
                <div className="iptAmount">
                  <input placeholder="请输入金额" onChange={(e)=>this.getTransAmount(e)}/>
                  <label>{title == 'Violas' ? 'vtoken' : title == 'Libra' ? 'libra' : title == 'Bitcoin' ? 'BTC' : null}</label>
                </div>
                <div className="amountShow">
                  <p>余额 <span>{balance}{title == 'Violas' ? 'vtoken' : title == 'Libra' ? 'libra' : title == 'Bitcoin' ? 'BTC' : null}</span></p>
                </div>
                <div className="foot">
                   {
                       this.state.getAct == false ? <p className="btn" onClick={()=>this.getNext()}>下一步</p> : <p className="btn active" onClick={()=>this.getNext()}>下一步</p>
                   }
                   <p className="descr">{warning}</p>
                </div>
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
     getDisplay1:(params)=>{
        dispatch({
            type:'DISPLAY1',
            params:{
                type:true,
                address:params.address
            }
        })
     }
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Transfar);