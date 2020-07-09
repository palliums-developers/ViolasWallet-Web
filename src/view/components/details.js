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
                    this.props.showEveryDetail(false)
                }}>
                    <i>
                        <img src="/img/编组备份 3@2x.png" />
                    </i>
               Details
                </h4>
                <div className="detailsTable">
                    <div className="tableContent">
                        {
                            detailData.type == 0 ? <i><img src="/img/shenhetongguo 4@2x.png" /></i> : detailData.receiver == window.sessionStorage.getItem('detailAddr') ? <i><img src="/img/shenhetongguo 4@2x.png" /></i> : <i><img src="/img/shenhetongguo 4@2x.png" /></i>
                        }
                        {
                            detailData.type == 0 ? <h3>Stability coin activated successfully</h3> : detailData.receiver == window.sessionStorage.getItem('detailAddr') ? <h3>Payment success</h3> : <h3>Transfer success</h3>
                        }
                        
                        <p>{timeStamp2String1(detailData.expiration_time + '000')}</p>
                        <div className="line"><img src="/img/路径 42@2x.png" /></div>

                        <div className="tableList">
                            <p><label>Amount：</label><span>{detailData.amount / 1e6} {detailData.currency}</span></p>
                            <p><label>Cost of miners：</label><span>{detailData.gas / 1e6} {detailData.gas_currency}</span></p>
                            <p><label>Collection address：</label><span><i id="reve">{detailData.receiver == null ? '--' : detailData.receiver}</i><img onClick={() => this.handleCopy('reve')} src="/img/icon- 2@2x.png" />{
                                reve ? <p className="warn">Address copy successful</p> : null
                            }</span></p>
                            <p><label>Payment address：</label><span><i id="tran">{detailData.sender}</i><img onClick={() => this.handleCopy('tran')} src="/img/icon- 2@2x.png" />{
                                tran ? <p className="warn">Address copy successful</p> : null
                            }</span></p>
                            <p><label>Transaction no：</label><span><i id="deal">{detailData.version}</i><img onClick={() => this.handleCopy('deal')} src="/img/icon- 2@2x.png" />{
                                deal ? <p className="warn">Address copy successful</p> : null
                            }</span></p>
                        </div>
                    </div>
                </div>
                <p className="goBrower">The browser queries for more details <img src="/img/go.png"/></p>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
    return {
 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
