
import React from 'react';
import '../App.css';
import { bytes2StrHex, string2Byte, decimal2Hex, getTimestamp, int2Byte } from '../util/trans'
import axios from 'axios';
import code_data from '../util/code.json';

class Bank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mappingInfo: [],
            mappingCoinType: '',
            mappingCoinAmount: 0,
        }
    }
    async componentWillMount() {
        this.getMappingInfo()
    }
    async componentDidMount() {

    }
    async getMappingInfo() {
        await axios.get('https://api4.violas.io/1.0/mapping/address/info').then(async res => {
            await this.setState({
                mappingInfo: res.data.data,
                mappingCoinType: res.data.data[0].lable
            })
        })
    }
    async getMap(){
        console.log('mapping')
    }
    async handleChange(_type, e) {
        e.persist();
        switch (_type) {
            case 'mappingCoinType':
                await this.setState({ mappingCoinType: e.target.value });
                break;
            case 'mappingCoinAmount':
                await this.setState({mappingCoinAmount:e.target.value});
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
                    <select value={this.state.mappingCoinType} onChange={this.handleChange.bind(this, 'mappingCoinType')}>
                        {
                            this.state.mappingInfo && this.state.mappingInfo.map((v, i) => {
                                return <option value={v.lable} key={i}>{v.lable}</option>
                            })
                        }
                    </select>
                    <input type='text' onChange={this.handleChange.bind(this, 'mappingCoinAmount')} />
                    <br/>
                    <button onClick={()=>this.getMap()}>Commit Mapping</button>
                    <br />
                </div>
            </div>
        )
    }
}

export default Bank;