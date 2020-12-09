import React, { Component } from "react";
import PhotoSynthesis from "./saveImage.js";
import "./award.scss";

//邀请奖励
class InviteRewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharePosters: false,
    };
    
  }
  componentDidMount(){

  }

  closeDialog = (val) => {
    this.setState({
      sharePosters: val,
    });
  };
  render() {
    return (
      <div className="inviteRewards">
        <div className="inviteContent">
          <div className="head">
            <div className="logo">
              <img src="/img/m_编组 24@2x.png" />
            </div>
            <div className="descr">
              <img src="/img/m_编组 566@2x.png" />
            </div>
            <div className="stepWrap">
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
          <div className="myInvitation">
            <div className="head">
              <h3>我的邀请</h3>
              <p
                onClick={() => {
                  this.props.history.push("/homepage/home/miningDetails");
                }}
              >
                查看更多
                <img src="/img/m_编组 17@2x.png" />
              </p>
            </div>
            <div className="invitationDetails">
              <div>
                <span>100</span>
                <label>邀请人数</label>
              </div>
              <div className="line"></div>
              <div>
                <span>100,000VLS</span>
                <label>邀请奖励</label>
              </div>
            </div>
          </div>
          <div className="rankingList">
            <div className="head">
              <h3>排行榜</h3>
              <p
                onClick={() => {
                  this.props.history.push("/homepage/home/invitationList");
                }}
              >
                查看更多
                <img src="/img/m_编组 17@2x.png" />
              </p>
            </div>
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
              <img src="/img/m_编组 26@2x.png" />
              说明
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
          <div className="btns">
            <button>分享链接</button>
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
          <PhotoSynthesis closeDialog={this.closeDialog}></PhotoSynthesis>
        ) : null}
      </div>
    );
  }
}
 
export default InviteRewards;