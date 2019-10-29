import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
// import '../default.scss';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="setting">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/home/mine')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>设置</span>
                </header>
                <section>
                    <div className="headDescr">
                        <div className="logo"><img src="/img/mLogo@2x.png"/></div>
                        <h4>Violas 1.0.0</h4>
                    </div>
                    <ul className="userList">
                   <li onClick={()=>{
                           this.props.history.push('/multiLanguage')
                       }}>
                       <p>多语言</p>
                       <span><img src="/img/路径复制 10@2x.png"/></span>
                   </li>
                   <div className="lines">
                       <span className="line"></span>
                   </div>
                   <li onClick={()=>{
                           this.props.history.push('/service')
                       }}>
                       <p>服务协议</p>
                       <span><img src="/img/路径复制 10@2x.png"/></span>
                   </li>
                   <li onClick={()=>{
                           this.props.history.push('/aboutUs')
                       }}>
                       <p>关于我们</p>
                       <span><img src="/img/路径复制 10@2x.png"/></span>
                   </li>
                   <li onClick={()=>{
                           this.props.history.push('/feekBack')
                       }}>
                       <p>帮助与反馈</p>
                       <span><img src="/img/路径复制 10@2x.png"/></span>
                   </li>
                 </ul>
                </section>
            </div>
        );
    }
}

export default Setting;
