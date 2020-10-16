import React, { Component } from "react";
import "./market.scss";
import { connect } from 'react-redux';
import { timeStamp2String2 } from '../../utils/timer2';

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
    getFloat(number, n) {
        n = n ? parseInt(n) : 0;
        if (n <= 0) {
        return Math.round(number);
        }
        number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
        number = parseFloat(Number(number).toFixed(n)); //补足位数
        return number;
    }
    //判断转入/转出成功或失败
    optionTypes() {
        let { changeList } = this.state;
        if (changeList.transaction_type == 'ADD_LIQUIDITY') {
            if (changeList.status == "Executed") {
                this.setState({
                    type:'转入成功'
                })
            } else {
                this.setState({
                    type: '转入失败'
                })
            }
        } else {
            if (changeList.status == "Executed") {
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
        // console.log(type,'.....')
        return (
            <div className="exchangeDetail">
                <h4 onClick={() => this.props.showDrawer(false)}><i><img src="/img/编组备份 3@2x.png" /></i>详情</h4>
                
                <div className="formShow">
                    <dl>
                        {/* <dt>输入</dt> */}
                        <dd><span>{changeList.coina == null ? '--' : this.getFloat(changeList.amounta / 1e6,6)}</span> {changeList.coina == null ? null : changeList.coina}</dd>
                    </dl>
                    <div className="changeImg"><img src="/img/ai28 2@2x.png" /></div>
                    <dl>
                        {/* <dt>输出</dt> */}
                        <dd><span>{changeList.coinb == null ? '--' : this.getFloat(changeList.amountb / 1e6,6)}</span> {changeList.coinb == null ? null : changeList.coinb}</dd>
                    </dl>
                </div>
                <div className="line"></div>
                <div className="list">
                    <p><label>汇率：</label><span>--</span></p>
                    <p><label>手续费：</label><span>--</span></p>
                    <p><label>矿工费用：</label><span>--</span></p>
                    {/* <p><label>下单时间：</label><span>2018-11-06 16:30:44</span></p> */}
                    <p><label>成交时间：</label><span>{timeStamp2String2(changeList.date + '000')}</span></p>
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