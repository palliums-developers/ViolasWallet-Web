
import React from 'react';
import '../App.css';
import { getBitcoinScript, getMapScript } from '../util/trans'
import axios from 'axios';
import getBTCTx from '../util/btc_trans';
import { getLibraTx } from '../util/libra_trans';
import { getViolasTx } from '../util/violas_trans';
import { digitalBank } from '../util/bank'

class Bank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mappingInfo: [],
            mappingCoinType: {},
            mappingCoinAmount: 0,
            crossChainInfo: [],
            digitalBankOperation: 'lock',
            digitalBankOperationList: ['lock', 'redeem', 'borrow', 'repay'],
            digitalBankAmount: 0,
            digitalBankCurrenciesList: [],
            digitalBankCurrency: '',
            depositProduct: [],
        }
    }
    async componentWillMount() {
        this.getMappingInfo();
        this.getDepositProduct();
        this.getPublishViolas();
    }
    async componentDidMount() {
    }
    async getDepositProduct() {
        axios('https://api4.violas.io/1.0/violas/bank/product/deposit')
            .then(async res => {
                await this.setState({ depositProduct: res.data.data })
            })
    }
    async getPublishViolas() {
        // axios('https://api4.violas.io/1.0/violas/currency')
        // .then(async res=>{
        //     console.log(res.data.data.currencies)
        // })
        axios('https://api4.violas.io/1.0/violas/currency/published?addr=' + sessionStorage.getItem('violas_address'))
            .then(async res => {
                await this.setState({ digitalBankCurrenciesList: res.data.data.published, digitalBankCurrency: res.data.data.published[0] })
            })
    }
    // async getMarketCurrencies() {
    //     axios('https://api4.violas.io/1.0/market/exchange/currency')
    //         .then(async res => {
    //             let temp1 = await this.addCoinType(res.data.data.btc, 'btc');
    //             let temp2 = await this.addCoinType(res.data.data.libra, 'libra');
    //             let temp3 = await this.addCoinType(res.data.data.violas, 'violas');
    //             let temp = await this.Concat(temp1, await this.Concat(temp2, temp3));
    //             await this.setState({
    //                 digitalBankCurrenciesList: temp,
    //                 digitalBankCurrency: temp[0]
    //             });
    //         })
    // }
    // async addCoinType(coinList, chain) {
    //     for (let i in coinList) {
    //         coinList[i].chain = chain
    //     }
    //     return coinList
    // }
    // async Concat(origin_list, add_list) {
    //     for (let i in add_list) {
    //         origin_list.push(add_list[i])
    //     }
    //     return origin_list
    // }
    async getMappingInfo() {
        await axios.get('https://api4.violas.io/1.0/mapping/address/info').then(async res => {
            await this.setState({
                mappingInfo: res.data.data,
                mappingCoinType: res.data.data[0]
            })
        })
    }
    async getMap() {
        let to_address = '';
        switch (this.state.mappingCoinType.to_coin.coin_type) {
            case 'btc':
                to_address = sessionStorage.getItem('bitcoin_address');
                break;
            case 'libra':
                to_address = sessionStorage.getItem('libra_address');
                break;
            case 'violas':
                to_address = sessionStorage.getItem('violas_address');
                break;
            default:
                to_address = '';
                return;
        }
        if (this.state.mappingCoinType.from_coin.coin_type === 'btc') {
            // let script = getBitcoinScript(this.state.mappingCoinType.lable, sessionStorage.getItem('bitcoin_address'), parseInt(this.state.mappingCoinAmount)/100);
            let script = getBitcoinScript(this.state.mappingCoinType.lable, to_address, this.state.mappingCoinAmount);
            console.log('script: ', script);
            let tx = getBTCTx(sessionStorage.getItem('bitcoin_address'), this.state.mappingCoinType.receiver_address, this.state.mappingCoinAmount, script);
            console.log('bitcoin: ', tx);
            this.props.walletConnector.sendTransaction('_bitcoin', tx).then(res => {
                console.log('Bitcoin mapping ', res);
            }).catch(err => {
                console.log('Bitcoin mapping ', err);
            });
        } else if (this.state.mappingCoinType.from_coin.coin_type === 'libra') {
            let script = getMapScript(this.state.mappingCoinType.from_coin.coin_type, this.state.mappingCoinType.lable, to_address);
            let tx = getLibraTx(sessionStorage.getItem('libra_address'), this.state.mappingCoinType.receiver_address, this.state.mappingCoinAmount, this.state.mappingCoinType.from_coin.assert.module, this.state.mappingCoinType.from_coin.assert.name, sessionStorage.getItem('libra_chainId'), script);
            console.log('libra: ', tx);
            this.props.walletConnector.sendTransaction('_libra', tx).then(res => {
                console.log('Libra mapping ', res);
            }).catch(err => {
                console.log('Libra mapping ', err);
            });
        } else if (this.state.mappingCoinType.from_coin.coin_type === 'violas') {
            let script = getMapScript(this.state.mappingCoinType.from_coin.coin_type, this.state.mappingCoinType.lable, to_address);
            let tx = getViolasTx(sessionStorage.getItem('violas_address'), this.state.mappingCoinType.receiver_address, this.state.mappingCoinAmount, this.state.mappingCoinType.from_coin.assert.module, this.state.mappingCoinType.from_coin.assert.name, sessionStorage.getItem('violas_chainId'), script);
            console.log('violas: ', tx);
            this.props.walletConnector.sendTransaction('violas', tx).then(res => {
                console.log('Violas mapping ', res);
            }).catch(err => {
                console.log('Violas mapping ', err);
            });
        } else {
            return
        }
    }
    async getDigitalBank() {
        let tx = digitalBank(this.state.digitalBankOperation, this.state.digitalBankCurrency, this.state.digitalBankAmount, sessionStorage.getItem('violas_address'), sessionStorage.getItem('violas_chainId'))
        console.log('Digital Bank ', this.state.digitalBankOperation, tx);
        this.props.walletConnector.sendTransaction('violas', tx).then(res => {
            console.log('Digital Bank ', this.state.digitalBankOperation, res);
        }).catch(err => {
            console.log('Digital Bank ', this.state.digitalBankOperation, err);
        });
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
            case 'digitalBankOperation':
                await this.setState({ digitalBankOperation: e.target.value });
                break;
            case 'digitalBankAmount':
                await this.setState({ digitalBankAmount: e.target.value });
                break;
            case 'digitalBankCurrency':
                // if(!this.state.digitalBankCurrenciesList.length>0){
                //     this.getPublishViolas();
                // }
                await this.setState({ digitalBankCurrency: e.target.value });
            default:
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
                <div className='tx'>
                    <h5>Digital Bank:</h5>
                    <p>Operation:</p>
                    <select onChange={this.handleChange.bind(this, 'digitalBankOperation')}>
                        {
                            this.state.digitalBankOperationList.map((v, i) => {
                                return <option value={v} key={i}>{v}</option>
                            })
                        }
                    </select>
                    <select onChange={this.handleChange.bind(this, 'digitalBankCurrency')}>
                        {
                            this.state.digitalBankCurrenciesList && this.state.digitalBankCurrenciesList.map((v, i) => {
                                return <option value={v} key={i}>{v}</option>
                            })
                        }
                    </select>
                    <input type='text' onChange={this.handleChange.bind(this, 'digitalBankAmount')} />
                    <br />
                    <button onClick={() => this.getDigitalBank()}>Submit</button>
                </div>
            </div>
        )
    }
}

export default Bank;