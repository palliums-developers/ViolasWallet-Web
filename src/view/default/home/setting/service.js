import React, { Component } from 'react';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    componentDidMount(){
       
    }
    
    render() {
        
        return (
            <div className="service">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/setting')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>服务协议</span>
                </header>
                <section>
                   
                </section>
            </div>
        );
    }
}

export default Service;
