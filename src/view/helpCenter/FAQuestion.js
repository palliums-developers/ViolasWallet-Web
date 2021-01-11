import React, { Component } from "react";
import intl from "react-intl-universal";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Pagination } from "antd";
import SearchList from "../components/searchList";
import Foot from "../components/foot";
import "./index.scss";
let url1 = "https://api4.violas.io";
let helpCenterUrl = "http://192.168.1.119:5000";

//常见问题
class FAQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      groups: [],
    };
  }
  componentDidMount() {
    this.newsFunction()
  }
  newsFunction = () => {
    let id = this.props.location.search.split("=")[1];
    fetch(
      helpCenterUrl +
        "/api/help_center?type=category&key="+id+"&language=" +
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
      <div className="FAQuestion">
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
                <NavLink to="/helpCenter/newsCenter">{title}</NavLink>
              </Breadcrumb.Item>
            </Breadcrumb>
            <SearchList></SearchList>
          </div>
          <div className="newCenterContent">
            <h3>{title}</h3>
            <div className="contentList">
              {groups.map((v, i) => {
                return (
                  <div key={i}>
                    <h4>{v.name}</h4>
                    <div className="list">
                      {v.article.length > 5
                        ? v.article.slice(0, 5).map((v1, i1) => {
                            return (
                              <>
                                <div
                                  key={i1}
                                  dangerouslySetInnerHTML={{
                                    __html: v1.content,
                                  }}
                                  onClick={() =>
                                    this.props.history.push(
                                      "/helpCenter/allDetails?id=" + v1.id
                                    )
                                  }
                                ></div>
                                <div className="line"></div>
                              </>
                            );
                          })
                        : v.article.map((v1, i1) => {
                            return (
                              <>
                                <div
                                  key={i1}
                                  dangerouslySetInnerHTML={{
                                    __html: v1.content,
                                  }}
                                  onClick={() =>
                                    this.props.history.push(
                                      "/helpCenter/allDetails?id=" + v1.id
                                    )
                                  }
                                ></div>
                                <div className="line"></div>
                              </>
                            );
                          })}
                      {/*                         
                        <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                        <div className="line"></div>
                        <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                        <div className="line"></div>
                        <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                        <div className="line"></div>
                        <p>交易ONE，享受25,000,000ONE和3000BNB空投交易投交…</p>
                        <div className="line"></div> */}
                    </div>
                    <p
                      onClick={() => {
                        this.props.history.push(
                          "/helpCenter/newsGroup?id=" + v.id
                        );
                      }}
                    >
                      查看所有{v.article.length}篇文章
                    </p>
                  </div>
                );
              })}
              <div>
                <h4>闪兑交易</h4>
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
                <h4>数字银行</h4>
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
          <Foot></Foot>
        </div>
      </div>
    );
  }
}

export default FAQuestion;
