import React from "react";
import "../app.scss";
import {withRouter} from 'react-router-dom';
import WalletConnect from "../../packages/browser/src/index";
import intl from "react-intl-universal";
let url = "https://api.violas.io";

//头部我的
class Head extends React.PureComponent {
 
  constructor() {
    super();
    this.state = {
      // bridge: "http://47.52.66.26:5000",
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      active: "",
      showMineDialog: false,
      showMenu: false,
    };
  }
  stopPropagation(e) {
        e.nativeEvent.stopImmediatePropagation();
    }
  getMineDialog = (event) => {
    this.stopPropagation(event)
    this.setState({
      showMineDialog: true
    });
  };
  getMineDialog1 = (event) => {
    // event.stopPropagation();
    this.setState({
       showMineDialog: false
      });
    
  };
   menuMouseEnterEvent = () => {
    let timeout = Number | undefined;
    clearTimeout(timeout);
    timeout = undefined;
    this.setState({
      showMineDialog: true,
    });
  }

  menuMouseLeaveEvent = () => {
    this.setState({
      showMineDialog: false,
    });
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      window.localStorage.clear();
      window.sessionStorage.clear();
      // this.props.history.push('/app')
    });
  }
  componentDidMount() {
    document.addEventListener('mouseenter', this.getMineDialog1);
    document.addEventListener('click', this.getMineDialog1);
    // console.log(window.localStorage.getItem('walletconnector'),'..............')
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      console.log("wallet disconnected");
    });
  }

  // closeDialog = () => {
  //   this.setState({
  //     showMineDialog: false
  //   })
  // }
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    return number;
  }

  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  async logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    await this.state.walletConnector.killSession();
    await this.getNewWalletConnect();
    this.props.history.push("/app");
  }
  render() {
    let { active, showMineDialog} = this.state;
    return (
      <div className="mine">
        {showMineDialog ? (
          <img
            // onMouseEnter={(e) => this.getMineDialog(e)}
            // onMouseLeave={(e) => this.getMineDialog1(e)}
            onClick={(e) => this.getMineDialog(e)}
            src="/img/wode备份 3@2x.png"
          />
        ) : (
          <img
            onMouseEnter={(e) => this.getMineDialog(e)}
            // onMouseMove={(e) => this.getMineDialog(e)}
            // onMouseLeave={(e) => this.getMineDialog1(e)}
            onClick={(e) => this.getMineDialog(e)}
            src="/img/wode备份 2@2x.png"
          />
        )}
        {showMineDialog ? (
          <div
            className="mineList"
            onMouseEnter={() => this.menuMouseEnterEvent()}
            onMouseLeave={() => this.menuMouseLeaveEvent()}
          >
            <div className="balanceList">
              <div
                className="balance"
                onClick={() => {
                  this.props.history.push("/homepage/home");
                }}
              >
                <label>{intl.get("Total assets")}($)</label>
                <span>
                  {window.sessionStorage.getItem("balances")
                    ? this.getFloat(
                        window.sessionStorage.getItem("balances"),
                        2
                      )
                    : "0"}
                </span>
              </div>
              <div className="icon">
                <img src="/img/Combined Shape 2@2x.png" />
              </div>
            </div>
            <div className="btns">
              <dl
                onClick={() => {
                  this.props.history.push({
                    pathname: "/homepage/home/transfer",
                  });
                }}
                className={active == "transfer" ? "act" : null}
              >
                <dt>
                  <img src="/img/编组 13备份 4@2x.png" />
                </dt>
                <dd>{intl.get("Transfer")}</dd>
              </dl>
              <dl
                onClick={() => {
                  this.props.history.push({
                    pathname: "/homepage/home/getMoney",
                  });
                }}
                className={active == "getMoney" ? "act" : null}
              >
                <dt>
                  <img src="/img/编组 13备份 5@2x.png" />
                </dt>
                <dd>{intl.get("Receive")}</dd>
              </dl>
            </div>
            <div
              className="rules"
              onClick={() => {
                this.props.history.push("/homepage/home/miningAwards");
              }}
            >
              <p>挖矿奖励</p>
            </div>
            <p
              onClick={() => {
                this.props.history.push("/homepage/home/inviteRewards");
              }}
            >
              <img src="/img/yaoqingjiangli 2@2x.png" />
              邀请奖励
            </p>
            <p onClick={() => this.logout()}>
              <img src="/img/tuichu 2@2x.png" />
              {intl.get("Logout")}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Head);