import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import '../app.scss'
class CurrencyDetail extends Component {
    constructor(props) {
        super();
        this.state = {};
    }
    componentDidMount() { }
    showDetails = () => {
        this.props.showDetails();
    };
    render() {
        return (
            <div className="currencyDetail">
                <h4 onClick={() => this.showDetails()}>
                    <i>
                        <img src="/img/编组备份 3@2x.png" />
                    </i>
                    币种详情
                </h4>
                <div className="detailContent">
                    <div className="detailNav">
                        <span>全部</span>
                        <span>转入</span>
                        <span>转出</span>
                    </div>
                    <div className="detailLists">
                        <div className="detailList" onClick={() => {
                            this.props.showDetails();
                            this.props.showEveryDetail();
                        }}>
                            <i><img src="/img/编组 13备份 2@2x.png"/></i>
                            <div className="listCenter">
                                <p>dhhoiwei…djoiejodjo</p>
                                <p>01/18  12:06:23</p>
                            </div>
                            <div className="listResult">
                                <p className="org">99900</p>
                                <p className="org">交易中</p>
                            </div>
                        </div>
                        <div className="detailList">
                            <i><img src="/img/编组 13备份 3@2x.png" /></i>
                            <div className="listCenter">
                                <p>dhhoiwei…djoiejodjo</p>
                                <p>01/18  12:06:23</p>
                            </div>
                            <div className="listResult">
                                <p className="gre">99900</p>
                                {/* <p className="org">交易中</p> */}
                            </div>
                        </div>
                        <div className="detailList">
                            <i><img src="/img/编组 52@2x.png" /></i>
                            <div className="listCenter">
                                <p>dhhoiwei…djoiejodjo</p>
                                <p>01/18  12:06:23</p>
                            </div>
                            <div className="listResult">
                                <p className="org">99900</p>
                                {/* <p className="org">交易中</p> */}
                            </div>
                        </div>
                        <div className="detailList">
                            <i><img src="/img/编组 82@2x.png" /></i>
                            <div className="listCenter">
                                <p>dhhoiwei…djoiejodjo</p>
                                <p>01/18  12:06:23</p>
                            </div>
                            <div className="listResult">
                                <p className="org">99900</p>
                                {/* <p className="org">交易中</p> */}
                            </div>
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
        showDetails: () => {
            dispatch({
                type: "DISPLAY1",
                payload: false,
            });
        },
        showEveryDetail: () => {
            dispatch({
                type: "DISPLAY2",
                payload: true,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDetail);
