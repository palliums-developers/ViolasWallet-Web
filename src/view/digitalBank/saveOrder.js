import React, { Component } from "react";
import './digitalBank.scss';
import { DatePicker, Breadcrumb, Table, Tag, Space, Select, Button  } from "antd";
import { NavLink } from "react-router-dom";
import WalletConnect from "../../packages/browser/src/index";
import WalletconnectDialog from "../components/walletconnectDialog";
import { digitalBank, getProductId } from "../../utils/bank";
import axios from "axios";
import code_data from "../../utils/code.json";
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { timeStamp2String2 } from '../../utils/timer2';
let url = "https://api4.violas.io";

const { RangePicker } = DatePicker;
const { Option } = Select;


//存款订单
class SaveOrder extends Component {
  constructor() {
    super();
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      saveId: 0,
      showDialog: false,
      allCoin: [],
      allStatus: [],
      withdrawalsList: {},
      withdrawalsAmount: "",
      warning: "",
      total:0,
      types: [
        {
          id: 0,
          type: "当前存款",
        },
        {
          id: 1,
          type: "存款明细",
        },
      ],
      data: [],
      data1: [],
      columns: [
        {
          title: "币种",
          dataIndex: "coin",
          key: "coin",
        },
        {
          title: "本金",
          dataIndex: "money",
          key: "money",
        },
        {
          title: "收益",
          dataIndex: "income",
          key: "income",
        },
        {
          title: "年化收益率",
          key: "yield",
          dataIndex: "yield",
          render: (text) => (
            <label style={{ color: "rgba(19, 183, 136, 1)" }}>
              {Number(text * 100).toFixed(2)}%
            </label>
          ),
        },
        {
          title: "状态",
          key: "status",
          dataIndex: "status",
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
                ? "已存款"
                : text == 1
                ? "已提取"
                : text == -1
                ? "提取失败"
                : text == -2
                ? "存款失败"
                : null}
            </label>
          ),
        },
        {
          title: "操作",
          key: "option",
          dataIndex: "option",

          render: (text) => (
            <label
              onClick={() => this.getOptions()}
              style={{ color: "rgba(112, 56, 253, 1)", cursor: "pointer" }}
            >
              {text}
            </label>
          ),
        },
      ],
      columns1: [
        {
          title: "时间",
          dataIndex: "time",
          key: "time",
          render: (text) => <label>{timeStamp2String2(text + "000")}</label>,
        },
        {
          title: "币种",
          dataIndex: "coin",
          key: "coin",
        },
        {
          title: "数量",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "状态",
          key: "status",
          dataIndex: "status",
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
                ? "已存款"
                : text == 1
                ? "已提取"
                : text == -1
                ? "提取失败"
                : text == -2
                ? "存款失败"
                : null}
            </label>
          ),
        },
      ],
      selectTime1: 0,
      selectTime2: 0,
      selectCoin: "",
      selectStatus: "",
      page:1,
      pageSize:6
    };
  }
  getOptions = () => {
    this.setState(
      {
        showDialog: true,
      },
      () => {
        //存款提取
        let getId = JSON.parse(sessionStorage.getItem("withdrawalsList")).id;
        let coin = JSON.parse(sessionStorage.getItem("withdrawalsList")).coin;
        fetch(
          url +
            "/1.0/violas/bank/deposit/withdrawal?address=" +
            window.sessionStorage.getItem("violas_address") +
            "&&id=" +
            getId
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.data) {
              this.setState(
                {
                  withdrawalsList: res.data,
                },
                () => {
                  //   console.log(this.state.withdrawalsList, ".......");
                }
              );
            }
          });
      }
    );
  };
  async componentWillMount() {
    await this.getNewWalletConnect();
    await this.getDepositProduct();
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  componentDidMount() {
    this.getPage(this.state.page, this.state.pageSize)
    //当前存款
    fetch(
      url +
        "/1.0/violas/bank/deposit/orders?address=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          let newData = [];
          for (let i = 0; i < res.data.length; i++) {
            newData.push({
              coin: res.data[i].currency,
              key: i + 1,
              id: res.data[i].id,
              money: res.data[i].principal / 1e6,
              income: res.data[i].earnings,
              yield: res.data[i].rate,
              status: res.data[i].status,
              option: "提取",
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
    this.getSaveDetail();
    // this.getSaveDetail1();
  }
  async getDepositProduct() {
    axios("https://api4.violas.io/1.0/violas/bank/product/deposit").then(
      async (res) => {
        await this.setState({ depositProduct: res.data.data });
      }
    );
  }
  //币种和状态下拉框
  getSaveDetail = () => {
    fetch(
      url +
        "/1.0/violas/bank/deposit/order/list?address=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          // console.log(res.data,'.........')
          this.setState({
            total:res.data.length
          })
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
  //存款明细
  getSaveDetail1 = (start,end,curreny, status) => {
    let { page,pageSize} = this.state;
    fetch(
      url +
        "/1.0/violas/bank/deposit/order/list?address=" +
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
        if (res.data) {
          // console.log(res.data,'......')
          let newData = [];
          for (let i = 0; i < res.data.length; i++) {
            newData.push({
              time: res.data[i].date,
              coin: res.data[i].currency,
              key: i + 1,

              amount: res.data[i].value / 1e6,
              status: res.data[i].status,
            });
          }
          this.setState({
            // total: newData.length,
            data1: newData,
          });
        } else {
          this.setState({
            data1: res.data,
          });
        }
      });
  };
  onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  //选择获取时间
  onOk = (value) => {
    this.setState({
      selectTime1: new Date(value[0]).getTime(),
      selectTime2: new Date(value[1]).getTime(),
    });
    // console.log(new Date(value[0]).getTime(),'........');
    // console.log("onOk: ", value);
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
  //输入提取数量
  inputWithdrawalsAmount = (e) => {
    if (e.target.value) {
      this.setState({
        withdrawalsAmount: e.target.value,
        warning: "",
      });
    }
  };
  //点击提取
  withdrawals = () => {
    if (this.state.withdrawalsAmount == "") {
      this.setState({
        warning: "请输入提取数量",
      });
    } else {
      this.getDigitalBank();
    }
  };
  async getDigitalBank() {
    let { withdrawalsList, withdrawalsAmount } = this.state;
    let productId = 0;
    let tx = "";
    productId = getProductId(
      withdrawalsList.token_module,
      this.state.depositProduct
    );
    tx = digitalBank(
      "redeem",
      withdrawalsList.token_module,
      withdrawalsAmount * 1e6,
      sessionStorage.getItem("violas_address"),
      withdrawalsList.token_address,
      sessionStorage.getItem("violas_chainId")
    );
    console.log("Digital Bank ", "redeem", tx);
    this.state.walletConnector
      .signTransaction(tx)
      .then(async (res) => {
        // console.log('Digital Bank ', 'redeem', res);
        await this.getBankBroadcast(
          sessionStorage.getItem("violas_address"),
          productId,
          Number(this.state.withdrawalsAmount * 1e6),
          res
        );
      })
      .catch((err) => {
        console.log("Digital Bank ", "redeem", err);
      });
  }
  async getBankBroadcast(address, product_id, value, sigtxn) {
    let api = code_data.bank.broadcast.redeem;
    let parm = {
      address: address,
      product_id: product_id,
      value: parseInt(value),
      sigtxn: sigtxn,
    };
    // console.log(parm);
    axios.post(`https://api4.violas.io${api}`, parm).then((res) => {
      console.log(res.data);
      if (res.data.code == 2000) {
        this.setState({
          warning: "提取成功",
        });
        setTimeout(() => {
          this.setState({
            warning: "",
            withdrawalsAmount: "",
          });
        }, 500);
        setTimeout(() => {
          this.setState({
            showDialog: false,
          });
        }, 1000);
      } else {
        this.setState({
          warning: "提取失败",
        });
        setTimeout(() => {
          this.setState({
            warning: "",
            withdrawalsAmount: "",
          });
        }, 500);
      }
    });
  }
  //点击搜索
  searchFunction = () => {
    let { selectTime1, selectTime2, selectCoin, selectStatus } = this.state;
    this.getSaveDetail1(selectTime1, selectTime2, selectCoin, selectStatus);

    // this.getSaveDetail1(selectCoin, selectStatus);
  };
  //获取每页的页码和条数
  getPage = (page,pageSize) =>{
    this.setState({
      page:page,
      pageSize:pageSize
    },()=>{
      this.getSaveDetail1(this.state.curreny, this.state.status);
    })
  }
  render() {
    let { types, allCoin, allStatus, withdrawalsList, warning } = this.state;
    // console.log(getDialog())
    return (
      <div className="saveOrder">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank">
              {" "}
              <img src="/img/fanhui 2@2x.png" />
              数字银行
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/saveOrder">
              存款订单
            </NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="curSaveLists">
          <div className="tab">
            {types.map((v, i) => {
              return (
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
              );
            })}
          </div>
          {this.state.saveId == 0 ? (
            <Table
              onRow={(record) => {
                return {
                  onClick: () => {
                    // console.log(record);
                    sessionStorage.setItem(
                      "withdrawalsList",
                      JSON.stringify(record)
                    );
                  }, // 点击行
                };
              }}
              columns={this.state.columns}
              dataSource={this.state.data}
              pagination={{ pageSize: 6, position: ["bottomCenter"] }}
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
                          ? "已存款"
                          : v == 1
                          ? "已提取"
                          : v == -1
                          ? "提取失败"
                          : v == -2
                          ? "存款失败"
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
                  pageSize: 6,
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
                  <input
                    placeholder="请输入提取数量"
                    value={this.state.withdrawalsAmount}
                    onChange={(e) => this.inputWithdrawalsAmount(e)}
                  />
                  <label>{withdrawalsList.token_show_name}</label>
                </div>
                <div className="inputDescr">
                  <p>
                    <img src="/img/kyye.png" />
                    可提数量：
                    <span>
                      {withdrawalsList.available_quantity / 1e6}
                      {withdrawalsList.token_show_name}
                    </span>
                  </p>
                  <p
                    onClick={() => {
                      this.setState({
                        withdrawalsAmount:
                          withdrawalsList.available_quantity / 1e6,
                      });
                    }}
                  >
                    全部
                  </p>
                </div>
                <div className="extractDescr">
                  <img src="/img/编组 4@2x.png" />
                  <p>
                    如果您当前有借贷操作，则需将部分存款作为质押金。提取质押金需还对应数量的借款金额。
                  </p>
                </div>
                <div className="foot">
                  <p className="btn" onClick={() => this.withdrawals()}>
                    提 取
                  </p>
                  <p
                    className={
                      this.state.warning == "提取成功"
                        ? "descr descrWarn"
                        : "descr descrRed"
                    }
                  >
                    {warning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SaveOrder;