import "../components/css/App.css";
import React, { Component } from "react";
import { Button, Select, Input } from "antd";
import "antd/dist/antd.css";
import { inside, outside } from "../components/config/config";
// import * from '../util';

// Web3 中文文档参考
// https://learnblockchain.cn/docs/web3.js/web3-eth.html#sendtransaction

// SDK 例子参考
// https://github.com/DappPocket/Ethereum-Wallet-SDK/blob/develop/sample/sample.html

// SDK 项目位置
// https://github.com/DappPocket/Ethereum-Wallet-SDK

let { Option } = Select;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      account: "",
      balance: "",
      tokenBalance: 0,
      amount: 0,
      contractAddress: "",
      token_USDT: "",
      violasAddress: "e8da60ef0f4cf18c324527f48b06c7e9",
    };
    this.eth = null;
  }

  componentDidMount() {
    // this.connectWallet();
    // console.log(window.ethereum);
    console.log(inside);
  }

  // 连接 ETH 钱包
  connectWallet = () => {
    window.ethereum.enable().then(() => {
      this.eth = window.web3.eth;
      this.setState({
        connected: true,
        account: this.eth.defaultAccount,
      });
      // 查询 ETH 余额
      this.eth.getBalance(this.state.account).then((balance) => {
        this.setState({
          balance: balance,
        });
      });
      console.log("connect success.");
    });
    console.log("The link was clicked.");
  };

  // 授权合约，花费一定费用的权限
  approveContract = () => {
    if (!(this.eth && this.eth.abi)) {
      alert("请先连接 ETH 钱包");
    } else {
      let { token_USDT, contractAddress, account, amount } = this.state;
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
        [contractAddress, amount]
      );
      // 调用代币合约，授权兑换合约可以花费 amount 数量的资产。
      this.eth
        .sendTransaction({
          from: account,
          to: token_USDT,
          value: "0",
          gas: 500000,
          data: functionCallAbi,
        })
        .on("transactionHash", (hash) => {
          console.log("Transaction approve: " + hash);
          if (amount > 0) {
            this.startSwap();
          }
        })
        .on("error", console.error)
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 发起兑换逻辑
  startSwap = () => {
    if (!(this.eth && this.eth.abi)) {
      alert("请先连接 ETH 钱包");
    } else {
      console.log("start swap");
      let { account, violasAddress, token_USDT, contractAddress } = this.state;
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
        [token_USDT, violasAddress]
      );

      // Gas 费预估例子
      // 文档 https://learnblockchain.cn/docs/web3.js/web3-eth.html#estimategas
      this.eth
        .estimateGas({
          from: account,
          to: contractAddress,
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
          // to: token_USDT,
          to: contractAddress,
          value: "0",
          gas: 3000000,
          data: functionCallAbi,
        })
        .on("transactionHash", function (hash) {
          console.log("Transaction: " + hash);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 查询 ERC20 代币价格
  // 此为 balanceOf 方法调用例子
  // queryTokenBalance = () => {
  //   if (!(this.eth && this.eth.abi)) {
  //     alert("请先连接 ETH 钱包");
  //   } else {
  //     let tokenContractAddress = this.state.tokenContractAddress;
  //     let account = this.state.account;

  //     // 查询合约的余额方法，ERC20 方法参照文档 https://eips.ethereum.org/EIPS/eip-20erc20
  //     // function balanceOf(address _owner) public view returns (uint256 balance)
  //     // 1. 先调用 encodeFunctionCall 方法序列化参数
  //     // 2. 调用 call 函数在 ETH 链上查询
  //     // 3. 使用 decodeParameters 方法对返回结果进行反序列化
  //     let functionCallAbi = this.eth.abi.encodeFunctionCall(
  //       {
  //         name: "balanceOf",
  //         type: "function",
  //         inputs: [
  //           {
  //             type: "address",
  //             name: "_owner",
  //           },
  //         ],
  //       },
  //       [account]
  //     );

  //     // 调用兑换合约，发起兑换
  //     // ETH 合于调用
  //     // 文档 https://learnblockchain.cn/docs/web3.js/web3-eth.html#call
  //     this.eth
  //       .call({
  //         to: tokenContractAddress,
  //         data: functionCallAbi,
  //       })
  //       .then((resultAbi) => {
  //         let result = this.eth.abi.decodeParameters(["uint256"], resultAbi);
  //         console.log(result[0]);
  //         this.setState({
  //           tokenBalance: result[0],
  //         });
  //       });
  //   }
  // };

  onChangeSwapAmount = (event) => {
    this.setState({
      amount: event.target.value,
    });
  };
  onChangeSwapContractAddress = (event) => {
    this.setState({
      contractAddress: event,
    });
  };
  onChangeTokenContractAddress = (event) => {
    this.setState({
      token_USDT: event,
    });
  };
  onChangeViolasAddress = (event) => {
    this.setState({
      violasAddress: event.target.value,
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Connect-div">
            <Button
              hidden={this.state.connected}
              type="primary"
              onClick={this.connectWallet}
            >
              连接 ETH 钱包
            </Button>
          </div>
          <p>Address: {this.state.account}</p>
          <p>Balance: {this.state.balance / 10e17}</p>
          <div className="main">
            <div className="body">
              <p>-----------mapping dapp-----------</p>
              <div>
                <span>violas地址：</span>
                <Input
                  value={this.state.violasAddress}
                  onChange={this.onChangeViolasAddress}
                />
              </div>
              <div>
                <span>兑换合约地址：</span>
                {/* <Input
                  value={this.state.contractAddress}
                  onChange={this.onChangeSwapContractAddress}
                /> */}
                <Select
                  style={{ width: "100px" }}
                  onChange={this.onChangeSwapContractAddress}
                  // defaultValue={inside.contractAddress}
                >
                  <Option value={inside.contractAddress}>内部</Option>
                  <Option value={outside.contractAddress}>外部</Option>
                </Select>
                <p>{this.state.contractAddress}</p>
              </div>
              <div>
                <span>(vUSDT)代币合约地址：</span>
                {/* <Input
                  value={this.state.token_USDT}
                  onChange={this.onChangeTokenContractAddress}
                /> */}
                <Select
                  style={{ width: "100px" }}
                  onChange={this.onChangeTokenContractAddress}
                  // defaultValue={inside.token_USDT}
                >
                  <Option value={inside.token_USDT}>内部</Option>
                  <Option value={outside.token_USDT}>外部</Option>
                </Select>
                <p>{this.state.token_USDT}</p>
              </div>
              <div>
                <span>代币兑换数量：</span>
                <Input
                  // style={{ textTransform: "uppercase" }}
                  // type="number"
                  placeholder="(最小单位六位数)"
                  onChange={this.onChangeSwapAmount}
                />
              </div>
              <Button onClick={this.approveContract} type="primary">
                兑换
              </Button>
              {/* <p>---------erc20 token balance---------</p>
              <Input value={this.state.tokenBalance} />
              <Button onClick={this.queryTokenBalance}>查寻</Button> */}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
