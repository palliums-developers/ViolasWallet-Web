import React, { Component } from "react";
import intl from "react-intl-universal";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Pagination } from "antd";
import "./index.scss";
let url1 = "https://api4.violas.io";
let helpCenterUrl = "http://192.168.1.119:5000";

//用户协议
class PlatformAgreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      groups: [],
    };
  }
  componentDidMount() {
    this.newsFunction();
  }
  newsFunction = () => {
    let id = this.props.location.search.split("=")[1];
    fetch(
      helpCenterUrl +
        "/api/help_center?type=category&key=" +
        id +
        "&language=" +
        localStorage.getItem("local").toLowerCase()
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          this.setState({
            title: res.category.name,
            groups: res.group,
          });
        }
        console.log(res, "........");
      });
  };
  render() {
    let { title, groups } = this.state;
    return (
      <div className="platformAgreement">
        <div>
          <div className="searchHead">
            <Breadcrumb separator="">
              <Breadcrumb.Item>
                <a
                  onClick={() => {
                    this.props.history.go(-1);
                  }}
                >
                  帮助中心 <strong>></strong>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <NavLink to="/helpCenter/newsCenter">{title}</NavLink>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="form">
              <img src="/img/sousuo 2@2x.png" />
              <input maxLength="50" placeholder="搜索" />
            </div>
          </div>
          <div className="platformAgreementContent">
            <h3>{title}</h3>
            <div className="contentList">
              <p>隐私协议</p>
              <div className="line"></div>
              <p>借贷协议</p>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlatformAgreement;
