import React, { Component } from "react";
import "./market.scss";
import { connect } from 'react-redux';
import { timeStamp2String } from '../../utils/timer';

//资金池详情
class PoolingDetail extends Component {
    constructor(props) {
        super()
        this.state = {
            type:'',
            changeList:{}
        }
    }
    componentDidMount() {
        // this.optionTypes()
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            changeList: nextProps.changeList
        },()=>{
            this.optionTypes()
        })
    }
    //判断转入/转出成功或失败
    optionTypes() {
        let { changeList } = this.state;
        if (changeList.transaction_type == 'ADD_LIQUIDITY') {
            if (changeList.status == 4001) {
                this.setState({
                    type:'转入成功'
                })
            } else {
                this.setState({
                    type: '转入失败'
                })
            }
        } else {
            if (changeList.status == 4001) {
                this.setState({
                    type: '转入成功'
                })
            } else {
                this.setState({
                    type: '转入失败'
                })
            }
        }
    }
    render() {
        let { changeList, type } = this.state;
        return (
            <div className="exchangeDetail">
                <h4 onClick={() => this.props.showDrawer(false)}><i><img src="/img/编组备份 3@2x.png" /></i>详情</h4>
                
                <div className="formShow">
                    <dl>
                        {/* <dt>输入</dt> */}
                        <dd><span>{changeList.amounta}</span> {changeList.coina}</dd>
                    </dl>
                    <div className="changeImg"><img src="/img/ai28 2@2x.png" /></div>
                    <dl>
                        {/* <dt>输出</dt> */}
                        <dd><span>{changeList.amountb}</span> {changeList.coinb}</dd>
                    </dl>
                </div>
                <div className="line"></div>
                <div className="list">
                    <p><label>汇率：</label><span>1:100</span></p>
                    <p><label>手续费：</label><span>0.00 ether</span></p>
                    <p><label>矿工费用：</label><span>0.00052036988 ether</span></p>
                    {/* <p><label>下单时间：</label><span>2018-11-06 16:30:44</span></p> */}
                    <p><label>成交时间：</label><span>{timeStamp2String(changeList.date + '000')}</span></p>
                </div>
                <div className="status">
                    <p><img src="/img/shenhetongguo 2@2x.png" /><label>已提交</label></p><i></i>
                    <p><img src="/img/shenhezhong-2 2@2x.png" /><label>兑换中</label></p><i></i>
                    {/* {
                        changeList.status == 4001 ? <p><img src="/img/shenhetongguo 2@2x.png" /><label style={{ 'color': '#333333' }}>兑换成功</label></p> : <p><img src="/img/编组 6@2x.png" /><label style={{ 'color': 'red' }}>兑换失败</label></p>
                    } */}
                    <p><img src={type.slice(2, 4) == '成功' ? "/img/shenhetongguo 2@2x.png" : "/img/编组 6@2x.png"} /><label className={type.slice(2, 4) == '成功' ? 'gr' : 'red'}>{type}</label></p>
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
        // showDrawer: () => {
        //     dispatch({
        //         type: 'VISIBLE1',
        //         payload: false
        //     })
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolingDetail);