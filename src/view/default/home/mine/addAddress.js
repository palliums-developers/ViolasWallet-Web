import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
// import '../default.scss';

class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="addAddress">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/directoryInquiries')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>添加地址</span>
                </header>
                <section>
                    <div className="form">
                        <p>
                            <label>备注</label>
                            <div className="ipt">
                                <input type="text" placeholder="备注信息少于20个字"/>
                            </div>
                        </p>
                        <div className="line">
                          <div className="lines"></div>  
                        </div>  
                        <p>
                            <label>地址</label>
                            <div className="ipt">
                                <input type="text" placeholder="输入地址"/>   
                                <div className="code"><img src="/img/code@2x.png"/></div>
                            </div>
                        </p><div className="line"><div className="lines"></div>  </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default AddAddress;
