import React, { Component } from "react";
import PhotoSynthesis from "./saveImage.js";
import { rndNum } from "../../utils/redomNum";
import { verifyMobile } from "../../utils/verifyMobile";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { callHandler, registerHandler } from "../../utils/jsbridge";
import intl from "react-intl-universal";
import { message } from "antd";
import "./award.scss";
let url1 = "https://api4.violas.io";
let url = "https://api.violas.io";

//邀请奖励
class InviteRewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharePosters: false,
      incentive: 0,
      invite_count: 0,
      ifMobile: false,
      lang: "EN",
      id: "",
      address: "",
      ranking: [],
    };
  }
  //小数点后的位数
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    return number;
  }
  componentWillMount() {
    let temp = verifyMobile(window.location);
    intl.options.currentLocale = temp.lang;
    this.setState({
      id: rndNum(100),
      address: temp.address,
      ifMobile: temp.ifMobile,
      lang: temp.lang,
    });
  }
  componentDidMount() {
    this.getInviterTop();
    if (this.state.ifMobile) {
      document.title = intl.get("Mining incentives");
      this.getInviterInfo(this.state.address);
    } else {
      this.getInviterInfo(
        window.sessionStorage.getItem("violas_address") &&
          window.sessionStorage.getItem("violas_address")
      );
    }
    if (this.state.ifMobile) {
      document.title = intl.get("Bonus For Inviting Friends");
      
    }
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

  //获取邀请奖励Top20
  getInviterTop() {
    fetch(url1 + "/1.0/violas/incentive/inviter/top20")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            ranking: res.data.length > 5 ? res.data.splice(0,5):res.data,
          });
          // console.log(res.data, "...............");
        }
      });
  }
  //获取邀请奖励信息
  getInviterInfo(addr) {
    if (addr) {
      fetch(url1 + "/1.0/violas/incentive/inviter/info?address=" + addr)
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            // console.log(res.data);
            this.setState({
              incentive: res.data.incentive,
              invite_count: res.data.invite_count,
            });
          }
        });
    }
  }
  closeDialog = (val) => {
    this.setState({
      sharePosters: val,
    });
  };
  handleScroll() {
    let clientHeight = document.getElementById("inviteRewards").clientHeight; //可视区域高度
    let scrollTop = document.getElementById("inviteRewards").scrollTop; //滚动条滚动高度
    let scrollHeight = document.getElementById("inviteRewards").scrollHeight; //滚动内容高度
    if (clientHeight + scrollTop == scrollHeight) {
      //如果滚动到底部
      document.getElementById("btns").style.background = "RGBA(64, 25, 135, 1)";
    } else {
      document.getElementById("btns").style.background =
        "url('/img/mobile_m_矩形 2@2x.png') no-repeat";
      document.getElementById("btns").style.backgroundSize = "100%";
      document.getElementById("btns").style.backgroundPosition =
        "center center";
    }
  }
  //我的邀请
  inviteInfo = () => {
    callHandler(
      "callNative",
      JSON.stringify({
        id: this.state.id,
        method: "mine_invite",
        params: [],
      }),
      (resp) => {}
    );
  };
  //分享链接
  shareLink = () => {
   this.props.history.push('/shareLink')
  };
  render() {
    let {
      incentive,
      invite_count,
      ifMobile,
      lang,
      address,
      ranking,
    } = this.state;
    // console.log(ifMobile);
    return (
      <div
        id="inviteRewards"
        className={ifMobile == false ? "inviteRewards" : "inviteRewards1"}
        onScroll={this.state.ifMobile == false ? null : this.handleScroll}
      >
        <div className="inviteContent">
          <div className="head">
            <div className="logo">
              <img src="/img/m_编组 24@2x.png" />
            </div>
            <div className="descr">
              {ifMobile == false ? (
                <img src="/img/m_编组 566@2x.png" />
              ) : (
                <img src="/img/mobile_m_编组 33@2x.png" />
              )}
            </div>
          </div>
          <div className="stepWrap">
            <div>
              <dl>
                <dt>
                  <img src="/img/m_编组 38@2x.png" />
                </dt>
                <dd>{intl.get("Send invitation link to friend")}</dd>
              </dl>
              <div className="jiantou">
                <img src="/img/m_jiantou-4 2@2x.png" />
              </div>
              <dl>
                <dt>
                  <img src="/img/m_编组 40@2x.png" />
                </dt>
                <dd>
                  {intl.get("Friend has passed phone number verification")}
                </dd>
              </dl>
              <div className="jiantou">
                <img src="/img/m_jiantou-4 2@2x.png" />
              </div>
              <dl>
                <dt>
                  <img src="/img/m_编组 266@2x.png" />
                </dt>
                <dd>{intl.get("Both sides will win awards")}</dd>
              </dl>
            </div>
          </div>
          <div className="myInvitation">
            <div className="head">
              <h3>{intl.get("My invitation")}</h3>
              <p
                onClick={
                  ifMobile == false
                    ? () => {
                        this.props.history.push("/homepage/home/miningDetails");
                      }
                    : () => this.inviteInfo()
                }
              >
                <label>{intl.get("More")}</label>
                <img src="/img/m_编组 17@2x.png" />
              </p>
            </div>
            <div className="line"></div>
            <div className="invitationDetails">
              <div>
                <span>{invite_count}</span>
                <label>{intl.get("Number of invitees")}</label>
              </div>
              <div className="line"></div>
              <div>
                <span>{parseInt(incentive)} VLS</span>
                <label>{intl.get("Bonus For Inviting Friends")}</label>
              </div>
            </div>
          </div>
          <div className="rankingList">
            <div className="head">
              <h3>{intl.get("Ranking")}</h3>
              <p
                onClick={
                  ifMobile == false
                    ? () => {
                        this.props.history.push(
                          "/homepage/home/invitationList"
                        );
                      }
                    : () => {
                        this.props.history.push(
                          "/homepage/home/invitationList?address=" +
                            address +
                            "&language=" +
                            lang
                        );
                      }
                }
              >
                <label>{intl.get("More")}</label>
                <img src="/img/m_编组 17@2x.png" />
              </p>
            </div>
            <div className="line"></div>
            <div className="list">
              {ranking &&
                ranking.map((v, i) => {
                  return (
                    <p key={i}>
                      <span>
                        {v.rank == 1 ? (
                          <img src="/img/m_编组 56备份 3@2x.png" />
                        ) : v.rank == 2 ? (
                          <img src="/img/m_编组 5备份 2@2x.png" />
                        ) : v.rank == 3 ? (
                          <img src="/img/m_编组 4备份 2@2x.png" />
                        ) : (
                          <strong>{v.rank}</strong>
                        )}

                        {this.showVLSAddress(v.address)}
                      </span>
                      <span>{parseInt(v.incentive / 1e6)} VLS</span>
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="activityRules">
            <h4>
              <i></i>
              {/* <img src="/img/m_编组 26@2x.png" /> */}
              {intl.get("Promotion rules")}
            </h4>
            <div>
              <p>
                {intl.get(
                  "One. All users can participate. No award limit now;"
                )}
              </p>
              <p>
                {intl.get(
                  "Two. During the promotion period, invite each new user will be reward VLS after new user created wallet, completed phone number verification and enter inviter's invitation code;"
                )}
              </p>
              <p>
                {intl.get(
                  "Three. For each successful invitation, inviter wins 2VLS and invitee wins 1VLS;"
                )}
              </p>
              <p>
                {intl.get(
                  "Four. Invitation awards will be delivered within 72 hours;"
                )}
              </p>
              <p>
                {intl.get(
                  "Five. Users violated the promotion rules will be disqualified;"
                )}
              </p>
              <p>
                {intl.get(
                  "Six. Any changes or updates to the promotion will be announced on the Violas platform and they will be final."
                )}
              </p>
            </div>
          </div>
          <div id={ifMobile == false ? "" : "btns"} className="btns">
            <button onClick={() => this.shareLink()}>
              {intl.get("Share link")}
            </button>
            <button
              onClick={() => {
                this.setState({
                  sharePosters: true,
                });
              }}
            >
              {intl.get("Share announcement")}
            </button>
          </div>
        </div>
        {this.state.sharePosters ? (
          <PhotoSynthesis
            closeDialog={this.closeDialog}
            ifMobile={ifMobile}
            address={this.state.address}
          ></PhotoSynthesis>
        ) : null}
      </div>
    );
  }
}
 
export default InviteRewards;