import React, { Component } from "react";
import "./mining.scss";
import { rndNum } from "../../utils/redomNum";
import { callHandler, registerHandler } from "../../utils/jsbridge";
import code_data from "../../utils/code.json";
import WalletConnect from "../../packages/browser/index";
import { bytes2StrHex, string2Byte } from "../../utils/trans";
import intl from "react-intl-universal";
import { message } from "antd";
import { verifyMobile } from "../../utils/verifyMobile";
import WalletconnectDialog from "../components/walletconnectDialog";
let url = "https://api4.violas.io";
let url1 = "https://api.violas.io";

//挖矿奖励
class MiningAwards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      total_incentive: 0,
      bank_incentive: 0,
      pool_incentive: 0,
      bank_total_incentive: 0,
      pool_total_incentive: 0,
      ranking: [],
      is_new: 0,
      ifMobile: false,
      lang: "EN",
      id: "",
      tyArgs: "",
      showWallet: false,
      address: "",
    };
  }
  componentWillMount() {
    let temp = verifyMobile(window.location);
    intl.options.currentLocale = temp.lang;
    this.setState({
      id: rndNum(100),
      ifMobile: temp.ifMobile,
      lang: temp.lang,
      address: temp.address,
    });
    this.getNewWalletConnect();
  }
  getNewWalletConnect() {
    this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
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
    this.getInviterTop();
    if (this.state.ifMobile) {
      document.title = intl.get("Mining incentives");
      this.getMiningInfo(this.state.address);
      
      this.getVerifiedWallet(this.state.address);
    } else {
      this.getMiningInfo(
        window.sessionStorage.getItem("violas_address") &&
          window.sessionStorage.getItem("violas_address")
      );
      this.getVerifiedWallet(
        window.sessionStorage.getItem("violas_address") &&
          window.sessionStorage.getItem("violas_address")
      );
    }
  }
  //获取violas的tyArgs
  async getTyArgs(_name, name) {
    let address = "00000000000000000000000000000001";
    let prefix = "07";
    let suffix = "00";
    let name_length = _name.length;
    if (name_length < 10) {
      name_length = "0" + name_length;
    }
    let _name_hex = bytes2StrHex(string2Byte(_name));
    let result =
      prefix +
      address +
      name_length +
      _name_hex +
      name_length +
      _name_hex +
      suffix;
    this.setState({ tyArgs: result, showWallet: true }, () => {
      if (name == "pool") {
        this.poolProfit(parseInt(sessionStorage.getItem("violas_chainId")));
      } else if (name == "bank") {
        this.bankProfit(parseInt(sessionStorage.getItem("violas_chainId")));
      }
    });
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
  //获取邀请奖励Top20
  getInviterTop() {
    fetch(url1 + "/1.0/violas/incentive/top20")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            ranking: res.data.length > 5 ? res.data.splice(0, 5) : res.data,
          });
          // console.log(res.data, "...............");
        }
      });
  }
  //获取挖矿奖励信息
  getMiningInfo(addr) {
    if (addr) {
      fetch(url1 + "/1.0/violas/incentive/mint/info?address=" + addr)
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            this.setState({
              total_incentive: this.getFloat(res.data.total_incentive / 1e6, 6),
              bank_incentive: this.getFloat(res.data.bank_incentive / 1e6, 6),
              pool_incentive: this.getFloat(res.data.pool_incentive / 1e6, 6),
              bank_total_incentive: this.getFloat(
                res.data.bank_total_incentive / 1e6,
                6
              ),
              pool_total_incentive: this.getFloat(
                res.data.pool_total_incentive / 1e6,
                6
              ),
            });
          }
        });
    }
  }
  //钱包是否已验证
  getVerifiedWallet(addr) {
    if (addr) {
      fetch(url1 + "/1.0/violas/incentive/check/verified?address=" + addr)
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            // console.log(res.data);
            this.setState({
              is_new: res.data.is_new,
            });
          }
        });
    }
  }
  //H5新用户验证
  userInfo = () => {
    if(this.state.address){
      callHandler(
        "callNative",
        JSON.stringify({
          id: this.state.id,
          method: "new_user_check",
          params: [],
        }),
        (resp) => {}
      );
    }else{
      message.warning(intl.get("Please create/import the wallet first"));
    }
    
  };
  //H5去存款/存款挖矿
  depositInfo = () => {
    callHandler(
      "callNative",
      JSON.stringify({
        id: this.state.id,
        method: "bank_deposit_farming",
        params: [],
      }),
      (resp) => {}
    );
  };
  //H5去借款/借款挖矿
  borrowInfo = () => {
    callHandler(
      "callNative",
      JSON.stringify({
        id: this.state.id,
        method: "bank_loan_farming",
        params: [],
      }),
      (resp) => {}
    );
  };
  //H5去转入/资金池挖矿
  poolingInfo = () => {
    callHandler(
      "callNative",
      JSON.stringify({
        id: this.state.id,
        method: "pool_farming",
        params: [],
      }),
      (resp) => {}
    );
  };

  //H5挖矿明细
  miningdetail = () => {
    callHandler(
      "callNative",
      JSON.stringify({
        id: this.state.id,
        method: "yield_farming_detail",
        params: [],
      }),
      (resp) => {}
    );
  };
  //一键提取
  bankProfit = (chainId) => {
    const tx = {
      from: window.sessionStorage.getItem("violas_address"),
      payload: {
        code: code_data.violas.claim_incentive,
        tyArgs: [this.state.tyArgs],
        args: [],
      },
      chainId: chainId,
      maxGasAmount: 400000,
      gasUnitPrice: 1
    };
    console.log(tx, "violas");
    this.state.walletConnector
      .sendTransaction("violas", tx)
      .then((res) => {
        this.setState({
          showWallet: false,
        },()=>{
          window.location.reload();
        });
        console.log("send transaction ", res);
      })
      .catch((err) => {
        this.setState({
          showWallet: false,
        });
        console.log("send transaction ", err);
      });
  };
  //一键提取/数字银行挖矿
  bankProfit1 = () => {
    if (this.state.address) {
      callHandler(
        "callNative",
        JSON.stringify({
          id: this.state.id,
          method: "withdraw_bank_profit",
          params: [],
        }),
        (resp) => {}
      );
    }else{
      message.warning(intl.get("Please create/import the wallet first"));
    }
    
  };
  //一键提取
  poolProfit = (chainId) => {
    const tx = {
      from: window.sessionStorage.getItem("violas_address"),
      payload: {
        code: code_data.violas.withdraw_mine_reward,
        tyArgs: [],
        args: [],
      },
      chainId: chainId,
      maxGasAmount: 400000,
      gasUnitPrice: 1
    };
    console.log(tx, "violas");
    this.state.walletConnector
      .sendTransaction("violas", tx)
      .then((res) => {
        this.setState(
          {
            showWallet: false,
          },
          () => {
            window.location.reload();
          }
        );
        console.log("send transaction ", res);
      })
      .catch((err) => {
        this.setState({
          showWallet: false,
        });
        console.log("send transaction ", err);
      });
  };
  //一键提取/资金池挖矿
  poolProfit1 = () => {
    if (this.state.address) {
      callHandler(
        "callNative",
        JSON.stringify({
          id: this.state.id,
          method: "withdraw_pool_profit",
          params: [],
        }),
        (resp) => {
          // this.getMiningInfo()
        }
      );
    } else {
      message.warning(intl.get("Please create/import the wallet first"));
    }
  };
  closeWallet = (val) => {
    this.setState({
      showWallet: val,
    });
  };
  render() {
    let {
      total_incentive,
      bank_incentive,
      pool_incentive,
      bank_total_incentive,
      pool_total_incentive,
      ranking,
      is_new,
      ifMobile,
      lang,
      address,
    } = this.state;
    return (
      <div className={ifMobile == false ? "miningAwards" : "miningAwards1"}>
        <div className="miningFundList">
          <div className="goRule">
            <img src="/img/m_矩形 4@2x.png" />
            <p
              onClick={
                ifMobile == false
                  ? () => {
                      this.props.history.push("/homepage/home/ruleDescription");
                    }
                  : () => {
                      this.props.history.push(
                        "/homepage/home/ruleDescription?address=" +
                          address +
                          "&language=" +
                          lang
                      );
                    }
              }
            >
              {intl.get("Description of rules")}
              <img src="/img/m_编组 41@2x.png" />
            </p>
          </div>

          <div className="fundList">
            <h4>{intl.get("Total gain")} ( VLS )</h4>
            <span>{parseInt(total_incentive)}</span>
            <div className="rightImg">
              {ifMobile == false ? (
                <img src="/img/m_编组 15@2x.png" />
              ) : (
                <img src="/img/mobile_m_编组 21@3x.png" />
              )}
            </div>
            <p
              onClick={
                ifMobile == false
                  ? () => {
                      this.props.history.push("/homepage/home/miningDetails");
                    }
                  : () => this.miningdetail()
              }
            >
              {intl.get("Mining details")}
              <img src="/img/m_编组 18@2x.png" />
            </p>
          </div>
          <div className="poolingFund">
            <div>
              <div className="poolingFundContent">
                <p>
                  {intl.get("Liquidity mining withdrawn")}：
                  {parseInt(pool_total_incentive)} VLS
                </p>
                <p>
                  <span>
                    <label>{intl.get("Withdrawable")}(VLS)</label>
                    {pool_incentive == null ? 0 : parseInt(pool_incentive)}
                  </span>
                  <button
                    onClick={
                      ifMobile == false
                        ? () => this.getTyArgs("VLS", "pool")
                        : () => this.poolProfit1()
                    }
                  >
                    {intl.get("Withdraw1")}
                  </button>
                </p>
              </div>
              <div className="line"></div>
              <div className="poolingFundContent">
                <p>
                  {intl.get("Lending mining withdrawn")}：
                  {parseInt(bank_total_incentive)} VLS
                </p>
                <p>
                  <span>
                    <label>{intl.get("Withdrawable")}(VLS)</label>
                    {bank_incentive == null ? 0 : parseInt(bank_incentive)}
                  </span>
                  <button
                    onClick={
                      ifMobile == false
                        ? () => this.getTyArgs("VLS", "bank")
                        : () => this.bankProfit1()
                    }
                  >
                    {intl.get("Withdraw1")}
                  </button>
                </p>
                <p>
                  <img src="/img/m_wenhao 3@2x.png" />
                  {intl.get(
                    "Withdrawal balance at the time of querying that might be different than that of transaction! Final balance is at the time of transaction."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="getMoreVLS">
          <div>
            <h3>{intl.get("Win more VLS")}</h3>
            <div className="line"></div>
            <div className="getMoreContent">
              <div>
                <p>
                  <label>{intl.get("New user verification")}</label>
                  {is_new == 0 ? (
                    <button
                      className="btn"
                      onClick={
                        ifMobile == false
                          ? () => {
                              this.props.history.push(
                                "/homepage/home/userRewards"
                              );
                            }
                          : () => this.userInfo()
                      }
                    >
                      {intl.get("To verify")}
                    </button>
                  ) : (
                    <button className="btn btn1">{intl.get("Verified")}</button>
                  )}
                </p>
                <p>
                  <label>{intl.get("Saving mining")}</label>
                  <button
                    className="btn"
                    onClick={
                      ifMobile == false
                        ? () => {
                            this.props.history.push(
                              "/homepage/home/digitalBank/digitalBankPage"
                            );
                          }
                        : () => this.depositInfo()
                    }
                  >
                    {intl.get("Invite")}
                  </button>
                </p>
                <p>
                  <label>{intl.get("Liquidity pool mining")}</label>
                  <button
                    className="btn"
                    onClick={
                      ifMobile == false
                        ? () => {
                            this.props.history.push(
                              "/homepage/home/changeContent/cashPooling"
                            );
                          }
                        : () => this.poolingInfo()
                    }
                  >
                    {intl.get("Transfer into")}
                  </button>
                </p>
              </div>
              <div>
                <p>
                  <label>{intl.get("Invite friend")}</label>
                  <button
                    className="btn"
                    onClick={
                      ifMobile == false
                        ? () => {
                            this.props.history.push(
                              "/homepage/home/inviteRewards"
                            );
                          }
                        : () => {
                            this.props.history.push(
                              "/homepage/home/inviteRewards?language=" +
                                lang +
                                "&address=" +
                                address
                            );
                          }
                    }
                  >
                    {intl.get("Invite")}
                  </button>
                </p>
                <p>
                  <label>{intl.get("Lending mining")}</label>
                  <button
                    className="btn"
                    onClick={
                      ifMobile == false
                        ? () => {
                            this.props.history.push(
                              "/homepage/home/digitalBank/digitalBankPage"
                            );
                          }
                        : () => this.borrowInfo()
                    }
                  >
                    {intl.get("Borrow1")}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rankingList">
          <div>
            <div className="head">
              <h3>{intl.get("Ranking")}</h3>
              <p
                onClick={
                  ifMobile == false
                    ? () => {
                        this.props.history.push("/homepage/home/rankingList");
                      }
                    : () => {
                        this.props.history.push(
                          "/homepage/home/rankingList?address=" +
                            address +
                            "&language=" +
                            lang
                        );
                      }
                }
              >
                <label>{intl.get("More")}</label>
                <img src="/img/m_编组 17@2x.png" />
              </p>
            </div>
            <div className="line"></div>
            <div className="list">
              {ranking.map((v, i) => {
                return (
                  <p key={i}>
                    <span>
                      {v.rank == 1 ? (
                        <img src="/img/m_编组 56备份 3@2x.png" />
                      ) : v.rank == 2 ? (
                        <img src="/img/m_编组 5备份 2@2x.png" />
                      ) : v.rank == 3 ? (
                        <img src="/img/m_编组 4备份 2@2x.png" />
                      ) : (
                        <span>{v.rank}</span>
                      )}

                      {this.showVLSAddress(v.address)}
                    </span>
                    <span>{parseInt(v.incentive / 1e6)} VLS</span>
                  </p>
                );
              })}
            </div>
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

export default MiningAwards;