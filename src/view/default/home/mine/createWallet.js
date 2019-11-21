import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
let bip39 = require("bip39");

class CreateWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isShow:false,
          wType:'violas',
          name:'',
          pass1:'',
          pass2:'',
        }
    }
    componentDidMount(){
        this.setState({
            wType:this.props.location.state.options
        })
    }
    getList = (type) =>{
        this.setState({
            isShow:type
        })
    }

    getValue = (e,type) =>{
        if(type == 'name'){
          this.setState({
            name:e.target.value
          })
        }else if(type == 'pass1'){
          this.setState({
            pass1:e.target.value
          })
        }else if(type == 'pass2'){
          this.setState({
            pass2:e.target.value
          })
        }
        
      }
    
    createWallet = (type) =>{
        let { name,pass1,pass2 } = this.state;
        if(name == ''){
        alert('请输入昵称！！！')
        }else if(pass1 == ''){
        alert('请设置钱包密码！！！')
        }else if(pass2 == ''){
        alert('再次确认密码！！！')
        }else if(pass1.indexOf(pass2) == -1){
        alert('两次输入密码不同！！！')
        }else{
           let extra_wallet = {}
          if(type == 'violas'){
            
            extra_wallet = {
                type:type,
                name:name,
                password:pass1,
                mnemoic:bip39.generateMnemonic()
            }
          } else if(type == 'libra'){
            extra_wallet = {
                type:type,
                name:name,
                password:pass1,
                mnemoic:bip39.generateMnemonic()
            }
          }else if(type == 'BTC'){
            extra_wallet = {
                type:type,
                name:name,
                password:pass1,
                mnemoic:bip39.generateMnemonic()
            }
          }
          let wallets = JSON.parse(window.localStorage.getItem('data'));
          wallets.extra_wallet.push(extra_wallet)
          window.localStorage.setItem('data',JSON.stringify(wallets))
          this.props.history.push('/dailyCash');
          
        }
    }
    render() {
        return (
            <div className="createWallet">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/addPurse')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span></span>
                </header>
                <section>
                   <div className="createContent">
                      <div className="head">
                            <div className="logo">
                              {
                                this.state.wType == 'violas' ? <img src="/img/vio@2x.png"/> : this.state.wType == 'lib' ? <img src="/img/lib@2x.png"/> :  this.state.wType == 'btc' ? <img src="/img/BTC@2x.png"/> : null
                              }
                            </div>
                              {
                                this.state.wType == 'violas' ? <h4>创建Vcoin钱包</h4> : this.state.wType == 'lib' ? <h4>创建Libone钱包</h4> :  this.state.wType == 'btc' ? <h4>创建Bitcoin钱包</h4> : null
                              }
                      </div>
                      <div className="form">
                         <input type="text" placeholder="请输入昵称" onChange={(e)=>this.getValue(e,'name')}/>
                         <div className="line"></div>
                         <input type="password" placeholder="设置钱包密码" onChange={(e)=>this.getValue(e,'pass1')}/>
                         <div className="line"></div>
                         <input type="password" placeholder="再次确认钱包密码" onChange={(e)=>this.getValue(e,'pass2')}/>
                         <div className="line"></div>
                         {
                            this.state.wType == 'violas' ? <div className="btn" onClick={()=>this.createWallet('violas')}>创建</div> : this.state.wType == 'lib' ? <div className="btn" onClick={()=>this.createWallet('libra')}>创建</div> :  this.state.wType == 'btc' ? <div className="btn" onClick={()=>this.createWallet('BTC')}>创建</div> : null
                         }
                      </div>
                   </div>
                </section>
                
            </div>
        );
    }
}

export default CreateWallet;
