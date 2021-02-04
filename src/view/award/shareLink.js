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

//分享链接
class ShareLink extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  download = () => {
      var u = navigator.userAgent;
      var ua = u.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {// iOS 系统 ->  跳AppStore下载地址
        this.props.history.push("/iosDownload");
      } else if (/android/.test(ua)) {// 安卓系统 -> 跳安卓端下载地址
        this.props.history.push("/androidDownload");
      } else {
        var plat = navigator.platform;
        var win = plat.indexOf('Win');
        var mac = plat.indexOf('Mac');
        if (win == 0) {
          this.props.history.push("/androidDownload");
        }else if (mac == 0) {
          this.props.history.push("/iosDownload");
        }
        }
      }
  render() {
    let {
    } = this.state;
    return (
      <div className="shareLink">
        <div className="inviteContent">
          <div className="head">
            <div className="logo">
              {/* <img src="/img/m_编组 24@2x.png" /> */}
            </div>
            <div className="descr">
              {/* <img src="/img/m_编组 566@2x.png" /> */}
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
                  <dd>好友通过手机号验证，并输入您的地址</dd>
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
              <p>四. 邀请奖励将在三个工作日内尽快发放；</p>
              <p>五. 如用户违反平台的相应风控规则，则无权参与此活动；</p>
              <p>
                六. 活动如有调整，以Violas平台公告为准，最终解释权归Violas
                所有；
              </p>
            </div>
          </div>
        </div>
        <div className="btns">
          <div>
            <div className="descrBottom">
              <p>
                <img src="/img/jlLogo.png" />
              </p>
              <p>
                <span>Violas钱包</span>
                <label>安全、简单易用</label>
              </p>
            </div>
            <button onClick={()=>this.download()}>下载</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShareLink;
