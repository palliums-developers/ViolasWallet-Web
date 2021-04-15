import React, { Component } from "react";
import './digitalBank.scss';
import {
  ConfigProvider,
  DatePicker,
  Breadcrumb,
  Table,
  Tag,
  Space,
  Select,
  Button,
} from "antd";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import { NavLink } from "react-router-dom";
import WalletConnect from "../../packages/browser/index";
import WalletconnectDialog from "../components/walletconnectDialog";
import { digitalBank, getProductId } from "../../utils/bank";
import axios from "axios";
import code_data from "../../utils/code.json";
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { timeStamp2String2 } from '../../utils/timer2';
import intl from "react-intl-universal";
let url = "https://api4.violas.io";
let url1 = "https://api.violas.io";
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
      withdrawalsWay: "",
      total: 0,
      curTotal: 0,
      locale: enUS,
      types: [
        {
          id: 0,
          type: intl.get("Current Deposit"),
        },
        {
          id: 1,
          type: intl.get("Deposit Records"),
        },
      ],
      data: [],
      data1: [],
      columns: [
        {
          title: intl.get("Token"),
          dataIndex: "coin",
          key: "coin",
        },
        {
          title: intl.get("Principal"),
          dataIndex: "money",
          key: "money",
        },
        {
          title: intl.get("Earnings"),
          dataIndex: "income",
          key: "income",
        },
        {
          title: intl.get("APY"),
          key: "yield",
          dataIndex: "yield",
          render: (text) => (
            <label style={{ color: "rgba(19, 183, 136, 1)" }}>
              {Number(text * 100).toFixed(2)}%
            </label>
          ),
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
                  : text == -1
                  ? "colorRed"
                  : text == -2
                  ? "colorRed"
                  : null
              }
            >
              {text == 0
                ? intl.get("Deposited")
                : text == 1
                ? intl.get("Withdrew")
                : text == -1
                ? intl.get("Withdrawal Failed")
                : text == -2
                ? intl.get("Deposit Failed")
                : null}
            </label>
          ),
        },
        {
          title: intl.get("operation"),
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
          title: intl.get("Time"),
          dataIndex: "time",
          key: "time",
          render: (text) => <label>{timeStamp2String2(text + "000")}</label>,
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
                  : text == -1
                  ? "colorRed"
                  : text == -2
                  ? "colorRed"
                  : null
              }
            >
              {text == 0
                ? intl.get("Deposited")
                : text == 1
                ? intl.get("Withdrew")
                : text == -1
                ? intl.get("Withdrawal Failed")
                : text == -2
                ? intl.get("Deposit Failed")
                : null}
            </label>
          ),
        },
      ],
      selectTime1: 0,
      selectTime2: 0,
      selectCoin: "",
      selectStatus: "",
      page: 1,
      pageSize: 6,
      curPage: 1,
      curPageSize: 6,
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
    // this.getPage(this.state.page, this.state.pageSize)
    this.getCurSaveDetail();
    this.getSaveDetail();
    this.getSaveDetail1();

  }
  async getDepositProduct() {
    axios(url + "/1.0/violas/bank/product/deposit").then(async (res) => {
      await this.setState({ depositProduct: res.data.data });
    });
  }
  //当前存款
  getCurSaveDetail = () => {
    let { curPage, curPageSize } = this.state;
    fetch(
      url +
        "/1.0/violas/bank/deposit/orders?address=" +
        window.sessionStorage.getItem("violas_address") +
        "&limit=" +
        curPageSize +
        "&offset=" +
        (curPage - 1) * curPageSize
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length > 0) {
          // console.log(res.data)
          this.setState({
            curTotal: res.data[0].total_count,
          });
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
              option: intl.get("Withdrawal"),
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
  //币种和状态下拉框
  getSaveDetail = () => {
    fetch(
      url +
        "/1.0/violas/bank/deposit/order/list?address=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length > 0) {
          let allCoin = [intl.get("All")];
          let allStatus = [intl.get("All")];
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
        }
      });
  };
  //存款明细
  getSaveDetail1 = (start, end, curreny, status) => {
    let { page, pageSize } = this.state;
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
        if (res.data.length > 0) {
          this.setState({
            total: res.data[0].total_count,
          });
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
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
  };
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
  //输入提取数量
  inputWithdrawalsAmount = (e) => {
    if (e.target.value) {
      this.setState({
        withdrawalsAmount: e.target.value,
        warning: "",
      });
    } else {
      this.setState({
        withdrawalsAmount: "",
      });
    }
  };
  //点击提取
  withdrawals = () => {
    if (this.state.withdrawalsAmount == "") {
      this.setState({
        warning: intl.get("Enter withdrawal amount"),
      });
    } else {
      if (
        this.state.withdrawalsAmount ==
        this.state.withdrawalsList.available_quantity / 1e6
      ) {
        this.setState(
          {
            withdrawalsWay: "All",
          },
          () => {
            this.getDigitalBank();
          }
        );
      } else {
        this.getDigitalBank();
      }
    }
  };
  async getDigitalBank() {
    let { withdrawalsList, withdrawalsAmount, withdrawalsWay } = this.state;
    let productId = 0;
    let tx = "";
    productId = getProductId(
      withdrawalsList.token_module,
      this.state.depositProduct
    );
    tx = digitalBank(
      "redeem",
      withdrawalsList.token_module,
      withdrawalsWay == "All" ? "0" : "" + withdrawalsAmount * 1e6,
      sessionStorage.getItem("violas_address"),
      withdrawalsList.token_address,
      parseInt(sessionStorage.getItem("violas_chainId"))
    );
    console.log("Digital Bank ", "redeem", tx);
    this.state.walletConnector
      .signTransaction(tx)
      .then(async (res) => {
        // console.log('Digital Bank ', 'redeem', res);
        await this.getBankBroadcast(
          sessionStorage.getItem("violas_address"),
          productId,
          withdrawalsWay == "All" ? 0 : Number(withdrawalsAmount * 1e6),
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
    axios.post(`${url}${api}`, parm).then((res) => {
      // console.log(res.data);
      if (res.data.code == 2000) {
        this.setState({
          warning: intl.get("Withdrawal Successful"),
        });
        setTimeout(() => {
          this.setState({
            warning: "",
            withdrawalsAmount: "",
          });
        }, 500);
        setTimeout(() => {
          this.setState(
            {
              showDialog: false,
            },
            () => {
              window.location.reload();
            }
          );
        }, 1000);
      } else {
        this.setState({
          warning: intl.get("Withdrawal Failed"),
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
  //获取当前存款每页的页码和条数
  getCurPage = (page, pageSize) => {
    this.setState(
      {
        curPage: page,
        curPageSize: pageSize,
      },
      () => {
        this.getCurSaveDetail();
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
        this.getSaveDetail1();
      }
    );
  };
  render() {
    let { types, allCoin, allStatus, withdrawalsList, warning } = this.state;
    
    return (
      <div className="saveOrder">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank">
              {" "}
              <img src="/img/fanhui 2@2x.png" />
              {intl.get("Bank")}
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/saveOrder">
              {intl.get("Deposit Orders")}
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
                      "withdrawalsList",
                      JSON.stringify(record)
                    );
                  }, // 点击行
                };
              }}
              columns={this.state.columns}
              dataSource={this.state.data}
              pagination={{
                pageSize: 6,
                position: ["bottomCenter"],
                total: this.state.curTotal,
                onChange: (page, pageSize) => this.getCurPage(page, pageSize),
              }}
            />
          ) : (
            <div className="saveDetail">
              <div className="selector">
                <ConfigProvider locale={window.localStorage.getItem('local') === 'CN' ? zhCN : enUS}>
                  <Space
                    key={
                      locale
                        ? locale.locale
                        : "en"
                    }
                    direction="vertical"
                    size={12}
                  >
                    <RangePicker
                      locale={locale}
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={this.onChange}
                      onOk={this.onOk}
                    />
                  </Space>
                </ConfigProvider>
                <Select
                  showSearch
                  allowClear={true}
                  style={{ width: 200 }}
                  placeholder={intl.get("All Tokens")}
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
                  placeholder={intl.get("All State")}
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
                          ? intl.get("Deposited")
                          : v == 1
                          ? intl.get("Withdrew")
                          : v == -1
                          ? intl.get("Withdrawal Failed")
                          : v == -2
                          ? intl.get("Deposit Failed")
                          : intl.get("All")}
                      </Option>
                    );
                  })}
                </Select>
                <span className="btn" onClick={() => this.searchFunction()}>
                  {intl.get("Search")}
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
                  <h4>{intl.get("Withdrawal")}</h4>
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
                    type="number"
                    placeholder={intl.get("Enter withdrawal amount")}
                    onChange={(e) => this.inputWithdrawalsAmount(e)}
                    value={this.state.withdrawalsAmount}
                  />
                  <label>{withdrawalsList.token_show_name}</label>
                </div>
                <div className="inputDescr">
                  <p>
                    <img src="/img/kyye.png" />
                    {intl.get("Amount1")}：
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
                    {intl.get("All")}
                  </p>
                </div>
                <div className="extractDescr">
                  <img src="/img/编组 4@2x.png" />
                  <p>
                    {intl.get(
                      "If you have loans,some of deposits will be used as collacteral.You can withdraw deposits after payoff the loans."
                    )}
                  </p>
                </div>
                <div className="foot">
                  <p className="btn" onClick={() => this.withdrawals()}>
                    {intl.get("Withdrawal")}
                  </p>
                  <p
                    className={
                      this.state.warning == intl.get("Withdrawal Successful")
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