import React, { Component } from "react";
import { Breadcrumb, Tabs, Pagination } from "antd";
import { NavLink } from "react-router-dom";
import { verifyMobile } from "../../utils/verifyMobile";
import intl from "react-intl-universal";
import './mining.scss'
let url1 = "https://api4.violas.io";

//排行榜
class RankingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ifMobile: false,
      firstList: [],
      secondList: [],
      thirdList: [],
      rankList2: [],
    };
  }
  componentWillMount() {
    let temp = verifyMobile(window.location);
    intl.options.currentLocale = temp.lang;
    this.setState({
      ifMobile: temp.ifMobile,
      lang: temp.lang,
    });
  }
  componentDidMount() {
    if (this.state.ifMobile) {
      document.title = "收益榜单";
    }
    this.getInviterTop();
  }
  //显示VLS地址（前6...后6）
  showVLSAddress(str) {
    // 中间显示省略号，截取显示括号内容
    // var str = "53e59e4b4fa3c35770846f6c87ca2d35";
    var last = 0;
    var all = str.length;
    var first = str.substr(0, 6);
    str = first + " ... " + str.substr(all - 6, 6);
    return str;
  }
  //获取激励排名top20
  getInviterTop() {
    fetch(url1 + "/1.0/violas/incentive/top20")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          let firstData = [],
            secondData = [],
            thirdData = [];
          let endData = [];
          res.data.map((v) => {
            if (v.rank == 1) {
              firstData.push(v);
            } else if (v.rank == 2) {
              secondData.push(v);
            } else if (v.rank == 3) {
              thirdData.push(v);
            } else {
              endData.push(v);
            }
          });
          this.setState({
            firstList: firstData,
            secondList: secondData,
            thirdList: thirdData,
            rankList: endData,
          });
        }
      });
  }
  render() {
    let { ifMobile, firstList, secondList, thirdList, rankList } = this.state;
    console.log(rankList);
    return (
      <div className={ifMobile == false ? "rankingLists" : "rankingLists1"}>
        <div>
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <NavLink to="/homepage/home/miningAwards">
                {" "}
                <img src="/img/fanhui 2@2x.png" />
              </NavLink>
            </Breadcrumb.Item>
            <span>收益榜单</span>
            <span>
              <img src="/img/m_编组 300@2x.png" />
              收益榜单将会在每周日晚 00:00 更新
            </span>
          </Breadcrumb>
          <div className="rankingWrap">
            <div className="topThreeList">
              {secondList.map((v, i) => {
                return (
                  <div key={i} className="topTwo">
                    <p className="topLogo">
                      <img src="/img/m_编组 12@2x.png" />
                    </p>
                    <p>{this.showVLSAddress(v.address)}</p>
                    <p>{v.incentive}VLS</p>
                  </div>
                );
              })}
              {firstList.map((v, i) => {
                return (
                  <div key={i} className="topOne">
                    <p className="topLogo">
                      <img src="/img/m_编组 58@2x.png" />
                    </p>
                    <p>{this.showVLSAddress(v.address)}</p>
                    <p>{v.incentive}VLS</p>
                  </div>
                );
              })}
              {thirdList.map((v, i) => {
                return (
                  <div key={i} className="topThree">
                    <p className="topLogo">
                      <img src="/img/m_编组 10@2x.png" />
                    </p>
                    <p>{this.showVLSAddress(v.address)}</p>
                    <p>{v.incentive}VLS</p>
                  </div>
                );
              })}
            </div>
            <div className="residualRanking">
              <div className="head">
                <span>排名</span>
                <span>地址</span>
                <span>总收益</span>
              </div>
              <div className="list">
                <div>
                  {rankList&&rankList.map((v, i) => {
                    return (
                      <p key={i}>
                        <span>NO.{v.rank}</span>
                        <span>{this.showVLSAddress(v.address)}</span>
                        <span>{v.incentive}VLS</span>
                      </p>
                    );
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default RankingList;