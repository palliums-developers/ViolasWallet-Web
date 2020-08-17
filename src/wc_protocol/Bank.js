
import React from 'react';
import '../App.css';
import { getBitcoinScript, getLibraScript } from '../util/trans'
import axios from 'axios';
import code_data from '../util/code.json';
import getBTCTx from '../util/btc_trans';
import getLibraTx from '../util/libra_trans';
import getViolasTx from '../util/violas_trans';

class Bank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mappingInfo: [],
            mappingCoinType: {},
            mappingCoinAmount: 0,
            crossChainInfo: []
        }
    }
    async componentWillMount() {
        this.getMappingInfo();
    }
    async componentDidMount() {

    }
    async getMappingInfo() {
        await axios.get('https://api4.violas.io/1.0/mapping/address/info').then(async res => {
            await this.setState({
                mappingInfo: res.data.data,
                mappingCoinType: res.data.data[0]
            })
        })
    }
    async getMap() {
        if (this.state.mappingCoinType.from_coin.coin_type === 'btc') {
            let script = getBitcoinScript(this.state.mappingCoinType.lable, sessionStorage.getItem('bitcoin_address'), this.state.mappingCoinAmount);
            console.log('script: ', script);
            let tx = getBTCTx(sessionStorage.getItem('bitcoin_address'), this.state.mappingCoinType.receiver_address, this.state.mappingCoinAmount, script);
            console.log('bitcoin: ', tx);
            this.props.walletConnector.sendTransaction('_bitcoin', tx).then(res => {
                console.log('Bitcoin mapping ', res);
            }).catch(err => {
                console.log('Bitcoin mapping ', err);
            });
        } else if (this.state.mappingCoinType.from_coin.coin_type === 'libra') {
            let script = getLibraScript(this.state.mappingCoinType.from_coin.coin_type, this.state.mappingCoinType.lable, [], sessionStorage.getItem('libra_address'), this.state.mappingCoinAmount);
            let tx = getLibraTx(sessionStorage.getItem('libra_address'), this.state.mappingCoinType.receiver_address, this.state.mappingCoinAmount, this.state.mappingCoinType.from_coin.assert.module, this.state.mappingCoinType.from_coin.assert.name, 2, script);
            console.log('libra: ', tx);
            this.props.walletConnector.sendTransaction('_libra', tx).then(res => {
                console.log('Libra mapping ', res);
            }).catch(err => {
                console.log('Libra mapping ', err);
            });
        } else {
            let script = getLibraScript(this.state.mappingCoinType.from_coin.coin_type, this.state.mappingCoinType.lable, [], sessionStorage.getItem('violas_address'), this.state.mappingCoinAmount);
            let tx = getViolasTx(sessionStorage.getItem('violas_address'), this.state.mappingCoinType.receiver_address, this.state.mappingCoinAmount, this.state.mappingCoinType.from_coin.assert.module, this.state.mappingCoinType.from_coin.assert.name, 2, script);
            console.log('violas: ', tx);
            this.props.walletConnector.sendTransaction('violas', tx).then(res => {
                console.log('Violas mapping ', res);
            }).catch(err => {
                console.log('Violas mapping ', err);
            });
        }
    }
    async handleChange(_type, e) {
        e.persist();
        switch (_type) {
            case 'mappingCoinType':
                await this.setState({ mappingCoinType: JSON.parse(e.target.value) });
                break;
            case 'mappingCoinAmount':
                await this.setState({ mappingCoinAmount: e.target.value });
                break;
        }
    }
    render() {
        return (
            <div className='boxs'>
                <h2>Bank:</h2>
                <div className='tx'>
                    <h5>Mapping: </h5>
                    <p>Mapping coin:</p>
                    <select onChange={this.handleChange.bind(this, 'mappingCoinType')}>
                        {
                            this.state.mappingInfo && this.state.mappingInfo.map((v, i) => {
                                return <option value={JSON.stringify(v)} key={i}>{v.lable}</option>
                            })
                        }
                    </select>
                    <input type='text' onChange={this.handleChange.bind(this, 'mappingCoinAmount')} />
                    <h4>
                        from: {this.state.mappingCoinType.from_coin && this.state.mappingCoinType.from_coin.coin_type}&nbsp;
                        &nbsp;
                        show_name: {this.state.mappingCoinType.from_coin && this.state.mappingCoinType.from_coin.assert.show_name}
                    </h4>
                    <h4>
                        to: {this.state.mappingCoinType.to_coin && this.state.mappingCoinType.to_coin.coin_type}&nbsp;
                        &nbsp;
                        show_name: {this.state.mappingCoinType.to_coin && this.state.mappingCoinType.to_coin.assert.show_name}
                    </h4>
                    <button onClick={() => this.getMap()}>Commit Mapping</button>
                    <br />
                </div>
            </div>
        )
    }
}

export default Bank;