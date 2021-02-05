import React, { Component } from "react";
import "../app.scss";
import { connect } from "react-redux";
import intl from "react-intl-universal";
import { Badge, Pagination, Drawer } from "antd";
import Details from "./pushDetails";
import SystemDetails from "./systemDetails";

//推送页面
class PushMessage extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [
        {
          id: 0,
          title: "转账通知",
        },
        {
          id: 1,
          title: "系统通知",
        },
      ],
      idx: 0,
      showDetail: false,
      showDetail1: false,
    };
  }
  getTranfars = () =>{
    // fetch(
    //   url1 +
    //     "/1.0/ailosv / message / transfer" +
    //     window.sessionStorage.getItem("libra_address")
    // )
    //   .then((res) => res.json())
    //   .then((res) => {});
  }
  async componentWillMount() {
    let lang = intl.options.currentLocale;
    // console.log(lang);
    switch (lang) {
      case "zh":
        lang = "CN";
        break;
      case "CN":
        lang = "CN";
        break;
      default:
        lang = "EN";
        break;
    }
    localStorage.setItem("local", lang);
    intl.options.currentLocale = localStorage.getItem("local");
  }
  showDetailFun = (type) => {
    this.setState({
      showDetail: type,
    });
  };
  showDetailFun1 = (type) => {
    this.setState({
      showDetail1: type,
    });
  };
  onClose = () => {
    this.setState({
      showDetail: false,
    });
  };
  onClose1 = () => {
    this.setState({
      showDetail1: false,
    });
  };
  render() {
    return (
      <div className="pushMessage">
        <div className="headTitle">
          <h3>
            <img src="/img/xiaoxi-2@2x.png" />
            消息中心
          </h3>
          <div className="clear">
            <img src="/img/clear.png" />
          </div>
        </div>
        <div className="messageContent">
          <div className="tabList">
            {this.state.messageList.map((v, i) => {
              return (
                <Badge dot>
                  <span
                    key={i}
                    className={this.state.idx == v.id ? "active" : null}
                    onClick={() => {
                      this.setState({
                        idx: v.id,
                      });
                    }}
                  >
                    {v.title}
                  </span>
                </Badge>
              );
            })}
          </div>
          {this.state.idx == 0 ? (
            <div className="listContent">
              <div className="listPages">
                <div
                  className="curlist actBack"
                  onClick={() => this.showDetailFun(true)}
                >
                  <div>
                    <p>
                      <span>
                        <img src="/img/shenhetongguo 2@2x.png" />
                        VLS : 100VLS 转账成功
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>收款地址：YUsJ8N1AidNUySQGCpwswQUaoyL2Mu</p>
                  </div>
                </div>
                <div className="curlist actBack">
                  <div>
                    <p>
                      <span>
                        <img src="/img/编组 6@2x.png" />
                        VLS : 100VLS 交易失败
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>收款地址：YUsJ8N1AidNUySQGCpwswQUaoyL2Mu</p>
                  </div>
                </div>
                <div className="curlist">
                  <div>
                    <p>
                      <span>
                        <img src="/img/shenhetongguo 2@2x.png" />
                        VLS : 100VLS 转账成功
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>收款地址：YUsJ8N1AidNUySQGCpwswQUaoyL2Mu</p>
                  </div>
                </div>
                <div className="curlist">
                  <div>
                    <p>
                      <span>
                        <img src="/img/shenhetongguo 2@2x.png" />
                        VLS : 100VLS 转账成功
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>收款地址：YUsJ8N1AidNUySQGCpwswQUaoyL2Mu</p>
                  </div>
                </div>
                <div className="curlist">
                  <div>
                    <p>
                      <span>
                        <img src="/img/shenhetongguo 2@2x.png" />
                        VLS : 100VLS 转账成功
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>收款地址：YUsJ8N1AidNUySQGCpwswQUaoyL2Mu</p>
                  </div>
                </div>
                <div className="curlist">
                  <div>
                    <p>
                      <span>
                        <img src="/img/shenhetongguo 2@2x.png" />
                        VLS : 100VLS 转账成功
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>收款地址：YUsJ8N1AidNUySQGCpwswQUaoyL2Mu</p>
                  </div>
                </div>
              </div>
              <Pagination defaultCurrent={1} total={50} />
            </div>
          ) : (
            <div className="systemList">
              <div className="listPages">
                <div
                  className="curlist actBack"
                  onClick={() => this.showDetailFun1(true)}
                >
                  <div>
                    <p>
                      <span>
                        Violas 2.0发布，更顺畅的使用钱包，更方便您的使用
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>
                      如何在使用violas1.9及其以下版本过程中，遇到app反应慢或卡顿的问题，请升级至最新版2.0，更顺畅的使用钱包转账等功能。
                    </p>
                  </div>
                </div>
                <div className="curlist actBack">
                  <div>
                    <p>
                      <span>
                        Violas 2.0发布，更顺畅的使用钱包，更方便您的使用
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>
                      如何在使用violas1.9及其以下版本过程中，遇到app反应慢或卡顿的问题，请升级至最新版2.0，更顺畅的使用钱包转账等功能。
                    </p>
                  </div>
                </div>
                <div className="curlist">
                  <div>
                    <p>
                      <span>
                        Violas 2.0发布，更顺畅的使用钱包，更方便您的使用
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>
                      如何在使用violas1.9及其以下版本过程中，遇到app反应慢或卡顿的问题，请升级至最新版2.0，更顺畅的使用钱包转账等功能。
                    </p>
                  </div>
                </div>
                <div className="curlist">
                  <div>
                    <p>
                      <span>
                        Violas 2.0发布，更顺畅的使用钱包，更方便您的使用
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>
                      如何在使用violas1.9及其以下版本过程中，遇到app反应慢或卡顿的问题，请升级至最新版2.0，更顺畅的使用钱包转账等功能。
                    </p>
                  </div>
                </div>
                <div className="curlist">
                  <div>
                    <p>
                      <span>
                        Violas 2.0发布，更顺畅的使用钱包，更方便您的使用
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>
                      如何在使用violas1.9及其以下版本过程中，遇到app反应慢或卡顿的问题，请升级至最新版2.0，更顺畅的使用钱包转账等功能。
                    </p>
                  </div>
                </div>
                <div className="curlist">
                  <div>
                    <p>
                      <span>
                        Violas 2.0发布，更顺畅的使用钱包，更方便您的使用
                      </span>
                      <label>07.10 15:42</label>
                    </p>
                    <p>
                      如何在使用violas1.9及其以下版本过程中，遇到app反应慢或卡顿的问题，请升级至最新版2.0，更顺畅的使用钱包转账等功能。
                    </p>
                  </div>
                </div>
              </div>
              <Pagination defaultCurrent={1} total={50} />
            </div>
          )}
        </div>
        {/* 转账通知详情 */}
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.showDetail}
          mask={false}
          getContainer={false}
        >
          <Details showDetailFun={this.showDetailFun}></Details>
        </Drawer>
        {/* 系统通知详情 */}
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose1}
          visible={this.state.showDetail1}
          mask={false}
          getContainer={false}
        >
          <SystemDetails showDetailFun1={this.showDetailFun1}></SystemDetails>
        </Drawer>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PushMessage);
{/* <div className="blankWrap">
  <div className="blank">
    <img src="/img/blankPage.png" />
    <p>暂无消息</p>
  </div>
</div>; */}