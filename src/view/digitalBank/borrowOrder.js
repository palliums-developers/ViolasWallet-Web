import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

//借款订单
class BorrowOrder extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {

    }

    render() {
        
        return (
            <div className="borrowOrder">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank"> <img src="/img/fanhui 2@2x.png" />
              数字银行</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank/borrowOrder">借款订单</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className=""></div>
            </div>
        )
    }


}

export default BorrowOrder;