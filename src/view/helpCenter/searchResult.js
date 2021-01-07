import React, { Component } from "react";
import intl from "react-intl-universal";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Pagination } from "antd";
import "./index.scss";
let url1 = "https://api4.violas.io";
let helpCenterUrl = "http://192.168.1.119:5000";

//搜索结果
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="searchResult">
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
                <NavLink to="/helpCenter/searchResult">搜索结果</NavLink>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="form">
              <img src="/img/sousuo 2@2x.png" />
              <input maxLength="50" placeholder="搜索" />
            </div>
          </div>
          <div className="searchContent">
            <h3>搜索结果</h3>
            <div className="contentList">
              <div>
                <h4>关于BCPT、GTO、ARN网络切换至币安链的公告</h4>
                <div className="survey">
                  <p>
                    <span>公告中心</span>
                    <strong>></strong>
                    <span>其他公告</span>
                  </p>
                  <p>&nbsp;&nbsp;&nbsp;Lydia&nbsp;&nbsp;&nbsp;1年前 </p>
                </div>
                <p>
                  APP端：登录火币APP，点击页面下方的“行情”或“交易”，在“ALTS”交易专区搜索BTT/TRX交易对（如您未更新APP版本，届时请在“TRX”交易专区搜索BTT/TRX交易对）。
                </p>
              </div>
              <div>
                <h4>关于BCPT、GTO、ARN网络切换至币安链的公告</h4>
                <div className="survey">
                  <p>
                    <span>公告中心</span>
                    <strong>></strong>
                    <span>其他公告</span>
                  </p>
                  <p>&nbsp;&nbsp;&nbsp;Lydia&nbsp;&nbsp;&nbsp;1年前 </p>
                </div>
                <p>
                  APP端：登录火币APP，点击页面下方的“行情”或“交易”，在“ALTS”交易专区搜索BTT/TRX交易对（如您未更新APP版本，届时请在“TRX”交易专区搜索BTT/TRX交易对）。
                </p>
              </div>
              <div>
                <h4>关于BCPT、GTO、ARN网络切换至币安链的公告</h4>
                <div className="survey">
                  <p>
                    <span>公告中心</span>
                    <strong>></strong>
                    <span>其他公告</span>
                  </p>
                  <p>&nbsp;&nbsp;&nbsp;Lydia&nbsp;&nbsp;&nbsp;1年前 </p>
                </div>
                <p>
                  APP端：登录火币APP，点击页面下方的“行情”或“交易”，在“ALTS”交易专区搜索BTT/TRX交易对（如您未更新APP版本，届时请在“TRX”交易专区搜索BTT/TRX交易对）。
                </p>
              </div>
            </div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
