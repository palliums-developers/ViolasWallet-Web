import React, { Component } from "react";
import { connect } from "react-redux";
import { timeStamp2String1 } from '../../utils/timer1';
// import { withRouter } from "react-router-dom";
import '../app.scss'
class Details extends Component {
    constructor(props) {
        super();
        this.state = {
            reve:false,
            tran:false,
            deal:false
        };
    }
    componentDidMount() { }
    handleCopy = (v) => {
        const spanText = document.getElementById(v).innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        console.log([v])
        this.setState({
            [v]: true
        },()=>{
                console.log(this.state.reve, this.state.tran, this.state.deal)
        })
        let Timer = setInterval(() => {
            this.setState({
                [v]: false
            })
        }, 1000);
    };
    render() {
        let { detailData } = this.props;
        let { reve, tran,deal } = this.state;
        return (
            <div className="details">
                <h4 onClick={() => {
                    this.props.showEveryDetail()
                }}>
                    <i>
                        <img src="/img/编组备份 3@2x.png" />
                    </i>
               详情
                </h4>
                <div className="detailsTable">
                    <div className="tableContent">
                        <i><img src="/img/shenhetongguo 4@2x.png" /></i>
                        <h3>收款成功</h3>
                        <p>{timeStamp2String1(detailData.expiration_time + '000')}</p>
                        <div className="line"><img src="/img/路径 42@2x.png" /></div>

                        <div className="tableList">
                            <p><label>金额：</label><span>{detailData.amount / 1e6} VETH</span></p>
                            <p><label>矿工费用：</label><span>{detailData.gas} ether</span></p>
                            <p><label>收款地址：</label><span><i id="reve">{detailData.receiver}</i><img onClick={() => this.handleCopy('reve')} src="/img/icon- 2@2x.png" />{
                                reve ? <p className="warn">地址复制成功</p> : null
                            }</span></p>
                            <p><label>付款地址：</label><span><i id="tran">{detailData.sender}</i><img onClick={() => this.handleCopy('tran')} src="/img/icon- 2@2x.png" />{
                                tran ? <p className="warn">地址复制成功</p> : null
                            }</span></p>
                            <p><label>交易号：</label><span><i id="deal">{detailData.version}</i><img onClick={() => this.handleCopy('deal')} src="/img/icon- 2@2x.png" />{
                                deal ? <p className="warn">地址复制成功</p> : null
                            }</span></p>
                        </div>
                    </div>
                </div>
                <p className="goBrower">浏览器查询更详细信息<img src="/img/go.png"/></p>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
    return {
        showEveryDetail:()=>{
            dispatch({
                type: "DISPLAY1",
                payload: true,
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
