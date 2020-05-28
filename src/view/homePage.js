import React, { Component } from "react";
import "./app.scss";
import QRCode from "qrcode.react";
import { connect } from 'react-redux';
import RouterView from '../router/routerView';
import AddCurrency from './components/addCurrency';
import CurrencyDetail  from './components/currencyDetail';
import Details from './components/details';
import { Drawer } from 'antd';
import 'antd/dist/antd.css'

class HomePage extends Component {
    constructor(props){
      super()
      this.state = {
        
      }
    }
    componentDidMount(){
      // console.log(this.props.visible)
    }
    onClose = () => {
      this.props.showPolling();
      this.props.showDetails();
    };
    render(){
        let { routes } = this.props;
        return (
          
            <div className="homePage">
              
              <RouterView routes={routes}></RouterView>
              {/* 兑换详情 */}
              <Drawer
                // title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.props.display}
                mask={false}
              >
              <AddCurrency></AddCurrency>
              </Drawer>
              <Drawer
                // title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.props.display1}
                mask={false}
              >
              <CurrencyDetail></CurrencyDetail>
              </Drawer>
              <Drawer
                // title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.props.display2}
                mask={false}
              >
              <Details></Details>
              </Drawer>
            </div>
        )
    }
}
let mapStateToProps = (state) =>{
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
    showPolling: () => {
      dispatch({
        type: "DISPLAY",
        payload: false,
      });
    },
    showDetails: () => {
      dispatch({
        type: "DISPLAY1",
        payload: false,
      });
    },
    showEveryDetail: () => {
      dispatch({
        type: "DISPLAY2",
        payload: false,
      });
    },
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);