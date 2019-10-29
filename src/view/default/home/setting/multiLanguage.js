import React, { Component } from 'react';

class MultiLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    componentDidMount(){
       
    }
    
    render() {
        
        return (
            <div className="multiLanguage">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/setting')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>多语言</span>
                </header>
                <section>
                   
                </section>
            </div>
        );
    }
}

export default MultiLanguage;
