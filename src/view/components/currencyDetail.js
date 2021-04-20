import React, { Component } from "react";
import { connect } from "react-redux";
import { timeStamp2String } from '../../utils/timer';
import { Pagination } from 'antd';
import intl from "react-intl-universal";
import BigNumber from "bignumber.js";
import dealwith_tbtc1_txid from "../../utils/tbtc1"
// import { withRouter } from "react-router-dom";
import '../app.scss';
let url1 = 'https://api.violas.io'
let url = "https://api4.violas.io"
let btcUrl = "https://tbtc1.trezor.io";

//币种详情
class CurrencyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [
        {
          name: intl.get("All"),
          type: "all",
        },
        {
          name: intl.get("Input"),
          type: "into",
        },
        {
          name: intl.get("Output"),
          type: "out",
        },
      ],
      types1: [
        {
          name: intl.get("All"),
          type: "all",
        },
      ],
      navType: "all",
      address: "7f4644ae2b51b65bd3c9d414aa853407",
      dataList: [],
      dataList1: [],
      total: 0,
      page: 0,
      pageSize: 6,
      page1: 1,
      pageSize1: 3,
      curIndex: 0,
      dis: false,
      detailAddrs: "",
      name: "",
      type: "",
    };
  }
  async componentWillMount() {
    // console.log(this.props.detailAddrs)
    if (this.props.detailAddrs) {
      this.setState(
        {
          detailAddrs: this.props.detailAddrs,
          name: this.props.name,
        },
        () => {
          this.getNavData();
        }
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        detailAddrs: nextProps.detailAddrs,
        name: nextProps.nameType,
        type: nextProps.icon
          .split("/")
          [nextProps.icon.split("/").length - 1].split(".")[0],
      },
      () => {
        this.getNavData();
      }
    );
  }
  getSubStr(str) {
    if (str == null) {
      return "null";
    }
    var subStr1 = str && str.substr(0, 10);
    var subStr2 = str && str.substr(str.length - 5, 5);
    var subStr = subStr1 + "..." + subStr2;
    return subStr;
  }
  // 获取 UTXO
  getUTXO() {
    fetch(
      "https://tbtc1.trezor.io/api/v2/address/" +
        window.sessionStorage.getItem("btc_address") +
        "?pageSize=" +
        this.state.pageSize1 +
        "&details=txs&page=" +
        (this.state.page1 - 1) * this.state.pageSize1
    )
      .then((res) => res.json())
      .then((res) => {
        let transactions = dealwith_tbtc1_txid(res);
        // console.log(dealwith_tbtc1_txid(res))
         if (this.state.navType == "all") {
           if (this.state.total == 0) {
             this.setState({
               total: transactions.length,
               dataList1: transactions,
             });
           }
         }
      });
  }
  getNavData() {
    let { detailAddrs, type } = this.state;

    if (type == "btc") {
      this.getUTXO();
    } else {
      if (this.state.navType == "all") {
        if (this.state.total == 0) {
          fetch(
            ((url + "/1.0/" + type + "/transaction?addr=" + detailAddrs)+"&currency="+this.state.name)
          )
            .then((res) => res.json())
            .then((res) => {
              if (res.data) {
                this.setState({
                  total: res.data.length,
                });
              }
            });
        }

        fetch(
          url +
            "/1.0/" +
            type +
            "/transaction?addr=" +
            detailAddrs +
            "&&offset=" +
            this.state.page +
            "&&limit=" +
            this.state.pageSize
        )
          .then((res) => res.json())
          .then((res) => {
            // console.log(res.data.length)

            this.setState({
              dataList: res.data,
            });
          });
      } else if (this.state.navType == "into") {
        fetch(
          url +
            "/1.0/" +
            type +
            "/transaction?addr=" +
            detailAddrs +
            "&&flows=1" +
            "&&offset=" +
            this.state.page +
            "&&limit=" +
            this.state.pageSize
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              total: res.data.length,
              dataList: res.data,
            });
          });
      } else if (this.state.navType == "out") {
        fetch(
          url +
            "/1.0/" +
            type +
            "/transaction?addr=" +
            detailAddrs +
            "&&flows=0" +
            "&&offset=" +
            this.state.page +
            "&&limit=" +
            this.state.pageSize
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              total: res.data.length,
              dataList: res.data,
            });
          });
      }
    }
  }
  // showDetails = () => {
  //     this.props.showDetails();
  // };

  onChange = (page, pageSize) => {
    // console.log(page, pageSize)
    this.setState(
      {
        page: page,
        pageSize: pageSize,
        // curIndex: 9,
      },
      () => {
        this.getNavData();
      }
    );
  };
  onChange1 = (page, pageSize) => {
    // console.log(page, pageSize)
    this.setState(
      {
        page1: page,
        pageSize1: pageSize,
      },
      () => {
        this.getNavData();
      }
    );
  };
  handleCopy = () => {
    const spanText = document.getElementById("add").innerText;
    const oInput = document.createElement("input");
    oInput.value = spanText;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = "oInput";
    oInput.style.display = "none";
    document.body.removeChild(oInput);
    this.setState({
      dis: true,
    });
    let Timer = setInterval(() => {
      this.setState({
        dis: false,
      });
    }, 1000);
  };
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    return number;
  }
  render() {
    let {
      types,
      types1,
      navType,
      dataList,
      dataList1,
      total,
      dis,
    } = this.state;
    let { detailAddrs, nameType, icon, rate, balance } = this.props;

    return (
      <div className="currencyDetail">
        <h4 onClick={() => this.props.showDetails(false)}>
          <i>
            <img src="/img/编组备份 3@2x.png" />
          </i>
          {intl.get("Currency Detail")}
        </h4>

        <div className="detailsBalance">
          <p className="title">
            <img src={icon} />
            <label>{nameType}</label>
          </p>
          <div className="bal">
            <span>{balance}</span>
            <span>≈${rate}</span>
          </div>
          <div className="addressCode">
            <span id="add">{detailAddrs}</span>
            {dis ? (
              <i onClick={() => this.handleCopy()}>
                <img src="/img/fuzhi 3@2x.png" />
              </i>
            ) : (
              <i onClick={() => this.handleCopy()}>
                <img src="/img/Fill 3@2x.png" />
              </i>
            )}
          </div>
        </div>
        <div className="detailContent">
          <div className="detailNav">
            {this.state.type == "btc"
              ? types1.map((val, ind) => {
                  return (
                    <span
                      key={ind}
                      onClick={() => {
                        this.setState(
                          {
                            navType: val.type,
                          },
                          () => {
                            this.getNavData();
                          }
                        );
                      }}
                      className={navType == val.type ? "active" : null}
                    >
                      {val.name}
                    </span>
                  );
                })
              : types.map((val, ind) => {
                  return (
                    <span
                      key={ind}
                      onClick={() => {
                        this.setState(
                          {
                            navType: val.type,
                          },
                          () => {
                            this.getNavData();
                          }
                        );
                      }}
                      className={navType == val.type ? "active" : null}
                    >
                      {val.name}
                    </span>
                  );
                })}
          </div>
          <div className="detailLists">
            {this.state.type == "btc"
              ? dataList1.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="detailList"
                      onClick={() => {
                        this.props.showDetails(false);
                        this.props.curDataFun(v);
                        this.props.showDetails1(true);
                      }}
                    >
                      <i>
                        {v.type == "vin" ? (
                          <img src="/img/编组 13备份 2@2x.png" />
                        ) : (
                          <img src="/img/编组 13备份 3@2x.png" />
                        )}
                      </i>
                      <div className="listCenter">
                        <p>{this.getSubStr(v.show_address)}</p>
                        <p>{timeStamp2String(v.timestamp + "000")}</p>
                      </div>
                      <div className="listResult">
                        <p className="gre">
                          {v.sender ? "-" : "+"}
                          {v.show_value}
                        </p>
                        {/* <p className="org">交易中</p> */}
                      </div>
                    </div>
                  );
                })
              : dataList.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="detailList"
                      onClick={() => {
                        this.props.showDetails(false);
                        this.props.curDataFun(v);
                        this.props.showDetails1(true);
                      }}
                    >
                      <i>
                        {v.sender == detailAddrs ? (
                          <img src="/img/编组 13备份 3@2x.png" />
                        ) : v.receiver == detailAddrs ? (
                          <img src="/img/编组 13备份 2@2x.png" />
                        ) : (
                          <img src="/img/编组 82@2x.png" />
                        )}
                      </i>
                      <div className="listCenter">
                        <p>
                          {v.sender == detailAddrs
                            ? this.getSubStr(v.receiver)
                            : v.receiver == detailAddrs
                            ? this.getSubStr(v.sender)
                            : this.getSubStr(v.sender)}
                        </p>
                        <p>
                          {v.confirmed_time == null
                            ? timeStamp2String(v.expiration_time + "000")
                            : timeStamp2String(v.confirmed_time + "000")}
                        </p>
                      </div>
                      <div className="listResult">
                        {v.amount == null ? (
                          <p className="gre">--</p>
                        ) : (
                          <p className={v.status == "Executed" ? "gre" : "red"}>
                            {v.receiver == detailAddrs
                              ? "+"
                              : v.sender == detailAddrs
                              ? "-"
                              : "+"}
                            {v.amount / 1e6}
                          </p>
                        )}

                        {/* <p className="org">交易中</p> */}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        {dataList1.length > 0 ? (
          <Pagination
            defaultCurrent={this.state.page}
            pageSize={this.state.pageSize1}
            total={Number(total)}
            onChange={this.onChange1}
          />
        ) : null}
        {dataList.length > 0 ? (
          <Pagination
            defaultCurrent={1}
            defaultPageSize={6}
            total={Number(total)}
            onChange={this.onChange}
          />
        ) : null}
      </div>
    );
  }
}
let mapStateToProps = (state) => {
    return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
    return {
        // showDetails: () => {
        //     dispatch({
        //         type: "DISPLAY1",
        //         payload: false,
        //     });
        // },
        showEveryDetail: (payload) => {
            dispatch({
                type: "DISPLAY2",
                payload: {
                    display2: payload.display2,
                    detailData: payload.detailData
                }
            });
        },
       
        // getDetailData:(payload)=>{
        //     dispatch({
        //         type: "DETAILDATA",
        //         payload: payload
        //     });
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDetail);
