import React, { Component } from "react";
import intl from "react-intl-universal";
import "../app.scss";

//点击每个币种进入到每个币种的详情
class SystemDetails extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="systemDetails">
        <h4
          onClick={() => {
            this.props.showDetailFun1(false);
          }}
        >
          <i>
            <img src="/img/编组备份 3@2x.png" />
          </i>
          {intl.get("Detail")}
        </h4>
        <div className="detailContent">
          <h3>Violas 2.0发布，更顺畅的使用钱包，更方便您的使用</h3>
          <span>2020-07-10 15:42 Violas团队</span>
          <div className="line"></div>
          <p>
            如何在使用violas1.9及其以下版本过程中，遇到app反应慢或卡顿的问题，请升级至最新版2.0，更顺畅的使用钱包转账等功能。
          </p>
          <p>
            下载链接：<a href="">https://violas.com/</a>
          </p>
        </div>
      </div>
    );
  }
}

export default SystemDetails;
