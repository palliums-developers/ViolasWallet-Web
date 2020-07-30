
import React from 'react';
import '../App.css';

class Bitcoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            value: 0,
            script: '',
        }
    }
    async componentWillMount() {

    }
    async componentDidMount() {

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
    async bitcoin_sendTransaction() {
        console.log('You send Libra transaction with ', sessionStorage.getItem('bitcoin_address'));
        const tx = {
            from: sessionStorage.getItem('bitcoin_address'),
            amount: this.state.value,
            changeAddress: sessionStorage.getItem('bitcoin_address'),
            payeeAddress: this.state.address,
            script: this.state.script
        }
        console.log('bitcoin ',tx);
        this.props.walletConnector.sendTransaction('_bitcoin',tx).then(res=>{
            console.log('Bitcoin transaction ',res);
        }).catch(err=>{
            console.log('Bitcoin transaction ',err);
        });
    }
    render() {
        return (
            <div className='boxs'>
                <h2>Bitcoin:</h2>
                <div className='tx'>
                    <h5>Test Net:</h5>
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