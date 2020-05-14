import React, { Component } from "react";
import "./app.scss";
import QRCode from "qrcode.react";
import { connect } from 'react-redux';
import RouterView from '../router/routerView';
import GetMoneyDialog from './apply/getMoneyDialog'
import TransfarDialog from './apply/transfarDialog'
import ExchangeDialog from './market/exchangeDialog'
import ExchangeDetail from './market/exchangeDetail'
import MyPoolDialog from './market/myPoolDialog'
import PoolingDetail from './market/poolingDetail'
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
      this.props.showDrawer()
    };
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
              {
                 this.props.showExcode ? <ExchangeDialog></ExchangeDialog> : null
              }
              {/* 兑换详情 */}
              <Drawer
                // title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.props.visible}
                mask={false}
              >
               <ExchangeDetail></ExchangeDetail>
              </Drawer>
              {/* 我的资金池 */}
              <Drawer
                // title="Basic Drawer"
                placement="right"
                closable={false}
                // onClose={this.onClose}
                mask={false}
                visible={this.props.showpooling}
              >
                <MyPoolDialog></MyPoolDialog>
              </Drawer>
              {/* 资金池详情 */}
              <Drawer
                // title="Basic Drawer"
                placement="right"
                closable={false}
                visible={this.props.visible1}
                mask={false}
              >
              <PoolingDetail></PoolingDetail>
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
    showDrawer: () => {
      dispatch({
        type: 'VISIBLE',
        payload: false
      })
    },
    showPolling: () => {
      dispatch({
        type: 'SHOWPOOL',
        payload: false
      })
    }
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);