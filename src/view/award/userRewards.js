import React, { Component } from "react";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
} from "antd";
import { NavLink } from "react-router-dom";
import "./award.scss";
let url1 = "https://api4.violas.io";

//用户验证
class UserRewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneIpt: "",
      addressIpt: "",
      codeIpt: "",
      descr: "",
    };
  }
  ///获取验证码;
  getVerifyCode() {
    if (this.state.phoneIpt == "") {
      this.setState({
        descr: "请输入手机号",
      });
    } else {
      this.setState({
        descr: "",
      });
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
  //输入手机号
  getPhoneValue = (e) => {
    // var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
    // var flag = reg.test(e.targer.value); //true
    // console.log(flag)
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
  receiveFun = () =>{
    if (this.state.phoneIpt == "") {
      this.setState({
        descr: "请输入手机号",
      });
      if (this.state.codeIpt == "") {
        this.setState({
          descr: "请输入验证码",
        });
      }
    } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.state.phoneIpt)) {
      this.setState({
        descr: "你输入的手机号有误",
      });
    } else{
      // fetch(url1 + "/violas/1.0/incentive/mobile/verify", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     address: window.sessionStorage.getItem("violas_address"),
      //     phone_local_number: "+86",
      //     receiver: this.state.phoneIpt,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((res) => {
      //     console.log(res, "...............");
      //   });
    }
  }
  render() {
    let { phoneIpt, addressIpt, codeIpt, descr } = this.state;
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
            <span>验证手机号</span>
            <span></span>
          </Breadcrumb>
          <div className="verifyList">
            <div className="verifyDescr">
              <p>1. 每个手机号有三次验证机会</p>
              <p>2. 请您放心，手机号不会绑定您的钱包</p>
              <p>3. 验证成功后可获取 10 VLS</p>
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
                    placeholder="请输入手机号"
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
                      placeholder="请输入验证码"
                      maxLength="6"
                      value={codeIpt}
                      onChange={this.getCodeValue}
                    />
                  </Form.Item>
                  <Button onClick={() => this.getVerifyCode()}>
                    获取验证码
                  </Button>
                </Form.Item>
                <Form.Item
                  className="addressIpt"
                  //   rules={[
                  //     { required: true, message: "Street is required" },
                  //   ]}
                >
                  <Input
                    maxLength="100"
                    placeholder="邀请人VLS地址（选填）"
                    value={addressIpt}
                    onChange={this.getAddressValue}
                  />
                </Form.Item>
              </Form>
              <button onClick={() => this.receiveFun()}>立即领取</button>
              <p>{descr}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default UserRewards;