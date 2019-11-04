import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';

@inject('index')
@observer

class WalletSystem extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="walletSystem">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/home/mine')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>选择钱包体系</span>
                    
                </header>
                <section>
                    <div className="left">
                       <span><img src="/img/menu@2x.png"/></span>
                       <span><img src="/img/vio@2x.png"/></span>
                       <span><img src="/img/lib@2x.png"/></span>
                       <span><img src="/img/BTC@2x.png"/></span>
                    </div>
                    <div className="right">
                    <div className="identityWallet">
                       <h4>身份钱包</h4>
                       <div className="identityContent" onClick={()=>{
                           this.props.index.changePurse('violas钱包')
                           this.props.history.push('/home/wallet')
                           
                       }}>
                          <div className="title">
                              <label>Violas-Wallet1</label>
                              <span></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                       <div className="identityContent identityContent1"  onClick={()=>{
                           this.props.index.changePurse('BTC钱包')
                           this.props.history.push('/home/wallet')
                       }}>
                          <div className="title">
                              <label>Bitcoin</label>
                              <span></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                       <div className="identityContent identityContent2" onClick={()=>{
                           this.props.index.changePurse('libra钱包')
                           this.props.history.push('/home/wallet')
                       }}>
                          <div className="title">
                              <label>Libra-Wallet</label>
                              <span></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                    </div>
                    <div className="identityWallet toIdentity">
                       <h4>创建/导入</h4>
                       <div className="identityContent">
                          <div className="title">
                              <label>Violas-Wallet1</label>
                              <span></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                       <div className="identityContent">
                          <div className="title">
                              <label>Violas-Wallet2</label>
                              <span></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                    </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default WalletSystem;
