
import React from 'react';
import '../App.css';
import { bytes2StrHex, string2Byte, decimal2Hex, getTimestamp, int2Byte, getBitcoinScript } from '../util/trans'
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
            //TODO get map address
            let tx = getBTCTx(sessionStorage.getItem('bitcoin_address'), this.state.mappingCoinType.receiver_address, this.state.mappingCoinAmount, script)
            console.log('bitcoin ', tx);
            this.props.walletConnector.sendTransaction('_bitcoin', tx).then(res => {
                console.log('Bitcoin mapping ', res);
            }).catch(err => {
                console.log('Bitcoin mapping ', err);
            });
        } else if (this.state.mappingCoinType.from_coin.coin_type === 'libra') {
            console.log(222)
        } else {
            console.log(333)
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