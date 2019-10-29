import React, { Component } from 'react';
// import '../default.scss';
let QRCode = require('qrcode-react');

class GetMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
       
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
            <div className="getMoney">
                <header>
                    <span onClick={() => {
                    this.props.history.push({
                        pathname:'/home/wallet',
                        state:false
                    })
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>收款</span>
                </header>
                <section>
                    <div className="box">
                        <h3>收款地址</h3>
                        <div className="code">
                        <QRCode value="" size={164}  />
                        </div>
                        <div className="wName">
                            <label>xxx</label><span>Wallet</span>
                        </div>
                        <p id='addressId'>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                        
                        <div className="btn" onClick={()=>this.copyUrl2()}>复制地址</div>
                    </div>
                </section>
            </div>
        );
    }
}

export default GetMoney;
