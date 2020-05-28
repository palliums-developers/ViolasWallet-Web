import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import '../app.scss'
class Details extends Component {
    constructor(props) {
        super();
        this.state = {};
    }
    componentDidMount() { }
   
    render() {
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
                        <i><img src="/img/shenhetongguo 4@2x.png"/></i>
                        <h3>收款成功</h3>
                        <p>2018-11-06  16:30:44</p>
                        <div className="line"><img src="/img/路径 42@2x.png"/></div>
                        <div className="tableList">
                            <p><label>金额：</label><span>00 VETH</span></p>
                            <p><label>矿工费用：</label><span>0.00052036988 ether</span></p>
                            <p><label>收款地址：</label><span>dioewdji3ie9wOid30wdue<img src="/img/icon- 2@2x.png"/></span></p>
                            <p><label>付款地址：</label><span>dioewdji3ie9wOid30wdue<img src="/img/icon- 2@2x.png" /></span></p>
                            <p><label>交易号：</label><span>122322<img src="/img/icon- 2@2x.png" /></span></p>
                        </div>
                    </div>
                </div>
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
                type: "DISPLAY2",
                payload: false,
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
