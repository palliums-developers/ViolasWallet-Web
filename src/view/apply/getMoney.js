import React, { Component } from "react";
// import "./app.scss";
import QRCode from "qrcode.react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class GetMoney extends Component {
    constructor(props){
      super()
      this.state = {
        types: ['Violas', 'Libra','Bitcoin'],
        type: 'Violas',
        title: '',
        showDealType: false,
        address:'',
        dis: false,
        address:''
      }
    }
    getTypeShow = (event) => {
      this.stopPropagation(event)
      this.setState({
        showDealType: !this.state.showDealType
      })
    }
    showTypes = (v) => {
      console.log(v)
      this.setState({
        type: v,
        showDealType: false
      })
    }
    componentWillMount(){
      if(this.props.display){
        this.props.showPolling();
      }
      if (this.props.display1){
        this.props.showDetails();
      }
      
    }
    componentDidMount(){
      document.addEventListener('click', this.closeDialog);
      this.setState({
        address:window.localStorage.getItem('address')
      })
      // if (this.props.location.pathname.split("/")[3]) {
      //   let type = this.props.location.pathname.split("/")[3]
      //   this.setState({
      //     title: type.replace(type[0], type[0].toUpperCase())
      //   })
      // }
      // if (this.props.location.pathname.split("/")[5]) {
      //   let address = this.props.location.pathname.split("/")[5]
      //   this.setState({
      //     address: address
      //   })
      // }
    }
    handleCopy = () => {
      const spanText = document.getElementById('add').innerText;
      const oInput = document.createElement('input');
      oInput.value = spanText;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      document.body.removeChild(oInput);
      this.setState({
        dis: true
      })
      let Timer = setInterval(() => {
        this.setState({
          dis: false
        })
      }, 1000);
    };
    stopPropagation(e) {
      e.nativeEvent.stopImmediatePropagation();
    }
    closeDialog = () => {
      this.setState({
        showDealType: false
      })
    }
    render(){
      let { address, showDealType,types,type,title,dis } = this.state;
        return (
          <div className="getMoney">
            <div className="dialogContent">
              <i className="jt" onClick={() => {
                window.history.go(-1);
              }}><img src="/img/编组 10@2x.png"/></i>
              <h4>Receive</h4>
              <div className="dropdown1">
                {
                  showDealType ? <span className="showClick" onClick={(e) => this.getTypeShow(e)}>{type}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getTypeShow(e)}>{type}<i><img src="/img/路径 7@2x.png" /></i></span>
                }
                {
                  showDealType ? <div className='dropdown-content1'>
                    {
                      types.map((v, i) => {
                        return <span key={i} className={v == type ? 'active' : null} onClick={() => this.showTypes(v)}>{v}</span>
                      })
                    }
                  </div> : null
                }


              </div>
               <div className="qrCode">
                <QRCode value={type.toUpperCase() + ':' + address+'?amount=0'}></QRCode>
               </div>
               <div className="addressCode">
                   <span id="add">{address}</span>
                   {
                     dis ? <i onClick={()=>this.handleCopy()}><img src="/img/fuzhi 3@2x.png"/></i> : <i onClick={()=>this.handleCopy()}><img src="/img/Fill 3@2x.png"/></i>
                   }
                    
                    {/* {
                      dis ? <div className="warn"><img src="/img/suc.png"/></div> : null
                    } */}
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
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(GetMoney));