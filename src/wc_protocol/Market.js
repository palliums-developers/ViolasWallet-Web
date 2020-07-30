
import React from 'react';
import '../App.css';
import { bytes2StrHex, string2Byte } from '../util/trans'
import axios from 'axios';

class Bitcoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            value: 0,
            script: '',
            coin_a: {},
            coin_b: {},
            coin_a_tyArgs: '',
            coin_b_tyArgs: '',
            currencies: []
        }
    }
    async componentWillMount() {
        this.getMarketCurrencies();
    }
    async componentDidMount() {

    }
    async getMarketCurrencies() {
        axios('https://api4.violas.io/1.0/market/exchange/currency')
            .then(async res => {
                let temp = [];
                temp = res.data.data.btc.concat(res.data.data.libra);
                temp = temp.concat(res.data.data.violas)
                await this.setState({ currencies: temp });
            })
    }
    async handleChange(_type, e) {
        e.persist();
        switch (_type) {
            case 'bitcoin_address':
                await this.setState({ address: e.target.value });
                break;
            case 'bitcoin_value':
                await this.setState({ value: e.target.value });
                break;
            case 'script':
                await this.setState({ script: e.target.value });
                break;
        }
    }
    async getTyArgs(_name, coin) {
        let address = '00000000000000000000000000000001';
        let prefix = '07';
        let suffix = '00';
        let name_length = _name.length;
        if (name_length < 10) {
            name_length = '0' + name_length;
        }
        let _name_hex = bytes2StrHex(string2Byte(_name));
        let result = prefix + address + name_length + _name_hex + name_length + _name_hex + suffix;
        await this.setState({ coin: result });
    }
    async bitcoin_sendTransaction() {
        console.log('You send Libra transaction with ', sessionStorage.getItem('bitcoin_address'));
        const tx = {
            from: sessionStorage.getItem('bitcoin_address'),
            amount: this.state.value,
            changeAddress: sessionStorage.getItem('bitcoin_address'),
            payeeAddress: this.state.address,
            script: this.state.script
        }
        console.log('bitcoin ', tx);
        this.props.walletConnector.sendTransaction('_bitcoin', tx).then(res => {
            console.log('Bitcoin transaction ', res);
        }).catch(err => {
            console.log('Bitcoin transaction ', err);
        });
    }
    async handleChange(_type, e) {
        e.persist();
        switch (_type) {
            case 'input1':
                await this.setState({ coin_a: e.target.value });
                break;
            case 'input2':
                await this.setState({ coin_b: e.target.value });
                break;
            case 'violas_msg':
                await this.setState({ message: e.target.value });
                break;
            case 'violas_currency':
                await this.setState({ violas_currency: e.target.value });
                await this.getTyArgs(this.state.violas_currency);
                break;
        }
    }
    render() {
        return (
            <div className='boxs'>
                <h2>Market:</h2>
                <div className='tx'>
                    <h5>Swap:</h5>
                    <p>Input coinA:</p>
                    <select value={this.state.currency} onChange={this.handleChange.bind(this, 'currency')}>
                        {
                            this.state.currencies && this.state.currencies.map((v, i) => {
                                return <option value={v} key={i} style={{ backgroundImage: `url(${v.icon})` }}>{v.show_name}</option>
                            })
                        }
                    </select>
                    <input type='text' onChange={this.handleChange.bind(this, 'bitcoin_address')} />
                    <p>Input :<input type='text' onChange={this.handleChange.bind(this, 'bitcoin_value')} /></p>
                    <p>Script:<input type='text' onChange={this.handleChange.bind(this, 'script')} /></p>
                    <button onClick={() => this.bitcoin_sendTransaction()}>Send Transaction</button>
                </div>
                <div className='tx'>
                    <h5>Add Liquidity:</h5>
                    <p>Address :<input type='text' onChange={this.handleChange.bind(this, 'bitcoin_address')} /></p>
                    <p>Value :<input type='text' onChange={this.handleChange.bind(this, 'bitcoin_value')} /></p>
                    <p>Script:<input type='text' onChange={this.handleChange.bind(this, 'script')} /></p>
                    <button onClick={() => this.bitcoin_sendTransaction()}>Send Transaction</button>
                </div>
                <div className='tx'>
                    <h5>Remove Liquidity:</h5>
                    <p>Address :<input type='text' onChange={this.handleChange.bind(this, 'bitcoin_address')} /></p>
                    <p>Value :<input type='text' onChange={this.handleChange.bind(this, 'bitcoin_value')} /></p>
                    <p>Script:<input type='text' onChange={this.handleChange.bind(this, 'script')} /></p>
                    <button onClick={() => this.bitcoin_sendTransaction()}>Send Transaction</button>
                </div>
            </div>
        )
    }
}

export default Bitcoin;