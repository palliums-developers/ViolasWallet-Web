import React, { Component } from "react";
import "./app.scss";
import { localeLowerCase } from "lower-case";
let url = "http://52.27.228.84:4000"

class Home extends Component {
    constructor(props){
      super()
      this.state = {
        type:['Violas','Libra','Bitcoin'],
        ind:0,
        name:'Violas',
        wallet_info:[],
        identityWallet:[],
        createIdentityWallet:[]

      }
    }
    getActive = (ind,val) =>{
       this.setState({
         ind:ind,
         name:val
       },()=>{
         this.getWalletInfo()
       })
    }
    getWalletInfo(){
      let wallets = [];
      if(window.sessionStorage.getItem('wallet_info')){
        wallets = window.sessionStorage.getItem('wallet_info')
      }
      this.setState({
        wallet_info:JSON.parse(wallets)
      },()=>{
        this.getType()
      })
    }
    login_state() {
      // http://125.39.5.57:38080/app/mock/16/1.0/violas/singin
      fetch(url + "/explorer/violas/singin?session_id=" + window.sessionStorage.getItem('session_id')).then(res => res.json())
        .then(res => { 
          if(res.data.status == 1){
              this.setState({
                status:res.data.status,
                wallet_info:JSON.stringify(res.data.wallets),
              })
          }else{
            this.setState({
              wallet_info:[
                {
                  "type": "violas", "address": "3a4cd3dd5bcb938dd7f8e68e1f0ebb6bae1492c41749857d9fda01b7e5f89e6c",
                  "name": "Violas-Qwe", "identity": 0
                },
                {
                  "type": "libra", "address": "3a4cd3dd5bcb938dd7f8e68e1f0ebb6bae1492c41749857d9fda01b7e5f89e6c",
                  "name": "Libra-Qwe",
                  "identity": 0
                },
                {
                  "type": "bitcoin",
                  "address": "mk6uz3KnEVgMD7Ht7okrfNgnhsNJyDupH8",
                  "name": "Bitcoin-Qwe",
                  "identity": 0
                },
                {
                  "type": "violas",
                  "address": "e06fda7f2bfb3efc1f9e976bf277a1328f599021f45db6182309f23a9c7be949",
                  "name": "import vwallet",
                  "identity": 1
                },
                {
                  "type": "libra",
                  "address": "e06fda7f2bfb3efc1f9e976bf277a1328f599021f45db6182309f23a9c7be949",
                  "name": "import libra",
                  "identity": 1
                },
                {
                  "type": "bitcoin",
                  "address": "e06fda7f2bfb3efc1f9e976bf277a1328f599021f45db6182309f23a9c7be949",
                  "name": "import bitcoin",
                  "identity": 1
                }
              ]
            },()=>{
              this.getType()
            })
          }
        })
        .catch(e => console.log(e))
    }
    getType = () => {
      // console.log(JSON.parse(this.state.wallet_info))
      //身份
      let identityList = this.state.wallet_info && this.state.wallet_info.filter(item=>{
        return item.identity == 0
      })
      let everyIdentityList = identityList.filter(v=>{
        return this.state.name.toLowerCase() == v.type
      })
      //创建、导入
      let createIdentityList = this.state.wallet_info && this.state.wallet_info.filter(item=>{
        return item.identity == 1
      })
      let everyCreateIdentityList = createIdentityList.filter(v=>{
        return this.state.name.toLowerCase() == v.type
      })
      this.setState({
        identityWallet:everyIdentityList,
        createIdentityWallet:everyCreateIdentityList
      })
    }
    componentDidMount(){
      // this.login_state()
      this.getWalletInfo()
      
    }
    render(){
        return (
            <div className="home">
              <div className="header">
                 <div className="logo" onClick={()=>{
                  this.props.history.push('/home')
                }}><img src="/img/形状结合 2@2x.png"/></div>
              </div>
              <div className="content">
                <div className="leftContent">
                 {
                   this.state.type.map((v,i)=>{
                     return <p key={i} onClick={()=>this.getActive(i,v)} className={i == this.state.ind ? 'active' : null}><img src={v == 'Violas' ? "/img/编组 2复制 4@2x.png" : v == 'Libra' ? "/img/编组 7@2x.png" : v == 'Bitcoin' ? "/img/BTC复制 2@2x.png" : null}/><label>{v}</label></p>
                   })
                 }
                  
                
                </div>
                <div className="rightContent">
                   <div className="identity">
                    <h2>身份</h2>
                    <div className="identityList">
                    {
                      this.state.identityWallet.map((v,i)=>{
                        return <div key={i} className={v.type == 'violas' ? "listContent vBack" : v.type == 'libra' ? "listContent lBack" : v.type == 'bitcoin' ? "listContent bBack" : 'listContent'} onClick={()=>{
                          this.props.history.push('/detail/'+v.address+'/'+v.type+'/'+v.name)
                        }}>
                          <h4>{v.name}</h4>
                          <p>{v.address}</p>
                        </div>
                      })
                    }
                    </div>
                   </div>
                   <div className="createIdentity">
                   {
                    this.state.createIdentityWallet.length>0 ? <h2>创建/导入</h2> : null
                   }
                     
                     <div className="identityList createIdentityList">
                     {
                      this.state.createIdentityWallet.map((v,i)=>{
                        return <div key={i} className={v.type == 'violas' ? "listContent vBack" : v.type == 'libra' ? "listContent lBack" : v.type == 'bitcoin' ? "listContent bBack" : 'listContent'}>
                        <h4>{v.name}</h4>
                        <p>{v.address}</p>
                      </div>
                      })
                     }
                     </div>

                    </div>
                   
                </div>
              </div>
            </div>
        )
    }
}

export default Home;