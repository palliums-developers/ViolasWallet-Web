
import React from 'react';
import '../App.css';
import code_data from '../util/code.json';
import { bytes2StrHex, string2Byte } from '../util/trans'
import axios from 'axios';
// import WalletConnect from '../packages/browser/dist/index';

class Libra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            libra_currencies: [],
            libra_currency: '',
            tyArgs: {},
            address: '',
            value: '',
            gasCurrencyCode: '',
        }
    }
    async componentWillMount() {
        this.getLibraCurrencies();
    }
    async componentDidMount() {
        // console.log(JSON.stringify(this.state.walletConnector));
    }
    async getLibraCurrencies() {
        axios('https://api4.violas.io/1.0/libra/currency')
            .then(async res => {
                await this.setState({ libra_currencies: res.data.data.currencies });
                let temp = this.state.libra_currencies;
                await this.setState({ libra_currency: temp[0].name });
                this.getTyArgs(this.state.libra_currency)
            })
    }
    async getTyArgs(temp) {
        let address = '00000000000000000000000000000001';
        let result = {
            'module': temp,
            'address': address,
            'name': temp
        }
        await this.setState({ tyArgs: result });
    }
    async handleChange(_type, e) {
        e.persist();
        switch (_type) {
            case 'libra_address':
                await this.setState({ address: e.target.value });
                break;
            case 'libra_value':
                await this.setState({ value: e.target.value });
                break;
            case 'libra_currency':
                await this.setState({ libra_currency: e.target.value });
                await this.getTyArgs(this.state.libra_currency);
                break;
        }
    }
    async libra_sendTransaction(chainId) {
        console.log('You send Libra transaction with ', sessionStorage.getItem('libra_address'));
        const tx = {
            from: sessionStorage.getItem('libra_address'),
            payload: {
                code: code_data.libra.p2p,
                tyArgs: [
                    this.state.tyArgs
                ],
                args: [
                    {
                        type: 'Address',
                        value: this.state.address,
                    },
                    {
                        type: 'U64',
                        value: this.state.value,
                    },
                    {
                        type: 'Vector',
                        value: '',
                    },
                    {
                        type: 'Vector',
                        value: '',
                    }
                ]
            },
            chainId: chainId,
        }
        console.log('libra ', tx);
        this.props.walletConnector.sendTransaction('_libra', tx).then(res => {
            console.log('Libra transaction', res);
        }).catch(err => {
            console.log('Libra transaction ', err);
        });
    }
    render() {
        return (
            <div className='boxs'>
                <h2>Libra:</h2>
                {/* <div className='tx'>
                    <h5>Main Net:</h5>
                    <p>Address :<input type='text' onChange={this.handleChange.bind(this, 'libra_address')} /></p>
                    <p>Value :<input type='text' onChange={this.handleChange.bind(this, 'libra_value')} /></p>
                    <select value={this.state.libra_currency.show_name} onChange={this.handleChange.bind(this, 'libra_currency')}>
                        {
                            this.state.libra_currencies && this.state.libra_currencies.map((v, i) => {
                                return <option value={v} key={i}>{v.show_name}</option>
                            })
                        }
                    </select>
                    <button onClick={() => this.libra_sendTransaction(0)}>Send Transaction</button>
                </div> */}
                <div className='tx'>
                    <h5>Test Net:</h5>
                    <p>Address :<input type='text' onChange={this.handleChange.bind(this, 'libra_address')} /></p>
                    <p>Value :<input type='text' onChange={this.handleChange.bind(this, 'libra_value')} /></p>
                    <select value={this.state.libra_currency} onChange={this.handleChange.bind(this, 'libra_currency')}>
                        {
                            this.state.libra_currencies && this.state.libra_currencies.map((v, i) => {
                                return <option value={v.name} key={i}>{v.show_name}</option>
                            })
                        }
                    </select>
                    <button onClick={() => this.libra_sendTransaction(2)}>Send Transaction</button>
                </div>
            </div>
        )
    }
}

export default Libra;