import React, { Component } from "react";
import { connect } from "react-redux";
import { timeStamp2String1 } from '../../utils/timer1';
// import { withRouter } from "react-router-dom";
import intl from "react-intl-universal";
import '../app.scss'

//点击每个币种进入到每个币种的详情
class PushDetails extends Component {
  constructor() {
    super();
    this.state = {
      reve: false,
      tran: false,
      deal: false,
    };
  }
  componentDidMount() {}
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
    let { reve, tran, deal } = this.state;
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
            <p>2018-11-06</p>
            <div className="line">
              <img src="/img/路径 42@2x.png" />
            </div>
            <div className="tableList">
              <p>
                <label>{intl.get("Amount")}：</label>
                <span>00VETH</span>
              </p>
              <p>
                <label>{intl.get("Cost of miners")}：</label>
                <span>0.00052036988 ether</span>
              </p>
              <p>
                <label>{intl.get("Collection address")}：</label>
                <span>
                  <i id="reve">sdfghjopwertyuiozxcvbn</i>
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
                  <i id="tran">sdfghjopwertyuiozxcvbn</i>
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
                  <i id="deal">122322</i>
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
        <p className="goBrower">
          {intl.get("The browser queries for more details")}
          <img src="/img/go.png" />
        </p>
      </div>
    );
  }
}


export default PushDetails;
