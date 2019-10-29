import React, { Component } from 'react';

class DailyCash extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="dailyCash">
                <header>
                    <span onClick={() => {
                        this.props.history.push({
                            pathname:'/home/wallet',
                            state:false
                        })
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>钱包管理</span>
                    <span onClick={() => {
                        this.props.history.push('/addPurse')
                    }}><img src="/img/Close 2@2x.png"/></span>
                </header>
                <section>
                    <div className="identityWallet">
                       <h4>身份钱包</h4>
                       <div className="identityContent">
                          <div className="title">
                              <label>Violas-Wallet1</label>
                              <span><img src="/img/编组 142@2x.png"/></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                       <div className="identityContent identityContent1">
                          <div className="title">
                              <label>Bitcoin</label>
                              <span><img src="/img/编组 142@2x.png"/></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                       <div className="identityContent identityContent2">
                          <div className="title">
                              <label>Libra-Wallet</label>
                              <span><img src="/img/编组 142@2x.png"/></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                    </div>
                    <div className="identityWallet toIdentity">
                       <h4>创建/导入</h4>
                       <div className="identityContent">
                          <div className="title">
                              <label>Violas-Wallet1</label>
                              <span><img src="/img/编组 142@2x.png"/></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                       <div className="identityContent">
                          <div className="title">
                              <label>Violas-Wallet2</label>
                              <span><img src="/img/编组 142@2x.png"/></span>
                          </div>
                          <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                       </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default DailyCash;
