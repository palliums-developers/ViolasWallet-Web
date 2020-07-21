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
                            "coin_a_index": 0,
                            "coin_a_name": "VLSUSD",
                            "coin_a_value": 59811,
                            "coin_b_index": 1,
                            "coin_b_name": "VLSEUR",
                            "coin_b_value": 31905,
                            "token": 43632
                        }
                    ],
                    total_token: 43632
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
                                return <p key={i}><label>{v.coin_a_name < v.coin_b_name ? v.coin_a_name + '/' + v.coin_b_name : v.coin_b_name + '/' + v.coin_a_name}</label><span>{v.token}</span></p>
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