import React, { Component } from "react";
import './digitalBank.scss';
import { DatePicker, Breadcrumb, Table, Tag, Space, Select } from "antd";
import { NavLink } from "react-router-dom";
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { timeStamp2String } from '../../utils/timer';
import { timeStamp2String2 } from "../../utils/timer2";
import intl from "react-intl-universal";
let url = "https://api4.violas.io";
let url1 = "https://api.violas.io";
const { RangePicker } = DatePicker;
const { Option } = Select;


//借款订单
class BorrowOrder extends Component {
  constructor() {
    super();
    this.state = {
      saveId: 0,
      detailId: 0,
      showDialog: false,
      expandedRowKeys: [],
      allCoin: [],
      allStatus: [],
      displayMenu: false,
      borrowId: "",
      total: 0,
      curTotal: 0,
      borrowDetails: [
        {
          id: 0,
          type: intl.get("Borrowing Details"),
        },
        {
          id: 1,
          type: intl.get("Repayment Details"),
        },
        {
          id: 2,
          type: intl.get("Liquidation Details"),
        },
      ],
      types: [
        {
          id: 0,
          type: intl.get("Current Borrowing"),
        },
        {
          id: 1,
          type: intl.get("Borrowing Records"),
        },
      ],
      data: [],
      data1: [],
      secondData: [],
      secondData1: [],
      secondData2: [],
      selectTime1: 0,
      selectTime2: 0,
      selectCoin: "",
      selectStatus: "",
      columns: [
        {
          title: intl.get("Token"),
          dataIndex: "coin",
          key: "coin",
        },
        {
          title: intl.get("Rest loan amount"),
          dataIndex: "money",
          key: "money",
        },
        {
          title: "剩余可借",
          dataIndex: "income",
          key: "income",
        },
        {
          title: intl.get("operation"),
          key: "option",
          dataIndex: "option",

          render: (texts) => (
            <div style={{ display: "flex" }}>
              {texts.map((val, i) => {
                if (val.name == "详情") {
                  return (
                    <label
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "50px",
                        color: "rgba(112, 56, 253, 1)",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {val.name}
                      {val.displayMenu ? (
                        <img
                          style={{
                            width: "12px",
                            height: "12px",
                            marginLeft: "5px",
                          }}
                          src="/img/编组 16@2x (3).png"
                        />
                      ) : (
                        <img
                          style={{
                            width: "12px",
                            height: "12px",
                            marginLeft: "5px",
                          }}
                          src="/img/编组 16@2x (2).png"
                        />
                      )}
                    </label>
                  );
                } else if (val.name == "还款") {
                  return (
                    <label
                      key={i}
                      onClick={() => {
                        this.props.history.push(
                          "/homepage/home/digitalBank/repayment"
                        );
                      }}
                      style={{
                        marginRight: "50px",
                        color: "rgba(112, 56, 253, 1)",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {val.name}
                    </label>
                  );
                }
                return (
                  <label
                    key={i}
                    onClick={() => {
                      this.props.history.push(
                        "/homepage/home/digitalBank/borrowDetails"
                      );
                    }}
                    style={{
                      marginRight: "50px",
                      color: "rgba(112, 56, 253, 1)",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {val.name}
                  </label>
                );
              })}
            </div>
          ),
          onCell: (record) => {
            return {
              onClick: () => this.expandRowByKey(record.key),
            };
          },
        },
      ],
      columns1: [
        {
          title: intl.get("Time"),
          dataIndex: "time",
          key: "time",
        },
        {
          title: intl.get("Principal"),
          dataIndex: "coin",
          key: "coin",
        },
        {
          title: intl.get("Amount"),
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: intl.get("Gas fee"),
          dataIndex: "gas",
          key: "gas",
        },
        {
          title: intl.get("State"),
          key: "status",
          dataIndex: "status",
          render: (text) => (
            <label
              className={
                text == 0
                  ? "colorGre"
                  : text == 1
                  ? "colorGre"
                  : text == 2
                  ? "colorGre"
                  : text == -1
                  ? "colorRed"
                  : text == -2
                  ? "colorRed"
                  : null
              }
            >
              {text == 0
                ? intl.get("Borrowed")
                : text == 1
                ? intl.get("Repaid")
                : text == -1
                ? intl.get("Borrow failed")
                : text == -2
                ? intl.get("Repayment failed")
                : text == 2
                ? "已清算"
                : null}
            </label>
          ),
        },
      ],
      secondColumns: [
        {
          title: intl.get("Time"),
          dataIndex: "date",
          key: "date",
          render: (text) => <label>{timeStamp2String(text + "000")}</label>,
        },
        {
          title: intl.get("Amount"),
          dataIndex: "amount",
          key: "amount",
          render: (text) => <label>{text / 1e6}</label>,
        },
        {
          title: intl.get("State"),
          dataIndex: "status",
          key: "status",
          render: (text) => (
            <label
              className={
                text == 0
                  ? "colorGre"
                  : text == 1
                  ? "colorGre"
                  : text == -1
                  ? "colorRed"
                  : text == -2
                  ? "colorRed"
                  : null
              }
            >
              {text == 0
                ? intl.get("Borrowed")
                : text == 1
                ? intl.get("Repaid")
                : text == -1
                ? intl.get("Borrow failed")
                : text == -2
                ? intl.get("Repayment failed")
                : null}
            </label>
          ),
        },
      ],
      secondColumns1: [
        {
          title: intl.get("Time"),
          dataIndex: "date",
          key: "date",
          render: (text) => <label>{timeStamp2String(text)}</label>,
        },
        {
          title: intl.get("Amount"),
          dataIndex: "amount",
          key: "amount",
          render: (text) => <label>{text / 1e6}</label>,
        },
        {
          title: intl.get("Gas fee"),
          dataIndex: "gas",
          key: "gas",
          render: () => <label>--</label>,
        },
        {
          title: intl.get("State"),
          dataIndex: "status",
          key: "status",
          render: (text) => (
            <label
              className={
                text == 0
                  ? "colorGre"
                  : text == 1
                  ? "colorGre"
                  : text == -1
                  ? "colorRed"
                  : text == -2
                  ? "colorRed"
                  : text == 2
                  ? "colorGre"
                  : null
              }
            >
              {text == 0
                ? intl.get("Borrowed")
                : text == 1
                ? intl.get("Repaid")
                : text == -1
                ? intl.get("Borrow failed")
                : text == -2
                ? intl.get("Repayment failed")
                : text == 2
                ? "已清算"
                : null}
            </label>
          ),
        },
      ],
      secondColumns2: [
        {
          title: intl.get("Time"),
          dataIndex: "date",
          key: "date",
          render: (text) => <label>{timeStamp2String(text + "000")}</label>,
        },
        {
          title: "被清算",
          dataIndex: "cleared",
          key: "cleared",
        },
        {
          title: "已抵扣",
          dataIndex: "deductioned",
          key: "deductioned",
        },
        {
          title: intl.get("State"),
          dataIndex: "status",
          key: "status",
          render: (text) => (
            <label
              className={
                text == 0
                  ? "colorGre"
                  : text == 1
                  ? "colorGre"
                  : text == -1
                  ? "colorRed"
                  : text == -2
                  ? "colorRed"
                  : null
              }
            >
              {text == 0
                ? intl.get("Borrowed")
                : text == 1
                ? intl.get("Repaid")
                : text == -1
                ? intl.get("Borrow failed")
                : text == -2
                ? intl.get("Repayment failed")
                : null}
            </label>
          ),
        },
      ],
      secondAllData: [],
      page: 1,
      pageSize: 6,
      curPage: 1,
      curPageSize: 6,
    };
  }
  componentDidMount() {
    this.getCurBorrowDetail();
    this.getBorrowDetail();
    this.getBorrowDetail1();
  }
  //选择获取时间
  onOk = (value) => {
    this.setState({
      selectTime1: Math.ceil(new Date(value[0]).getTime() / 1000),
      selectTime2: Math.ceil(new Date(value[1]).getTime() / 1000),
    });
  };
  //选择币种
  getOptionCoins = (value) => {
    this.setState({
      selectCoin: value,
    });
  };
  //选择状态
  getOptionStatus = (value) => {
    this.setState({
      selectStatus: value,
    });
  };
  // 当前借款
  getCurBorrowDetail = () => {
    let { curPage, curPageSize } = this.state;
    fetch(
      url +
        "/1.0/violas/bank/borrow/orders?address=" +
        window.sessionStorage.getItem("violas_address")+"&limit=" +
        curPageSize +
        "&offset=" +
        (curPage - 1) * curPageSize
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            curTotal: res.data[0].total_count,
          });
          let newData = [];
          // console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            newData.push({
              coin: res.data[i].name,
              key: i + 1,
              money: res.data[i].amount / 1e6,
              id: res.data[i].id,
              income: res.data[i].available_borrow / 1e6,
              option: [
                {
                  id: 0,
                  name: "还款",
                },
                {
                  id: 1,
                  name: "借款",
                },
                {
                  id: 2,
                  name: "详情",
                  displayMenu: false,
                },
              ],
              borrowDetails: [
                {
                  id: 0,
                  type: "借款明细",
                },
                {
                  id: 1,
                  type: "还款明细",
                },
                {
                  id: 2,
                  type: "清算明细",
                },
              ],
              detailId: 0,
            });
          }
          this.setState({
            data: newData,
          });
        } else {
          this.setState({
            data: res.data,
          });
        }
      });
  };
  //币种，状态下拉框
  getBorrowDetail = () => {
    fetch(
      url +
        "/1.0/violas/bank/borrow/order/list?address=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          let allCoin = ["全部"];
          let allStatus = ["全部"];
          for (let i = 0; i < res.data.length; i++) {
            if (allCoin.length > 0) {
              allCoin.push(res.data[i].currency);
              let newCoin = [...new Set(allCoin)];
              this.setState({
                allCoin: newCoin,
              });
            } else {
              allCoin.push(res.data[i].currency);
            }

            if (allStatus.length > 0) {
              if (res.data[i].status >= 0) {
                allStatus.push(res.data[i].status);
                let newStatus = [...new Set(allStatus)];
                this.setState({
                  allStatus: newStatus,
                });
              }
            } else {
              if (res.data[i].status >= 0) {
                allStatus.push(res.data[i].status);
              }
            }
          }
        } else {
          this.setState({
            data1: res.data,
          });
        }
      });
  };
  //借款明细
  getBorrowDetail1 = (start, end, curreny, status) => {
    let { page, pageSize } = this.state;
    fetch(
      url +
        "/1.0/violas/bank/borrow/order/list?address=" +
        window.sessionStorage.getItem("violas_address") +
        "&curreny=" +
        curreny +
        "&status=" +
        status +
        "&start=" +
        start +
        "&end=" +
        end +
        "&limit=" +
        pageSize +
        "&offset=" +
        (page - 1) * pageSize
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            total: res.data[0].total_count,
          });
          let newData = [];
          for (let i = 0; i < res.data.length; i++) {
            newData.push({
              time: timeStamp2String2(res.data[i].date + "000"),
              gas: "--",
              coin: res.data[i].currency,
              key: i + 1,
              amount: res.data[i].value / 1e6,
              status: res.data[i].status,
            });
          }
          this.setState({
            data1: newData,
          });
        } else {
          this.setState({
            data1: res.data,
          });
        }
      });
  };
  //当前借款中子菜单
  getCurBorrowMenu = (id) => {
    fetch(
      url +
        "/1.0/violas/bank/borrow/order/detail?address=" +
        sessionStorage.getItem("violas_address") +
        "&&id=" +
        this.state.borrowId +
        "&&q=" +
        id
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            secondAllData: res.data.list,
          });
          if (id == 0) {
            this.setState({
              secondData: res.data.list,
            });
          } else if (id == 1) {
            this.setState({
              secondData1: res.data.list,
            });
          } else if (id == 2) {
            this.setState({
              secondData2: res.data.list,
            });
          }
        }
      });
  };
  //弹出二级菜单
  expandRowByKey = (key) => {
    this.setState(
      {
        borrowId: this.state.data[key - 1].id,
      },
      () => {
        this.getCurBorrowMenu(this.state.detailId);
      }
    );
    if (this.state.data[key - 1].option[2].displayMenu == false) {
      this.state.data[key - 1].option[2].displayMenu = true;
    } else {
      this.state.data[key - 1].option[2].displayMenu = false;
    }

    const { expandedRowKeys } = this.state;
    const index = expandedRowKeys.findIndex((item) => key === item);
    let keys = [...expandedRowKeys];
    if (index > -1) keys = keys.filter((item) => key !== item);
    else keys.push(key);
    this.setState({ expandedRowKeys: keys });
  };
  // onExpand = (expanded, record) => {
  //     console.log(expanded, record.key,'........')
  //     this.expandRowByKey(record.key);
  // };
  onChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
  };
  //二级菜单内容
  expandedRowRender = (record, index, indent, expanded) => {
    //  console.log(this.state.secondColumns);
    return (
      <div className="secendMenu">
        <div className="tab">
          {this.state.data[record.key - 1].borrowDetails.map((v, i) => {
            return (
              <span
                key={i}
                className={
                  v.id == this.state.data[record.key - 1].detailId
                    ? "active1"
                    : null
                }
                onClick={() => {
                  this.getCurBorrowMenu(v.id);
                  this.state.data[record.key - 1].detailId = v.id;
                }}
              >
                {v.type}
              </span>
            );
          })}
        </div>

        {this.state.data[record.key - 1].detailId == 0 ? (
          <Table
            columns={this.state.secondColumns}
            dataSource={this.state.secondData}
            pagination={false}
          />
        ) : this.state.data[record.key - 1].detailId == 1 ? (
          <Table
            columns={this.state.secondColumns1}
            dataSource={this.state.secondData1}
            pagination={false}
          />
        ) : this.state.data[record.key - 1].detailId == 2 ? (
          <Table
            columns={this.state.secondColumns2}
            dataSource={this.state.secondData2}
            pagination={false}
          />
        ) : null}

        {this.state.secondAllData.length <= 0 ? null : (
          <div className="pageBtns">
            <span>
              <img src="/img/pageAllLeft.png" />
            </span>
            <div className="pageBtn">
              <span>
                <img src="/img/pageLeft.png" />
              </span>
              <span>
                <img src="/img/pageRight.png" />
              </span>
            </div>
            <span>
              <img src="/img/pageAllRight.png" />
            </span>
          </div>
        )}
      </div>
    );
  };

  //获取当前借款每页的页码和条数
  getCurPage = (page, pageSize) => {
    this.setState(
      {
        curPage: page,
        curPageSize: pageSize,
      },
      () => {
        this.getCurBorrowDetail();
      }
    );
  };
  //获取每页的页码和条数
  getPage = (page, pageSize) => {
    this.setState(
      {
        page: page,
        pageSize: pageSize,
      },
      () => {
        this.getBorrowDetail1();
      }
    );
  };
  //点击搜索
  searchFunction = () => {
    let { selectTime1, selectTime2, selectCoin, selectStatus } = this.state;
    // console.log(selectCoin, selectStatus, ".......");
    this.getBorrowDetail1(selectTime1, selectTime2, selectCoin, selectStatus);
  };
  render() {
    let { types, expandedRowKeys, allStatus, allCoin, secondData } = this.state;
    return (
      <div className="borrowOrder">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank">
              {" "}
              <img src="/img/fanhui 2@2x.png" />
              {intl.get("Bank")}
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/borrowOrder">
              {intl.get("Borrowing Orders")}
            </NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="curSaveLists">
          <div className="tab">
            {types.map((v, i) => {
              return (
                <div>
                  <span
                    key={i}
                    className={this.state.saveId == v.id ? "active" : null}
                    onClick={() => {
                      this.setState({
                        saveId: v.id,
                      });
                    }}
                  >
                    {v.type}
                  </span>
                  {this.state.saveId == v.id ? <i></i> : null}
                </div>
              );
            })}
          </div>
          {this.state.saveId == 0 ? (
            <Table
              onRow={(record) => {
                return {
                  onClick: () => {
                    sessionStorage.setItem(
                      "repayCurList",
                      JSON.stringify(record)
                    );
                  }, // 点击行
                };
              }}
              expandable={{
                expandedRowKeys: expandedRowKeys,
                // onExpand: (expanded) => this.onExpand(expanded),
                expandedRowRender: (record) => this.expandedRowRender(record),
              }}
              columns={this.state.columns}
              dataSource={this.state.data}
              pagination={{
                pageSize: this.state.curPageSize,
                position: ["bottomCenter"],
                total: this.state.curTotal,
                onChange: (page, pageSize) => this.getCurPage(page, pageSize),
              }}
            />
          ) : (
            <div className="saveDetail">
              <div className="selector">
                <Space direction="vertical" size={12}>
                  <RangePicker
                    locale={locale}
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={this.onChange}
                    onOk={this.onOk}
                  />
                </Space>
                <Select
                  showSearch
                  allowClear={true}
                  style={{ width: 200 }}
                  placeholder="全部币种"
                  optionFilterProp="children"
                  onChange={this.getOptionCoins}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {allCoin.map((v, i) => {
                    return (
                      <Option key={i} value={v}>
                        {v}
                      </Option>
                    );
                  })}
                </Select>
                <Select
                  showSearch
                  allowClear={true}
                  style={{ width: 200 }}
                  placeholder="全部状态"
                  optionFilterProp="children"
                  onChange={this.getOptionStatus}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {allStatus.map((v, i) => {
                    return (
                      <Option key={i} value={v}>
                        {v == 0
                          ? "已借款"
                          : v == 1
                          ? "已还款"
                          : v == 2
                          ? "已清算"
                          : v == -1
                          ? "借款失败"
                          : v == -2
                          ? "还款失败"
                          : "全部"}
                      </Option>
                    );
                  })}
                </Select>
                <span className="btn" onClick={() => this.searchFunction()}>
                  搜索
                </span>
              </div>
              <Table
                locale={locale}
                columns={this.state.columns1}
                dataSource={this.state.data1}
                pagination={{
                  pageSize: this.state.pageSize,
                  position: ["bottomCenter"],
                  total: this.state.total,
                  onChange: (page, pageSize) => this.getPage(page, pageSize),
                }}
              />
            </div>
          )}
        </div>
        {this.state.showDialog ? (
          <div className="extractMark">
            <div className="extractContent">
              <div className="extractList">
                <div className="head">
                  <h4>提取</h4>
                  <i
                    onClick={() => {
                      this.setState({
                        showDialog: false,
                      });
                    }}
                  >
                    <img src="/img/chahao.png" />
                  </i>
                </div>
                <div className="inputDiv">
                  <input placeholder="请输入提取数量" />
                  <label>VLS</label>
                </div>
                <div className="inputDescr">
                  <p>
                    <img src="/img/kyye.png" />
                    可提数量：<span>20VLS</span>
                  </p>
                  <p>全部</p>
                </div>
                <div className="extractDescr">
                  <img src="/img/编组 4@2x.png" />
                  <p>
                    如果您当前有借贷操作，则需将部分存款作为质押金。提取质押金需还对应数量的借款金额。
                  </p>
                </div>
                <div className="foot">
                  <p className="btn" onClick={() => {}}>
                    提 取
                  </p>
                  <p className="descr">{"请输入提取数量"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default BorrowOrder;