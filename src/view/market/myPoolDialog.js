import React, { Component } from "react";
import "./market.scss";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


class MyPoolDialog extends Component {
    constructor(props) {
        super()
        this.state = {
        }
    }
    componentDidMount() {

    }
    showPolling = () => {
        this.props.showPolling()
    };
    render() {
        return (
            <div className="myPoolDialog">
                <h4 onClick={() => this.showPolling()}><i><img src="/img/编组备份 3@2x.png" /></i>我的资金池</h4>
                <div className="amountShow">
                  <p>资金池资产</p>
                  <p><span>1000</span>Violas</p>
                </div>
                <div className="btns">
                    <button>转入</button>
                    <button>转出</button>
                </div>
                <div className="list">
                    <h4>资产</h4>
                    <div className="listContent">
                        <p><label>V-AAA</label><span>1233</span></p>
                        <p><label>V-BBB</label><span>1233</span></p>
                        <p><label>V-AAA</label><span>1233</span></p>
                        <p><label>V-AAA</label><span>1233</span></p>
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