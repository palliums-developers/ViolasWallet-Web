import React, { Component } from 'react';

class ImportWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isShow:false,
          wType:'violas'
        }
    }
    componentDidMount(){
        this.setState({
            wType:this.props.location.state.options
        })
    }
    getList = (type) =>{
        this.setState({
            isShow:type
        })
    }
    render() {
        return (
            <div className="importWallet">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/addPurse')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span></span>
                </header>
                <section>
                   <div className="createContent">
                      <div className="head">
                           <div className="logo">
                              {
                                  this.state.wType == 'violas' ? <img src="/img/vio@2x.png"/> : this.state.wType == 'lib' ? <img src="/img/lib@2x.png"/> :  this.state.wType == 'btc' ? <img src="/img/BTC@2x.png"/> : null
                              }
                            </div>
                                {
                                    this.state.wType == 'violas' ? <h4>导入Vcoin钱包</h4> : this.state.wType == 'lib' ? <h4>导入Libone钱包</h4> :  this.state.wType == 'btc' ? <h4>导入Bitcoin钱包</h4> : null
                                }
                      </div>
                      <div className="form">
                         <textarea placeholder="输入助记词单词，并用空格分隔"></textarea>
                         <input type="password" placeholder="设置钱包密码"/>
                         <div className="line"></div>
                         <input type="password" placeholder="再次确认密码"/>
                         <div className="line"></div>
                         <div className="btn">开始导入</div>
                      </div>
                   </div>
                </section>
                
            </div>
        );
    }
}

export default ImportWallet;
