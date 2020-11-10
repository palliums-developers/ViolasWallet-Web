import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import "./css/patentDetail.css";
import { WhiteSpace, TextareaItem, Button, Modal } from "antd-mobile";
import { message } from "antd";
import { timeStamp2String } from "./utils/timer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { rndNum } from "./utils/redomNum";
import { callHandler, registerHandler } from "./utils/jsbridge";
let url = "http://94.191.95.240:4000";
const axios = require("axios");
const prompt = Modal.prompt;
let isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: (e) => e.preventDefault(),
  };
}
class PatentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip_id: "",
      ipList: {},
      address: "",
      moduleName: "",
    };
  }
  componentDidMount() {
    this.setState(
      {
        id: rndNum(100),
        ip_id: this.props.location.search.split("=")[1],
      },
      () => {
        this.getDetails();
        this.getAccountFun();
      }
    );
  }
  //获取账户支付信息
  getAccountFun = () => {
    axios
      .get(url + "/1.0/newnet/council/payment/info")
      .then((res) => {
        // console.log(res)
        if (res.data.code == 2000) {
          this.setState({
            address: res.data.data.address,
            moduleName: res.data.data.token_module,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //获取id详细信息
  getDetails = () => {
    let { ip_id } = this.state;

    axios
      .get(url + "/1.0/newnet/ip/detail?ip_id=" + ip_id)
      .then((res) => {
        if (res.data.code == 2000) {
          this.setState({
            ipList: res.data.data,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //向移动端发起支付请求
  onDone = (msg) => {
    callHandler("callNative", JSON.stringify(msg), (resp) => {
      if (resp.result === "success") {
        this.payTokenFun({
          id: this.state.id,
          method: "payToken",
          params: [
            JSON.stringify(msg),
            this.state.address,
            this.state.moduleName,
            100,
          ],
        });
        this.publishTokenFun({
          id: this.state.id,
          method: "publishToken",
          params: [JSON.stringify(msg), this.state.moduleName],
        });
      }
    });
  };
  //支付代币:
  payTokenFun = (msg) => {
    callHandler("callNative", JSON.stringify(msg), (resp) => {
      if (JSON.parse(resp).result === "success") {
        message.success("支付成功");
      } else {
        message.error("支付失败");
      }
    });
  };
  //Publish 代币
  publishTokenFun = (msg) => {
    callHandler("callNative", JSON.stringify(msg), (resp) => {
      if (JSON.parse(resp).result === "success") {
        message.success("Publish 成功");
      } else {
        message.error("Publish 失败");
      }
    });
  };
  //转让IP
  tranferIPFun = () =>{
    callHandler(
      "callNative",
      JSON.stringify({
        id: this.state.id,
        method: "assignmentIP",
        params: [this.props.location.state.ipid, this.state.moduleName],
      }),
      (resp) => {
        if (JSON.parse(resp).result === "success") {
          message.success("成功");
        } else {
          message.error("失败");
        }
      }
    );
  }
  render() {
    let { ipList } = this.state;
    // ipList.status = 3;
    return (
      <div className="patentDetail">
        <div className="head">
          <p>
            <label>提交时间:</label>
            <span>{timeStamp2String(ipList.date + "000")}</span>
          </p>
          {ipList.status == 0 ? null : (
            <p>
              <label>审核时间:</label>
              <span>
                {ipList.verify_date &&
                  timeStamp2String(ipList.verify_date + "000")}
              </span>
            </p>
          )}

          <p>
            <label>审核结果:</label>
            {ipList.status == 0 ? (
              <span className="orgColor">待审核</span>
            ) : ipList.status == 1 ? (
              <span className="orgColor">待支付通证发行费用</span>
            ) : ipList.status == -1 ? (
              <span className="redColor">审核驳回</span>
            ) : ipList.status == 2 ? (
              <span className="orgColor">发币中</span>
            ) : ipList.status == 3 ? (
              <span className="greColor">IP已通过</span>
            ) : null}
          </p>
          {ipList.status == -1 ? (
            <p>
              <label>驳回原因:</label>
              <span>{ipList.fail_reason}</span>
            </p>
          ) : null}
        </div>
        <div className="patentList">
          <p>
            <label>IP号</label>
            <span>{ipList.ip_id}</span>
          </p>
          <p>
            <label>IP名称</label>
            <span>{ipList.ip_name}</span>
          </p>
          <p>
            <label>IP介绍</label>
            <TextareaItem rows={10} editable={false} value={ipList.ip_intro} />
          </p>
          <p>
            <label>IP通证名称</label>
            <span>{ipList.token_name}</span>
          </p>
          <p>
            <label>IP通证数量</label>
            <span>{ipList.token_amount}</span>
          </p>
          <p>
            <label>IP使用通证名称</label>
            <span>{ipList.token_name_for_user}</span>
          </p>
          <p>
            <label>IP使用通证数量</label>
            <span>{ipList.token_amount_for_user}</span>
          </p>
          <p>
            <label>单次下载数量</label>
            <span>{ipList.download_fee}</span>
          </p>
          <p>
            <label>IP文件</label>
            <CopyToClipboard
              text={ipList.ip_file_url}
              onCopy={() => message.success("copy success~")}
            >
              <span style={{ color: "rgba(0, 179, 191, 1)" }}>IP详细文档</span>
            </CopyToClipboard>
          </p>
        </div>
        {ipList.status == 1 ? (
          <div className="btn">
            <WhiteSpace size="lg" />
            <Button
              className="btns"
              onClick={() =>
                prompt(
                  "输入密码",
                  "",
                  (password) => {
                    this.onDone({
                      id: this.state.id,
                      method: "checkAuthorize",
                      params: [password + ""],
                    });
                  },
                  "secure-text"
                )
              }
            >
              支付通证发行费用（100token)
            </Button>
          </div>
        ) : null}
        {ipList.status == 3 ? (
          <div className="btn1">
            <button className="tranferIP" onClick={this.tranferIPFun}>
              转让 IP
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PatentDetail;
