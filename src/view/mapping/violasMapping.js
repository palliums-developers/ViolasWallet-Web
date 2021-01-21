import React, { Component } from "react";
import "./mapping.scss";
import { connect } from "react-redux";
import WalletConnect from "../../packages/browser/src/index";
import WalletconnectDialog from "../components/walletconnectDialog";
let url = "https://api4.violas.io";

//violas映射
class ViolasMapping extends Component {
  constructor() {
    super();
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      address: "",
      result: -1,
      connected: false,
    };
    this.eth = null;
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  //   stopPropagation(e) {
  //     e.nativeEvent.stopImmediatePropagation();
  //   }
  componentDidMount() {
    this.connectWallet();
  }
  // 连接 ETH 钱包
  connectWallet = () => {
    window.ethereum.enable().then(() => {
      this.eth = window.web3.eth;
      this.props.getEth(this.eth);
      this.setState({
        connected: true,
      });
      this.setState({
        connected: true,
      });
      console.log("connect success.");
    });
    this.setState({
      connected: false,
    });
    console.log("The link was clicked.");
  };
  //设置目标地址
  getValue = (e) => {
    // console.log(e)
    this.setState({
      address: e.target.value,
    });
  };
  //点击确认
  confirmfun = () => {
    if (this.state.connected) {
      if (this.state.address) {
        fetch(url + "/1.0/violas/currency/published?addr=" + this.state.address)
          .then((res) => res.json())
          .then((res) => {
            let result = 0;
            if (res.data.published.length > 0) {
              for (let i = 0; i <= res.data.published.length; i++) {
                if (res.data.published[i] == "VLS") {
                  result += 1;
                } else if (res.data.published[i] == "vUSDT") {
                  result += 1;
                }
              }
            }
            this.setState(
              {
                result: result,
              },
              () => {
                if (this.state.result == 2) {
                  this.props.history.push("/violasExchange");
                }
              }
            );
            // console.log(result, ".........");
          });
      }
    } else {
      this.connectWallet();
    }
  };
  render() {
    let { result } = this.state;
    return (
      <div className="violasMapping">
        <div className="violasMappingContent">
          <h3>violas映射</h3>
          <div className="formWrap">
            <div className="form">
              <p>请输入Violas钱包地址</p>
              <input
                maxLength="100"
                placeholder="请输入钱包地址"
                onChange={(e) => this.getValue(e)}
              />
              {result == 0 ? (
                <span>钱包尚未激活，请先到Violas钱包激活</span>
              ) : result == 1 ? (
                <span>钱包尚未publish，请先到violas钱包publis</span>
              ) : null}
            </div>
            <div className="confirmBtn" onClick={() => this.confirmfun()}>
              确 认
            </div>
          </div>
          <div className="descrList">
            <h4>基本流程：</h4>
            <p>验证地址 — 币种兑换 — 授权合约 — 发起兑换 — 兑换成功</p>
          </div>
        </div>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
  return {
    getEth: (type) => {
      dispatch({
        type: "GETETH",
        payload: type,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViolasMapping);
