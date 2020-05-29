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
        showMineDialog:false

      }
    }
    getActive = (ind,val) =>{
     
    }
    getMineDialog = (event) =>{
      this.stopPropagation(event)
      this.setState({
        showMineDialog: !this.state.showMineDialog
      })
    }
    componentDidMount(){
      document.addEventListener('click', this.closeDialog);
      this.setState({
        active: this.props.location.pathname.split("/")[3]
      })
    
      // console.log(this.props.location.pathname.split("/"))
      // console.log(this.props.location.pathname.split("/")[3])
      
    }
    stopPropagation(e) {
      e.nativeEvent.stopImmediatePropagation();
    }
    closeDialog = () => {
      this.setState({
        showMineDialog: false
      })
    }
    render(){
        let { routes } = this.props;
        let { active, showMineDialog } = this.state;
        return (
          
            <div className="home">
              <div className="header">
                 <div className="logo" onClick={()=>{
                  this.props.history.push('/homepage/home')
              }}><img src="/img/logo.png"/></div>
                <div className="navlist">
                  {
                    <div className="route">
                    <span onClick={()=>{
                      this.props.history.push('/homepage/home/homeContent')
                    }} className={active == 'homeContent' ? 'active' : active == 'transfar' ? 'active' : active == 'getMoney' ? 'active' : null}><i className={active == 'homeContent' ? 'wal' : active == 'transfar' ? 'wal' : active == 'getMoney' ? 'wal' : 'noWal'}></i>Wallet</span>
                    <span onClick={() => {
                      this.props.history.push('/homepage/home/changeContent')
                    }} className={active == 'changeContent' ? 'active' : null}><i className={active == 'changeContent' ? 'mar' : 'noMar'}></i>Market</span></div>
                  }
                  <div className="mine">
                    {
                      showMineDialog ? <img onClick={(e) => this.getMineDialog(e)} src="/img/wode备份 3@2x.png" /> : <img onClick={(e) => this.getMineDialog(e)} src="/img/wode备份 2@2x.png" />
                    }
                    {
                    showMineDialog ? <div className="mineList">
                      <div className="balanceList">
                        <div className="balance" onClick={() => {
                          this.props.history.push('/homepage/home')
                        }}>
                          <label>总资产之和($)</label>
                          <span>22311.11</span>
                        </div>
                        <div className="icon"><img src="/img/Combined Shape 2@2x.png" /></div>
                      </div>
                      <div className="btns">
                        <dl>
                          <dt><img src="/img/编组 13备份 4@2x.png" /></dt>
                          <dd>转账</dd>
                        </dl>
                        <dl>
                          <dt><img src="/img/编组 13备份 5@2x.png" /></dt>
                          <dd>收款</dd>
                        </dl>
                      </div>
                    </div> : null
                    }
                    
                  </div>
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