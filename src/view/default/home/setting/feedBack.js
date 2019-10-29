import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import { List, TextareaItem } from 'antd-mobile';

import intl from 'react-intl-universal';

class FeekBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow:false
        }
    }
    componentDidMount(){
       
    }
    getQuestion = (type) =>{
        if(type == 'right'){
            this.setState({
                isShow:true
            })
        }else if(type == 'error'){
            this.setState({
                isShow:false
            })
        }
        
    }
    getContent = (e,type) =>{
        if(type == 'content'){
            this.setState({
                contentValue:e
            })
        }else if(type == 'connect'){
            this.setState({
                connectValue:e.target.value
            })
        }
    }
    render() {
        
        return (
            <div className="feekBack">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/setting')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>帮助与反馈</span>
                    <span onClick={()=>this.getQuestion('right')}>问题反馈</span>
                </header>
                <section>
                    <div className="content">
                        <h3>常见问题</h3>
                        <p>我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议</p>
                    </div>
                </section>
                {
                    this.state.isShow ? <div className="questDialog">
                    <div className="feedback">
                       <div className="head">
                         <span>问题反馈</span>
                         <span onClick={()=>this.getQuestion('error')}><img src="/img/Close@2x.png"/></span>
                       </div>
                       <div className="content">
                          <List>
                              <TextareaItem
                                  placeholder='请输入内容'
                                  rows={5}
                                  count={200}
                                  onChange={(e)=>this.getContent(e,'content')}
                              />
                          </List>
                          <input onChange={(e)=>this.getContent(e,'connect')} placeholder='请输入您的联系方式'/>
                          {/* <span style={{color:'red',fontSize:"12px"}}>{this.state.warn}</span> */}
                       </div>
                       <div className="btn">
                          <button onClick={this.confirm}>确认</button>
                       </div>
                    </div>
                </div> : null
                }
            </div>
        );
    }
}

export default FeekBack;
