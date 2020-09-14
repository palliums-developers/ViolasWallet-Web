
import React from 'react';
import '../App.css';
import code_data from '../util/code.json';
import { bytes2StrHex, string2Byte } from '../util/trans'
import axios from 'axios';

class Violas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            walletConnector: {},
            violas_address: '',
            tyArgs: '',
            address: '',
            value: 0,
            message: '',
            gasCurrencyCode: 'VLS',
            violas_currencies: [],
            violas_currency: '',
        }
        this.sendPublish = this.sendPublish.bind(this);
        this.violas_sendTransaction = this.violas_sendTransaction.bind(this);
    }
    async componentWillMount() {
        await this.getViolasCurrencies();
        await this.getTyArgs(this.state.violas_currencies[0].module, this.state.violas_currencies[0].name);
        await this.setState({
            violas_currency: this.state.violas_currencies[0].name,
        });
    }
    async componentDidMount() {

    }
    async getSeqNumb(_address) {
        await axios(`https://api.violas.io/1.0/violas/seqnum?addr=${_address}`).then(res => {
            return res.data.data + 1
        });
    }
    async getViolasCurrencies() {
        await axios('https://api4.violas.io/1.0/violas/currency')
            .then(async res => {
                await this.setState({ violas_currencies: res.data.data.currencies });
            })
    }
    async getTyArgs(_module, _name) {
        let address = '00000000000000000000000000000001';
        let prefix = '07';
        let suffix = '00';
        let _module_length = _module.length;
        if (_module_length < 10) {
            _module_length = '0' + _module_length;
        }
        let _module_hex = bytes2StrHex(string2Byte(_module));
        let name_length = _name.length;
        if (name_length < 10) {
            name_length = '0' + name_length;
        }
        let _name_hex = bytes2StrHex(string2Byte(_name));
        let result = prefix + address + _module_length + _module_hex + name_length + _name_hex + suffix;
        await this.setState({ tyArgs: result });
    }
    async violas_sendTransaction(chainId) {
        // const seq = await this.getSeqNumb(this.state.from).then(res => {
        //   return res
        // }).catch(err => {
        //   console.log(err)
        // })
        console.log('Please confirm current violas address is ', sessionStorage.getItem('violas_address'));
        // const tx = {
        //     from: sessionStorage.getItem('violas_address'),
        //     payload: {
        //         code: code_data.violas_code,
        //         tyArgs: [
        //             this.state.tyArgs
        //         ],
        //         args: [
        //             {
        //                 type: 'Address',
        //                 value: this.state.address
        //             },
        //             {
        //                 type: 'Number',
        //                 value: this.state.value
        //             },
        //             {
        //                 type: 'Bytes',
        //                 value: ''
        //             },
        //             {
        //                 type: 'Bytes',
        //                 value: ''
        //             },
        //         ]
        //     },
        //     // maxGasAmount: 400000,
        //     // gasUnitPrice: 0,
        //     // sequenceNumber: seq,
        //     gasCurrencyCode: this.state.currencyCode,
        // }
        const tx = {
            from: sessionStorage.getItem('violas_address'),
            payload: {
                code: code_data.violas.p2p,
                tyArgs: [
                    this.state.tyArgs
                ],
                args: [
                    {
                        type: 'Address',
                        value: this.state.address
                    },
                    {
                        type: 'U64',
                        value: this.state.value
                    },
                    {
                        type: 'Vector',
                        value: ''
                    },
                    {
                        type: 'Vector',
                        value: ''
                    }

                ]
            },
            chainId: chainId
        }
        console.log('violas ', tx);
        this.props.walletConnector.sendTransaction('violas', tx).then(res => {
            console.log('Violas transaction ', res);
        }).catch(err => {
            console.log('Violas transaction ', err);
        });
    }
    async sendPublish(chainId) {
        const tx = {
            from: sessionStorage.getItem('violas_address'),
            payload: {
                code: code_data.violas.publish,
                tyArgs: [
                    this.state.tyArgs
                ],
                args: []
            },
            // gasCurrencyCode: this.state.currencyCode,
            chainId: chainId
        }
        console.log(tx)
        this.props.walletConnector.sendTransaction('violas', tx).then(res => {
            console.log('send publish ', res);
        }).catch(err => {
            console.log('send publish ', err);
        })
    }
    async signTransaction() {
        console.log('Please confirm current violas address is ', sessionStorage.getItem('violas_address'));
        this.props.walletConnector.signTransaction({ address: sessionStorage.getItem('violas_address'), message: this.state.message }).then(res => {
            console.log('sign transaction ', res);
        }).catch(err => {
            console.log('sign transaction ', err);
        })
    }
    async handleChange(_type, e) {
        e.persist();
        switch (_type) {
            case 'violas_address':
                await this.setState({ address: e.target.value });
                break;
            case 'violas_value':
                await this.setState({ value: e.target.value });
                break;
            case 'violas_msg':
                await this.setState({ message: e.target.value });
                break;
            case 'violas_currency':
                await this.setState({ violas_currency: e.target.value });
                await this.getTyArgs(this.state.violas_currency, this.state.violas_currency);
                break;
            default:
                break;
        }
    }
    render() {
        // console.log(this.props.walletConnector)
        return (
            <div className='boxs'>
                <h2>Violas:</h2>
                <div className='tx'>
                    <h5>Publish:</h5>
                    <p>Select Stable Coin:
                    <select value={this.state.violas_currency} onChange={this.handleChange.bind(this, 'violas_currency')}>
                            {
                                this.state.violas_currencies && this.state.violas_currencies.map((v, i) => {
                                    return <option value={v.name} key={i}>{v.name}</option>
                                })
                            }
                        </select>
                    </p>
                    <button onClick={() => this.sendPublish(sessionStorage.getItem('violas_chainId'))}>send publish</button>
                </div>
                <div className='tx'>
                    <h5>Send Transaction</h5>
                    <p>Address: <input type="text" onChange={this.handleChange.bind(this, 'violas_address')} /></p>
                    <p>Value: <input type="text" onChange={this.handleChange.bind(this, 'violas_value')} /></p>
                    <select value={this.state.violas_currency} onChange={this.handleChange.bind(this, 'violas_currency')}>
                        {
                            this.state.violas_currencies && this.state.violas_currencies.map((v, i) => {
                                return <option value={v.name} key={i}>{v.name}</option>
                            })
                        }
                    </select>
                    <button onClick={() => this.violas_sendTransaction(sessionStorage.getItem('violas_chainId'))}>send transaction</button>
                </div>
                {/* <div className='tx'>
                    <h5>Send Signed Transaction</h5>
                    <p>Message: <input type="text" onChange={this.handleChange.bind(this, 'violas_msg')} /></p>
                    <button onClick={this.signTransaction}>sign transaction</button>
                </div> */}
            </div>
        )
    }
}

export default Violas;