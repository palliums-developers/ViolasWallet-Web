import React, { Component } from "react";
import "./market.scss";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


class ExchangeDetail extends Component {
    constructor(props) {
        super()
        this.state = {
        }
    }
    componentDidMount() {

    }
    onClose = () => {
        this.props.showDrawer()
    };
    render() {
        return (
            <div className="exchangeDetail">
                <h4 onClick={()=>this.onClose()}><i><img src="/img/编组备份 3@2x.png"/></i>兑换详情</h4>
                <div className="status">
                    <p><img src="/img/shenhetongguo 2@2x.png"/><label>已提交</label><i></i></p>
                    <p><img src="/img/shenhezhong-2 2@2x.png" /><label>兑换中</label><i></i></p>
                </div>
                <div className="formShow">
                    <dl>
                        <dt>输入</dt>
                        <dd><span>30</span>Violas</dd>
                    </dl>
                    <div className="changeImg"><img src="/img/编组 2备份 3@2x.png" /></div>
                    <dl>
                        <dt>输出</dt>
                        <dd><span>2333</span>ETH</dd>
                    </dl>
                </div>
                <div className="list">
                    <p><label>汇率：</label><span>1:100</span></p>
                    <p><label>手续费：</label><span>0.00 ether</span></p>
                    <p><label>矿工费用：</label><span>0.00052036988 ether</span></p>
                    <p><label>下单时间：</label><span>2018-11-06 16:30:44</span></p>
                    <p><label>成交时间：</label><span>- -</span></p>
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
        showDrawer: () => {
            dispatch({
                type: 'VISIBLE',
                payload: false
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeDetail);