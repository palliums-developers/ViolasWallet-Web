import React, { Component } from "react";
import intl from "react-intl-universal";
import { NavLink } from "react-router-dom";
import { Breadcrumb } from "antd";
import SearchList from "../components/searchList";
import Foot from "../components/foot";
import "./index.scss";
let url1 = "https://api4.violas.io";
let helpCenterUrl = "http://192.168.1.119:5000";

//详情
class AllDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: {},
      others: [],
      showList: false
    };
  }
  componentDidMount() {
      this.newsFunction()
  }
  newsFunction = () => {
    let id = this.props.location.search.split("=")[1];
    fetch(
      helpCenterUrl +
        "/api/help_center?type=article&key=" +
        id +
        "&language=" +
        localStorage.getItem("local").toLowerCase()
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          this.setState({
            others: res.other,
            articles: res.article,
          });
        }
        console.log(res, "........");
      });
  };
  render() {
    let { others, articles, showList } = this.state;
    return (
      <div className="allDetails">
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
                  {articles.categoryName} <strong>></strong>
                </a>
              </Breadcrumb.Item>
              {articles.group ? (
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      this.props.history.push(
                        "/helpCenter/newsGroup?id=" +
                          this.props.location.search.split("=")[1]
                      );
                    }}
                    id="active"
                  >
                    {articles.groupName} <strong>></strong>
                  </a>
                </Breadcrumb.Item>
              ) : null}

              <Breadcrumb.Item>
                <NavLink to="/helpCenter/newsCenter">详情</NavLink>
              </Breadcrumb.Item>
            </Breadcrumb>
            <SearchList></SearchList>
          </div>
          <div className="allDetailsContent">
            <div className="allDetailsContentLeft">
              <h4>此组内其他文章</h4>
              <div className="otherList">
                {others.length > 10
                  ? others.slice(0, 10).map((v, i) => {
                      return <p key={i}>{v.title}</p>;
                    })
                  : others.map((v, i) => {
                      return <p key={i}>{v.title}</p>;
                    })}

                {/* <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p> */}
              </div>
              <p
                onClick={() => {
                  this.props.history.push(
                    "/helpCenter/newsGroup?id=" +
                      this.props.location.search.split("=")[1]
                  );
                }}
              >
                {others.length > 10 ? "查看更多" : null}
              </p>
            </div>
            <div className="allDetailsContentRight">
              <h3>{articles.title}</h3>
              <div className="relativeDescr">
                <div className="user">
                  <p>
                    <img src="" />
                  </p>
                  <p>
                    <span>{articles.author}</span>
                    <label>13分钟前 · 更新于</label>
                  </p>
                </div>
                <div className="allDetailsContentLeft1">
                  <h4
                    onClick={() => {
                      this.setState({
                        showList: !showList,
                      });
                    }}
                  >
                    此组内其他文章
                    {showList ? (
                      <img id="img1" src="/img/bzzx矩形 1@2x.png" />
                    ) : (
                      <img src="/img/bzzx矩形 2@2x.png" />
                    )}
                  </h4>
                  {showList ? (
                    <div>
                      <div className="otherList">
                        {others.length > 10
                          ? others.slice(0, 10).map((v, i) => {
                              return <p key={i}>{v.title}</p>;
                            })
                          : others.map((v, i) => {
                              return <p key={i}>{v.title}</p>;
                            })}

                        {/* <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                    <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                    <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                    <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                    <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p>
                    <p>jiaoyisuo将于2019年06月01日中午12:0001日中</p> */}
                      </div>
                      <p
                        onClick={() => {
                          this.props.history.push(
                            "/helpCenter/newsGroup?id=" +
                              this.props.location.search.split("=")[1]
                          );
                        }}
                      >
                        {others.length < 10 ? "查看更多" : null}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="userContent">
                  <p>
                    jiaoyisuo将于2019年06月01日中午12:00（香港时间）上线Harmony(ONE)，并开通ONE/BNB、
                    ONE/BTC、ONE/USDT、ONE/TUSD、ONE/PAX、ONE/USDC交易市场，邀您体验！
                  </p>
                  <div>
                    <p>规则说明:</p>
                    <p>关于Harmony(ONE)</p>
                    <p>费率说明</p>
                    <p>交易规则</p>
                    <p>
                      风险提示：数字货币是一种高风险的投资方式，请投资者谨慎购买，并注意投资风险。jiaoyisuo会遴选优质币种，但不对投资行为承担担保、赔偿等责任。
                    </p>
                    <p className="thank">感谢您对jiaoyisuo的支持！</p>
                    <p className="lasttime">jiaoyisuo 团队</p>
                    <p className="lasttime">2019年05月28日</p>
                  </div>
                  <div>
                    <h4>jiaoyisuo 社群</h4>
                    <div>
                      <p>
                        Telegram :{" "}
                        <label>
                          鼠标悬停选中点击鼠标悬停选中点击鼠标悬停选
                        </label>
                      </p>
                      <p>
                        Facebook :{" "}
                        <label>https://www.facebook.com/BinanceChinese</label>
                      </p>
                      <p>
                        Twitter : <label>https://twitter.com/binance</label>
                      </p>
                      <p>
                        Weibo : <label>https://www.weibo.com/binance</label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="line"></div>
              <div className="lastList">
                <div className="listContent listContent1">
                  <h4>最近查看的文章</h4>
                  <div>
                    <p>交易ONE，享受25,000,000O交易投交交投…</p>
                    <div className="line"></div>
                    <p>交易ONE，享受25,000,000O交易投交交投…</p>
                    <div className="line"></div>
                    <p>交易ONE，享受25,000,000O交易投交交投…</p>
                    <div className="line"></div>
                    <p>交易ONE，享受25,000,000O交易投交交投…</p>
                    <div className="line"></div>
                  </div>
                </div>
                <div className="listContent listContent2">
                  <h4>相关文章</h4>
                  <div>
                    <p>交易ONE，享受25,000,000O交易投交交投…</p>
                    <div className="line"></div>
                    <p>交易ONE，享受25,000,000O交易投交交投…</p>
                    <div className="line"></div>
                    <p>交易ONE，享受25,000,000O交易投交交投…</p>
                    <div className="line"></div>
                    <p>交易ONE，享受25,000,000O交易投交交投…</p>
                    <div className="line"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Foot></Foot>
        </div>
      </div>
    );
  }
}

export default AllDetails;
