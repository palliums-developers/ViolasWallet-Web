import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import WalletConnect from '../../packages/browser/src/index';
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
      bridge: 'https://walletconnect.violas.io',
      addCurrencyList:[],
      addCurrencyList1:[],
      arr1:[],
      arr2:[],
      foc:false,
      addList:[],
      checkData:[],
      code: 'a11ceb0b01000701000202020403061004160205181d07356f08a4011000000001010000020001000003020301010004010300010501060c0108000506080005030a020a020005060c05030a020a020109000c4c696272614163636f756e741257697468647261774361706162696c6974791b657874726163745f77697468647261775f6361706162696c697479167061795f66726f6d5f776974685f6d657461646174611b726573746f72655f77697468647261775f6361706162696c69747900000000000000000000000000000001010104010c0b0011000c050e050a010a020b030b0438000b05110202',
      publish_code: 'a11ceb0b010006010002030206040802050a0707111a082b100000000100010101000201060c000109000c4c696272614163636f756e740c6164645f63757272656e63790000000000000000000000000000000101010001030b00380002',
      tyArgs: '0700000000000000000000000000000001034c4252034c425200',
      walletConnector: {},
      BTCData:[],
      addCurrencyList2:[]
    };
  }
  async componentWillMount() {
    await this.getNewWalletConnect();
  }
  async getNewWalletConnect() {
    await this.setState({ walletConnector: new WalletConnect({ bridge: this.state.bridge }) });
  }
  componentDidMount() {
    if (window.sessionStorage.getItem("btc_address")){
      this.setState({
        BTCAddress: window.sessionStorage.getItem("btc_address")
      }, () => {
        this.getBalance()
      })
    }
    if (JSON.parse(window.localStorage.getItem("wallet_info"))){
      this.setState({
        addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
      }, () => {
        this.setState({
          addList: this.state.addCurrencyList[2]
        })
      });
    }
  }
  getBalance = () => {
    fetch(url + "/1.0/btc/balance?address="+this.state.BTCAddress).then(res => res.json())
      .then(res => {
        // console.log(res.data)
        if (res.data) {
          this.setState({
            BTCData: res.data
          })
        }
        
      })
      fetch(url + "/1.0/violas/currency").then(res => res.json())
        .then(res => {
          if(res.data){
            this.setState({
              arr1: res.data.currencies
            })
          }
        })
      fetch(url + "/1.0/libra/currency").then(res => res.json())
        .then(res => {
          if (res.data){
            this.setState({
              arr2: res.data.currencies
            }, () => {
                // console.log(this.state.arr1, this.state.arr2,'........')
              let arr = this.state.arr1.concat(this.state.arr2)
              this.setState({
                addCurrencyList1: arr
              }, () => {
                this.getPublish()
              })
            })
          }
          
        })
  }
  showPolling = () => {
    this.props.showPolling();
  };
  string2Byte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
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
  async getTyArgs(_name,_addr,ind) {

    
    fetch(url + "/1.0/violas/currency/published?addr=" + window.sessionStorage.getItem('violas_address')).then(res => res.json())
      .then(res => {
        let arr = [];
        let index = ind;
        for (let i = 0; i < res.data.published.length; i++) {
          for (let j = 0; j < this.state.addCurrencyList1.length; j++) {
            if (this.state.addCurrencyList1[j].name == _name) {
              if (res.data.published[i].indexOf(this.state.addCurrencyList1[j].name) == 0) {
                this.state.addCurrencyList1[j].checked = true;
                window.sessionStorage.setItem('addCurrencyList1', JSON.stringify(this.state.addCurrencyList1))
                  arr = JSON.parse(window.sessionStorage.getItem('typeName'))
                  arr.splice(index, 1)
                  console.log(arr)
                  window.sessionStorage.setItem('typeName', JSON.stringify(arr))
                  this.showPolling()
              }
            }else{
              let address = '00000000000000000000000000000001';
              let prefix = '07';
              let suffix = '00';
              let name_length = _name.length;
              if (name_length < 10) {
                name_length = '0' + name_length;
              }
              let _name_hex = this.bytes2StrHex(this.string2Byte(_name));
              let result = prefix + address + name_length + _name_hex + name_length + _name_hex + suffix;
              this.setState({ tyArgs: result }, async () => {

                await this.sendPublish()
              });
            }

          }

        }
      })
  }
  async sendPublish() {
    const tx = {
      from: window.sessionStorage.getItem('violas_address'),
      payload: {
        code: this.state.publish_code,
        tyArgs: [
          this.state.tyArgs
        ],
        args: [
          // {
          //   type: 'Address',
          //   value: ''
          // },
          // {
          //   type: 'Number',
          //   value: ''
          // },
          // {
          //   type: 'Bytes',
          //   value: ''
          // },
          // {
          //   type: 'Bytes',
          //   value: ''
          // },
        ]
      },
      // maxGasAmount: 400000,
      // gasUnitPrice: 0,
      // sequenceNumber: seq,
      gasCurrencyCode: this.state.gasCurrencyCode,
    }
    // console.log(tx,'tx.........')
    this.state.walletConnector.sendTransaction(tx).then(res => {
      console.log('send publish ', res);
    }).catch(err => {
      console.log('send publish ', err);
    })
  }

  getPublish(){
    
    fetch(url + "/1.0/violas/currency/published?addr="+window.sessionStorage.getItem('violas_address')).then(res => res.json())
      .then(res => {
        if(res.data){
          let data = this.state.addCurrencyList1.map((v, i) => {
            if (v.checked) {
              return v;
            } else {
              return Object.assign(v, { checked: false })
            }
          })
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < res.data.published.length; j++) {
              if (data[i].name == res.data.published[j]) {
                data[i].checked = true;
                break;
              } else {
                data[i].checked = false;
              }
            }
          }

          data.sort((a, b) => {
            return b.checked - a.checked
          })
          this.setState({
            addCurrencyList1: data
          })
        }
        
      })
  }
  closePub = (name) =>{
      names.push(name)
      window.sessionStorage.setItem('typeName', JSON.stringify(names))
      for (let i = 0; i < this.state.addCurrencyList1.length; i++) {
        for (let j = 0; j < names.length; j++) {
          if (this.state.addCurrencyList1[i].show_name.indexOf(names[j]) == 0) {
            this.state.addCurrencyList1[i].checked = false
          }
        }

      }
      // console.log(this.state.addCurrencyList1)
      window.sessionStorage.setItem('addCurrencyList1', JSON.stringify(this.state.addCurrencyList1))
      this.props.showPolling();
  }

  render() {
    let { addCurrencyList1, addCurrencyList2, BTCData } = this.state;
    return (
      <div className="addCurrency">
        <h4 onClick={() => this.showPolling()}>
          <i>
            <img src="/img/编组备份 3@2x.png" />
          </i>
          Add Digital Currency
        </h4>
        <div className="addCurrencyLists">
          {
            BTCData.map((v,i)=>{
              return <div key={i} className="addCurrencyList"><p><i><img src={v.show_icon} /></i><label>{v.show_name}</label></p></div>
            })
          }
          
          {
            JSON.parse(window.sessionStorage.getItem('addCurrencyList1')) ? JSON.parse(window.sessionStorage.getItem('addCurrencyList1')).map((v, i) => {
              return <div className="addCurrencyList" key={i}>
                <p><i><img src={v.show_icon} /></i><label>{v.show_name}</label></p>
                <p>{
                 v.checked == false ? <img src="/img/编组 4复制 2@2x.png" onClick={() => this.getTyArgs(v.name, v.address,i)} /> : <img onClick={() => this.closePub(v.show_name)} src="/img/Rectangle 2@2x.png" />
                }</p>
              </div>
            }) : addCurrencyList1.map((v, i) => {
              return <div className="addCurrencyList" key={i}>
                <p><i><img src={v.show_icon} /></i><label>{v.show_name}</label></p>
                <p>{
                  v.checked == false ? <img src="/img/编组 4复制 2@2x.png" onClick={() => this.getTyArgs(v.name, v.address,i)} /> : <img onClick={() => this.closePub(v.show_name)} src="/img/Rectangle 2@2x.png" />
                }</p>
              </div>
            })
          }
          {/* <div className="addCurrencyList"><p><i><img src="/img/编组 38@2x.png" /></i><label>BTC</label></p></div>
          <div className="addCurrencyList"><p><i><img src="/img/编组 38@2x.png" /></i><label>BTC</label></p></div>
          <div className="addCurrencyList">
            <p><i><img src="/img/编组 38@2x.png" /></i><label>AAAUSD</label></p>
            <p><img src="/img/编组 4复制 2@2x.png"/></p>
          </div> */}
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
