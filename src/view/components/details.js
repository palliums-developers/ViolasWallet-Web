import React, { Component } from "react";
import { connect } from "react-redux";
import { timeStamp2String1 } from '../../utils/timer1';
// import { withRouter } from "react-router-dom";
import intl from "react-intl-universal";
import '../app.scss'

//点击每个币种进入到每个币种的详情
class Details extends Component {
    constructor(props) {
        super();
        this.state = {
            reve:false,
            tran:false,
            deal:false
        };
    }
    componentDidMount() {
      
     }
    handleCopy = (v) => {
        const spanText = document.getElementById(v).innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        // console.log([v])
        this.setState({
            [v]: true
        })
        let Timer = setInterval(() => {
            this.setState({
                [v]: false
            })
        }, 1000);
    };
    render() {
        let { detailDatas } = this.props;
        let { reve, tran,deal } = this.state;
        // console.log(detailDatas)
        return (
          <div className="details">
            <h4
              onClick={() => {
                this.props.showEveryDetail(false);
              }}
            >
              <i>
                <img src="/img/编组备份 3@2x.png" />
              </i>
              {intl.get("Detail")}
            </h4>
            {detailDatas.show_type == "btc" ? (
              <div className="detailsTable">
                <div className="tableContent">
                  {detailDatas.show_confirmations == false ? (
                    <i>
                      <img src="/img/shenhezhong-2 4@2x.png" />
                    </i>
                  ) : detailDatas.sender ? (
                    <i>
                      <img src="/img/shenhetongguo 4@2x.png" />
                    </i>
                  ) : (
                    <i>
                      <img src="/img/shenhetongguo 4@2x.png" />
                    </i>
                  )}
                  {detailDatas.show_confirmations == false ? (
                    <h3>{intl.get("Stability coin activated successfully")}</h3>
                  ) : detailDatas.sender ? (
                    <h3>{intl.get("Transfer success")}</h3>
                  ) : (
                    <h3>{intl.get("Payment success")}</h3>
                  )}

                  <p>
                    {timeStamp2String1(
                      detailDatas && detailDatas.timestamp + "000"
                    )}
                  </p>
                  <div className="line">
                    <img src="/img/路径 42@2x.png" />
                  </div>

                  <div className="tableList">
                    <p>
                      <label>{intl.get("Amount")}：</label>
                      <span>
                        {detailDatas && detailDatas.show_value}BTC
                      </span>
                    </p>
                    <p>
                      <label>{intl.get("Cost of miners")}：</label>
                      <span>{detailDatas && detailDatas.fee} BTC</span>
                    </p>
                    <p>
                      <label>{intl.get("Collection address")}：</label>
                      <span>
                        <i id="reve">{detailDatas.receive_address}</i>
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
                        <i id="tran">{detailDatas.sender_address}</i>
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
                        <i id="deal">{detailDatas.txid}</i>
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
            ) : (
              <div className="detailsTable">
                <div className="tableContent">
                  {detailDatas && detailDatas.type == 0 ? (
                    <i>
                      <img src="/img/shenhezhong-2 4@2x.png" />
                    </i>
                  ) : detailDatas.sender ==
                    window.sessionStorage.getItem("detailAddr") ? (
                    <i>
                      <img src="/img/shenhetongguo 4@2x.png" />
                    </i>
                  ) : (
                    <i>
                      <img src="/img/shenhetongguo 4@2x.png" />
                    </i>
                  )}
                  {detailDatas && detailDatas.type == 0 ? (
                    <h3>{intl.get("Stability coin activated successfully")}</h3>
                  ) : detailDatas.sender ==
                    window.sessionStorage.getItem("detailAddr") ? (
                    <h3>{intl.get("Transfer success")}</h3>
                  ) : (
                    <h3>{intl.get("Payment success")}</h3>
                  )}

                  <p>
                    {timeStamp2String1(
                      detailDatas && detailDatas.expiration_time + "000"
                    )}
                  </p>
                  <div className="line">
                    <img src="/img/路径 42@2x.png" />
                  </div>

                  <div className="tableList">
                    <p>
                      <label>{intl.get("Amount")}：</label>
                      <span>
                        {detailDatas && detailDatas.amount / 1e6}{" "}
                        {detailDatas && detailDatas.currency}
                      </span>
                    </p>
                    <p>
                      <label>{intl.get("Cost of miners")}：</label>
                      <span>
                        {detailDatas && detailDatas.gas / 1e6}{" "}
                        {detailDatas.gas_currency}
                      </span>
                    </p>
                    <p>
                      <label>{intl.get("Collection address")}：</label>
                      <span>
                        <i id="reve">
                          {detailDatas.receiver == null
                            ? "--"
                            : detailDatas.receiver}
                        </i>
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
                        <i id="tran">{detailDatas.sender}</i>
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
                        <i id="deal">{detailDatas.version}</i>
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
            )}
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
let mapStateToProps = (state) => {
    return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
    return {
 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
