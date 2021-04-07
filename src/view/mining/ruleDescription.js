import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { verifyMobile } from "../../utils/verifyMobile";
import intl from "react-intl-universal";
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
    let temp = verifyMobile(window.location);
    intl.options.currentLocale = temp.lang;
    this.setState({
      ifMobile: temp.ifMobile,
      lang: temp.lang,
    });
  }
  componentDidMount() {
    if (this.state.ifMobile) {
      document.title = intl.get("Description of rules");
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
            <span>{intl.get("Description of rules")}</span>
            <span></span>
          </Breadcrumb>
          <div className="ruleDescriptionOne">
            <div>
              <h4>
                <img src="/img/m_编组 7@2x.png" />
                {intl.get("New user verification award")}
              </h4>
              <p>
                {intl.get(
                  "a.On the home page 【Click here to win VLS!】after new user verification;"
                )}
              </p>
              <p>{intl.get("b.Verify phone number to win 10 VLS award.")}</p>
            </div>
            <div>
              <h4>
                <img src="/img/m_编组 30@2x.png" />
                {intl.get("Invite friend")}
              </h4>
              <p>
                {intl.get("a.All users can participate. No award limit now;")}
              </p>
              <p>
                {intl.get(
                  "b.During the promotion period, invite each new user will be reward VLS after new user created wallet, completed phone number verification and enter inviter's invitation code;"
                )}
              </p>
              <p>
                {intl.get(
                  "c.For each successful invitation, inviter wins 2VLS and invitee wins 1VLS."
                )}
              </p>
            </div>
            <div>
              <h4>
                <img src="/img/m_编组 32@2x.png" />
                {intl.get("Liquidity pool mining")}
              </h4>
              <p>
                {intl.get(
                  "a.Provide token pair into the liquidity pool for liquidity mining;"
                )}
              </p>
              <p>
                {intl.get(
                  "b.When withdrawing token pair from the liquidity pool,in additional of liquidity mining reward, win proportional VLS mining award."
                )}
              </p>
            </div>
            <div>
              <h4>
                <img src="/img/m_编组 56@2x.png" />
                {intl.get("Saving mining")}
              </h4>
              <p>
                {intl.get(
                  "a.Deposit to direct lending service will earn interest;"
                )}
              </p>
              <p>
                {intl.get(
                  "b.When withdrawing deposit,it will include earning interest and equivalent VLS mining award."
                )}
              </p>
            </div>
            <div>
              <h4>
                <img src="/img/m_编组 53@2x.png" />
                {intl.get("Lending mining")}
              </h4>
              <p>
                {intl.get(
                  "a.Borrow from the direct lending service will generate lending costs;"
                )}
              </p>
              <p>
                {intl.get(
                  "b.When repaying debt, it will include lending costs and equivalent VLS mining award."
                )}
              </p>
            </div>
          </div>
          <div className="ruleDescriptionTwo">
            <h4>
              <i></i>
              {/* <img src="/img/m_编组 26@2x.png" /> */}
              {intl.get("Description")}
            </h4>
            <div>
              <p>
                {intl.get(
                  "One. Each phone number can be used up to 3 times of verification"
                )}
              </p>
              <p>
                {intl.get("Two. Phone number will not be bind with your wallet")}
              </p>
              <p>
                {intl.get("Three. Win 10 VLS after successful verification")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RuleDescription;
