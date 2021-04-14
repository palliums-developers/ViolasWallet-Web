import React, { Component } from "react";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
} from "antd";
import intl from "react-intl-universal";
import "./award.scss";
let url1 = "https://api4.violas.io";
let url = "https://api.violas.io";

//用户验证
class UserRewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneIpt: "",
      addressIpt: "",
      codeIpt: "",
      descr: "",
      descr1: "",
      count: 60,
      liked: true,
    };
  }
  ///获取验证码;
  getVerifyCode() {
    if (this.state.phoneIpt == "") {
      this.setState({
        descr: intl.get("Enter mobile phone number"),
      });
    } else {
      this.setState({
        descr: "",
      });
      this.handleClick()
      fetch(url1 + "/1.0/violas/verify_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: window.sessionStorage.getItem("violas_address"),
          phone_local_number: "+86",
          receiver: this.state.phoneIpt,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res, "...............");
        });
    }
  }
  //验证码倒计时
  handleClick = () => {
    const { sendMsg } = this.props;
    const { liked } = this.state;
    if (!liked) {
      return;
    }
    this.countDown();
  };
  countDown() {
    const { count } = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
      });
      setTimeout(this.countDown.bind(this), 1000);
    }
  }

  //输入手机号
  getPhoneValue = (e) => {
    this.setState({
      phoneIpt: e.target.value,
    });
  };
  //输入验证码
  getCodeValue = (e) => {
    this.setState({
      codeIpt: e.target.value,
    });
  };
  //输入邀请人VLS地址
  getAddressValue = (e) => {
    this.setState({
      addressIpt: e.target.value,
    });
  };
  //立即领取
  receiveFun = () => {
    if (this.state.phoneIpt == "") {
      this.setState({
        descr: intl.get("Enter mobile phone number")
      });
      if (this.state.codeIpt == "") {
        this.setState({
          descr: intl.get("Enter verification code")
        });
      }
    } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.state.phoneIpt)) {
      this.setState({
        descr: intl.get("The phone number you entered is wrong")
      });
    } else {
      fetch(url1 + "/1.0/violas/incentive/mobile/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: window.sessionStorage.getItem("violas_address"),
          local_number: "+86",
          mobile_number: this.state.phoneIpt,
          verify_code: this.state.codeIpt,
          inviter_address: this.state.addressIpt,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if(res.code == 2000){
            this.setState(
              {
                descr1: intl.get("Successful verification")
              },
              () => {
                window.location.reload();
              }
            );
          }else{
            this.setState({
              descr: intl.get("Phone number has been used over the limit")
            });
          }
        });
    }
  };

  render() {
    let { phoneIpt, addressIpt, codeIpt, descr, descr1 } = this.state;
    return (
      <div className="userRewards">
        <div>
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <a
                onClick={() => {
                  this.props.history.go(-1);
                }}
              >
                {" "}
                <img src="/img/fanhui 2@2x.png" />
              </a>
            </Breadcrumb.Item>
            <span>{intl.get("Phone number verification")}</span>
            <span></span>
          </Breadcrumb>
          <div className="verifyList">
            <div className="verifyDescr">
              <p>
                {intl.get(
                  "One.Each phone number can be used up to 3 times of verification"
                )}
              </p>
              <p>
                {intl.get("Two.Phone number will not be bind with your wallet")}
              </p>
              <p>
                {intl.get("Three.Win 10 VLS after successful verification")}
              </p>
            </div>
            <div className="verifyForm">
              <Form>
                <Form.Item
                  className="phoneIpt"
                  name="phone"

                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please input your phone number!",
                  //     },
                  //   ]}
                >
                  <Input
                    maxLength="20"
                    addonBefore="+86"
                    style={{ width: "100%" }}
                    placeholder={intl.get("Enter mobile phone number")}
                    type="number"
                    value={phoneIpt}
                    onChange={this.getPhoneValue}
                  />
                </Form.Item>
                <Form.Item className="streetIpt">
                  <Form.Item
                    name=""
                    noStyle={true}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "请输入验证码",
                    //   },
                    // ]}
                  >
                    <Input
                      type="number"
                      placeholder={intl.get("Enter verification code")}
                      maxLength="6"
                      value={codeIpt}
                      onChange={this.getCodeValue}
                    />
                  </Form.Item>
                  {this.state.liked ? (
                    <Button onClick={() => this.getVerifyCode()}>
                      {intl.get("Get verification code")}
                    </Button>
                  ) : (
                    <Button disabled>{this.state.count}</Button>
                  )}
                </Form.Item>
                <Form.Item
                  className="addressIpt"
                  //   rules={[
                  //     { required: true, message: "Street is required" },
                  //   ]}
                >
                  <Input
                    maxLength="100"
                    placeholder={intl.get(
                      "Inviter's wallet address (Optional)"
                    )}
                    value={addressIpt}
                    onChange={this.getAddressValue}
                  />
                </Form.Item>
              </Form>
              <button onClick={() => this.receiveFun()}>
                {intl.get("Get award")}
              </button>
              <p className="p1">{descr}</p>
              <p className="p2">{descr1}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default UserRewards;