import React, { Component } from "react";
import intl from "react-intl-universal";
import { NavLink } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./index.scss";
let url1 = "https://api4.violas.io";
let helpCenterUrl = "http://192.168.1.119:5000";

//数字货币
class DigitalCashPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="digitalCashPage">
        <div>
          <div className="searchHead">
            <Breadcrumb separator="">
              <Breadcrumb.Item>
                <a
                  onClick={() => {
                    this.props.history.go(-1);
                  }}
                  id="active"
                >
                  帮助中心 <strong>></strong>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <NavLink to="/helpCenter/newsCenter">数字货币</NavLink>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="form">
              <img src="/img/sousuo 2@2x.png" />
              <input maxLength="50" placeholder="搜索" />
            </div>
          </div>
          <div className="platformAgreementContent">
            <h3>数字货币</h3>
            <div className="contentList">
              <p>VLAS</p>
              <div className="line"></div>
              <p>BTC</p>
              <div className="line"></div>
              <p>LIBRA</p>
              <div className="line"></div>
              <p>AAA</p>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalCashPage;
