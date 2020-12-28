import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { verifyMobile } from "../../utils/verifyMobile";
import intl from "react-intl-universal";
import "../mining/mining.scss";
let url1 = "https://api4.violas.io";

//邀请榜单
class InvitationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ifMobile: false,
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
      document.title = "邀请榜单";
    }
    this.getInviterTop();
  }
  //获取邀请奖励Top20
  getInviterTop() {
    fetch(url1 + "/violas/1.0/incentive/inviter/top20")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
        }
      });
  }
  render() {
    let { ifMobile } = this.state;
    return (
      <div className={ifMobile == false ? "invitationList" : "invitationList1"}>
        <div>
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <NavLink to="/homepage/home/inviteRewards">
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
              <div className="topTwo">
                <p className="topLogo">
                  <img src="/img/m_编组 12@2x.png" />
                </p>
                <p>2eiw8s…20wis9</p>
                <p>10VLS</p>
              </div>
              <div className="topOne">
                <p className="topLogo">
                  <img src="/img/m_编组 58@2x.png" />
                </p>
                <p>2eiw8s…20wis9</p>
                <p>1000VLS</p>
              </div>
              <div className="topThree">
                <p className="topLogo">
                  <img src="/img/m_编组 10@2x.png" />
                </p>
                <p>2eiw8s…20wis9</p>
                <p>10VLS</p>
              </div>
            </div>
            <div className="residualRanking">
              <div className="head">
                <span>排名</span>
                <span>地址</span>
                <span>总收益</span>
              </div>
              <div className="list">
                <div>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
                  </p>
                  <p>
                    <span>NO.4</span>
                    <span>2eiw8…20wis9</span>
                    <span>10VLS</span>
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
 
export default InvitationList;