import React,{Component} from 'react';
import './css/meetingDetail.css'
import {
  WhiteSpace,
  TextareaItem,
  Button,
  Modal, 
} from "antd-mobile";
import { Form, Select,Input } from 'antd';
import { message } from 'antd';
import { timeStamp2String } from './utils/timer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { rndNum } from "./utils/redomNum";
import { callHandler, registerHandler } from "./utils/jsbridge";
let url = "http://94.191.95.240:4000"
const axios = require('axios');
const { Option } = Select;
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
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
class MeetingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip_id: "",
      ipList: {},
      failReason: [],
      defaultValue: "",
      iptValue: "",
      textValue: "",
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
        this.getFailReason();
      }
    );
  }
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
  handleChange = (value) => {
    this.setState(
      {
        defaultValue: value,
      },
      () => {
        this.state.failReason.map((v) => {
          if (value == v.reason) {
            this.setState({
              code: v.id,
            });
          }
        });
      }
    );
  };
  showModal = (key) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };

  getValue = (e) => {
    this.setState({
      iptValue: e.target.value,
    });
  };
  onClose = (key) => (e) => {
    this.setState({
      [key]: false,
    });
    if (e == "yes") {

      callHandler(
        "callNative",
        JSON.stringify({
          id: this.state.id,
          method: "checkAuthorize",
          params: [this.state.iptValue],
        }),
        (resp) => {
          if (JSON.parse(resp).result === "success") {
            if (this.state.code == 1) {
              this.ipverifyFun({
                ip_id: this.state.ip_id,
                status: 2,
                fail_code: this.state.code,
              });
            } else if (this.state.code == 2) {
              this.ipverifyFun1({
                ip_id: this.state.ip_id,
                status: 2,
                fail_code: this.state.code,
                fail_reason: this.state.textValue,
              });
            }
          }
        }
      );
    }
  };
  //审批通过驳回
  ipverifyFun = (params) => {
    axios
      .get(
        url +
          "/1.0/newnet/ip/verify?ip_id=" +
          params.ip_id +
          "&status=" +
          params.status +
          "&fail_code=" +
          params.fail_code
      )
      .then((res) => {
        if(res.data.code == 2000){
          message.success('审批驳回成功')
        }else{
           message.error("审批驳回失败");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //审批驳回 其他
  ipverifyFun1 = (params) => {
    axios
      .get(
        url +
          "/1.0/newnet/ip/verify?ip_id=" +
          params.ip_id +
          "&status=" +
          params.status +
          "&fail_code=" +
          params.fail_code +
          "&fail_reason=" +
          params.fail_reason
      )
      .then((res) => {
        if (res.data.code == 2000) {
          message.success("成功");
        } else {
          message.error("失败");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, ".am-modal-content");
    if (!pNode) {
      e.preventDefault();
    }
  };
  //获取驳回原因
  getFailReason = () => {
    axios
      .get(url + "/1.0/newnet/ip/verify/fail/reason")
      .then((res) => {
        if (res.data.code == 2000) {
          this.setState({
            defaultValue: res.data.data[0].reason,
            code: res.data.data[0].id,
            failReason: res.data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //向移动端发起请求 验证密码
  onDone = (msg) => {
    callHandler("callNative", JSON.stringify(msg), (resp) => {
      // alert(resp)
      if (JSON.parse(resp).result === "success") {
        this.ipverifyFun({
          ip_id: this.state.ip_id,
          status: 1,
        });
      }
    });
  };
  //点击审批通过
  getSubmit = () =>{

  }
  //输入驳回信息
  getTextValue = (value) => {
    console.log(value);
    this.setState({
      textValue: value,
    });
  };
  render() {
    let { ipList, failReason, defaultValue } = this.state;
    return (
      <div className="meetingDetail">
        <div className="head">
          <p>
            <label>提交时间:</label>
            <span>{timeStamp2String(ipList.date + "000")}</span>
          </p>
          {ipList.status == 0 ? null : ipList.status == 1 ? null : (
            <p>
              <label>审核时间:</label>
              <span>{timeStamp2String(ipList.date + "000")}</span>
            </p>
          )}
          {ipList.status == 1 ? null : (
            <p>
              <label>审核结果:</label>
              {ipList.status == 0 ? (
                <span className="orgColor">待审核</span>
              ) : ipList.status == -1 ? (
                <span className="redColor">审核驳回</span>
              ) : ipList.status == 2 ? (
                <span className="orgColor">发币中</span>
              ) : ipList.status == 3 ? (
                <span className="greColor">IP已通过</span>
              ) : null}
            </p>
          )}

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
          {ipList.status == 1 ? (
            <div className="btnList">
              <div className="noBtn">
                <WhiteSpace size="lg" />
                <Button className="btns" onClick={this.showModal("modal1")}>
                  审批驳回
                </Button>
                <Modal
                  visible={this.state.modal1}
                  transparent
                  maskClosable={false}
                  onClose={this.onClose("modal1")}
                  title="审批驳回"
                  footer={[
                    {
                      text: "取消",
                      onPress: () => this.onClose("modal1")("no"),
                    },
                    {
                      text: "确认",
                      onPress: () => this.onClose("modal1")("yes"),
                    },
                  ]}
                  // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                  <Form>
                    <Form.Item
                      name="result"
                      label="驳回原因"
                      rules={[{ required: false }]}
                    >
                      <Select
                        defaultValue={defaultValue}
                        onChange={this.handleChange}
                      >
                        {failReason.map((v, i) => {
                          return (
                            <Option key={i} value={v.reason}>
                              {v.reason}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    {this.state.code == 2 ? (
                      <Form.Item>
                        <TextareaItem
                          rows={5}
                          count={100}
                          onChange={this.getTextValue}
                          placeholder="请输入驳回信息"
                          className="descr"
                        />
                      </Form.Item>
                    ) : null}
                    <Form.Item
                      className="pass"
                      name="password"
                      label="支付密码"
                      rules={[{ required: false }]}
                    >
                      <Input onChange={this.getValue} />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
              <div className="yesBtn">
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
                  审批通过
                </Button>
              </div>
            </div>
          ) : null}
        </div>

      </div>
    );
  }
}
 
export default MeetingDetail;