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
        fetch(url1 + "/1.0/market/pool/transaction?address=" + window.localStorage.getItem('address')).then(res => res.json())
            .then(res => {
                this.setState({
                    // res.date.balance  res.data.total_token
                    poolList: [
                        {
                            "VLSEUR": 1,
                            "VLSUSD": 0,
                            "token": 0
                        }
                    ],
                    total_token:0
                },()=>{
                    let arr = []
                        this.state.poolList.map((v)=>{
                            for (var key in v) {
                                if(key != 'token'){
                                    arr.push({[key]:v[key]})
                                }
                            }
                        })
                        this.setState({
                            poolList:arr
                        })
                        
                })
            })
    }
    showPolling = () => {
        this.props.showPolling()
    };
    render() {
        let { total_token, poolList } = this.state;
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
                                return <p key={i}><label>{Object.keys(v)}</label><span>{Object.values(v)}</span></p>
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