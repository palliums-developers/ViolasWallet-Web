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
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
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
                    <span>{intl.get('Help&Feedback')}</span>
                    <span onClick={()=>this.getQuestion('right')}>{intl.get('Question&Feedback')}</span>
                </header>
                <section>
                    {/* <div className="content">
                        <h3>常见问题</h3>FAQ
                        <p>我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议我是协议</p>
                    </div> */}
                </section>
                {
                    this.state.isShow ? <div className="questDialog">
                    <div className="feedback">
                       <div className="head">
                         <span>{intl.get('Question&Feedback')}</span>
                         <span onClick={()=>this.getQuestion('error')}><img src="/img/Close@2x.png"/></span>
                       </div>
                       <div className="content">
                          <List>
                              <TextareaItem
                                  placeholder={intl.get('Input content')}
                                  rows={5}
                                  count={200}
                                  onChange={(e)=>this.getContent(e,'content')}
                              />
                          </List>
                          <input onChange={(e)=>this.getContent(e,'connect')} placeholder={intl.get('Input your contact info')}/>
                          {/* <span style={{color:'red',fontSize:"12px"}}>{this.state.warn}</span> */}
                       </div>
                       <div className="btn">
                          <button onClick={this.confirm}>{intl.get('Confirm')}</button>
                       </div>
                    </div>
                </div> : null
                }
            </div>
        );
    }
}

export default FeekBack;
