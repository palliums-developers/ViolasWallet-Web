import React, { Component } from "react";
import PhotoSynthesis from "./saveImage.js";
import { rndNum } from "../../utils/redomNum";
import { verifyMobile } from "../../utils/verifyMobile";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { callHandler, registerHandler } from "../../utils/jsbridge";
import intl from "react-intl-universal";
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
        </div>
        <div className="btns">
          <div>
            <div className="descrBottom">
              <p>
                <img src="/img/jlLogo.png" />
              </p>
              <p>
                <span>{intl.get("ViolasWallet")}</span>
                <label>{intl.get("Safe and easy to use")}</label>
              </p>
            </div>
            <button onClick={() => this.download()}>
              {intl.get("Download")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShareLink;