import React, { Component } from "react";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
} from "antd";
import { NavLink } from "react-router-dom";
import "./award.scss";

//用户验证
class UserRewards extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
          <div className="userRewards">
            <div>
              <Breadcrumb separator="">
                <Breadcrumb.Item>
                  <NavLink to="/homepage/home">
                    {" "}
                    <img src="/img/fanhui 2@2x.png" />
                  </NavLink>
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
                        />
                      </Form.Item>
                      <Button>获取验证码</Button>
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
                      />
                    </Form.Item>
                  </Form>
                  <button>立即领取</button>
                  <p>当前手机号已无验证机会</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
 
export default UserRewards;