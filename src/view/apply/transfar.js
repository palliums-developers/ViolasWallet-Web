import React, { Component } from "react";
import { connect } from 'react-redux';
// import {withRouter} from 'react-router-dom'
let url = "http://52.27.228.84:4000"
let url1 = "https://tbtc1.trezor.io"
let url2 = "https://api.violas.io"
let WAValidator = require('wallet-address-validator');

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
        if(this.props.location.pathname.split("/")[5]){
            let type = this.props.location.pathname.split("/")[5]
            this.setState({
              title:type.replace(type[0],type[0].toUpperCase())
            },()=>{
                if (this.state.title.toLowerCase() == 'violas') {
                    this.getBalance()
                } else if (this.state.title.toLowerCase() == 'libra') {
                    this.getLibraBalance()
                } else if (this.state.title.toLowerCase() == 'bitcoin') {
                    this.getBTCBalance()
                }
            })
          }
    }

    getBalance = () =>{
        if (window.sessionStorage.getItem('address')){
            fetch(url + "/explorer/violas/address/" + window.sessionStorage.getItem('address')).then(res => res.json())
                .then(res => { 
                    this.setState({
                        balance: res.data.status.balance / 1e6
                    })
                
                })
        }
    }
    getLibraBalance = () => {
        if (window.sessionStorage.getItem('address')) {
        fetch(url2 + "/explorer/libra/address/" + window.sessionStorage.getItem('address')).then(res => res.json())
            .then(res => {
                this.setState({
                    balance: res.data.status.balance / 1e6
                })

            })
        }
    }
    getBTCBalance = () => {
        console.log(window.sessionStorage.getItem('address'))
        if (window.sessionStorage.getItem('address')){
            fetch(url1 + '/api/address/' + window.sessionStorage.getItem('address')).then(res => res.json())
                .then(res => {
                    this.setState({
                        balance: Number(res.balance)
                    })

                })
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
                         warning:'address error'
                     })
                    }else{
                     this.setState({
                         warning:''
                     })
                    }
                 }else if(this.state.title == 'Libra'){
                     if(this.state.address.length != 32){
                         this.setState({
                             warning:'address error'
                         })
                     }else{
                         this.setState({
                             warning:''
                         })
                        }
                 }else if(this.state.title == 'Bitcoin'){
                    let valid = WAValidator.validate(this.state.address, 'bitcoin','testnet');
                     if (valid) {
                       this.setState({
                         warning: ""
                       });
                     } else {
                       
                       this.setState({
                           warning: "address error"
                       });
                     }
                 }
            }else{
                this.setState({
                  warning: ""
                });
            }
        })
     
    }
    getTransAmount = (e) =>{
        this.setState({
            amount:e.target.value
        },()=>{
            if(Number(this.state.amount) > Number(this.state.balance)){
                this.setState({
                    warning:'Insufficient available balance'
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
        alert('Please input address')
      }else if(this.state.amount == ''){
        alert('Please input amount')
      }else{
        
        if(this.state.warning == ''){
            this.setState({
                getAct:!this.state.getAct
            },()=>{
                if (this.state.title == 'Bitcoin'){
                    this.props.getDisplay1({
                        address: this.state.address,
                        amount: this.state.amount * 1e8
                    })
                }else{
                    this.props.getDisplay1({
                        address: this.state.address,
                        amount: this.state.amount * 1e6
                    })
                }
                // this.props.getDisplay1({
                //     address: this.state.address,
                //     amount: this.state.amount * 10e8
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
                <h4>{title}Transfer</h4>
                <div className="iptAddress">
                    <textarea placeholder={'Please input your '+title+' address'} onChange={(e)=>this.getTransAddress(e)}></textarea>
                </div>
                <div className="iptAmount">
                  <input placeholder="Please input amount" onChange={(e)=>this.getTransAmount(e)}/>
                  <label>{title == 'Violas' ? 'vtoken' : title == 'Libra' ? 'libra' : title == 'Bitcoin' ? 'BTC' : null}</label>
                </div>
                <div className="amountShow">
                    <p>Balance <span>{balance}{title == 'Violas' ? 'vtoken' : title == 'Libra' ? 'libra' : title == 'Bitcoin' ? 'BTC' : null}</span></p>
                </div>
                <div className="foot">
                   {
                    this.state.getAct == false ? <p className="btn" onClick={() => this.getNext()}>Next</p> : <p className="btn active" onClick={() => this.getNext()}>Next</p>
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
                address:params.address,
                amount:Number(params.amount)
            }
        })
     }
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Transfar);