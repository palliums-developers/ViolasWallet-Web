import React, { Component } from "react";
import "./app.scss";
import { localeLowerCase } from "lower-case";
import { connect } from 'react-redux'
import RouterView from '../router/routerView'
import { NavLink } from "react-router-dom";
let url = "http://52.27.228.84:4000"

class Home extends Component {
    constructor(props){
      super()
      this.state = {
        active:'',


      }
    }
    getActive = (ind,val) =>{
     
    }
    componentDidMount(){
      
      this.setState({
        active: this.props.location.pathname.split("/")[3]
      })
      if (this.props.location.pathname.split("/") > 5) {

      }
      // console.log(this.props.location.pathname.split("/"))
      // console.log(this.props.location.pathname.split("/")[3])
      
    }
    render(){
        let { routes } = this.props;
        let { active } = this.state;
        return (
          
            <div className="home">
              <div className="header">
                 <div className="logo" onClick={()=>{
                  this.props.history.push('/homepage/home')
              }}><img src="/img/logo.png"/></div>
                <div className="navlist">
                  {
                    this.props.location.pathname.split("/").length <= 5 ? <div className="route">
                      <NavLink to="/homepage/home/homeContent" activeStyle={{ color: 'rgba(80,27,162,1)', background: '#F7F7F9' }}><i className={active == 'homeContent' ? 'wal' : 'noWal'}></i>Wallet</NavLink>
                      <NavLink to="/homepage/home/changeContent" activeStyle={{ color: 'rgba(80,27,162,1)', background: '#F7F7F9' }}><i className={active == 'changeContent' ? 'mar' : 'noMar'}></i>Market</NavLink></div> : null
                  }
                  <div className="mine"><img src="/img/wode备份 2@2x.png" /></div>
                </div>
                
               
              </div>
              
              <RouterView routes={routes}></RouterView>
              
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