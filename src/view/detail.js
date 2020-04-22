import React, { Component } from "react";
import {timeStamp2String} from '../utils/timer';
import "./app.scss";
let url = "http://52.27.228.84:4000"

class Detail extends Component {
    constructor(props){
      super()
      this.state = {
        type:['Violas','Libra','Bitcoin'],
        ind:0,
        name:'Violas',
        balance:0,
        transList:[]
      }
    }
    componentDidMount(){
      this.setState({
        name:this.props.match.params.type
      })
      this.getBalance()
    }
    getBalance = () =>{
        fetch(url +"/explorer/violas/address/"+this.props.match.params.address).then(res => res.json())
        .then(res => { 
          if(this.props.match.params.type == 'bitcoin'){
            this.setState({
              balance:res.data.status.balance / 1e6 / 10 / 10,
              transList:res.data.transactions
            })
          }else{
            this.setState({
              balance:res.data.status.balance / 1e6,
              transList:res.data.transactions
            })
          }
          
        })
        .catch(e => console.log(e))
    }
    // getActive = (ind,val) =>{
    //    this.setState({
    //      ind:ind,
    //      name:val
    //    })
    // }
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
      };
    goWebsite = (version) =>{
      if(this.props.match.params.type == 'violas'){
        window.open('https://testnet.violas.io/app/Violas_version/'+version)
      }else if(this.props.match.params.type == 'bitcoin'){
        window.open('https://testnet.violas.io/app/BTC_block/'+version)
      }else if(this.props.match.params.type == 'libra'){
        window.open('https://testnet.violas.io/app/Libra_version/'+version)
      }
    }
    render(){
        let { balance,transList,name } = this.state;
        // console.log(transList,'...')
        return (
            <div className="detail">
              <div className="header">
                 <div className="logo" onClick={()=>{
                    this.props.history.push('/home')
                  }}><img src="/img/形状结合 2@2x.png"/></div>
              </div>
              <div className="content">
                <div className="leftContent">
                 {
                   this.state.type.map((v,i)=>{
                     return <p key={i} className={name.toLocaleLowerCase() == v.toLocaleLowerCase() ? 'active' : null}><img src={v == 'Violas' ? "/img/编组 2复制 4@2x.png" : v == 'Libra' ? "/img/编组 7@2x.png" : v == 'Bitcoin' ? "/img/BTC复制 2@2x.png" : null}/><label>{v}</label></p>
                   })
                 }
                </div>
                <div className="rightContent">
                  <div className="balanceList">
                    <h4>当前资产</h4>
                    <div className="balance">
                      <span>{balance }&nbsp;</span>
                      <span> {name == 'violas' ? 'Vtoken' : name == 'libra' ? 'Libra' : name == 'bitcoin' ? 'BTC' : null}</span>
                    </div>
                    <div className="list">
                       <p>{this.props.match.params.nikename}</p>
                       <div className="addressCode">
                         <span id="add">{this.props.match.params.address}</span>
                         <i onClick={()=>this.handleCopy()}><img src="/img/Fill 3@2x.png"/></i>
                       </div>
                    </div>
                  </div>
                  <div className="dealList">
                     <h3><i></i>交易记录</h3>
                     <div className="dealContent">
                     {
                      transList.map((v,i)=>{
                        return <div className="dealLists" key={i}>
                        <div className="title">
                          <span>日期</span>
                          <span>消耗</span>
                          {
                            v.receiver == this.props.match.params.address ? <span className="getMoney">收款</span>  : v.sender == this.props.match.params.address ? <span className="tranfer">转账</span> : <span className="kai">开启</span>
                          }
                          </div>
                          <div className="titleContent">
                          <span>{timeStamp2String(v.expiration_time + '000')}</span>
                          <span>{v.gas}{name == 'violas' ? 'Vtoken' : name == 'libra' ? 'Libra' : name == 'bitcoin' ? 'BTC' : null}</span>
                          <span></span>
                          </div>
                          <div className="check">
                              <span>{v.receiver}</span>
                              <span onClick={()=>this.goWebsite(v.version)}>浏览器查询</span>
                          </div>
                      </div>
                      })
                     }
                     </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Detail;