import React, { Component } from "react";
import intl from "react-intl-universal";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Pagination } from "antd";
import "./index.scss";
let url1 = "https://api4.violas.io";
let helpCenterUrl = "http://192.168.1.119:5000";

//公告中心
class NewsGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      title1: "",
      articles: [],
    };
  }
  componentDidMount() {
      
      this.newsFunction();
  }
  newsFunction = () => {
    let id = this.props.location.search.split("=")[1];
    fetch(
      helpCenterUrl +
        "/api/help_center?type=group&key=" +
        id +
        "&language=" +
        localStorage.getItem("local").toLowerCase()
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          this.setState({
            title: res.group.name,
            title1: res.group.category.name,
            articles: res.article,
          });
        }
        console.log(res, "........");
      });
  };
  render() {
      let { title,title1, articles } = this.state;
    return (
      <div className="newsGroup">
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
                <a
                  onClick={() => {
                    this.props.history.push("/helpCenter/newsCenter");
                  }}
                  id="active"
                >
                  {title1} <strong>></strong>
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
          <div className="newCenterContent">
            <h3>{title1}</h3>
            <div className="contentList">
              <div>
                <h4>{title}</h4>
                <div className="list">
                  {articles.map((v, i) => {
                    return (
                      <>
                        <div
                          key={i}
                          dangerouslySetInnerHTML={{
                            __html: v.content,
                          }}
                        ></div>
                        <div className="line"></div>
                      </>
                    );
                  })}
                  <p>
                    交易ONE，享受25,000,000ONE和3000BNB空投交易投交交易ONE，享受25,000,000ONE和3000BNB空投交易投交……
                  </p>
                  {/* <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div>
                  <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                  <div className="line"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsGroup;
