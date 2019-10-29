import React, { Component } from 'react';
// import '../default.scss';

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="mine">
                <header>
                  <div className="headLogo"><img src=""/></div>
                  <span>Rxx</span>
                </header>
              <section>
                 <ul className="userList">
                   <li onClick={()=>{
                           this.props.history.push('/dailyCash')
                       }}>
                       <span><img src="/img/编组1@2x.png"/></span>
                       <p>钱包管理</p>
                       <span><img src="/img/路径复制 10@2x.png"/></span>
                   </li>
                   <div className="lines">
                       <span className="line"></span>
                   </div>
                   <li onClick={()=>{
                           this.props.history.push('/inviteFriends')
                       }}>
                       <span><img src="/img/形状 2@2x.png"/></span>
                       <p>转账记录</p>
                       <span><img src="/img/路径复制 10@2x.png"/></span>
                   </li>
                   <li onClick={()=>{
                           this.props.history.push('/directoryInquiries')
                       }}>
                       <span><img src="/img/编组 62@2x.png"/></span>
                       <p>地址簿</p>
                       <span><img src="/img/路径复制 10@2x.png"/></span>
                   </li>
                   <li onClick={()=>{
                           this.props.history.push('/setting')
                       }}>
                       <span><img src="/img/setting@2x.png"/></span>
                       <p>设置</p>
                       <span><img src="/img/路径复制 10@2x.png"/></span>
                   </li>
                 </ul>
              </section>
            </div>
        );
    }
}

export default Mine;
