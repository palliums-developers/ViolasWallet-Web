import React, { Component } from 'react';
// import { creat_account_mnemonic,get_address } from '../../../utils/kulap-function'
let aes256 = require('aes256');

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
    }
    saveJson = async() => {
        let userInfo = JSON.parse(window.localStorage.getItem('data'));
        
        let data = {
            name: userInfo.name,
            password:userInfo.password1,
            mne_arr:userInfo.mne_arr,
            wallet_name:[
              {name:'Violas-Wallet'},{name:'Bitcoin'},{name:'Libra-Wallet'}
            ],
            extra_wallet:[],
            address_book:[],
            backup:true
        }

        var jsonData = aes256.encrypt(userInfo.password1,JSON.stringify(data));
        var a = document.createElement("a");
        var file = new Blob([jsonData], { type: 'text/plain' });
        a.href = URL.createObjectURL(file);
        a.download = userInfo.name+'.json';
        a.click();
        await window.localStorage.clear();
        await this.props.history.push('/app')
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
                   {/* <div className="lines">
                       <span className="line"></span>
                   </div> */}
                   {/* <li onClick={()=>{
                           this.props.history.push('/record1')
                       }}>
                       <span><img src="/img/形状 2@2x.png"/></span>
                       <p>转账记录</p>
                       <span><img src="/img/路径复制 10@2x.png"/></span>
                   </li> */}
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
                 <div className="btn" onClick={()=>this.saveJson()}>退出登录</div>
                 
              </section>
            </div>
        );
    }
}

export default Mine;
