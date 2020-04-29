import React, { Component } from "react";
import "./app.scss";
import QRCode from "qrcode.react";
import { connect } from 'react-redux';
import RouterView from '../router/routerView';
import GetMoneyDialog from './apply/getMoneyDialog'
import TransfarDialog from './apply/transfarDialog'

class HomePage extends Component {
    constructor(props){
      super()
      this.state = {

      }
    }

    render(){
        let { routes } = this.props;
        return (
          
            <div className="homePage">
              
              <RouterView routes={routes}></RouterView>
              {
                  this.props.display ? <GetMoneyDialog></GetMoneyDialog> : null
              }
              {
                  this.props.display1 ? <TransfarDialog></TransfarDialog> : null
              }
              
            </div>
        )
    }
}
let mapStateToProps = (state) =>{
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
    
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);