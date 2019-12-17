import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import intl from 'react-intl-universal';
// import '../default.scss';

class AddPurse extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isShow:false,
          wType:null
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    componentDidMount(){
       
    }
    getList = (type,wType) =>{
        this.setState({
            isShow:type,
            wType:wType
        })
    }
    render() {
        const {isShow,wType} = this.state;
        return (
            <div className="addPurse">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/dailyCash')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>{intl.get('Add Wallet')}</span>
                </header>
                <section>
                    <div className="lists">
                        <div className="list" onClick={()=>this.getList(true,'violas')}>
                           <div className="logo"><img src="/img/编组 2复制 3@2x.png"/></div>
                           <div className="descr">
                               <label>vtoken</label>
                               <p>Violas</p>
                           </div>
                        </div>
                        <div className="list" onClick={()=>this.getList(true,'btc')}>
                           <div className="logo"><img src="/img/BTC复制@2x.png"/></div>
                           <div className="descr">
                               <label>BTC</label>
                               <p>Bitcoin</p>
                           </div>
                        </div>
                        <div className="list" onClick={()=>this.getList(true,'lib')}>
                           <div className="logo"><img src="/img/编组 52@2x.png"/></div>
                           <div className="descr">
                               <label>libra</label>
                               <p>Libra</p>
                           </div>
                        </div>
                    </div>
                </section>
                {
                    isShow ? <div className="toBottomDialog">
                    <div className="botContent">
                         <p onClick={() => {
                            this.props.history.push({
                                pathname:'/createWallet',
                                state:{
                                    options:wType
                                }
                            })
                         }}><span><img src="/img/chuangjianv@2x.png"/></span><label>{intl.get('Create')}</label></p>
                         <div className="line"></div>
                         <p onClick={() => {
                            this.props.history.push({
                                pathname:'/importWallet',
                                state:{
                                    options:wType
                                }
                            })
                            }}><span><img src="/img/daoru@2x.png"/></span><label>{intl.get('Import')}</label></p>
                         <div className="line"></div>
                         <div className="btn" onClick={()=>this.getList(false)}>{intl.get('Cancel')}</div>
                    </div>
                 </div> : null
                }
                
            </div>
        );
    }
}

export default AddPurse;
