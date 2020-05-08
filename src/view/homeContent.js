import React, { Component } from "react";
import {NavLink} from 'react-router-dom'
import "./app.scss";
import QRCode from "qrcode.react"
import RouterView from '../router/routerView'
let url = "http://52.27.228.84:4000"

class HomeContent extends Component {
    constructor(){
      super()
      this.state = {
        type:['Violas','Libra','Bitcoin'],
        ind:0,
        name:'Violas',
       
      }
    }
    componentDidMount(){
    }
    getActive = (ind,val) =>{
         this.props.history.push('/home/homeContent/'+val)
         this.setState({
           ind:ind,
           name:val
         })
    }
    
    getPath(val){
        if(this.props.location.pathname.split("/")[6]){
           if(this.props.location.pathname.split("/")[6].toLowerCase() == val.toLowerCase()){
              return 'active'
           }else{
              return; 
           }
        }else{
          if(this.props.location.pathname.split("/")[5]){
            if(this.props.location.pathname.split("/")[5].toLowerCase() == val.toLowerCase()){
              return 'active'
            }else{
                return; 
            }
          }else{
            if(this.props.location.pathname.split("/")[4]){
              if(this.props.location.pathname.split("/")[4].toLowerCase() == val.toLowerCase()){
                return 'active'
              }else{
                  return; 
              }
            }
          }
        }
    }
   
    render(){
        let { routes } = this.props;
 
        return (
            <div className="content">
                <div className="leftContent">
                 {
                   this.state.type.map((v,i)=>{
                     return <NavLink  key={i} activeStyle={{background: '#F7F7F9'}} to={'/homepage/home/homeContent/'+v}><p className={this.getPath(v)}><img src={v == 'Violas' ? "/img/编组 2复制 4@2x.png" : v == 'Libra' ? "/img/编组 7@2x.png" : v == 'Bitcoin' ? "/img/BTC复制 2@2x.png" : null}/><label>{v}</label></p></NavLink>
                   })
                 }
                 </div>
                 <RouterView routes={routes}></RouterView>
              </div>
        )
    }

 
}

export default HomeContent;