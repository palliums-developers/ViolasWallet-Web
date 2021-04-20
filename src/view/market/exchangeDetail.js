import React, { Component } from "react";
import "./market.scss";
import { connect } from 'react-redux';
import { timeStamp2String2 } from '../../utils/timer2';
import intl from "react-intl-universal";

//兑换详情
class ExchangeDetail extends Component {
    constructor(props) {
        super()
        this.state = {
        }
    }
    componentDidMount() {
       
    }
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
        let { changeList } = this.props;
        // console.log(this.props.changeList,'.......')
        return (
          <div className="exchangeDetail">
            <h4 onClick={() => this.props.showDrawer(false)}>
              <i>
                <img src="/img/编组备份 3@2x.png" />
              </i>
              {intl.get("Swap Details")}
            </h4>

            <div className="formShow">
              <dl>
                {/* <dt>输入</dt> */}
                <dd>
                  <span>
                    {changeList.input_name == null
                      ? "--"
                      : changeList.from_chain == "btc"
                      ? this.getFloat(changeList.input_amount / 1e8, 8)
                      : this.getFloat(changeList.input_amount / 1e6, 6)}
                  </span>{" "}
                  {changeList.input_name == null ? null : changeList.input_name}
                </dd>
              </dl>
              <div className="changeImg">
                <img src="/img/ai28 2@2x.png" />
              </div>
              <dl>
                {/* <dt>输出</dt> */}
                <dd>
                  <span>
                    {changeList.output_name == null
                      ? "--"
                      : changeList.to_chain == "btc"
                      ? this.getFloat(changeList.output_amount / 1e8, 8)
                      : this.getFloat(changeList.output_amount / 1e6, 6)}
                  </span>{" "}
                  {changeList.output_name == null
                    ? null
                    : changeList.output_name}
                </dd>
              </dl>
            </div>
            <div className="line"></div>
            <div className="list">
              <p>
                <label>{intl.get("Fees rate")}：</label>
                <span>--</span>
              </p>
              <p>
                <label>{intl.get("Fees")}：</label>
                <span>--</span>
              </p>
              <p>
                <label>{intl.get("Gas fee")}：</label>
                <span>--</span>
              </p>
              {/* <p><label>下单时间：</label><span>2018-11-06 16:30:44</span></p> */}
              <p>
                <label>{intl.get("Order Time")}：</label>
                <span>
                  {changeList.confirmed_time == null
                    ? timeStamp2String2(changeList.date + "000")
                    : timeStamp2String2(changeList.confirmed_time + "000")}
                </span>
              </p>
            </div>
            <div className="status">
              <p>
                <img src="/img/shenhetongguo 2@2x.png" />
                <label>{intl.get("Submitted")}</label>
              </p>
              <i></i>
              <p>
                <img src="/img/shenhezhong-2 2@2x.png" />
                <label>{intl.get("Swapping")}</label>
              </p>
              <i></i>
              {changeList.status == "Executed" ? (
                <p>
                  <img src="/img/shenhetongguo 2@2x.png" />
                  <label style={{ color: "#333333" }}>
                    {intl.get("Swap Successful")}
                  </label>
                </p>
              ) : (
                <p>
                  <img src="/img/编组 6@2x.png" />
                  <label style={{ color: "red" }}>
                    {intl.get("Swap Failed")}
                  </label>
                </p>
              )}
            </div>
          </div>
        );
    }
}
let mapStateToProps = (state) => {
    return state.ListReducer;
}
let mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeDetail);