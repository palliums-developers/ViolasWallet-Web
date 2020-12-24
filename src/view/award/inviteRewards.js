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
      address:""
    };
  }
  componentWillMount() {
    //console.log(window.location.href);
    // intl.options.currentLocale = verifyMobile(this.props.location).lang;
    let temp = verifyMobile(window.location);
    intl.options.currentLocale = temp.lang;
    this.setState({
      id: rndNum(100),
      address:temp.address,
      ifMobile: temp.ifMobile,
      lang: temp.lang,
    });
  }
  componentDidMount() {
    this.getInviterTop();
    if (this.state.ifMobile) {
      document.title = "挖矿激励";
      this.getInviterInfo(this.state.address);
      
    } else {
      this.getInviterInfo(
        window.sessionStorage.getItem("violas_address") &&
          window.sessionStorage.getItem("violas_address")
      );
    }
    if (this.state.ifMobile) {
      document.title = "邀请奖励";
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
          console.log(res.data, "...............");
        }
      });
  }
  //获取邀请奖励信息
  getInviterInfo(addr) {
    fetch(url1 + "/1.0/violas/incentive/inviter/info?address=" + addr)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            incentive: res.data.incentive,
            invite_count: res.data.invite_count,
          });
        }
      });
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
    callHandler(
      "callNative",
      JSON.stringify({
        id: this.state.id,
        method: "share_link",
        params: [this.state.address],
      }),
      (resp) => {
      }
    );
  };
  render() {
    let { incentive, invite_count, ifMobile, lang,address } = this.state;
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
            <div className="stepWrap">
              <div>
                <dl>
                  <dt>
                    <img src="/img/m_编组 38@2x.png" />
                  </dt>
                  <dd>发送邀请链接给好友</dd>
                </dl>
                <div className="jiantou">
                  <img src="/img/m_jiantou-4 2@2x.png" />
                </div>
                <dl>
                  <dt>
                    <img src="/img/m_编组 40@2x.png" />
                  </dt>
                  <dd>好友通过手机号验证</dd>
                </dl>
                <div className="jiantou">
                  <img src="/img/m_jiantou-4 2@2x.png" />
                </div>
                <dl>
                  <dt>
                    <img src="/img/m_编组 266@2x.png" />
                  </dt>
                  <dd>双方获得相应奖励</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="myInvitation">
            <div className="head">
              <h3>我的邀请</h3>

              <p
                onClick={
                  ifMobile == false
                    ? () => {
                        this.props.history.push("/homepage/home/miningDetails");
                      }
                    : () => this.inviteInfo()
                }
              >
                <label>查看更多</label>
                <img src="/img/m_编组 17@2x.png" />
              </p>
            </div>
            <div className="line"></div>
            <div className="invitationDetails">
              <div>
                <span>{incentive}</span>
                <label>邀请人数</label>
              </div>
              <div className="line"></div>
              <div>
                <span>{invite_count} VLS</span>
                <label>邀请奖励</label>
              </div>
            </div>
          </div>
          <div className="rankingList">
            <div className="head">
              <h3>排行榜</h3>
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
                            "&language=" +
                            lang
                        );
                      }
                }
              >
                <label>查看更多</label>
                <img src="/img/m_编组 17@2x.png" />
              </p>
            </div>
            <div className="line"></div>
            <div className="list">
              <p>
                <span>
                  <img src="/img/m_编组 56备份 3@2x.png" />
                  12uww3…9312jw
                </span>
                <span>89人</span>
                <span>1.283 VLS</span>
              </p>
              <p>
                <span>
                  <img src="/img/m_编组 56备份 3@2x.png" />
                  12uww3…9312jw
                </span>
                <span>89人</span>
                <span>1.283 VLS</span>
              </p>
              <p>
                <span>
                  <img src="/img/m_编组 56备份 3@2x.png" />
                  12uww3…9312jw
                </span>
                <span>89人</span>
                <span>1.283 VLS</span>
              </p>
              <p>
                <span>
                  <strong>4</strong>
                  12uww3…9312jw
                </span>
                <span>89人</span>
                <span>1.283 VLS</span>
              </p>
              <p>
                <span>
                  <strong>5</strong>
                  12uww3…9312jw
                </span>
                <span>89人</span>
                <span>1.283 VLS</span>
              </p>
            </div>
          </div>
          <div className="activityRules">
            <h4>
              <i></i>
              {/* <img src="/img/m_编组 26@2x.png" /> */}
              活动规则
            </h4>
            <div>
              <p>一. 凡是平台的用户都可参与，暂不设定奖励上限；</p>
              <p>
                二.
                活动期间，每成功邀请一名新用户创建钱包，完成手机号验证，并输入邀请人邀请码，即可获得相应的VLS奖励；
              </p>
              <p>
                三.
                邀请人每成功邀请一位，可获得2VLS奖励；被邀请人可获得1VLS奖励；
              </p>
              <p>四. 邀请奖励将在三个工作日内尽快发放</p>
              <p>五. 如用户违反平台的相应风控规则，则无权参与此活动；</p>
              <p>
                六. 活动如有调整，以Violas平台公告为准，最终解释权归Violas 所有
              </p>
            </div>
          </div>
          <div id={ifMobile == false ? "" : "btns"} className="btns">
            {ifMobile == false ? (
              <CopyToClipboard
                text={window.sessionStorage.getItem("violas_address")}
                onCopy={() => message.success("复制成功")}
              >
                <button> 分享链接 </button>
              </CopyToClipboard>
            ) : (
              <button onClick={() => this.shareLink()}>分享链接</button>
            )}

            <button
              onClick={() => {
                this.setState({
                  sharePosters: true,
                });
              }}
            >
              分享海报
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