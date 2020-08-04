
import React from 'react';
import '../App.css';
import { bytes2StrHex, string2Byte, decimal2Hex, getTimestamp } from '../util/trans'
import axios from 'axios';
import code_data from '../util/code.json';

class Market extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            violas_currencies: [],
            swap_in: '',
            swap_out: '',
            swap_in_amount: 0,
            swap_trial: {},
            input_a: '',
            input_a_amount: 0,
            input_b: '',
            addLiquidityTrial: 0,
            AddLiquidity: {},
            output_a: '',
            output_b: '',
            accountPoolInfo: {},
            removeLiquidityList: [],
            selected_pair: '',
            selected_pair_detail: '',
            removeLiquidityTrial: {},
            remove_liquidity: 0,
        }
    }
    async componentWillMount() {
        this.getMarketCurrencies();
        this.getAccountPoolInfo();
    }
    async componentDidMount() {

    }
    async getMarketCurrencies() {
        axios('https://api4.violas.io/1.0/market/exchange/currency')
            .then(async res => {
                let temp = [];
                temp = res.data.data.btc.concat(res.data.data.libra);
                temp = temp.concat(res.data.data.violas)
                await this.setState({
                    currencies: temp,
                    violas_currencies: res.data.data.violas,
                    swap_in: temp[0].show_name,
                    swap_out: temp[0].show_name,
                    input_a: res.data.data.violas[0].show_name,
                    input_b: res.data.data.violas[0].show_name,
                });
            })
    }
    // https://api4.violas.io/1.0/market/pool/info?address=f4174e9eabcb2e968e22da4c75ac653b
    async getAccountPoolInfo() {
        axios(`https://api4.violas.io/1.0/market/pool/info?address=${sessionStorage.getItem('violas_address')}`)
            .then(async res => {
                await this.setState({ accountPoolInfo: res.data });
                this.getRemoveLiquidityList();
                await this.setState({ selected_pair: this.state.removeLiquidityList[0] && this.state.removeLiquidityList[0].pair_name })
            })
    }
    async getRemoveLiquidityList() {
        let tempJson = [];
        for (let i = 0; i < this.state.accountPoolInfo.data.balance.length; i++) {
            tempJson.push(
                {
                    detail: this.state.accountPoolInfo.data.balance[i],
                    pair_name: this.state.accountPoolInfo.data.balance[i].coin_a.name + '/' + this.state.accountPoolInfo.data.balance[i].coin_b.name
                }
            )
        }
        await this.setState({ removeLiquidityList: tempJson });
    }
    async getSwapTrial(_amount, _in, _out) {
        axios(`https://api4.violas.io/1.0/market/exchange/trial?amount=${_amount}&currencyIn=${_in}&currencyOut=${_out}`)
            .then(async res => {
                await this.setState({ swap_trial: res.data });
            })
    }
    async getAddLiquidityTrial(_amount, _in, _out) {
        axios(`https://api4.violas.io/1.0/market/pool/deposit/trial?amount=${_amount}&coin_a=${_in}&coin_b=${_out}`)
            .then(async res => {
                await this.setState({ addLiquidityTrial: res.data.data })
            })
    }
    async before_getRemoveLiquidityTrial(amount, coin_pair) {
        let coin_pair_detail = {};
        for (let i in this.state.removeLiquidityList) {
            if (coin_pair == this.state.removeLiquidityList[i].pair_name) {
                coin_pair_detail = this.state.removeLiquidityList[i].detail;
                await this.setState({ selected_pair_detail: coin_pair_detail });
                break;
            }
        }
        this.getRemoveLiquidityTrial(sessionStorage.getItem('violas_address'), amount, coin_pair_detail.coin_a.module, coin_pair_detail.coin_b.module);
    }
    async getRemoveLiquidityTrial(_address, _amount, _in, _out) {
        axios(`https://api4.violas.io/1.0/market/pool/withdrawal/trial?address=${_address}&amount=${_amount}&coin_a=${_in}&coin_b=${_out}`)
            .then(async res => {
                await this.setState({ removeLiquidityTrial: res.data.data })
            })
    }
    async getTyArgs(_module, _name) {
        let address = '00000000000000000000000000000001';
        let prefix = '07';
        let suffix = '00';
        let module_length = _module.length;
        if (module_length < 10) {
            module_length = '0' + module_length;
        }
        let _module_hex = bytes2StrHex(string2Byte(_module));
        let name_length = _name.length;
        if (name_length < 10) {
            name_length = '0' + name_length;
        }
        let _name_hex = bytes2StrHex(string2Byte(_name));
        let result = prefix + address + module_length + _module_hex + name_length + _name_hex + suffix;
        return result;
    }
    async fullWith16(temp) {
        temp = '' + temp;
        let temp_length = temp.length;
        if (temp < 16) {
            let zero = '';
            for (let i = 0; i < 16 - temp_length; i++) {
                zero += '0';
            }
            temp = zero + temp;
        }
        return temp
    }
    async getBTC2other(_type, _payee_address, _amount) {
        let op_return_head = '6a';
        let data_length = '3c';
        let mark = code_data.btc.violas_mark;
        let version = code_data.btc.version;
        let type = '';
        for (let key in code_data.btc.type.start) {
            if (key === _type) {
                type = code_data.btc.type.start.key;
                break;
            }
        }
        let payee_address = _payee_address;
        let sequence = this.fullWith16(getTimestamp);
        let module_address = code_data.btc.violas_module_address;
        let amount = this.fullWith16(_amount);
        let time = '0000';
        return op_return_head + data_length + mark + version + type + payee_address + sequence + module_address + amount + time;
    }
    async orderCurrencies(input_a, input_b) {
        let index_a, index_b;
        let amount_a, amount_b = 0;
        for (let i = 0; i < this.state.violas_currencies.length; i++) {
            if (this.state.violas_currencies[i].show_name == input_a) {
                index_a = i;
            }
            if (this.state.violas_currencies[i].show_name == input_b) {
                index_b = i;
            }
        }

        if (index_a > index_b) {
            let temp = index_a;
            index_a = index_b;
            index_b = temp;
            amount_a = this.state.addLiquidityTrial;
            amount_b = this.state.input_a_amount;
        } else {
            amount_a = this.state.input_a_amount;
            amount_b = this.state.addLiquidityTrial;
        }
        await this.setState({
            AddLiquidity: {
                coin_a: this.state.violas_currencies[index_a].show_name,
                coin_a_amount: parseInt(amount_a),
                coin_a_tyArgs: await this.getTyArgs(this.state.violas_currencies[index_a].module, this.state.violas_currencies[index_a].name),
                coin_b: this.state.violas_currencies[index_b].show_name,
                coin_b_amount: amount_b,
                coin_b_tyArgs: await this.getTyArgs(this.state.violas_currencies[index_b].module, this.state.violas_currencies[index_b].name),
            }
        })
        // console.log(this.state.AddLiquidity)
    }
    async getSwap(_type, chainId) {
        const tx = {
            from: sessionStorage.getItem('violas_address'),
            payload: {

            }
        }
    }
    async getAddLiquidity(chainId) {
        await this.orderCurrencies(this.state.input_a, this.state.input_b)
        const tx = {
            from: sessionStorage.getItem('violas_address'),
            payload: {
                code: code_data.violas_p2p,
                tyArgs: [
                    this.state.AddLiquidity.coin_a_tyArgs,
                    this.state.AddLiquidity.coin_b_tyArgs
                ],
                args: [
                    {
                        type: 'U64',
                        value: this.state.AddLiquidity.coin_a_amount
                    },
                    {
                        type: 'U64',
                        value: this.state.AddLiquidity.coin_b_amount
                    },
                    {
                        type: 'U64',
                        value: 0
                    },
                    {
                        type: 'U64',
                        value: 0
                    }
                ]
            },
            chainId: chainId
        }
        console.log('Add Liquidity ', tx);
        this.props.walletConnector.sendTransaction('violas', tx).then(res => {
            console.log('Add Liquidity ', res);
        }).catch(err => {
            console.log('Add Liquidity ', err);
        });
    }
    async getRemoveLiquidity(chainId) {
        const tx = {
            from: sessionStorage.getItem('violas_address'),
            payload: {
                code: code_data.violas_p2p,
                tyArgs: [
                    await this.getTyArgs(this.state.selected_pair_detail.coin_a.module, this.state.selected_pair_detail.coin_a.name),
                    await this.getTyArgs(this.state.selected_pair_detail.coin_b.module, this.state.selected_pair_detail.coin_b.name),
                ],
                args: [
                    {
                        type: 'U64',
                        value: this.state.remove_liquidity
                    },
                    {
                        type: 'U64',
                        value: 10
                    },
                    {
                        type: 'U64',
                        value: 10
                    }
                ]
            },
            chainId: chainId
        }
        console.log('Remove Liquidity ', tx);
        this.props.walletConnector.sendTransaction('violas', tx).then(res => {
            console.log('Remove Liquidity ', res);
        }).catch(err => {
            console.log('Remove Liquidity ', err);
        });
    }
    async handleChange(_type, e) {
        e.persist();
        switch (_type) {
            case 'swap_in':
                await this.setState({ swap_in: e.target.value });
                console.log(this.state.swap_in)
                break;
            case 'swap_out':
                await this.setState({ swap_out: e.target.value });
                break;
            case 'swap_in_amount':
                await this.setState({ swap_in_amount: e.target.value });
                break;
            case 'input_a':
                await this.setState({ input_a: e.target.value, addLiquidityTrial: 0 });
                break;
            case 'input_b':
                await this.setState({ input_b: e.target.value, addLiquidityTrial: 0 });
                break;
            case 'input_a_amount':
                await this.setState({ input_a_amount: e.target.value, addLiquidityTrial: 0 });
                break;
            case 'selected_pair':
                await this.setState({ selected_pair: e.target.value, removeLiquidityTrial: {} });
                break;
            case 'remove_liquidity':
                await this.setState({ remove_liquidity: e.target.value, removeLiquidityTrial: {} });
                break;
        }
    }
    render() {
        return (
            <div className='boxs'>
                <h2>Market:</h2>
                <div className='tx'>
                    <h5>Swap:</h5>
                    <p> Input
                        <select value={this.state.swap_in} onChange={this.handleChange.bind(this, 'swap_in')}>
                            {
                                this.state.currencies && this.state.currencies.map((v, i) => {
                                    return <option value={v.show_name} key={i} style={{ backgroundImage: `url(${v.icon})` }}>{v.show_name}</option>
                                })
                            }
                        </select>
                    </p>
                    <p>Amount :<input type='text' onChange={this.handleChange.bind(this, 'swap_in_amount')} /></p>
                    <p> Output
                        <select value={this.state.swap_out} onChange={this.handleChange.bind(this, 'swap_out')}>
                            {
                                this.state.currencies && this.state.currencies.map((v, i) => {
                                    return <option value={v.show_name} key={i} style={{ backgroundImage: `url(${v.icon})` }}>{v.show_name}</option>
                                })
                            }
                        </select>
                    </p>
                    <h4>{this.state.swap_trial.code == 2000 ? this.state.swap_trial.data.amount : 0}</h4>
                    <button onClick={() => this.getSwapTrial(this.state.swap_in_amount, this.state.swap_in, this.state.swap_out)}>Get trial</button>
                    <br />
                    {
                        this.state.swap_trial.code == 2000 &&
                        <button onClick={() => this.getSwap(this.state.swap_in, 1)}>Swap</button>
                    }
                </div>
                <div className='tx'>
                    <h5>Add Liquidity:</h5>
                    <p>Input coinA:</p>
                    <select value={this.state.input_a} onChange={this.handleChange.bind(this, 'input_a')}>
                        {
                            this.state.violas_currencies && this.state.violas_currencies.map((v, i) => {
                                return <option value={v.show_name} key={i} style={{ backgroundImage: `url(${v.icon})` }}>{v.show_name}</option>
                            })
                        }
                    </select>
                    <input type='text' onChange={this.handleChange.bind(this, 'input_a_amount')} />
                    <p>Input coinB:
                    <select value={this.state.input_b} onChange={this.handleChange.bind(this, 'input_b')}>
                            {
                                this.state.violas_currencies && this.state.violas_currencies.map((v, i) => {
                                    return <option value={v.show_name} key={i} style={{ backgroundImage: `url(${v.icon})` }}>{v.show_name}</option>
                                })
                            }
                        </select>
                    </p>
                    <h4>Trial amount: {this.state.addLiquidityTrial}</h4>
                    <button onClick={() => this.getAddLiquidityTrial(this.state.input_a_amount, this.state.input_a, this.state.input_b)}>Add Trial</button>
                    <br />
                    {
                        this.state.addLiquidityTrial != 0 && <button onClick={() => this.getAddLiquidity(1)}>add Liquidity</button>
                    }
                </div>
                <div className='tx'>
                    <h5>Remove Liquidity:</h5>
                    <select value={this.state.selected_pair} onChange={this.handleChange.bind(this, 'selected_pair')} style={{ width: '160px' }}>
                        {
                            this.state.removeLiquidityList.length != 0 && this.state.removeLiquidityList.map((v, i) => {
                                return <option value={v.pair_name} key={i}>{v.pair_name}</option>
                            })
                        }
                    </select>
                    <input type='text' onChange={this.handleChange.bind(this, 'remove_liquidity')} />
                    <br />
                    <button onClick={() => this.before_getRemoveLiquidityTrial(this.state.remove_liquidity, this.state.selected_pair)}>Remove Trial</button>
                    <br />
                    {
                        this.state.removeLiquidityTrial.coin_a_name &&
                        <div>
                            <h4>Trial amount:</h4>
                            <h5>coin a: {this.state.removeLiquidityTrial.coin_a_name}&nbsp;
                            value:{this.state.removeLiquidityTrial.coin_a_value}</h5>
                            <h5>coin b: {this.state.removeLiquidityTrial.coin_b_name}&nbsp;
                            value:{this.state.removeLiquidityTrial.coin_b_value}</h5>
                            <button onClick={() => this.getRemoveLiquidity(1)}>remove Liquidity</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Market;
        //https://api4.violas.io/1.0/market/exchange/currency
        //https://api4.violas.io/1.0/market/pool/reserve/infos
        //https://api4.violas.io/1.0/market/exchange/trial?amount=100000&currencyIn=VLSUSD&currencyOut=BTC