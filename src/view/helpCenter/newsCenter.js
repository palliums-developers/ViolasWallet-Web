import React, { Component } from "react";
import intl from "react-intl-universal";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Pagination } from "antd";
import "./index.scss";
let url1 = "https://api4.violas.io";
let helpCenterUrl = "http://192.168.1.119:5000";

//公告中心
class NewsCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="newsCenter">
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
                <NavLink to="/helpCenter/newsCenter">公告中心</NavLink>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="form">
              <img src="/img/sousuo 2@2x.png" />
              <input maxLength="50" placeholder="搜索" />
            </div>
          </div>
          <div className="newCenterContent">
            <h3>公告中心</h3>
            <div className="contentList">
              <div>
                <h4>重要公告</h4>
                <div className="list">
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                </div>
                <p>查看所有23篇文章</p>
              </div>
              <div>
                <h4>活动公告</h4>
                <div className="list">
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                </div>
                <p>查看所有23篇文章</p>
              </div>
              <div>
                <h4>新币公告</h4>
                <div className="list">
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                </div>
                <p>查看所有23篇文章</p>
              </div>
              <div>
                <h4>其他公告</h4>
                <div className="list">
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                </div>
                <p>查看所有23篇文章</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsCenter;
