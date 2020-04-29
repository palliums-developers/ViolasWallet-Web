import React, { Component } from "react";
// import "./app.scss";
import QRCode from "qrcode.react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class TransfarDialog extends Component {
    constructor(props){
      super()
      this.state = {
       
      }
    }
    componentDidMount(){
       
    }

    render(){
        return (
          <div className="transfarDialog">
            <div className="dialogContent">
               <h4>请在移动端确认转账信息</h4>
               <div className="qrCode">
                 <QRCode value={this.props.location.state.address}></QRCode>
               </div>
                <div className="del" onClick={()=>{
                   this.props.getDisplays()
                }}><img src="/img/del.png"/></div>
            </div>
          </div>
        )
    }
}
let mapStateToProps = (state) =>{
  console.log(state.ListReducer)
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
    getDisplays:()=>{
      dispatch({
          type:'DISPLAY1',
          params:{
            type:false
          }
      })
   }
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TransfarDialog));