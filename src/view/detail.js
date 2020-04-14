import React, { Component } from "react";
import "./app.scss";
let url = "http://125.39.5.57:38080"

class Detail extends Component {
    constructor(props){
      super()
      this.state = {
        type:['Violas','Libra','Bitcoin'],
        ind:0,
        name:'Violas',
      
      }
    }
    componentDidMount(){
      this.setState({
        name:this.props.match.params.type
      })
      this.getBalance()
    }
    getBalance = () =>{
        fetch(url +"/app/mock/16/explorer/violas/address/<address>").then(res => res.json())
        .then(res => { 
          console.log(res)
          
        })
        .catch(e => console.log(e))
    }
    getActive = (ind,val) =>{
       this.setState({
         ind:ind,
         name:val
       })
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
      };
   
    render(){
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
                     return <p key={i} onClick={()=>this.getActive(i,v)} className={this.state.name.toLocaleLowerCase() == v.toLocaleLowerCase() ? 'active' : null}><img src={v == 'Violas' ? "/img/编组 2复制 4@2x.png" : v == 'Libra' ? "/img/编组 7@2x.png" : v == 'Bitcoin' ? "/img/BTC复制 2@2x.png" : null}/><label>{v}</label></p>
                   })
                 }
                  
                
                </div>
                <div className="rightContent">
                  <div className="balanceList">
                    <h4>当前资产</h4>
                    <div className="balance">
                      <span>8.8888888888</span>
                      <span>Vtoken</span>
                    </div>
                    <div className="list">
                       <p>xxxxxx</p>
                       <div className="addressCode">
                         <span id="add">mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</span>
                         <i onClick={()=>this.handleCopy()}><img src="/img/Fill 3@2x.png"/></i>
                       </div>
                    </div>
                  </div>
                  <div className="dealList">
                     <h3><i></i>交易记录</h3>
                     <div className="dealContent">
                        <div className="dealLists">
                          <div className="title">
                            <span>日期</span>
                            <span>消耗</span>
                            <span>开启</span>
                            </div>
                            <div className="titleContent">
                            <span>18.05.23 15:42</span>
                            <span>0.05Vtoken</span>
                            <span>xxx</span>
                            </div>
                            <div className="check">
                                <span>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</span>
                                <span>浏览器查询</span>
                            </div>
                        </div>
                        <div className="dealLists">
                            <div className="title">
                            <span>日期</span>
                            <span>消耗</span>
                            <span>开启</span>
                            </div>
                            <div className="titleContent">
                            <span>18.05.23 15:42</span>
                            <span>0.05Vtoken</span>
                            <span>xxx</span>
                            </div>
                            <div className="check">
                                <span>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</span>
                                <span>浏览器查询</span>
                            </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Detail;