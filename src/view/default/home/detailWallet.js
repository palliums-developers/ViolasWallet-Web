import React, { Component } from 'react';

class DetailWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    componentDidMount(){
       
    }
    
    render() {
        
        return (
            <div className="detailWallet">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/manage')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>钱包详情</span>
                </header>
                <section>
                   <div className="lists">
                       <div className="list">
                           <h4>更换钱包名</h4>
                           <span>Libra-wallet1</span>
                       </div>
                   </div>
                </section>
                
            </div>
        );
    }
}

export default DetailWallet;
