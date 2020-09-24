import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import WalletConnect from '../../packages/browser/src/index';
import code_data from '../../utils/code.json';
import intl from "react-intl-universal";
import WalletconnectDialog from "./walletconnectDialog";
import '../app.scss'
let url1 = "https://api.violas.io";
let url = "https://api4.violas.io";
let names = []

//添加币种
class AddCurrency extends Component {
  constructor(props) {
    super();
    this.state = {
      // bridge: 'http://47.52.66.26:5000',
      bridge: "https://walletconnect.violas.io",
      addCurrencyList: [],
      addCurrencyList1: [],
      arr1: [],
      arr2: [],
      foc: false,
      checkData: [],
      showWallet: false,
      code:
        "a11ceb0b01000701000202020403061004160205181d07356f08a4011000000001010000020001000003020301010004010300010501060c0108000506080005030a020a020005060c05030a020a020109000c4c696272614163636f756e741257697468647261774361706162696c6974791b657874726163745f77697468647261775f6361706162696c697479167061795f66726f6d5f776974685f6d657461646174611b726573746f72655f77697468647261775f6361706162696c69747900000000000000000000000000000001010104010c0b0011000c050e050a010a020b030b0438000b05110202",
      publish_code:
        "a11ceb0b010006010002030206040802050a0707111a082b100000000100010101000201060c000109000c4c696272614163636f756e740c6164645f63757272656e63790000000000000000000000000000000101010001030b00380002",
      tyArgs: "",
      tyArgs1: {},
      walletConnector: {},
      BTCData: [],
      addCurrencyList2: [],
      publishedArr: [],
    };
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
  }
  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  async componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("checkData")) {
      await this.setState(
        {
          checkData: nextProps.checkData,
        },
        // async () => {
        //   await this.getBalance(this.state.checkData);
        // }
      );
    }
  }
  componentDidMount() {
    // this.forceUpdate()
    let checkData = JSON.parse(sessionStorage.getItem("checkData"));
    // this.getBalance();
    if (checkData) {
      this.getBalance(checkData);
    } else {
      if (this.state.checkData) {
        this.getBalance(this.state.checkData);
      }
    }

    if (JSON.parse(window.localStorage.getItem("wallet_info"))) {
      this.setState({
        addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
      });
    }
  }
  getBalance = (checkData) => {
    // console.log(checkData);
    // window.sessionStorage.setItem("init", true);
    fetch(
      url +
        "/1.0/btc/balance?address=" +
        window.sessionStorage.getItem("btc_address")
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.data)
        if (res.data) {
          this.setState({
            BTCData: res.data,
          });
        }
      });
    fetch(url + "/1.0/violas/currency")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({
            arr1: res.data.currencies,
          });
        }
      });
    fetch(url + "/1.0/libra/currency")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState(
            {
              arr2: res.data.currencies,
            },
            () => {
              let arr = this.state.arr1.concat(this.state.arr2);
              arr.forEach((v, i) => {
                if (v.checked) {
                  // return v;
                } else {
                  Object.assign(v, { checked: false });
                }
                for (let j = 0; j < checkData.length; j++) {
                  if (
                    v.show_icon
                      .split("/")
                      [v.show_icon.split("/").length - 1].split(".")[0] ==
                    "violas"
                  ) {
                    if (v.show_name == checkData[j].show_name) {
                      // console.log(1,v.checked , checkData[j].checked);
                      v.checked = checkData[j].checked;
                      // console.log(2, v.checked, checkData[j].checked);
                    }
                  }
                }
              });
              // console.log(arr,'......')
              this.setState({
                addCurrencyList1: arr,
              });
            }
          );
        }
      });
  };
  string2Byte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10ffff) {
        bytes.push(((c >> 18) & 0x07) | 0xf0);
        bytes.push(((c >> 12) & 0x3f) | 0x80);
        bytes.push(((c >> 6) & 0x3f) | 0x80);
        bytes.push((c & 0x3f) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00ffff) {
        bytes.push(((c >> 12) & 0x0f) | 0xe0);
        bytes.push(((c >> 6) & 0x3f) | 0x80);
        bytes.push((c & 0x3f) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007ff) {
        bytes.push(((c >> 6) & 0x1f) | 0xc0);
        bytes.push((c & 0x3f) | 0x80);
      } else {
        bytes.push(c & 0xff);
      }
    }
    return bytes;
  }
  bytes2StrHex(arrBytes) {
    var str = "";
    for (var i = 0; i < arrBytes.length; i++) {
      var tmp;
      var num = arrBytes[i];
      if (num < 0) {
        //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
        tmp = (255 + num + 1).toString(16);
      } else {
        tmp = num.toString(16);
      }
      if (tmp.length == 1) {
        tmp = "0" + tmp;
      }
      if (i > 0) {
        str += tmp;
      } else {
        str += tmp;
      }
    }
    return str;
  }
  async violas_getTyArgs(_name) {
    let address = "00000000000000000000000000000001";
    let prefix = "07";
    let suffix = "00";
    let name_length = _name.length;
    if (name_length < 10) {
      name_length = "0" + name_length;
    }
    let _name_hex = this.bytes2StrHex(this.string2Byte(_name));
    let result =
      prefix +
      address +
      name_length +
      _name_hex +
      name_length +
      _name_hex +
      suffix;
    this.setState({ tyArgs: result }, async () => {
      await this.sendPublish(sessionStorage.getItem("violas_chainId"));
    });
  }
  //点击激活
  async getTyArgs(_name, _addr, ind, icon) {
    let type = icon.split("/")[icon.split("/").length - 1].split(".")[0];
    // window.sessionStorage.setItem("init", true);
    // console.log(this.state.addCurrencyList1, _name, icon.split('/')[icon.split('/').length - 1].split('.')[0],'.........')
    fetch(
      url +
        "/1.0/violas/currency/published?addr=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        let checkData = JSON.parse(sessionStorage.getItem("checkData"));
        let violas_Balances = JSON.parse(
          sessionStorage.getItem("violas_Balances")
        );
        let index = ind;
        if (res.data.published.length > 0) {
          let temp = {
            pd: false,
            violas_balance: {},
            published: {},
          };
          for (let i = 0; i < res.data.published.length; i++) {
            for (let j = 0; j < violas_Balances.length; j++) {
              if (res.data.published[i] == _name) {
                temp.pd = true;
                temp.violas_balance = violas_Balances[i];
                temp.published = res.data.published[i];

                break;
              }
            }
          }
          if (temp.pd) {
            if (temp.violas_balance.show_name == temp.published) {
              temp.violas_balance.checked = true;
              // console.log(temp.violas_balance,'......');
              checkData.push(temp.violas_balance);
              // console.log(checkData, "......1");
              window.sessionStorage.setItem(
                "checkData",
                JSON.stringify(checkData)
              );
              this.getBalance(checkData);
              this.props.showAddCoins(false);
            }
          } else {
            if (type == "violas") {
              this.setState({
                showWallet: true,
              });
              this.violas_getTyArgs(_name);
              // this.props.showAddCoins(false);
            } else if (type == "libra") {
              this.setState({
                showWallet: true,
              });
              this.violas_getTyArgs(_name);
              // this.props.showAddCoins(false);
            }
          }
        }
      });
  }
  //violas币激活
  async sendPublish(chainId) {
    const tx = {
      from: window.sessionStorage.getItem("violas_address"),
      payload: {
        code: code_data.violas.publish,
        tyArgs: [this.state.tyArgs],
        args: [],
      },
      chainId: chainId,
    };
    console.log(tx, "tx.........");
    this.state.walletConnector
      .sendTransaction("violas", tx)
      .then((res) => {
        this.setState({
          showWallet: false,
        });
        console.log("send publish ", res);
      })
      .catch((err) => {
        this.setState({
          showWallet: false,
        });
        console.log("send publish ", err);
      });
  }
  //libra激活
  async libra_getTyArgs(_module, _name) {
    let address = "00000000000000000000000000000001";
    let result = {
      module: _module,
      address: address,
      name: _name,
    };
    await this.setState({ tyArgs1: result }, async () => {
      await this.libra_sendPublish(sessionStorage.getItem("libra_chainId"));
    });
  }
  async libra_sendPublish(_chainId) {
    console.log(
      "You send Libra transaction with ",
      sessionStorage.getItem("libra_address")
    );
    let tx = {
      from: sessionStorage.getItem("libra_address"),
      payload: {
        code: code_data.libra.publish,
        tyArgs: [this.state.tyArgs1],
        args: [],
      },
      chainId: _chainId,
    };
    console.log("libra ", tx);
    this.props.walletConnector
      .sendTransaction("_libra", tx)
      .then((res) => {
        this.setState({
          showWallet: false,
        });
        console.log("Libra transaction", res);
      })
      .catch((err) => {
        this.setState({
          showWallet: false,
        });
        console.log("Libra transaction ", err);
      });
  }
  getPublish() {
    fetch(
      url +
        "/1.0/violas/currency/published?addr=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          //   // console.log(data,'...........')
          //   for (let i = 0; i < data.length; i++) {
          //     for (let j = 0; j < res.data.published.length; j++) {
          //       if (data[i].show_name == res.data.published[j]) {
          //         data[i].checked = true;
          //         break;
          //       } else {
          //         data[i].checked = false;
          //       }
          //     }
          //   }
          //   data.sort((a, b) => {
          //     return b.checked - a.checked
          //   })
          //   this.setState({
          //     addCurrencyList1: data
          //   })
        }
      });
  }
  closePub = (_name) => {
    fetch(
      url +
        "/1.0/violas/currency/published?addr=" +
        window.sessionStorage.getItem("violas_address")
    )
      .then((res) => res.json())
      .then((res) => {
        let checkData = JSON.parse(sessionStorage.getItem("checkData"));
        let violas_Balances = JSON.parse(
          sessionStorage.getItem("violas_Balances")
        );
        let temp = {
          pd: false,
          violas_balance: {},
          published: {},
        };
        console.log(res.data.published);
        for (let i = 0; i < res.data.published.length; i++) {
          for (let j = 0; j < violas_Balances.length; j++) {
            if (res.data.published[i] == _name) {
              temp.pd = true;
              temp.violas_balance = violas_Balances[i];
              temp.published = res.data.published[i];

              break;
            }
          }
        }
        if (temp.pd) {
          if (temp.violas_balance.show_name == temp.published) {
            temp.violas_balance.checked = false;
            let arrlist = checkData.filter(
              (v) => v.name != temp.violas_balance.name
            );
            window.sessionStorage.setItem("checkData", JSON.stringify(arrlist));
            this.getBalance(arrlist);
            this.props.showAddCoins(false);
            this.forceUpdate();
          }
        }
        // window.sessionStorage.setItem('typeName', JSON.stringify(names))
        for (let i = 0; i < this.state.addCurrencyList1.length; i++) {
          for (let j = 0; j < names.length; j++) {
            if (
              this.state.addCurrencyList1[i].show_name.indexOf(names[j]) == 0
            ) {
              this.state.addCurrencyList1[i].checked = false;
            }
          }
        }
        // console.log(this.state.addCurrencyList1)
        window.sessionStorage.setItem(
          "addCurrencyList1",
          JSON.stringify(this.state.addCurrencyList1)
        );
        this.props.showAddCoins(false);
      });
  };
  closeWallet = (val) => {
    this.setState({
      showWallet: val,
    });
  };
  render() {
    let { addCurrencyList1, addCurrencyList2, BTCData } = this.state;
    return (
      <div className="addCurrency">
        <h4 onClick={() => this.props.showAddCoins(false)}>
          <i>
            <img src="/img/编组备份 3@2x.png" />
          </i>
          {intl.get("Add Digital Currency")}
        </h4>
        <div className="addCurrencyLists">
          {BTCData.map((v, i) => {
            return (
              <div key={i} className="addCurrencyList">
                <p>
                  <i>
                    <img src={v.show_icon} />
                  </i>
                  <label>{v.show_name}</label>
                </p>
              </div>
            );
          })}

          {addCurrencyList1.map((v, i) => {
            return (
              <div className="addCurrencyList" key={i}>
                <p>
                  <i>
                    <img src={v.show_icon} />
                  </i>
                  <label>{v.show_name}</label>
                </p>
                <p>
                  {v.checked == false ? (
                    <img
                      src="/img/编组 4复制 2@2x.png"
                      onClick={() =>
                        this.getTyArgs(v.name, v.address, i, v.show_icon)
                      }
                    />
                  ) : (
                    <img
                      onClick={() => this.closePub(v.show_name)}
                      src="/img/Rectangle 2@2x.png"
                    />
                  )}
                </p>
              </div>
            );
          })}
          {/* <div className="addCurrencyList"><p><i><img src="/img/编组 38@2x.png" /></i><label>BTC</label></p></div>
          <div className="addCurrencyList"><p><i><img src="/img/编组 38@2x.png" /></i><label>BTC</label></p></div>
          <div className="addCurrencyList">
            <p><i><img src="/img/编组 38@2x.png" /></i><label>AAAUSD</label></p>
            <p><img src="/img/编组 4复制 2@2x.png"/></p>
          </div> */}
        </div>
        {this.state.showWallet ? (
          <WalletconnectDialog
            getCloseWallet={this.closeWallet}
          ></WalletconnectDialog>
        ) : null}
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
  return {
    showPolling: () => {
      dispatch({
        type: "DISPLAY",
        payload: false,
      });
    },
    showDetails: () => {
      dispatch({
        type: "DISPLAY1",
        payload: false,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCurrency);
