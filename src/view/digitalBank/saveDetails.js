import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

//存款详情
class SaveDetails extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
        }
    }
    componentDidMount() {

    }

    render() {
        let { routes } = this.props;
        return (
            <div className="saveDetails">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank"> <img src="/img/fanhui 2@2x.png" />
              数字银行</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank/saveDetails">存款</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="saveDetailsWrap">
                    <div className="saveDetailsList">
                       <h4>
                           <label>我要存</label>
                            <div className="dropdown1">
                                <span>
                                    <img src="/img/kyye.png" />VLS
                                    <i>
                                        <img src="/img/rightArrow1.png" />
                                    </i>
                                </span>
                                <div className="dropdown-content1">
                                    <span><img src="/img/kyye.png" /><label>VLS</label></span>
                                    <span><img src="/img/kyye.png" /><label>BLR</label></span>
                                </div>
                            </div>
                        </h4>
                        <input placeholder="500 V-AAA起，每1V-AAA递增"/>
                        <div className="saveDetailsShow">
                            <p><img src="/img/kyye.png" /><label>可用余额 :</label><label>0V-AAA</label><span>全部</span></p>
                            <p><img src="/img/编组 15@2x.png" /><label>可用余额 :</label><label>0V-AAA</label></p>
                        </div>
                    </div>
                    <div className="saveDetailsList1">

                    </div>
                </div>
            </div>
        )
    }


}

export default SaveDetails;