import React, { Component } from "react";
import "./mapping.scss";
import WalletConnect from "../../packages/browser/src/index";
import { connect } from "react-redux";
import WalletconnectDialog from "../components/walletconnectDialog";
import { Form, Select, Input } from "antd";
//violas兑换
class ViolasExchange extends Component {
  constructor() {
    super();
    this.state = {
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      connected: false,
      balance: 0,
      coinName:'',
      token: [
        {
          name: "VSLUSDT",
          address: "0x6f08730dA8e7de49a4064d2217c6B68d7E61E727",
        },
      ],
      swapContractAddress: "0xE6C7f2DAB2E9B16ab124E45dE3516196457A1120",
      tokenContractAddress: "0x6f08730dA8e7de49a4064d2217c6B68d7E61E727",
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
    console.log(this.props.eth);
    this.setState({
      coinName: this.state.token[0].name,
    });
    if (this.props.eth == null) {
      this.connectWallet();
    } else {
      this.eth = this.props.eth;
      // 查询 ETH 余额
      this.eth.getBalance(this.eth.defaultAccount).then((balance) => {
        this.setState({
          balance: balance,
        });
      });
      this.setState({
        connected: true,
      });
    }
  }
  // 连接 ETH 钱包
  connectWallet = () => {
    window.ethereum.enable().then(() => {
      this.eth = window.web3.eth;
      this.setState({
        connected: true,
      });
      //查询 ETH 余额
      this.eth.getBalance(this.eth.defaultAccount).then((balance) => {
        this.setState(
          {
            balance: balance,
          },
          () => {
            console.log(this.state.balance);
          }
        );
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
  // 授权合约，花费一定费用的权限
  approveContract = () => {
    if (!(this.eth && this.eth.abi)) {
      alert("请先连接 ETH 钱包");
      this.connectWallet();
    } else {
      let swapContractAddress = this.state.swapContractAddress;
      let tokenContractAddress = this.state.tokenContractAddress;

      let amount = this.state.swapAmount;
      let functionCallAbi = this.eth.abi.encodeFunctionCall(
        {
          name: "approve",
          type: "function",
          inputs: [
            {
              type: "address",
              name: "_spender",
            },
            {
              type: "uint256",
              name: "_value",
            },
          ],
        },
        [swapContractAddress, amount]
      );

      // 调用代币合约，授权兑换合约可以花费 amount 数量的资产。
      let account = this.state.account;
      this.eth
        .sendTransaction({
          from: account,
          to: tokenContractAddress,
          value: "0",
          gas: 50000,
          data: functionCallAbi,
        })
        .on("transactionHash", (hash) => {
          console.log("Transaction approve: " + hash);
          if (amount != 0) {
            this.startSwap();
          }
        })
        .on("error", console.error);
    }
  };

  // 发起兑换逻辑
  startSwap = () => {
    if (!(this.eth && this.eth.abi)) {
      alert("请先连接 ETH 钱包");
    } else {
      let swapContractAddress = this.state.swapContractAddress;
      let tokenContractAddress = this.state.tokenContractAddress;

      let functionCallAbi = this.eth.abi.encodeFunctionCall(
        {
          name: "transferProof",
          type: "function",
          inputs: [
            {
              type: "address",
              name: "tokenAddr",
            },
            {
              type: "string",
              name: "datas",
            },
          ],
        },
        [tokenContractAddress, "here is mapping datas"]
      );

      let account = this.state.account;

      // Gas 费预估例子
      // 文档 https://learnblockchain.cn/docs/web3.js/web3-eth.html#estimategas
      this.eth
        .estimateGas({
          from: account,
          to: swapContractAddress,
          value: "0",
          data: functionCallAbi,
        })
        .then((gasLimit) => {
          console.log("Transaction GasLimit: " + gasLimit);
        });

      // 调用兑换合约，发起兑换
      // 文档 https://learnblockchain.cn/docs/web3.js/web3-eth.html#sendtransaction
      this.eth
        .sendTransaction({
          from: account,
          to: swapContractAddress,
          value: "0",
          gas: 300000,
          data: functionCallAbi,
        })
        .on("transactionHash", function (hash) {
          console.log("Transaction: " + hash);
        });
    }
  };
  //选择地址
  onChangeSwapContractAddress = (event) => {
    this.setState({
      swapContractAddress: event.target.value,
    });
  };
  //兑换
  // confirmExchange = () => {
  //   if (this.state.connected) {
  //   } else {
  //     this.connectWallet();
  //   }
  // };
  //获取兑换地址
  onChangeTokenContractAddress = (value) => {
    console.log(value)
    for(let i =0;i<this.state.token.length;i++){
      if(value == this.state.token[i].address){
        this.setState({
          coinName: this.state.token[i].name
        });
      }
    }
    this.setState({
      tokenContractAddress: value,
    });
  };
  render() {
    let { balance, token,coinName } = this.state;
    // console.log(balance,'...........');
    return (
      <div className="violasExchange">
        <div className="violasExchangeContent">
          <h3>兑换</h3>
          <div className="formWrap">
            <div className="form">
              <div>
                <p>选择地址</p>
                <Form.Item label="">
                  <Select
                    value="53e59e4b4fa3c35770846f6c87ca2d35"
                    // value={this.state.swapContractAddress}
                    onChange={this.onChangeSwapContractAddress}
                  >
                    <Select.Option>
                      53e59e4b4fa3c35770846f6c87ca2d35
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <p>
                  <label>币种</label>
                  <span>余额: {balance}</span>
                </p>
                <Form.Item label="">
                  <Select
                    value={coinName}
                    onChange={this.onChangeTokenContractAddress}
                  >
                    {token.map((v, i) => {
                      return (
                        <Select.Option value={v.address}>
                          {v.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <p>兑换数量</p>
                <Input
                  prefix=""
                  suffix="RMB"
                  placeholder="请输入代币兑换数量"
                />
                <span className="scale">兑换比例：1:1</span>
              </div>
            </div>
            <div className="confirmBtn" onClick={() => this.confirmExchange()}>
              兑 换
            </div>
          </div>
          <div className="descrList">
            <div>
              <h4>基本流程：</h4>
              <p>验证地址 — 币种兑换 — 授权合约 — 发起兑换 — 兑换成功</p>
            </div>
            <div>
              <h4>如何查询交易状态？</h4>
              <p>可在本钱包交易记录查询交易状态</p>
            </div>
            <div>
              <h4>如何查询交易状态？</h4>
              <p>
                可能因为您在进行当前钱包的当前币种映射流程时，只授权了合约，并没有完成兑换流程
              </p>
              <span>解决方案</span>
              <p>
                您可以选择交易失败的钱包地址和币种，在兑换数量的输入框输入0，点击兑换，完成授权合约和发起兑换全流程即可
              </p>
            </div>
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
    showPolling: (type) => {
      dispatch({
        type: "DISPLAY",
        payload: type,
      });
    },
  };
};
export default connect(mapStateToProps)(ViolasExchange);
