import React, { Component } from "react";
import intl from "react-intl-universal";
import { NavLink } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./index.scss";
let url1 = "https://api4.violas.io";
let helpCenterUrl = "http://192.168.1.119:5000";

//详情
class AllDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="allDetails">
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
                <a
                  onClick={() => {
                    this.props.history.push("/helpCenter/helpCenterIndex");
                  }}
                  id="active"
                >
                  公告中心 <strong>></strong>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a
                  onClick={() => {
                    this.props.history.go(-1);
                  }}
                  id="active"
                >
                  重要公告 <strong>></strong>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <NavLink to="/helpCenter/newsCenter">详情</NavLink>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="form">
              <img src="/img/sousuo 2@2x.png" />
              <input maxLength="50" placeholder="搜索" />
            </div>
          </div>
          <div className="allDetailsContent">
            <div className="allDetailsContentLeft">
              <h4>此组内其他文章</h4>
              <div className="otherList">
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
              </div>
            </div>
            <div className="allDetailsContentRight">
              <h3>Harmony(ONE)抽签完成并开放交易</h3>
              <div className="relativeDescr">
                <div className="user">
                  <p>
                    <img src="" />
                  </p>
                  <p>
                    <span>Harmony</span>
                    <label>13分钟前 · 更新于</label>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllDetails;
