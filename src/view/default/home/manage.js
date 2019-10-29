import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import { Modal, Button, WhiteSpace } from 'antd-mobile';
const prompt = Modal.prompt;

class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isShow:false
        }
    }
    componentDidMount(){
       
    }
    
    render() {
        
        return (
            <div className="manage">
                <header>
                    <span onClick={() => {
                     this.props.history.push('/home/wallet')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>管理</span>
                </header>
                <section>
                   <div className="lists">
                       <div className="list" onClick={() => {
                            this.props.history.push('/detailWallet')
                            }}>
                           <div className="listContent">
                               <h4>Libra-wallet1</h4>
                               <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                           </div>
                           <div className="rightLogo"><img src="/img/路径复制 10@2x.png"/></div>
                       </div>
                       <div className="list" onClick={() => {
                            this.setState({
                                isShow:true
                            })
                            }}>
                           <h4>导出助记词</h4>
                           <div className="rightLogo"><img src="/img/路径复制 10@2x.png"/></div>
                       </div>
                   </div>
                   <div className="btn">删除钱包</div>
                </section>
                {
                    this.state.isShow ? <div className="passDialog">
                    <div className="passContent">
                        <h4>输入密码</h4>
                        <input type="text" placeholder="密码"/>
                        <div className="btns">
                           <span onClick={() => {
                            this.setState({
                                isShow:false
                            })
                            }}>取消</span>
                           <span>确认</span>
                        </div>
                    </div>
                </div> : null
                }
            </div>
        );
    }
}

export default Manage;
