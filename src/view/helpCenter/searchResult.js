import React, { Component } from "react";
import intl from "react-intl-universal";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Pagination } from "antd";
import SearchList from "../components/searchList";
import "./index.scss";
let url1 = "https://api4.violas.io";
let helpCenterUrl = "http://192.168.1.119:5000";

//搜索结果
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iptVal: "",
      articleLength: 0,
      articles: [],
    };
  }
  componentDidMount() {
    this.setState({
      iptVal: this.props.location.search.split("=")[1],
    });
    this.searchPage();
  }

  searchPage = () => {
    let iptVal = this.props.location.search.split("=")[1];
    fetch(
      helpCenterUrl +
        "/api/help_center?type=search&key=" +
        iptVal +
        "&language=" +
        localStorage.getItem("local").toLowerCase()
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "........");
        if (res) {
          this.setState({
            articleLength: res.article.length,
            articles: res.article,
          });
        }
      });
  };
  render() {
    let { iptVal, articleLength, articles } = this.state;
    return (
      <div className="searchResult">
        <div>
          <div className="searchHead">
            <Breadcrumb separator="">
              <Breadcrumb.Item>
                <a
                  onClick={() => {
                    this.props.history.push("/helpCenter/helpCenterIndex");
                  }}
                  id="active"
                >
                  帮助中心 <strong>></strong>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <NavLink to="/helpCenter/searchResult">搜索结果</NavLink>
              </Breadcrumb.Item>
            </Breadcrumb>
            <SearchList></SearchList>
          </div>
          <div className="searchContent">
            <h3>搜索结果</h3>
            <p>
              “<span>{iptVal}</span>”搜索结果 ：{articleLength}条
            </p>
            {articleLength > 0 ? (
              <div className="contentList">
                {
                  articles.map((v,i)=>{
                    return (
                      <div key={i}>
                        <h4>{v.title}</h4>
                        <div className="survey">
                          <p>
                            <span>{v.categoryName}</span>
                            <strong>></strong>
                            <span>{v.groupName}</span>
                          </p>
                          <p>
                            &nbsp;&nbsp;&nbsp;{v.author}&nbsp;&nbsp;&nbsp;1年前{" "}
                          </p>
                        </div>
                        <div
                          id="p"
                          key={i}
                          dangerouslySetInnerHTML={{
                            __html: v.content,
                          }}
                        ></div>
                        {/* <p>
                          APP端：登录火币APP，点击页面下方的“行情”或“交易”，在“ALTS”交易专区搜索BTT/TRX交易对（如您未更新APP版本，届时请在“TRX”交易专区搜索BTT/TRX交易对）。
                        </p> */}
                      </div>
                    );
                  })
                }
                
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
            ) : (
              <div className="clearImg">
                <img src="/img/bzzxNone.png" />
              </div>
            )}
            {articleLength > 0 ? (
              <Pagination defaultCurrent={1} total={50} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
