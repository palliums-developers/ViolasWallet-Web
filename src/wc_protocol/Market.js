
import React from 'react';
import '../App.css';
import { bytes2StrHex, string2Byte, decimal2Hex, getTimestamp, int2Byte } from '../util/trans'
import axios from 'axios';
import code_data from '../util/code.json';

class Market extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crossChainInfo: {},
            currenciesWithType: {},
            currencies: [],
            violas_currencies: [],
            swap_in: '',
            swap_out: '',
            swap_in_name: '',
            swap_out_name: '',
            swap_in_amount: 0,
            swap_in_type: '',
            swap_out_type: '',
            swap_address: '',
            swap_trial: {},
            uniswap: {},
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
        this.getCrossChainInfo();
    }
    async componentDidMount() {

    }
    async getCrossChainInfo() {
        axios('https://api4.violas.io/1.0/market/exchange/crosschain/address/info')
            .then(async res => {
                await this.setState({ crossChainInfo: res.data.data })
            })
    }
    async getMarketCurrencies() {
        axios('https://api4.violas.io/1.0/market/exchange/currency')
            .then(async res => {
                await this.setState({ currenciesWithType: res.data.data })
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
        // if(_in==='BTC'){
        //     _amount=parseInt(_amount)/100
        // }
        axios(`https://api4.violas.io/1.0/market/exchange/trial?amount=${_amount}&currencyIn=${_in}&currencyOut=${_out}`)
            .then(async res => {
                await this.setState({ swap_trial: res.data });
            })
        this.before_getSwap(_in, _out);
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
        if (temp_length < 16) {
            let zero = '';
            for (let i = 0; i < 16 - temp_length; i++) {
                zero += '0';
            }
            temp = zero + temp;
        }
        return temp
    }
    async getBitcoinScript(_type, _payee_address, _amount) {
        let op_return_head = '6a';
        let data_length = '3c';
        let mark = code_data.btc.violas_mark;
        let version = code_data.btc.version;
        let type = '';
        for (let key in code_data.btc.type.start) {
            if (key === _type) {
                type = code_data.btc.type.start[key];
                break;
            }
        }
        let payee_address = _payee_address;
        let sequence = await this.fullWith16(getTimestamp);
        console.log('sequence ', sequence)
        let module_address = code_data.btc.violas_module_address;
        let amount = await this.fullWith16(decimal2Hex(_amount));
        let time = '0000';
        return op_return_head + data_length + mark + version + type + payee_address + sequence + module_address + amount + time;
    }
    async getLibraScript(_flag, _type, _type_list, _address, _amount) {
        let flag = _flag;
        let type = '';
        for (let key in _type_list) {
            if (key === _type) {
                type = _type_list[key];
                break;
            }
        }
        // console.log(_type)
        let to_address = _address;
        let result = {
            flag: flag,
            type: type,
            times: 0,
            to_address: to_address,
            out_amount: _amount,
            state: 'start'
        }
        console.log('script ', result)
        return JSON.stringify(result);
    }
    async orderCurrencies(type, input_a, input_b) {
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
        if (type === 'add_liquidity') {
            await this.setState({
                AddLiquidity: {
                    coin_a: this.state.violas_currencies[index_a].show_name,
                    coin_a_amount: parseInt(amount_a),
                    coin_a_tyArgs: await this.getTyArgs(this.state.violas_currencies[index_a].module, this.state.violas_currencies[index_a].name),
                    coin_b: this.state.violas_currencies[index_b].show_name,
                    coin_b_amount: parseInt(amount_b),
                    coin_b_tyArgs: await this.getTyArgs(this.state.violas_currencies[index_b].module, this.state.violas_currencies[index_b].name),
                }
            })
        } else if (type == 'uniswap') {
            await this.setState({
                uniswap: {
                    coin_a: this.state.violas_currencies[index_a].show_name,
                    coin_a_tyArgs: await this.getTyArgs(this.state.violas_currencies[index_a].module, this.state.violas_currencies[index_a].name),
                    coin_b: this.state.violas_currencies[index_b].show_name,
                    coin_b_tyArgs: await this.getTyArgs(this.state.violas_currencies[index_b].module, this.state.violas_currencies[index_b].name),
                }
            })
        }
    }
    async getSwapType(_temp) {
        if (_temp === 'BTC') {
            return 'btc';
        } else {
            for (let j in this.state.currenciesWithType.libra) {
                if (this.state.currenciesWithType.libra[j].name === _temp) {
                    return 'libra';
                }
            }
            for (let k in this.state.currenciesWithType.violas) {
                if (this.state.currenciesWithType.violas[k].name === _temp) {
                    return 'violas';
                }
            }
        }
    }
    async before_getSwap(input_type, output_type) {
        //change show name to name
        for (let i in this.state.currencies) {
            if (this.state.currencies[i].show_name === input_type) {
                await this.setState({ swap_in_name: this.state.currencies[i].name })
            }
            if (this.state.currencies[i].show_name === output_type) {
                await this.setState({ swap_out_name: this.state.currencies[i].name })
            }
        }
        //get input type
        await this.setState({ swap_in_type: await this.getSwapType(this.state.swap_in_name) })
        //get output type
        await this.setState({ swap_out_type: await this.getSwapType(this.state.swap_out_name) })
        //get receiver address
        for (let l in this.state.crossChainInfo) {
            if (this.state.crossChainInfo[l].input_coin_type === this.state.swap_in_type) {
                if (this.state.crossChainInfo[l].to_coin.assets.name === this.state.swap_out_name) {
                    // console.log(l, this.state.crossChainInfo[l].input_coin_type, this.state.crossChainInfo[l].to_coin.assets.name)
                    await this.setState({ swap_address: this.state.crossChainInfo[l].receiver_address });
                    break;
                }
            }
        }
    }
    getPayeeAddress() {
        let payee_address = '';
        if (this.state.swap_out_type === 'violas') {
            payee_address = sessionStorage.getItem('violas_address');
        } else if (this.state.swap_out_type === 'libra') {
            payee_address = sessionStorage.getItem('libra_address');
        } else {
            payee_address = sessionStorage.getItem('bitcoin_address')
        }
        return payee_address;
    }
    async getBitcoinSwap() {
        return {
            from: sessionStorage.getItem('bitcoin_address'),
            amount: this.state.swap_in_amount,
            changeAddress: sessionStorage.getItem('bitcoin_address'),
            payeeAddress: this.state.swap_address,
            script: await this.getBitcoinScript(this.state.swap_out, this.getPayeeAddress(), this.state.swap_trial.data.amount)
        }
    }
    async getLibraSwap(out_type, chainId) {
        let address_temp = '';
        if (out_type === 'violas') {
            address_temp = '00000000000000000000000000000000' + sessionStorage.getItem('violas_address');
        } else if (out_type === 'btc') {
            address_temp = sessionStorage.getItem('bitcoin_address');
        } else {
            console.log('Could not swap between libra');
            return;
        }
        return {
            from: sessionStorage.getItem('libra_address'),
            payload: {
                code: code_data.libra.p2p,
                tyArgs: [
                    {
                        module: this.state.swap_in_name,
                        address: code_data.btc.libra_module_address,
                        name: this.state.swap_in_name
                    }
                ],
                args: [
                    {
                        type: 'Address',
                        value: this.state.swap_address
                    },
                    {
                        type: 'U64',
                        value: this.state.swap_in_amount
                    },
                    {
                        type: 'Vector',
                        value: await bytes2StrHex(string2Byte(await this.getLibraScript('libra', this.state.swap_out, code_data.libra.type.start, address_temp, this.state.swap_trial.data.amount)))
                    },
                    {
                        type: 'Vector',
                        value: ''
                    }
                ]
            },
            chainId: chainId
        }
    }
    async getViolas2otherSwap(out_type, chainId) {
        let address_temp = '';
        if (out_type === 'libra') {
            address_temp = '00000000000000000000000000000000' + sessionStorage.getItem('libra_address');
        } else if (out_type === 'btc') {
            address_temp = sessionStorage.getItem('bitcoin_address');
        }
        return {
            from: sessionStorage.getItem('violas_address'),
            payload: {
                code: code_data.violas.p2p,
                tyArgs: [
                    await this.getTyArgs(this.state.swap_in_name, this.state.swap_in_name)
                ],
                args: [
                    {
                        type: 'Address',
                        value: this.state.swap_address
                    },
                    {
                        type: 'U64',
                        value: this.state.swap_in_amount
                    },
                    {
                        type: 'Vector',
                        value: await bytes2StrHex(string2Byte(await this.getLibraScript('violas', this.state.swap_out, code_data.violas.type.start, address_temp, this.state.swap_trial.data.amount)))
                    },
                    {
                        type: 'Vector',
                        value: ''
                    }
                ]
            },
            chainId: chainId
        }
    }
    async getBytePath(arr) {
        let result = [];
        for (let i in arr) {
            result.push(int2Byte(arr[i]))
        }
        return result
    }
    async getUniswap(chainId) {
        await this.orderCurrencies('uniswap', this.state.swap_in_name, this.state.swap_out_name);
        return {
            from: sessionStorage.getItem('violas_address'),
            payload: {
                code: code_data.violas.swap,
                tyArgs: [
                    this.state.uniswap.coin_a_tyArgs,
                    this.state.uniswap.coin_b_tyArgs
                ],
                args: [
                    {
                        type: 'Address',
                        value: sessionStorage.getItem('violas_address')
                    },
                    {
                        type: 'U64',
                        value: '' + this.state.swap_in_amount
                    },
                    {
                        type: 'U64',
                        value: '' + this.state.swap_in_amount
                    },
                    {
                        type: 'Vector',
                        value: await bytes2StrHex(await this.getBytePath(this.state.swap_trial.data.path))
                    },
                    {
                        type: 'Vector',
                        value: ''
                    }
                ]
            },
            chainId: chainId
        }
    }
    async getViolasSwap(_out_type, chainId) {
        let tx;
        if (_out_type === 'violas') {
            tx = await this.getUniswap(chainId);
        } else {
            tx = await this.getViolas2otherSwap(_out_type, chainId);
        }
        return tx;
    }
    async getSwap(chainId) {
        if (this.state.swap_in_type === 'btc') {
            const tx = await this.getBitcoinSwap();
            console.log(tx.script)
            console.log('bitcoin Swap', tx);
            this.props.walletConnector.sendTransaction('_bitcoin', tx).then(res => {
                console.log('Bitcoin Swap ', res);
            }).catch(err => {
                console.log('Bitcoin Swap ', err);
            });
        } else if (this.state.swap_in_type === 'libra') {
            const tx = await this.getLibraSwap(this.state.swap_out_type, sessionStorage.getItem('libra_chainId'));
            console.log('libra Swap ', tx);
            this.props.walletConnector.sendTransaction('_libra', tx).then(res => {
                console.log('Libra Swap ', res);
            }).catch(err => {
                console.log('Libra Swap ', err);
            })
        } else if (this.state.swap_in_type === 'violas') {
            const tx = await this.getViolasSwap(this.state.swap_out_type, sessionStorage.getItem('violas_chainId'));
            console.log('violas Swap ', tx);
            this.props.walletConnector.sendTransaction('violas', tx).then(res => {
                console.log('Violas Swap ', res);
            }).catch(err => {
                console.log('Violas Swap ', err);
            })
        }
    }
    async getAddLiquidity(chainId) {
        await this.orderCurrencies('add_liquidity', this.state.input_a, this.state.input_b)
        const tx = {
            from: sessionStorage.getItem('violas_address'),
            payload: {
                code: code_data.violas.add_liquidity,
                tyArgs: [
                    this.state.AddLiquidity.coin_a_tyArgs,
                    this.state.AddLiquidity.coin_b_tyArgs
                ],
                args: [
                    {
                        type: 'U64',
                        value: '' + (this.state.AddLiquidity.coin_a_amount)
                    },
                    {
                        type: 'U64',
                        value: '' + (this.state.AddLiquidity.coin_b_amount)
                    },
                    {
                        type: 'U64',
                        value: '0'
                    },
                    {
                        type: 'U64',
                        value: '0'
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
                code: code_data.violas.remove_liquidity,
                tyArgs: [
                    await this.getTyArgs(this.state.selected_pair_detail.coin_a.module, this.state.selected_pair_detail.coin_a.name),
                    await this.getTyArgs(this.state.selected_pair_detail.coin_b.module, this.state.selected_pair_detail.coin_b.name),
                ],
                args: [
                    {
                        type: 'U64',
                        value: '' + this.state.remove_liquidity
                    },
                    {
                        type: 'U64',
                        value: '' + this.state.removeLiquidityTrial.coin_a_value
                    },
                    {
                        type: 'U64',
                        value: '' + this.state.removeLiquidityTrial.coin_b_value
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
                await this.setState({ swap_in: e.target.value, swap_trial: {} });
                break;
            case 'swap_out':
                await this.setState({ swap_out: e.target.value, swap_trial: {} });
                break;
            case 'swap_in_amount':
                await this.setState({ swap_in_amount: e.target.value, swap_trial: {} });
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
                await this.setState({ remove_liquidity: parseInt(e.target.value), removeLiquidityTrial: {} });
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
                        <button onClick={() => this.getSwap(2)}>Swap</button>
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
                        this.state.addLiquidityTrial != 0 && <button onClick={() => this.getAddLiquidity(sessionStorage.getItem('violas_chainId'))}>add Liquidity</button>
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
                    <br />
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
                            <button onClick={() => this.getRemoveLiquidity(sessionStorage.getItem('violas_chainId'))}>remove Liquidity</button>
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