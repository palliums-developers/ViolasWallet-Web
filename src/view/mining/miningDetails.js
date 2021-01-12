import React, { Component } from "react";
import { Breadcrumb, Tabs, Pagination } from "antd";
import { NavLink } from "react-router-dom";
import {timeStamp2String} from '../../utils/timer3'
const { TabPane } = Tabs;
let url1 = "https://api4.violas.io";

//挖矿明细
class MiningDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      page: 1,
      total_count: 0,
      pageSize2: 10,
      page2: 1,
      total_count2: 0,
      pageSize3: 10,
      page3: 1,
      total_count3: 0,
      inviterOrders: [],
      poolOrders: [],
      bankOrders: [],
    };
  }
  //显示VLS地址（前6...后6）
  showVLSAddress(str) {
    // 中间显示省略号，截取显示括号内容
    // var str = "53e59e4b4fa3c35770846f6c87ca2d35";
    var last = 0;
    var all = str.length;
    var first = str.substr(0, 6);
    str = first + " ... " + str.substr(all - 6, 6);
    return str;
  }
  //小数点后的位数
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    return number;
  }
  componentDidMount() {
    this.getInviterOrders();
    this.getPoolOrders();
    this.getBankOrders();
  }
  callback(key) {
    //console.log(key);
  }
  //获取邀请奖励记录
  getInviterOrders() {
    let { page, pageSize } = this.state;
    fetch(
      url1 +
        "/1.0/violas/incentive/orders/invite?address=" +
        window.sessionStorage.getItem("violas_address") +
        "&limit=" +
        pageSize +
        "&offset=" +
        (page - 1) * pageSize
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          // console.log(res.data);
          this.setState({
            total_count: res.data[0].total_count,
            inviterOrders: res.data,
          });
        }
      });
  }
  //获取资金池奖励记录
  getPoolOrders() {
    let { page2, pageSize2 } = this.state;
    fetch(
      url1 +
        "/1.0/violas/incentive/orders/pool?address=" +
        window.sessionStorage.getItem("violas_address") +
        "&limit=" +
        pageSize2 +
        "&offset=" +
        (page2 - 1) * pageSize2
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            total_count2: res.data[0].total_count,
            poolOrders: res.data,
          });
          // console.log(res.data);
        }
      });
  }
  //获取存款奖励记录
  getBankOrders() {
    let { page3, pageSize3 } = this.state;
    fetch(
      url1 +
        "/1.0/violas/incentive/orders/bank?address=" +
        window.sessionStorage.getItem("violas_address") +
        "&limit=" +
        pageSize3 +
        "&offset=" +
        (page3 - 1) * pageSize3
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            total_count3: res.data[0].total_count,
            bankOrders: res.data,
          });
          // console.log(res.data);
        }
      });
  }
  getCurPage = (page, pageSize) => {
    this.setState(
      {
        page: page,
        pageSize: pageSize,
      },
      () => {
        this.getInviterOrders();
      }
    );
  };
  getCurPage2 = (page, pageSize) => {
    this.setState(
      {
        page2: page,
        pageSize2: pageSize,
      },
      () => {
        this.getPoolOrders();
      }
    );
  };
  getCurPage3 = (page, pageSize) => {
    this.setState(
      {
        page3: page,
        pageSize3: pageSize,
      },
      () => {
        this.getBankOrders();
      }
    );
  };
  render() {
    let {
      inviterOrders,
      poolOrders,
      total_count,
      total_count2,
      total_count3,
      pageSize,
      pageSize2,
      pageSize3,
      bankOrders,
    } = this.state;
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
                    {inviterOrders.map((v, i) => {
                      return (
                        <p key={i}>
                          <span>{this.showVLSAddress(v.be_invited)}</span>
                          <span>{this.getFloat(v.amount / 1e6, 6)}VLS</span>
                          <span>{timeStamp2String(v.date + "000")}</span>
                          <span>{v.status == 0 ? "未到账" : "已到账"}</span>
                        </p>
                      );
                    })}
                  </div>
                  <Pagination
                    pageSize={pageSize}
                    defaultCurrent={1}
                    total={total_count}
                    onChange={(page, pageSize) =>
                      this.getCurPage(page, pageSize)
                    }
                  />
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
                    {poolOrders.map((v1, i1) => {
                      return (
                        <p key={v1}>
                          <span>
                            {v1.type?"一键提取"
                              : null}
                          </span>
                          <span>{this.getFloat(v1.amount / 1e6, 6)}VLS</span>
                          <span>{timeStamp2String(v1.date + "000")}</span>
                          <span>{v1.status == 0 ? "未到账" : "已到账"}</span>
                        </p>
                      );
                    })}
                  </div>
                  <Pagination
                    pageSize={pageSize2}
                    total={total_count2}
                    onChange={(page, pageSize) =>
                      this.getCurPage2(page, pageSize)
                    }
                  />
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
                    {
                      bankOrders.map((v2,i2)=>{
                        return (
                          <p key={i2}>
                            <span>
                              {v2.type == 3
                                ? "存款"
                                : v2.type == 4
                                ? "一键提取"
                                : v2.type == 5
                                ? "借款"
                                : v2.type == 6
                                ? "还款"
                                : v2.type == 7
                                ? "一键提取"
                                : null}
                            </span>
                            <span>{this.getFloat(v2.amount / 1e6, 6)}VLS</span>
                            <span>{timeStamp2String(v2.date + "000")}</span>
                            <span>{v2.status == 0 ? "未到账" : "已到账"}</span>
                          </p>
                        );
                      })
                    }
                    
                  </div>
                  <Pagination
                    pageSize={pageSize3}
                    total={total_count3}
                    onChange={(page, pageSize) =>
                      this.getCurPage3(page, pageSize)
                    }
                  />
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