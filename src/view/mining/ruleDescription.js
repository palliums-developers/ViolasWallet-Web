import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

//规则说明
class RuleDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ifMobile: false,
    };
  }
  componentWillMount() {
    if (this.props.location) {
      if (this.props.location.search) {
        this.setState({
          ifMobile: true,
        });
      }
    }
  }
  componentDidMount() {
    if (this.state.ifMobile) {
      document.title = "规则说明";
    }
  }
  render() {
    let { ifMobile } = this.state;
    return (
      <div
        className={ifMobile == false ? "ruleDescription" : "ruleDescription1"}
      >
        <div>
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <a
                onClick={() => {
                  this.props.history.go(-1);
                }}
              >
                {" "}
                <img src="/img/fanhui 2@2x.png" />
              </a>
            </Breadcrumb.Item>
            <span>规则说明</span>
            <span></span>
          </Breadcrumb>
          <div className="ruleDescriptionOne">
            <div>
              <h4>
                <img src="/img/m_编组 7@2x.png" />
                新用户验证奖励
              </h4>
              <p>a.用户创建钱包后，在首页点击【点我！免费领取VLS】</p>
              <p>b.验证手机号，验证通过后，即可获得10VLS奖励</p>
            </div>
            <div>
              <h4>
                <img src="/img/m_编组 30@2x.png" />
                邀请好友
              </h4>
              <p>a.凡是平台的用户都可参与，暂不设定奖励上限；</p>
              <p>
                b.活动期间，每成功邀请一名新用户创建钱包，完成手机号验证，并输入邀请人邀请码，即可获得相应的VLS奖励；
              </p>
              <p>
                c.邀请人每成功邀请一位，可获得2VLS奖励；被邀请人可获得1VLS奖励。看原型
              </p>
            </div>
            <div>
              <h4>
                <img src="/img/m_编组 32@2x.png" />
                资金池挖矿
              </h4>
              <p>a.在资金池转入交易对，将根据市场情况获得相应的手续费奖励；</p>
              <p>
                b.在转出资金池的同时，用户将获得同转出手续费奖励同等价值的VLS挖矿奖励。看原型看原型看原型看原型
              </p>
            </div>
            <div>
              <h4>
                <img src="/img/m_编组 56@2x.png" />
                存款挖矿
              </h4>
              <p>a.用户在数字银行进行存款，将获得存款利息；</p>
              <p>
                b.在提取到钱包账户的同时，用户将获得同提取利息，同等价值的VLS挖矿奖励。
              </p>
            </div>
            <div>
              <h4>
                <img src="/img/m_编组 53@2x.png" />
                借款挖矿
              </h4>
              <p>a.用户在数字银行进行借款，将产生借款利息；</p>
              <p>
                b.在还款的同时，用户将获得同还款利息，同等价值的VLS挖矿奖励。
              </p>
            </div>
          </div>
          <div className="ruleDescriptionTwo">
            <h4>
              <i></i>
              {/* <img src="/img/m_编组 26@2x.png" /> */}
              说明
            </h4>
            <div>
              <p>一. 每个手机号有三次验证机会</p>
              <p>二. 请您放心，手机号不会绑定您的钱包</p>
              <p>三. 验证成功后可获取 10 VLS</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RuleDescription;
