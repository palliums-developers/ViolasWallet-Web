import React, { Component } from "react";
import "../app.scss";
import { connect } from "react-redux";
import intl from "react-intl-universal";
import { Badge, Pagination, Drawer } from "antd";
import Details from "./pushDetails";
import SystemDetails from "./systemDetails";
import { timeStamp2String } from "../../utils/timer4";
let url = "https://api4.violas.io";
//推送页面
class PushMessage extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [
        {
          id: 0,
          dot: false,
          title: "转账通知",
        },
        {
          id: 1,
          dot: false,
          title: "系统通知",
        },
      ],
      idx: 0,
      showDetail: false,
      showDetail1: false,
      tranfarsList: [],
      noticesList: [],
      fireBaseToken: "",
      msg_id: "",
      msg_id1: "",
      noticeUnread: 0,
      tranfarUnread: 0,
      page: 1,
      pageSize: 4,
      total: 0,
      page1: 1,
      pageSize1: 4,
      total1: 0,
      
    };
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
    this.getUnreadCount();
  }
  componentDidMount() {
    this.getTranfars();
    this.getNotices();
    // this.getUnreadCount();
  }
  //获取未读消息数
  getUnreadCount() {
    fetch(
      url +
        "/1.0/violas/messages/unread/count?token=" +
        window.sessionStorage.getItem("firebase_token")
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.data) {
          this.setState(
            {
              noticeUnread: res.data.notice,
              tranfarUnread: res.data.message,
            },
            () => {
              this.getDot(0);
            }
          );
        }
      });
  }
  //获取消息列表
  getTranfars = () => {
    fetch(
      url +
        "/1.0/violas/message/transfers?address=" +
        window.sessionStorage.getItem("violas_address") +
        "&offset=" +
        (this.state.page - 1) * this.state.pageSize +
        "&limit=" +
        this.state.pageSize
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          // console.log(res.data);
          this.setState({
            tranfarsList: res.data,
            total: res.data.length>0 ?res.data[0].count:0,
          });
        }
      });
  };
  //获取通知列表
  getNotices = () => {
    fetch(
      url +
        "/1.0/violas/message/notices?token=" +
        window.sessionStorage.getItem("firebase_token") +
        "&offset=" +
        (this.state.page1 - 1) * this.state.pageSize1 +
        "&limit=" +
        this.state.pageSize1
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          // console.log(res);
          this.setState({
            noticesList: res.data,
            total1: res.data.length>0?res.data[0].count:0,
          });
        }
      });
  };
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
  //获取全部已读未读红点
  getDot(id) {
    if (id == 0) {
      if (this.state.tranfarUnread > 0) {
        this.state.messageList[id].dot = true;
      } else {
        this.state.messageList[id].dot = false;
      }
      if (this.state.noticeUnread > 0) {
        this.state.messageList[id + 1].dot = true;
      } else {
        this.state.messageList[id + 1].dot = false;
      }
    } else if (id == 1) {
      if (this.state.noticeUnread > 0) {
        this.state.messageList[id].dot = true;
      } else {
        this.state.messageList[id].dot = false;
      }
      if (this.state.tranfarUnread > 0) {
        this.state.messageList[id - 1].dot = true;
      } else {
        this.state.messageList[id - 1].dot = false;
      }
    }
  }
  //一键全部读取
  clearRead = () => {
    fetch(url + "/1.0/violas/messages/readall", {
      method: "put",
      body: JSON.stringify({
        token: window.sessionStorage.getItem("firebase_token"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 2000) {
          window.location.reload();
        }
      });
  };
  onChange = (page, pageSize) => {
    this.setState(
      {
        page: page,
        pageSize: pageSize,
      },
      () => {
        this.getTranfars();
      }
    );
  };
  onChange1 = (page, pageSize) => {
    this.setState(
      {
        page1: page,
        pageSize1: pageSize,
      },
      () => {
        this.getNotices();
      }
    );
  };
  render() {
    this.getDot(0);
    let { tranfarsList, noticesList } = this.state;
    return (
      <div className="pushMessage">
        <div className="headTitle">
          <h3>
            <img src="/img/xiaoxi-2@2x.png" />
            消息中心
          </h3>
          <div className="clear" onClick={() => this.clearRead()}>
            <img src="/img/clear.png" />
          </div>
        </div>
        <div className="messageContent">
          <div className="tabList">
            {this.state.messageList.map((v, i) => {
              return (
                <Badge dot={v.dot}>
                  <span
                    key={i}
                    className={this.state.idx == v.id ? "active" : null}
                    onClick={() => {
                      this.setState(
                        {
                          idx: v.id,
                        },
                        () => {
                          this.getDot(v.id);
                        }
                      );
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
                {tranfarsList.map((v, i) => {
                  return (
                    <div
                      className={v.readed == 0 ? "curlist actBack" : "curlist"}
                      key={i}
                      onClick={() => {
                        this.showDetailFun(true);
                        this.setState({
                          msg_id1: v.id,
                        });
                      }}
                    >
                      <div>
                        <p>
                          <span>
                            {v.status == "Executed" ? (
                              <img src="/img/shenhetongguo 2@2x.png" />
                            ) : (
                              <img src="/img/编组 6@2x.png" />
                            )}
                            {v.title}
                          </span>
                          <label>{timeStamp2String(v.date + "000")}</label>
                        </p>
                        <p>{v.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {this.state.total >= 4 ? (
                <Pagination
                  defaultCurrent={this.state.page}
                  pageSize={this.state.pageSize}
                  total={this.state.total}
                  onChange={this.onChange}
                />
              ) : null}
            </div>
          ) : (
            <div className="systemList">
              <div className="listPages">
                {noticesList.map((v, i) => {
                  return (
                    <div
                      className={v.readed == 0 ? "curlist actBack" : "curlist"}
                      key={i}
                      onClick={() => {
                        this.showDetailFun1(true);
                        this.setState({
                          msg_id: v.id,
                        });
                      }}
                    >
                      <div>
                        <p>
                          <span>{v.title}</span>
                          <label>{timeStamp2String(v.date + "000")}</label>
                        </p>
                        <p>{v.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {this.state.total1 >= 4 ? (
                <Pagination
                  defaultCurrent={this.state.page1}
                  pageSize={this.state.pageSize1}
                  total={this.state.total1}
                  onChange={this.onChange1}
                />
              ) : null}
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
          <Details
            showDetailFun={this.showDetailFun}
            msg_id1={this.state.msg_id1}
          ></Details>
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
          <SystemDetails
            showDetailFun1={this.showDetailFun1}
            msg_id={this.state.msg_id}
          ></SystemDetails>
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