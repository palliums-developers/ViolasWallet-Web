import React, { Component } from "react";
import "./market.scss";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
let url1 = "https://api4.violas.io"

class MyPoolDialog extends Component {
    constructor(props) {
        super()
        this.state = {
            poolList:[],
            total_token:0
        }
    }
    //获取资产记录
    componentDidMount() {
        fetch(url1 + "/1.0/market/pool/info?address=" + window.localStorage.getItem('address')).then(res => res.json())
            .then(res => {
                // console.log(res,'.......')
                this.setState({
                    // res.date.balance  res.data.total_token
                    poolList: [
                        {
                            "coin_a": {
                                "index": 0,
                                "module": "VLSUSD",
                                "module_address": "00000000000000000000000000000001",
                                "name": "VLSUSD",
                                "show_name": "VLSUSD",
                                "value": 9999
                            },
                            "coin_b": {
                                "index": 1,
                                "module": "VLSEUR",
                                "module_address": "00000000000000000000000000000001",
                                "name": "VLSEUR",
                                "show_name": "VLSEUR",
                                "value": 5046
                            },
                            "token": 7095
                        }
                    ],
                    total_token: 7095
                })
            })
    }
    showPolling = () => {
        this.props.showPolling()
    };
    render() {
        let { total_token, poolList } = this.state;
        // console.log(poolList,'.......')
        return (
            <div className="myPoolDialog">
                <h4 onClick={() => this.showPolling()}><i><img src="/img/编组备份 3@2x.png" /></i>我的资金池</h4>
                <div className="amountShow">
                  <p>资金池资产</p>
                  <p><span>{total_token}</span>Violas</p>
                </div>
                <div className="btns">
                    <button>转入</button>
                    <button>转出</button>
                </div>
                <div className="list">
                    <h4>资产</h4>
                    <div className="listContent">
                        {
                            poolList.map((v,i)=>{
                                return <p key={i}><label>{v.coin_a.index < v.coin_b.index ? v.coin_a.show_name + '/' + v.coin_b.show_name : v.coin_b.show_name + '/' + v.coin_a.show_name}</label><span>{v.token}</span></p>
                            })
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return state.ListReducer;
}
let mapDispatchToProps = (dispatch) => {
    return {
        showPolling: () => {
            dispatch({
                type: 'SHOWPOOL',
                payload: false
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPoolDialog);