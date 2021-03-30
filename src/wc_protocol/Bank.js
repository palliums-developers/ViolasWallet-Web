import React from "react";
import "../App.css";
import { getBitcoinScript, getMapScript } from "../util/trans";
import axios from "axios";
import getBTCTx from "../util/btc_trans";
import { getLibraTx } from "../util/libra_trans";
import { getViolasTx } from "../util/violas_trans";
import { digitalBank, getProductId } from "../util/bank";
import code_data from "../util/code.json";

class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mappingInfo: [],
      mappingCoinType: {},
      mappingCoinAmount: 0,
      crossChainInfo: [],
      digitalBankOperation: "lock",
      digitalBankOperationList: ["lock", "redeem", "borrow", "repay"],
      digitalBankAmount: 0,
      digitalBankCurrenciesList: [],
      digitalBankDepositDetail: {},
      digitalBankBorrowDetail: {},
      digitalBankCurrency: "",
      depositProduct: [],
      borrowProduct: [],
      available: "",
      ethAddress: "",
    };
  }
  async componentWillMount() {
    this.getMappingInfo();
    await this.getDepositProduct();
    await this.getBorrowProduct();
    sessionStorage.getItem("violas_address") &&
      (await this.getCurrenciesList());
    await this.getAvailableQuantity(
      this.state.digitalBankOperation,
      this.state.digitalBankCurrency,
      this.state.depositProduct
    );
  }
  async componentDidMount() {}
  async getDepositProduct() {
    axios("https://api4.violas.io/1.0/violas/bank/product/deposit").then(
      async (res) => {
        await this.setState({ depositProduct: res.data.data });
      }
    );
  }
  async getBorrowProduct() {
    axios("https://api4.violas.io/1.0/violas/bank/product/borrow").then(
      async (res) => {
        await this.setState({ borrowProduct: res.data.data });
      }
    );
  }
  async getCurrenciesList() {
    // axios('https://api4.violas.io/1.0/violas/currency')
    // .then(async res=>{
    //     console.log(res.data.data.currencies)
    // })
    axios(
      "https://api4.violas.io/1.0/violas/currency/published?addr=" +
        sessionStorage.getItem("violas_address")
    ).then(async (res) => {
      let temp = [];
      for (let i in this.state.depositProduct) {
        for (let j in res.data.data.published) {
          if (
            this.state.depositProduct[i].token_module ===
            res.data.data.published[j]
          ) {
            temp.push(this.state.depositProduct[i].token_module);
          }
        }
      }
      await this.setState({
        digitalBankCurrenciesList: temp,
        digitalBankCurrency: temp[0],
      });
    });
  }
  // async getMarketCurrencies() {
  //     axios('https://api4.violas.io/1.0/market/exchange/currency')
  //         .then(async res => {
  //             let temp1 = await this.addCoinType(res.data.data.btc, 'btc');
  //             let temp2 = await this.addCoinType(res.data.data.libra, 'libra');
  //             let temp3 = await this.addCoinType(res.data.data.violas, 'violas');
  //             let temp = await this.Concat(temp1, await this.Concat(temp2, temp3));
  //             await this.setState({
  //                 digitalBankCurrenciesList: temp,
  //                 digitalBankCurrency: temp[0]
  //             });
  //         })
  // }
  // async addCoinType(coinList, chain) {
  //     for (let i in coinList) {
  //         coinList[i].chain = chain
  //     }
  //     return coinList
  // }
  // async Concat(origin_list, add_list) {
  //     for (let i in add_list) {
  //         origin_list.push(add_list[i])
  //     }
  //     return origin_list
  // }
  async getMappingInfo() {
    await axios
      .get("https://api4.violas.io/1.0/mapping/address/info")
      .then(async (res) => {
        await this.setState({
          mappingInfo: res.data.data,
          mappingCoinType: res.data.data[0],
        });
      });
  }
  async getDigitalBankDepositDetail(id) {
    await axios
      .get("https://api4.violas.io/1.0/violas/bank/deposit/info?id=" + id)
      .then(async (res) => {
        await this.setState({ digitalBankDepositDetail: res.data.data });
      });
  }
  async getDigitalBankBorrowDetail(id) {
    await axios
      .get("https://api4.violas.io/1.0/violas/bank/borrow/info?id=" + id)
      .then(async (res) => {
        await this.setState({ digitalBankBorrowDetail: res.data.data });
      });
  }
  async getMap() {
    let to_address = "";
    switch (this.state.mappingCoinType.to_coin.coin_type) {
      case "btc":
        to_address = sessionStorage.getItem("bitcoin_address");
        break;
      case "libra":
        to_address = sessionStorage.getItem("libra_address");
        break;
      case "violas":
        to_address = sessionStorage.getItem("violas_address");
        break;
      case "eth":
        to_address = this.state.ethAddress;
        break;
      default:
        to_address = "";
        break;
    }
    if (this.state.mappingCoinType.from_coin.coin_type === "btc") {
      // let script = getBitcoinScript(this.state.mappingCoinType.lable, sessionStorage.getItem('bitcoin_address'), parseInt(this.state.mappingCoinAmount)/100);
      let script = getBitcoinScript(
        this.state.mappingCoinType.lable,
        to_address,
        this.state.mappingCoinAmount
      );
      console.log("script: ", script);
      let tx = getBTCTx(
        sessionStorage.getItem("bitcoin_address"),
        this.state.mappingCoinType.receiver_address,
        this.state.mappingCoinAmount,
        script
      );
      console.log("bitcoin: ", tx);
      this.props.walletConnector
        .sendTransaction("_bitcoin", tx)
        .then((res) => {
          console.log("Bitcoin mapping ", res);
        })
        .catch((err) => {
          console.log("Bitcoin mapping ", err);
        });
    } else if (this.state.mappingCoinType.from_coin.coin_type === "libra") {
      let script = getMapScript(
        this.state.mappingCoinType.from_coin.coin_type,
        this.state.mappingCoinType.lable,
        to_address
      );
      let tx = getLibraTx(
        sessionStorage.getItem("libra_address"),
        this.state.mappingCoinType.receiver_address,
        this.state.mappingCoinAmount,
        this.state.mappingCoinType.from_coin.assert.module,
        this.state.mappingCoinType.from_coin.assert.name,
        parseInt(sessionStorage.getItem("libra_chainId")),
        script
      );
      console.log("libra: ", tx);
      this.props.walletConnector
        .sendTransaction("_libra", tx)
        .then((res) => {
          console.log("Libra mapping ", res);
        })
        .catch((err) => {
          console.log("Libra mapping ", err);
        });
    } else if (this.state.mappingCoinType.from_coin.coin_type === "violas") {
      let script = getMapScript(
        this.state.mappingCoinType.from_coin.coin_type,
        this.state.mappingCoinType.lable,
        to_address
      );
      // flag: "violas";
      // state: "start";
      // times: 1;
      // to_address: "0x9cf3AE0491F75Faa87A139f5d1107980B0D5a436";
      // type: "v2em";
      let tx = getViolasTx(
        sessionStorage.getItem("violas_address"),
        this.state.mappingCoinType.receiver_address,
        this.state.mappingCoinAmount,
        this.state.mappingCoinType.from_coin.assert.module,
        this.state.mappingCoinType.from_coin.assert.name,
        parseInt(sessionStorage.getItem("violas_chainId")),
        script
      );
      // tx = {
      //   chainId: 4,
      //   from: "e8da60ef0f4cf18c324527f48b06c7e9",
      //   payload: {
      //     args: [
      //       { type: "Address", value: "00000000000000000042524755534454" },
      //       { type: "U64", value: "2000000" },
      //       {
      //         type: "Vector",
      //         value:
      //           "7b22666c6167223a2276696f6c6173222c2274797065223a22…374617465223a227374617274222c2274696d6573223a317d",
      //       },
      //       { type: "Vector", value: "" },
      //     ],
      //     code:
      //       "a11ceb0b010000000701000202020403061004160205181d0735610896011000000001010000020001000003020301010004010300010501060c0108000506080005030a020a020005060c05030a020a020109000c4c696272614163636f756e741257697468647261774361706162696c6974791b657874726163745f77697468647261775f6361706162696c697479087061795f66726f6d1b726573746f72655f77697468647261775f6361706162696c69747900000000000000000000000000000001010104010c0b0011000c050e050a010a020b030b0438000b05110202",
      //     tyArgs: [
      //       "070000000000000000000000000000000105765553445405765553445400",
      //     ],
      //   },
      // };
      console.log("violas: ", tx);
      this.props.walletConnector
        .sendTransaction("violas", tx)
        .then((res) => {
          console.log("Violas mapping ", res);
        })
        .catch((err) => {
          console.log("Violas mapping ", err);
        });
    } else {
      return;
    }
  }
  async getBankBroadcast(address, operation, product_id, value, sigtxn) {
    let api = "";
    switch (operation) {
      case "lock":
        api = code_data.bank.broadcast.lock;
        break;
      case "redeem":
        api = code_data.bank.broadcast.redeem;
        break;
      case "borrow":
        api = code_data.bank.broadcast.borrow;
        break;
      case "repay":
        api = code_data.bank.broadcast.repay;
        break;
      default:
        break;
    }
    let parm = {
      address: address,
      product_id: product_id,
      value: parseInt(value),
      sigtxn: sigtxn,
    };
    console.log(parm);
    axios.post(`https://api4.violas.io${api}`, parm).then((res) => {
      console.log(res.data);
    });
  }
  async getDigitalBank() {
    let {
      digitalBankOperation,
      depositProduct,
      digitalBankCurrency,
      digitalBankAmount,
    } = this.state;
    let productId = 0;
    let tx = "";
    if (digitalBankOperation === "lock" || digitalBankOperation === "redeem") {
      productId = getProductId(digitalBankCurrency, depositProduct);
      this.getDigitalBankDepositDetail(productId);
      tx = digitalBank(
        digitalBankOperation,
        digitalBankCurrency,
        digitalBankAmount,
        sessionStorage.getItem("violas_address"),
        this.state.digitalBankDepositDetail.token_address,
        parseInt(sessionStorage.getItem("violas_chainId"))
      );
    } else if (
      digitalBankOperation === "borrow" ||
      digitalBankOperation === "repay"
    ) {
      productId = getProductId(digitalBankCurrency, this.state.borrowProduct);
      this.getDigitalBankBorrowDetail(productId);
      tx = digitalBank(
        digitalBankOperation,
        digitalBankCurrency,
        digitalBankAmount,
        parseInt(sessionStorage.getItem("violas_address")),
        this.state.digitalBankBorrowDetail.token_address,
        parseInt(sessionStorage.getItem("violas_chainId"))
      );
    }
    if (productId === 0) {
      console.log("Cannot find match product, please select other coin.");
      return;
    }
    console.log("Digital Bank ", digitalBankOperation, tx);
    this.props.walletConnector
      .signTransaction(tx)
      .then(async (res) => {
        // console.log('Digital Bank ', digitalBankOperation, res);
        await this.getBankBroadcast(
          sessionStorage.getItem("violas_address"),
          digitalBankOperation,
          productId,
          digitalBankAmount,
          res
        );
      })
      .catch((err) => {
        console.log("Digital Bank ", digitalBankOperation, err);
      });
  }
  async getAvailableQuantity(
    operation,
    currency,
    depositProductList,
    borrowProductList
  ) {
    // let product_id = getProductId(currency, depositProductList);
    // if (product_id === 0) {
    //     await this.setState({ available: ` Cannot find match ${currency} product, please select other coin. ` })
    //     return;
    // }
    let product_id = 0;
    if (operation === "redeem") {
      product_id = getProductId(currency, depositProductList);
      if (product_id === 0) {
        await this.setState({
          available: ` Cannot find match ${currency} product, please select other coin. `,
        });
        return;
      }
      await axios
        .get(
          `https://api4.violas.io/1.0/violas/bank/deposit/withdrawal?id=${product_id}&address=${sessionStorage.getItem(
            "violas_address"
          )}`
        )
        .then(async (res) => {
          await this.setState({
            available:
              "Available redeem quantity: " + res.data.data.available_quantity,
          });
        });
    } else if (operation === "repay") {
      product_id = getProductId(currency, borrowProductList);
      if (product_id === 0) {
        await this.setState({
          available: ` Cannot find match ${currency} product, please select other coin. `,
        });
        return;
      }
      await axios
        .get(
          `https://api4.violas.io/1.0/violas/bank/borrow/repayment?id=${product_id}&address=${sessionStorage.getItem(
            "violas_address"
          )}`
        )
        .then(async (res) => {
          await this.setState({
            available: "Available redeem quantity: " + res.data.data.balance,
          });
        });
    }
  }
  async handleChange(_type, e) {
    e.persist();
    switch (_type) {
      case "mappingCoinType":
        await this.setState({ mappingCoinType: JSON.parse(e.target.value) });
        break;
      case "ethAddress":
        await this.setState({ ethAddress: e.target.value });
        break;
      case "mappingCoinAmount":
        await this.setState({ mappingCoinAmount: e.target.value });
        break;
      case "digitalBankOperation":
        await this.setState({
          digitalBankOperation: e.target.value,
          available: "",
        });
        await this.getAvailableQuantity(
          this.state.digitalBankOperation,
          this.state.digitalBankCurrency,
          this.state.depositProduct,
          this.state.borrowProduct
        );
        break;
      case "digitalBankAmount":
        await this.setState({ digitalBankAmount: e.target.value });
        break;
      case "digitalBankCurrency":
        await this.setState({
          digitalBankCurrency: e.target.value,
          available: "",
        });
        await this.getAvailableQuantity(
          this.state.digitalBankOperation,
          this.state.digitalBankCurrency,
          this.state.depositProduct,
          this.state.borrowProduct
        );
      default:
        break;
    }
  }
  render() {
    return (
      <div className="boxs">
        <h2>Bank:</h2>
        <div className="tx">
          <h5>Mapping: </h5>
          <p>Mapping coin:</p>
          <select onChange={this.handleChange.bind(this, "mappingCoinType")}>
            {this.state.mappingInfo &&
              this.state.mappingInfo.map((v, i) => {
                return (
                  <option value={JSON.stringify(v)} key={i}>
                    {v.lable}
                  </option>
                );
              })}
          </select>
          <input
            type="text"
            onChange={this.handleChange.bind(this, "mappingCoinAmount")}
            placeholder="Amount"
          />
          {this.state.mappingCoinType.to_coin &&
            this.state.mappingCoinType.to_coin.coin_type === "eth" && (
              <input
                type="text"
                onChange={this.handleChange.bind(this, "ethAddress")}
                placeholder="Please enter eth address"
              />
            )}
          <h4>
            from:{" "}
            {this.state.mappingCoinType.from_coin &&
              this.state.mappingCoinType.from_coin.coin_type}
            &nbsp; &nbsp; show_name:{" "}
            {this.state.mappingCoinType.from_coin &&
              this.state.mappingCoinType.from_coin.assert.show_name}
          </h4>
          <h4>
            to:{" "}
            {this.state.mappingCoinType.to_coin &&
              this.state.mappingCoinType.to_coin.coin_type}
            &nbsp; &nbsp; show_name:{" "}
            {this.state.mappingCoinType.to_coin &&
              this.state.mappingCoinType.to_coin.assert.show_name}
          </h4>
          <button onClick={() => this.getMap()}>Commit Mapping</button>
          <br />
        </div>
        <div className="tx">
          <h5>Digital Bank:</h5>
          <p>Operation:</p>
          <select
            onChange={this.handleChange.bind(this, "digitalBankOperation")}
          >
            {this.state.digitalBankOperationList.map((v, i) => {
              return (
                <option value={v} key={i}>
                  {v}
                </option>
              );
            })}
          </select>
          <select
            onChange={this.handleChange.bind(this, "digitalBankCurrency")}
          >
            {this.state.digitalBankCurrenciesList &&
              this.state.digitalBankCurrenciesList.map((v, i) => {
                return (
                  <option value={v} key={i}>
                    {v}
                  </option>
                );
              })}
          </select>
          <input
            type="text"
            onChange={this.handleChange.bind(this, "digitalBankAmount")}
          />
          <h5>{this.state.available}</h5>
          <br />
          <button onClick={() => this.getDigitalBank()}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Bank;
