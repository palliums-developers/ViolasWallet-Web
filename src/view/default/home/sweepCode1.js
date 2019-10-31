import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
// import '../default.scss';

class Sweepcode1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="sweepcode">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/transfar')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>扫一扫</span>
                </header>
                <section>
                    <div className="code">
                        <QrReader
                            ref="qrReader"
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: '100%' }}
                            legacyMode={this.state.file}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default Sweepcode1;
