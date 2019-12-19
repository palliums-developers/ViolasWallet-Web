import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import intl from 'react-intl-universal';

class Sweepcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: false
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    componentDidMount() {

    }

    handleScan = data => {
        console.log(data)
    }

    handleError = err => {
        console.error(err)
    }

    openImageDialog = () => {
        this.setState({
            file: true
        }, () => {
            this.refs.qrReader.openImageDialog();
        })
    }

    render() {
        console.log(111)
        return (
            <div className="sweepcode">
                <header>
                    <span onClick={() => {
                        this.props.history.push({
                            pathname: '/home/wallet',
                            state: false
                        })
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Scan')}</span>
                    <button onClick={this.openImageDialog}>{intl.get('Album')}</button>
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

export default Sweepcode;
