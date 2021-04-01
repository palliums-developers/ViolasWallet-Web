import React from "react";
import "../App.css";
import { getLibraTx, getLibraPub } from "../util/libra_trans";
import axios from "axios";
// import WalletConnect from '../packages/browser/dist/index';

class Libra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libra_currencies: [],
      libra_currency: "",
      tyArgs: {},
      address: "",
      value: "",
      gasCurrencyCode: "",
    };
  }
  async componentWillMount() {
    this.getLibraCurrencies();
  }
  async componentDidMount() {
    // console.log(JSON.stringify(this.state.walletConnector));
  }
  async getLibraCurrencies() {
    axios("https://api4.violas.io/1.0/libra/currency").then(async (res) => {
      await this.setState({ libra_currencies: res.data.data.currencies });
      let temp = this.state.libra_currencies;
      await this.setState({ libra_currency: temp[0].name });
    });
  }
  async handleChange(_type, e) {
    e.persist();
    switch (_type) {
      case "libra_address":
        await this.setState({ address: e.target.value });
        break;
      case "libra_value":
        await this.setState({ value: e.target.value });
        break;
      case "libra_currency":
        await this.setState({ libra_currency: e.target.value });
        break;
      default:
        break;
    }
  }
  async libra_sendPublish(_chainId) {
    console.log(
      "You send Libra transaction with ",
      sessionStorage.getItem("libra_address")
    );
    const tx = getLibraPub(
      sessionStorage.getItem("libra_address"),
      this.state.libra_currency,
      this.state.libra_currency,
      _chainId
    );
    console.log("libra ", tx);
    this.props.walletConnector
      .sendTransaction("_libra", tx)
      .then((res) => {
        console.log("Libra transaction", res);
      })
      .catch((err) => {
        console.log("Libra transaction ", err);
      });
  }
  async libra_sendTransaction(_chainId) {
    console.log(
      "You send Libra transaction with ",
      sessionStorage.getItem("libra_address")
    );
    const tx = getLibraTx(
      sessionStorage.getItem("libra_address"),
      this.state.address,
      this.state.value,
      this.state.libra_currency,
      this.state.libra_currency,
      _chainId
    );
    console.log("libra ", tx);
    this.props.walletConnector
      .sendTransaction("_libra", tx)
      .then((res) => {
        console.log("Libra transaction", res);
      })
      .catch((err) => {
        console.log("Libra transaction ", err);
      });
  }
  render() {
    return (
      <div className="boxs">
        <h2>Libra:</h2>
        <div className="tx">
          <h5>Test Net Publish</h5>
          <p>
            Select Stable Coin:
            <select
              value={this.state.libra_currency}
              onChange={this.handleChange.bind(this, "libra_currency")}
            >
              {this.state.libra_currencies &&
                this.state.libra_currencies.map((v, i) => {
                  return (
                    <option value={v.name} key={i}>
                      {v.show_name}
                    </option>
                  );
                })}
            </select>
          </p>
          <button
            onClick={() =>
              this.libra_sendPublish(
                parseInt(sessionStorage.getItem("libra_chainId"))
              )
            }
          >
            send publish
          </button>
        </div>
        <div className="tx">
          <h5>Test Net Transaction:</h5>
          <p>
            Address :
            <input
              type="text"
              onChange={this.handleChange.bind(this, "libra_address")}
            />
          </p>
          <p>
            Value :
            <input
              type="text"
              onChange={this.handleChange.bind(this, "libra_value")}
            />
          </p>
          <select
            value={this.state.libra_currency}
            onChange={this.handleChange.bind(this, "libra_currency")}
          >
            {this.state.libra_currencies &&
              this.state.libra_currencies.map((v, i) => {
                return (
                  <option value={v.name} key={i}>
                    {v.show_name}
                  </option>
                );
              })}
          </select>
          <button
            onClick={() =>
              this.libra_sendTransaction(
                parseInt(sessionStorage.getItem("libra_chainId"))
              )
            }
          >
            Send Transaction
          </button>
        </div>
      </div>
    );
  }
}

export default Libra;
