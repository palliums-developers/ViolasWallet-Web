import React, { Component } from "react";
import intl from "react-intl-universal";

class AndroidDownload extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="AndroidDownloadPage">
        <div>
          <p>
            <img src="/img/jlLogo.png" />
            <label>Violas App</label>
          </p>
          <div className="descr1">
            <h4>一款去中心化金融服务平台</h4>
            <p>安全 · 可靠 · 简洁易用</p>
            <div>
              <img src="/img/s编组 34@2x.png" />
            </div>
          </div>
          <div className="descr1 descr2">
            <h4>
              <img src="/img/s_qianbao 2@2x.png" />
              HD钱包
            </h4>
            <p>一键管理多链资产，使钱包更加轻量易用</p>
            <div>
              <img src="/img/s_编组 11@2x.png" />
            </div>
          </div>
          <div className="descr1 descr2 descr3">
            <h4>
              <img src="/img/s_编组 20@2x.png" />
              闪电兑换
            </h4>
            <p>链上币种，兑换快如闪电</p>
            <div>
              <img src="/img/s_编组 13@2x.png" />
            </div>
          </div>
          <div className="descr1 descr2 descr3">
            <h4>
              <img src="/img/s_编组 48@2x.png" />
              资金池
            </h4>
            <p>未闪兑提供流动性，并赚取收益</p>
            <div>
              <img src="/img/s_编组 19@2x.png" />
            </div>
          </div>
          <div className="descr1 descr2 descr4">
            <h4>
              <img src="/img/s_编组 39@2x.png" />
              数字银行
            </h4>
            <p>一键管理多链资产，使钱包更加轻量易用</p>
            <div>
              <img src="/img/s_编组 33@2x.png" />
            </div>
          </div>
        </div>
        <div className="bottomBtn">
          <div>
            <p>
              <img src="/img/s_编组 23@2x.png" />
            </p>
            <p>本地下载</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AndroidDownload;
