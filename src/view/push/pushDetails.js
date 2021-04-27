import React, { Component } from "react";
import { connect } from "react-redux";
import { timeStamp2String } from '../../utils/time5';
// import { withRouter } from "react-router-dom";
import intl from "react-intl-universal";
import '../app.scss'
let url = "https://api4.violas.io";

//点击每个币种进入到每个币种的详情
class PushDetails extends Component {
  constructor() {
    super();
    this.state = {
      reve: false,
      tran: false,
      deal: false,
      msg_id: "",
      tranfarList: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        msg_id: nextProps.msg_id1,
      },
      () => {
        fetch(
          url +
            "/1.0/violas/message/transfer?msg_id=" +
            this.state.msg_id +
            "&address=" +
            window.sessionStorage.getItem("violas_address")
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.data) {
              console.log(res, ".....");
              this.setState({
                tranfarList: res.data,
              });
            }
          });
      }
    );
  }
  componentDidMount() {}
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    return number;
  }
  handleCopy = (v) => {
    const spanText = document.getElementById(v).innerText;
    const oInput = document.createElement("input");
    oInput.value = spanText;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = "oInput";
    oInput.style.display = "none";
    document.body.removeChild(oInput);
    // console.log([v])
    this.setState({
      [v]: true,
    });
    let Timer = setInterval(() => {
      this.setState({
        [v]: false,
      });
    }, 1000);
  };
  render() {
    let { detailDatas } = this.props;
    let { reve, tran, deal, tranfarList } = this.state;
    // console.log(detailDatas.receiver, window.sessionStorage.getItem('detailAddr'))
    return (
      <div className="details">
        <h4
          onClick={() => {
            this.props.showDetailFun(false);
          }}
        >
          <i>
            <img src="/img/编组备份 3@2x.png" />
          </i>
          {intl.get("Detail")}
        </h4>
        <div className="detailsTable">
          <div className="tableContent">
            <i>
              <img src="/img/shenhetongguo 4@2x.png" />
            </i>
            <h3>{intl.get("Transfer success")}</h3>
            <p>
              {tranfarList.confirmed_time == null
                ? timeStamp2String(tranfarList.expiration_time + "000")
                : timeStamp2String(tranfarList.confirmed_time + "000")}
            </p>
            <div className="line">
              <img src="/img/路径 42@2x.png" />
            </div>
            <div className="tableList">
              <p>
                <label>{intl.get("Amount")}：</label>
                <span>
                  {this.getFloat(tranfarList.amount / 1e6, 6)}
                  {tranfarList.currency}
                </span>
              </p>
              <p>
                <label>{intl.get("Cost of miners")}：</label>
                <span>
                  {tranfarList.gas} {tranfarList.gas_currency}
                </span>
              </p>
              <p>
                <label>{intl.get("Collection address")}：</label>
                <span>
                  <i id="reve">{tranfarList.receiver}</i>
                  <img
                    onClick={() => this.handleCopy("reve")}
                    src="/img/icon- 2@2x.png"
                  />
                  {reve ? (
                    <p className="warn">
                      {intl.get("Address copy successful")}
                    </p>
                  ) : null}
                </span>
              </p>
              <p>
                <label>{intl.get("Payment address")}：</label>
                <span>
                  <i id="tran">{tranfarList.sender}</i>
                  <img
                    onClick={() => this.handleCopy("tran")}
                    src="/img/icon- 2@2x.png"
                  />
                  {tran ? (
                    <p className="warn">
                      {intl.get("Address copy successful")}
                    </p>
                  ) : null}
                </span>
              </p>
              <p>
                <label>{intl.get("Transaction no")}：</label>
                <span>
                  <i id="deal">{tranfarList.version}</i>
                  <img
                    onClick={() => this.handleCopy("deal")}
                    src="/img/icon- 2@2x.png"
                  />
                  {deal ? (
                    <p className="warn">
                      {intl.get("Address copy successful")}
                    </p>
                  ) : null}
                </span>
              </p>
            </div>
          </div>
        </div>
        <p
          className="goBrower"
          onClick={() => {
            window.open("https://testnet.violas.io");
          }}
        >
          {intl.get("The browser queries for more details")}
          <img src="/img/go.png" />
        </p>
      </div>
    );
  }
}


export default PushDetails;
