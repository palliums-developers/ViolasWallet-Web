import "../components/css/App.css";
import React, { Component } from "react";
// import * from '../util';

// Web3 中文文档参考
// https://learnblockchain.cn/docs/web3.js/web3-eth.html#sendtransaction

// SDK 例子参考
// https://github.com/DappPocket/Ethereum-Wallet-SDK/blob/develop/sample/sample.html

// SDK 项目位置
// https://github.com/DappPocket/Ethereum-Wallet-SDK

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      account: "",
      balance: "",
      tokenBalance: 0,
      swapAmount: 0,
      swapContractAddress: "0x6f08730dA8e7de49a4064d2217c6B68d7E61E727",
      // swapContractAddress: "0xE6C7f2DAB2E9B16ab124E45dE3516196457A1120",
      // swapContractAddress: "0xC600601D8F3C3598628ad996Fe0da6C8CF832C02",
      // tokenContractAddress: "0x6f08730dA8e7de49a4064d2217c6B68d7E61E727",
      tokenContractAddress: "0xC600601D8F3C3598628ad996Fe0da6C8CF832C02",
      contractAddress: "0xC600601D8F3C3598628ad996Fe0da6C8CF832C02",
      token_USDT: "0x6f08730dA8e7de49a4064d2217c6B68d7E61E727",
      violasAddress: "e8da60ef0f4cf18c324527f48b06c7e9",
    };
    this.eth = null;
  }

  componentDidMount() {
    // this.connectWallet();
    // console.log(window.ethereum);
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
      let {
        swapContractAddress,
        tokenContractAddress,
        token_USDT,
        contractAddress,
      } = this.state;
      let account = this.state.account;
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
        // [swapContractAddress, amount]
        [contractAddress, amount * 1e5]
      );
      console.log(amount * 1e5);
      // 调用代币合约，授权兑换合约可以花费 amount 数量的资产。
      this.eth
        .sendTransaction({
          from: account,
          // to: tokenContractAddress,
          to: token_USDT,
          value: "0",
          gas: 50000,
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
      // let swapContractAddress = this.state.swapContractAddress;
      // let tokenContractAddress = this.state.tokenContractAddress;
      // let account = this.state.account;
      console.log("start swap");
      let {
        swapContractAddress,
        tokenContractAddress,
        account,
        violasAddress,
        token_USDT,
        contractAddress,
      } = this.state;
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
        // [tokenContractAddress, violasAddress]
        [token_USDT, violasAddress]
      );

      // Gas 费预估例子
      // 文档 https://learnblockchain.cn/docs/web3.js/web3-eth.html#estimategas
      // this.eth
      //   .estimateGas({
      //     from: account,
      //     to: swapContractAddress,
      //     value: "0",
      //     data: functionCallAbi,
      //   })
      //   .then((gasLimit) => {
      //     console.log("Transaction GasLimit: " + gasLimit);
      //   });

      // 调用兑换合约，发起兑换
      // 文档 https://learnblockchain.cn/docs/web3.js/web3-eth.html#sendtransaction
      this.eth
        .sendTransaction({
          from: account,
          // to: token_USDT,
          to: contractAddress,
          value: "0",
          gas: 300000,
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
  queryTokenBalance = () => {
    if (!(this.eth && this.eth.abi)) {
      alert("请先连接 ETH 钱包");
    } else {
      let tokenContractAddress = this.state.tokenContractAddress;
      let account = this.state.account;

      // 查询合约的余额方法，ERC20 方法参照文档 https://eips.ethereum.org/EIPS/eip-20erc20
      // function balanceOf(address _owner) public view returns (uint256 balance)
      // 1. 先调用 encodeFunctionCall 方法序列化参数
      // 2. 调用 call 函数在 ETH 链上查询
      // 3. 使用 decodeParameters 方法对返回结果进行反序列化
      let functionCallAbi = this.eth.abi.encodeFunctionCall(
        {
          name: "balanceOf",
          type: "function",
          inputs: [
            {
              type: "address",
              name: "_owner",
            },
          ],
        },
        [account]
      );

      // 调用兑换合约，发起兑换
      // ETH 合于调用
      // 文档 https://learnblockchain.cn/docs/web3.js/web3-eth.html#call
      this.eth
        .call({
          to: tokenContractAddress,
          data: functionCallAbi,
        })
        .then((resultAbi) => {
          let result = this.eth.abi.decodeParameters(["uint256"], resultAbi);
          console.log(result[0]);
          this.setState({
            tokenBalance: result[0],
          });
        });
    }
  };

  onChangeSwapAmount = (event) => {
    this.setState({
      swapAmount: event.target.value,
    });
  };
  onChangeSwapContractAddress = (event) => {
    this.setState({
      swapContractAddress: event.target.value,
    });
  };
  onChangeTokenContractAddress = (event) => {
    this.setState({
      tokenContractAddress: event.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Connect-div">
            <button hidden={this.state.connected} onClick={this.connectWallet}>
              连接 ETH 钱包
            </button>
          </div>
          <p>Address: {this.state.account}</p>
          <p>Balance: {this.state.balance}</p>
          <br />
          <p>-----------mapping dapp-----------</p>
          <div>
            <span>兑换合约地址：</span>
            <input
              value={this.state.swapContractAddress}
              onChange={this.onChangeSwapContractAddress}
            />
          </div>
          <div>
            {/* <span>(VLSUSDT)代币合约地址：</span> */}
            <span>(vUSDT)代币合约地址：</span>
            <input
              value={this.state.tokenContractAddress}
              onChange={this.onChangeTokenContractAddress}
            />
          </div>
          <div>
            <span>代币兑换数量：</span>
            <input
              style={{ textTransform: "uppercase" }}
              type="number"
              placeholder="(最小单位六位数)"
              // value={this.state.swapAmount}
              onChange={this.onChangeSwapAmount}
            />
          </div>
          <button onClick={this.approveContract}>兑换</button>
          <br />
          <p>-----------erc20 token balance-----------</p>
          <input value={this.state.tokenBalance} />
          <button onClick={this.queryTokenBalance}>查寻</button>
        </header>
      </div>
    );
  }
}

export default App;
