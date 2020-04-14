import React, { Component } from "react";
import "./app.scss";
import QRCode from "qrcode.react"
let url = "http://52.27.228.84:4000"

class App extends Component {
    constructor(){
      super()
      this.state = {
        session_id: "",
        status: '',
        wallet_info: {},
        time:0,
        login:false
        
      }
    }
    componentDidMount(){
      this.getQR();
      
    }
    render(){
        return (
            <div className="app">
              <div className="appContent">
                <div className="logo"><img src="/img/编组 10复制 4@2x.png" /></div>
                <div className="app_link">
                  <div className="link_logo"><img src="/img/编组复制 11@2x.png" /></div>
                  <h3>ViolasPay</h3>
                  <div className="qrCode">
                    <QRCode size={200} value={this.json2String(this.state.session_id)}></QRCode>
                    {
                      this.state.status == 0 ? null : <div className="dialog">
                      <p>{
                        this.state.status == 1 ? <img src="/img/saomachenggong 2@2x.png"/> : this.state.status == 2 ? <img src="/img/saomashibai 2@2x.png"/> : this.state.status == 3 ? <img onClick={()=>{window.location.reload()}} src="/img/erweimashixiao 2@2x.png"/> : null
                      }{
                        this.state.status == 1 ? <label className="success">扫码成功</label> : this.state.status == 2 ? <label className="fail">扫码失败</label> : null
                      }</p>
                    </div>
                    }
                  </div>
                  <p>请使用手机ViolasPay扫码登录</p>
                </div>
              </div>
            </div>
        )
    }
    ask_login_state() {
      let count = this.state.time;
      let Timer = setInterval(() => {
        if (this.state.login) {
          clearInterval(Timer);
        } else if (count === 60) {
          this.setState({
            status:3
          })
          clearInterval(Timer)
        } else {
          this.login_state();
          count++
        }
      }, 1000);
      // setTimeout(() => { this.setState({ session_id: "" }) }, 5000);
    }
    login_state() {
      // http://125.39.5.57:38080/app/mock/16/1.0/violas/singin
      fetch(url + "/explorer/violas/singin?session_id=" + this.state.session_id).then(res => res.json())
        .then(res => { 
          console.log(res.data)
          if(res.data.status == 1){
              
              this.setState({
                login:true,
                status:res.data.status,
                wallet_info:JSON.stringify(res.data.wallets)
              },()=>{
               window.sessionStorage.setItem('wallet_info',this.state.wallet_info)
               setTimeout(()=>{
                  this.props.history.push('/home')
               },5000);
              })
          }else if(res.data.status == 2){
              this.setState({
                login:false,
                status:res.data.status
              })
          }else if(res.data.status == 3){
              this.setState({
                login:false,
                status:res.data.status
              })
          }else{
              this.setState({
                login:false,
              })
          }
        })
        .catch(e => console.log(e))
    }
    json2String = (_id) => {
      let _temp = {
        session_id: _id,
        type: 2
      }
      return JSON.stringify(_temp)
    }
    getQR = () => {
      return fetch(
        url + "/explorer/violas/singin/qrcode"
      )
        .then(res => res.json())
        .then(res => {
          // console.log(res.data.qr_code.session_id.toString())
          this.setState({
            session_id: res.data.qr_code.session_id.toString()
          },()=>{
            window.sessionStorage.setItem('session_id',this.state.session_id)
            this.ask_login_state();
          });
        });
    };
}

export default App;