import React, { Component } from "react";
import { Breadcrumb, Tabs, Pagination } from "antd";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;
let url1 = "https://api4.violas.io";

//挖矿明细
class MiningDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getInviterOrders();
    this.getPoolOrders();
    this.getBankOrders();
  }
  callback(key) {
    console.log(key);
  }
  //获取邀请奖励记录
  getInviterOrders() {
    fetch(
      url1 +
        "/violas/1.0/incentive/inviter/info?address=" +
        window.sessionStorage.getItem("violas_address") +
        "offset="
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
        }
      });
  }
  //获取资金池奖励记录
  getPoolOrders() {
    fetch(
      url1 +
        "/violas/1.0/incentive/orders/pool?address=" +
        window.sessionStorage.getItem("violas_address") +
        "offset="
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
        }
      });
  }
  //获取存款奖励记录
  getBankOrders() {
    fetch(
      url1 +
        "/violas/1.0/incentive/orders/bank?address=" +
        window.sessionStorage.getItem("violas_address") +
        "offset="
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
        }
      });
  }
  render() {
    return (
      <div className="miningDetails">
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
            <span>收益明细</span>
            <span></span>
          </Breadcrumb>
          <div className="detailList">
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="邀请好友" key="1">
                <div className="listContent">
                  <div className="headList">
                    <span>被邀请账号</span>
                    <span>挖矿收益</span>
                    <span>邀请时间</span>
                    <span>状态</span>
                  </div>
                  <div className="listContents">
                    <p>
                      <span>2eiw8s…20wis9</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>2eiw8s…20wis9</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>2eiw8s…20wis9</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>2eiw8s…20wis9</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>2eiw8s…20wis9</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>2eiw8s…20wis9</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                  </div>
                  <Pagination defaultCurrent={1} total={50} />
                </div>
              </TabPane>
              <TabPane tab="资金池" key="2">
                <div className="listContent">
                  <div className="headList">
                    <span>操作类型</span>
                    <span>提取数量</span>
                    <span>提取时间</span>
                    <span>状态</span>
                  </div>
                  <div className="listContents">
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                  </div>
                  <Pagination defaultCurrent={1} total={50} />
                </div>
              </TabPane>
              <TabPane tab="数字银行" key="3">
                <div className="listContent">
                  <div className="headList">
                    <span>操作类型</span>
                    <span>提取数量</span>
                    <span>提取时间</span>
                    <span>状态</span>
                  </div>
                  <div className="listContents">
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                    <p>
                      <span>提取</span>
                      <span>10VLS</span>
                      <span>18:22 05/24</span>
                      <span>已到账</span>
                    </p>
                  </div>
                  <Pagination defaultCurrent={1} total={50} />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
 
export default MiningDetails;