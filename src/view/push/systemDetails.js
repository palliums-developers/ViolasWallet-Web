import React, { Component } from "react";
import intl from "react-intl-universal";
import { timeStamp2String1 } from "../../utils/timer1";
import "../app.scss";
let url = "https://api4.violas.io";

//点击每个币种进入到每个币种的详情
class SystemDetails extends Component {
  constructor() {
    super();
    this.state = {
      msg_id: "",
      noticesList:{}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      msg_id: nextProps.msg_id,
    },()=>{
      fetch(
        url +
          "/1.0/violas/message/notice?token=" +
          window.sessionStorage.getItem("firebase_token") +
          "&msg_id=" +
          this.state.msg_id
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.data)
          if (res.data) {
            this.setState({
              noticesList: res.data,
            });
          }
        });
    });
  }
  componentDidMount() {
    
  }
  render() {
    let { noticesList } = this.state;
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
          <h3>{noticesList.title}</h3>
          <span>
            {timeStamp2String1(noticesList.date + "000")} {noticesList.author}
          </span>
          <div className="line"></div>
          <p>{noticesList.content}</p>
          <p>
            {intl.get("Download link")}：<a href="">https://violas.com/</a>
          </p>
        </div>
      </div>
    );
  }
}

export default SystemDetails;
