import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QrReader from 'react-qr-reader';
import intl from 'react-intl-universal';

@inject('index')
@observer
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
        !(window.sessionStorage.getItem('data'))&&this.props.history.push('/welcome');
    }

    handleScan = data => {
        if (data) {
            let start = data.indexOf(":");
            let str = data.substring(start, 0);
            let mun = data.substring(start + 1);
            this.props.index.getAddress({
                type: str,
                address: mun
            });
            this.props.history.push('/transfar')
        }
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
        return (
            <div className="sweepcode">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/transfar')
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
