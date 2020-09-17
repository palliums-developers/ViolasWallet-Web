import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import WalletConnect from "../../packages/browser/src/index";
import WalletconnectDialog from "../components/walletconnectDialog";
import { digitalBank, getProductId } from "../../utils/bank";
import axios from "axios";
import code_data from "../../utils/code.json";
let url = "https://api4.violas.io";

//还款
class Repayment extends Component {
  constructor() {
    super();
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      name: "",
      showList: false,
      active: false,
      amount: "",
      warning: "",
      borrowList: {},
      showLists: [],
      showType: "",
      extra: 0,
      showWallet: false,
      borrowProduct: [],
      token_address: "",
      depositProduct: [],
    };
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
    // await this.getBorrowProduct();
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  componentDidMount() {
    //币种列表
    fetch(
      url +
        "/1.0/violas/bank/borrow/orders?address=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          // console.log(res.data,'.........')
          this.setState({
            showLists: res.data,
            showType: res.data[0].name,
            extra: res.data[0].available_borrow / 1e6,
          });
        }
      });
    //获取借款产品信息
    fetch(
      url +
        "/1.0/violas/bank/borrow/repayment?address=" +
        sessionStorage.getItem("violas_address") +
        "&&=id" +
        sessionStorage.getItem("id")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            borrowList: res.data,
          });
        }
      });
  }
  //获取输入框value
  getInputValue = (e) => {
    // console.log(e.target.value,'.......')
    if (e.target.value) {
      this.setState({
        amount: e.target.value,
        warning: "",
      });
    }
  };
  //立即还款
  repaymentImmediately = () => {
    if (this.state.amount == "") {
      this.setState({
        warning: "请输入还款数量",
      });
    } else {
      this.setState({
        showWallet: true,
      });
      this.getDigitalBank();
    }
  };
  closeWallet = (val) => {
    this.setState({
      showWallet: val,
    });
  };
  render() {
    let { showList, borrowList, showLists, showType, extra } = this.state;
    return (
      <div className="borrowDetails">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank">
              {" "}
              <img src="/img/fanhui 2@2x.png" />
              数字银行
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/borrowOrder">
              借款订单
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/saveDetails">还款</NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="saveDetailsWrap">
          <div className="saveDetailsList">
            <h4>
              <label>我要还</label>
              <div className="dropdown1">
                <span
                  onClick={() => {
                    this.setState({
                      showList: !this.state.showList,
                    });
                  }}
                >
                  <img src="/img/kyye.png" />
                  {showType}
                  <i>
                    <img src="/img/rightArrow1.png" />
                  </i>
                </span>
                {showList ? (
                  <div className="dropdown-content1">
                    {showLists.map((v, i) => {
                      return (
                        <span
                          key={i}
                          onClick={() => {
                            this.setState({
                              showType: v.name,
                              showList: false,
                            });
                          }}
                        >
                          <img src="/img/kyye.png" />
                          <label>{v.name}</label>
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </h4>
            <input
              placeholder={"1" + showType + "起，每0" + showType + "递增"}
              className={this.state.warning ? "activeInput" : null}
              onChange={(e) => this.getInputValue(e)}
            />
            <div className="saveDetailsShow">
              <p>
                <img src="/img/kyye.png" />
                <label>待还余额 ：</label>{" "}
                <label>
                  {extra} {showType}
                </label>
                <span>全部</span>
              </p>
            </div>
          </div>
          <div className="saveDetailsList1">
            <p>
              <label>借贷率</label>
              <span>{borrowList.rate ? borrowList.rate + "%" : "--"}</span>
            </p>
            <p>
              <p>
                <label>矿工费</label>
                <span></span>
              </p>
              <span>--</span>
            </p>
            <p>
              <p>
                <label>还款账户</label>
                <span></span>
              </p>
              <span>银行余额</span>
            </p>
          </div>
          <div className="foot">
            <p className="btn" onClick={() => this.repaymentImmediately()}>
              立即还款
            </p>
            <p className="descr">{this.state.warning}</p>
          </div>
        </div>
        {this.state.showWallet ? (
          <WalletconnectDialog
            getCloseWallet={this.closeWallet}
          ></WalletconnectDialog>
        ) : null}
      </div>
    );
  }
}

export default Repayment;