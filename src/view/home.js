import React, { Component } from "react";
import "./app.scss";
import { localeLowerCase } from "lower-case";
import { connect } from 'react-redux'
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
      this.props.getTypes({
        types:''
      })
      this.props.getTypes1({
        types1:''
      })
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
        
        if(this.props.type){
          if(this.props.type == 'violas'){
            this.setState({
              ind:0
            })
          }else if(this.props.type == 'libra'){
            this.setState({
              ind:1
            })
          }else if(this.props.type == 'bitcoin'){
            this.setState({
              ind:2
            })
         }
          let identityList = this.state.wallet_info && this.state.wallet_info.filter(item=>{
            return item.identity == 0
          })
          let everyIdentityList = identityList.filter(v=>{
            return v.type == this.props.type
          })
          //创建、导入
          let createIdentityList = this.state.wallet_info && this.state.wallet_info.filter(item=>{
            return item.identity == 1
          })
          let everyCreateIdentityList = createIdentityList.filter(v=>{
            return this.props.type == v.type
          })
          this.setState({
            identityWallet:everyIdentityList,
            createIdentityWallet:everyCreateIdentityList
          })
          return;
        }else{
          this.getType()
        }
          if(this.props.types){
              if(this.props.types == 'violas'){
                this.setState({
                  ind:0
                })
              }else if(this.props.types == 'libra'){
                this.setState({
                  ind:1
                })
              }else if(this.props.types == 'bitcoin'){
                this.setState({
                  ind:2
                })
            }
              let identityList = this.state.wallet_info && this.state.wallet_info.filter(item=>{
                return item.identity == 0
              })
              let everyIdentityList = identityList.filter(v=>{
                return v.type == this.props.types
              })
              //创建、导入
              let createIdentityList = this.state.wallet_info && this.state.wallet_info.filter(item=>{
                return item.identity == 1
              })
              let everyCreateIdentityList = createIdentityList.filter(v=>{
                return this.props.types == v.type
              })
              this.setState({
                identityWallet:everyIdentityList,
                createIdentityWallet:everyCreateIdentityList
              })
              return;
            }else{
              this.getType()
            }
            
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
          }
        })
        .catch(e => console.log(e))
    }
    getType = () => {
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
let mapStateToProps = (state) =>{
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
    getTypes:(type)=>{
      dispatch({
         type:"t_type",
         params:type.types
      })
    },
    getTypes1:(type)=>{
      dispatch({
         type:"t_types",
         params:type.types1
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);