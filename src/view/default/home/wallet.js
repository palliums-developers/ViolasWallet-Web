import React, { Component } from 'react';
// import '../default.scss';

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }
    componentDidMount(){
        
        document.addEventListener('click',()=>{
            this.setState({
              isShow: false
            })
          })
    }
    copyUrl2 = () =>{
        let text = document.getElementById("addressId");
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        document.execCommand("Copy"); // 执行浏览器复制命令
      }
    render() {
        return (
            <div className="wallet">
                <header>
                    <div id="select" onClick={(e) => this.getChange(e)}>
                        <label>violas钱包</label><img src="/img/路径 3@2x.png" />
                            {
                                this.state.isShow ? <ul className="selectList">
                                <li>violas钱包</li>
                                <li>libra钱包</li>
                            </ul> : null
                            }
                        </div>
                    <span onClick={() => {
                    this.props.history.push('/sweepcode')
                    }}><img src="/img/编组 3@2x.png"/></span>
                </header>
                
                <section>
                    <div className="walletContent">
                        <div className="showBanlance">
                           <div className="title">
                             <span>当前资产</span>
                             <span onClick={() => {
                                this.props.history.push('/manage')
                                }}><img src="/img/编组 14@2x.png"/></span>
                           </div>
                           <div className="banlanceDescr">
                              <span>8.8888888</span><label>Vtoken</label>
                           </div>
                           <div className="userDescr">
                              <span>xxxxxx</span>
                              <span id='addressId'>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</span>
                              <span onClick={()=>this.copyUrl2()}><img src="/img/Fill 3@2x.png"/></span>
                           </div>
                           
                        </div>
                        <div className="btns">
                            <dl>
                                <dt><img src="/img/编组@2x.png"/></dt>
                                <dd>转账</dd>
                            </dl>
                            <span></span>
                            <dl onClick={() => {
                                this.props.history.push('/getMoney')
                            }}>
                                <dt><img src="/img/编组 .png"/></dt>
                                <dd>收款</dd>
                            </dl>
                         </div>
                        <div className="dealRecord">
                           <div className="title">
                               <span>交易记录</span>
                               <span>2019-09-10<i><img src="/img/路径复制 4@2x.png"/></i></span>
                           </div>
                           <div className="dealContent">
                              <div className="head">
                                  <label>资产</label>
                                  <span onClick={() => {
                                    this.props.history.push('/addCurrency')
                                    }}><img src="/img/编组 9@2x.png"/>
                                  </span>
                              </div>
                              <div className="mList">
                                  <p><label>Vcoin</label><span>0.102</span></p>
                                  <p><label>Zcoin</label><span>1</span></p>
                                  <p><label>Ycoin</label><span>1</span></p>
                                  <p><label>Lcoin</label><span>1</span></p>
                              </div>
                           </div>
                        </div>
                    </div>
                    
                </section>
            </div>
        );
    }
    getChange = (e) => {
        this.setState({
          isShow: !this.state.isShow
        })
        e.nativeEvent.stopImmediatePropagation();
      }
}

export default Wallet;
