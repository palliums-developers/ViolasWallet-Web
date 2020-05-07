import React, { Component } from "react";
// import "./app.scss";
import QRCode from "qrcode.react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class GetMoneyDialog extends Component {
    constructor(props){
      super()
      this.state = {
        title:'',
        address:'',
        dis:false
      }
    }
    componentDidMount(){
        if(this.props.location.pathname.split("/")[6]){
          let type = this.props.location.pathname.split("/")[6]
          this.setState({
            title:type.replace(type[0],type[0].toUpperCase())
          })
        }
        if(this.props.location.pathname.split("/")[5]){
            let address = this.props.location.pathname.split("/")[5]
            this.setState({
                address:address
            })
          }
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
          dis:true
        })
        let Timer = setInterval(() => {
            this.setState({
              dis:false
            })
        }, 500);
    };
    render(){
        let { title,address,dis } = this.state;
        return (
          <div className="getMoneyDialog">
            <div className="dialogContent">
               <h4>{title}收款</h4>
               <p>扫描{title == 'Violas' ? 'vtoken' : title == 'Libra' ? 'libra' : title == 'Bitcoin' ? 'BTC' : null}地址二维码或者复制地址</p>
               <div className="qrCode">
                 <QRCode value={address}></QRCode>
               </div>
               <div className="addressCode">
                    <span id="add">{address}</span>
                    <i onClick={()=>this.handleCopy()}><img src="/img/Fill 3@2x.png"/></i>
                    {
                      dis ? <div className="warn"><img src="/img/suc.png"/></div> : null
                    }
                </div>
                <div className="del" onClick={()=>{
                   this.props.getDisplay()
                }}><img src="/img/del.png"/></div>
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
    getDisplay:()=>{
        dispatch({
            type:"DISPLAY",
            params:false
         })
    }
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(GetMoneyDialog));