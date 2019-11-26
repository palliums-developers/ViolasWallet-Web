import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import { inject, observer } from 'mobx-react';
import 'antd/dist/antd.css';
import vAccount from '../../../utils/violas';
let aes256 = require('aes256');

@inject('index')
@observer

class AddCurrency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coindata: [],
            mne: '',
            isShow: false,
            value: '',
            name: '',
            ind: Number
        }
    }
    async componentDidMount() {
        let coinData = await this.props.index.getCoinMess();
        console.log(coinData)
        let decrypted = JSON.parse(window.localStorage.getItem('data'));
        let violas = new vAccount(decrypted.mne_arr);
        let newData = coinData.map( (v, i) => {

            if (v.checked) {
                return v;
            } else {
                return Object.assign(v, { checked: false })
            }

        })
        
        newData.map(async (v, i) => {
            let data = await this.props.index.checkCurNewCoin({
                addr:violas.address,
                modu:v.address
            })
             if(Number(data[0].slice(0,5))>=0){
               return v.checked = true;
             }else{
               return v.checked = false;
             }
        })
        console.log(newData)
        this.setState({
            coindata: newData,
            mne: decrypted.mne_arr
        })
    }
    onChange = (i, name) => {
        this.setState({
            isShow: true,
            ind: i,
            name: name
        })
    }
    getValue = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    confirm = async () => {
        if (this.state.value == '') {
            alert('请输入密码！！！')
        }else if(this.state.value != JSON.parse(window.localStorage.getItem('data')).password1){
            alert('密码不匹配，请重新输入！！！')
        } else{
            this.setState({
                isShow: false
            })
            this.state.coindata[this.state.ind].checked = true;
            let violas = new vAccount(this.state.mne);
            let arr = await violas.publish(this.state.name);
            console.log(arr, 'arr')
            this.props.index.starVTranfer({
                signedtxn: arr
            })
        }
        
    }
    render() {
        let { coindata } = this.state;
        console.log(coindata)
        return (
            <div className="addCurrency">
                <header>
                    <span onClick={() => {
                        this.props.history.push({
                            pathname: '/home/wallet',
                            state: false
                        })
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>添加币种</span>
                </header>
                <section>
                    <div className="classify">
                        <div className="eachcoin">
                            <div className="logo"><img src="/img/vio@2x.png" /></div>
                            <div className="coinDescr">
                                <h4>{window.localStorage.getItem('type') == 'Violas钱包' ? 'Vtoken' : null}</h4>
                                <p>{window.localStorage.getItem('type') == 'Violas钱包' ? 'violas' : null}</p>
                            </div>
                        </div>
                        {
                            coindata && coindata.map((v, i) => {
                                return <div className="eachcoin" key={i}>
                                    <div className="logo"><img src="/img/BTC@2x.png" /></div>
                                    <div className="coinDescr">
                                        <h4>{v.name}</h4>
                            <p>{v.description}{v.checked.toString()}</p>
                                    </div>
                                    <div className="switch">
                                        {
                                            v.checked == false ? <img src="/img/编组 4复制 2@2x.png" onClick={() => this.onChange(i, v.name)} /> : <img src="/img/Rectangle 2@2x.png" />
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </section>
                {
                    this.state.isShow ? <div className="passDialog">
                        <div className="passContent">
                            <h4>输入密码</h4>
                            <input type="text" placeholder="密码" onChange={(e) => this.getValue(e)} />
                            <div className="btns">
                                <span onClick={() => {
                                    this.setState({
                                        isShow: false
                                    })
                                }}>取消</span>
                                <span onClick={() => this.confirm()}>确认</span>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        );
    }
}

export default AddCurrency;
