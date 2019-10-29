import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
// import '../default.scss';

class AddCurrency extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="addCurrency">
                <header>
                    <span onClick={() => {
                    this.props.history.push({
                        pathname:'/home/wallet',
                        state:false
                    })
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>添加币种</span>
                </header>
                <section>
                    
                </section>
            </div>
        );
    }
}

export default AddCurrency;
