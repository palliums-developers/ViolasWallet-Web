import React, { Component } from "react";
// import "./app.scss";
import QRCode from "qrcode.react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import intl from "react-intl-universal";
import BigNumber from "bignumber.js";
const { encode, decode } = require("../../utils/bech32");

let url1 = "https://api.violas.io";
let url = "https://api4.violas.io";

//收款
class GetMoney extends Component {
    constructor(props){
      super()
      this.state = {
        types: ['Violas', 'Libra','Bitcoin'],
        type: '',
        type1:"",
        title: '',
        showDealType: false,
        address:'',
        dis: false,
        arr1:[],
        arr2:[],
        arr:[],
        BTCBalances:[],
        BTCAddress:'',
        coinName:'',
        coinNameType:'',
        ind:0,
        bech32:''
      }
    }
    getTypeShow = (event) => {
      this.stopPropagation(event)
      this.setState({
        showDealType: !this.state.showDealType
      })
    }
    getBech32(addr){
      let example = {
        prefix: "pdm",
        type: 1,
        address: addr,
        sub_address1: "0x0000000000000000",
      };
      let encode1 = encode(
        example.prefix,
        example.type,
        example.address,
        example.sub_address1
      );
      return encode1;
    }
    showTypes = (v,address,name,ind) => {
      // console.log(name);
      if (v == "violas") {
        this.setState(
          {
            type: name,
            type1: v,
            coinName: "violas://",
            address: address,
            showDealType: false,
            ind: ind,
          },
          () => {
            this.setState({
              bech32: this.getBech32(this.state.address),
            });
          }
        );
      } else if (v == "libra") {
        this.setState(
          {
            type: name,
            type1: v,
            coinName: "diem://",
            address: address,
            showDealType: false,
            ind: ind,
          },
          () => {
            this.setState({
              bech32: this.getBech32(this.state.address),
            });
          }
        );
      } else {
        this.setState({
          type: name,
          type1: v,
          coinName: "bitcoin:",
          address: this.state.BTCAddress,
          showDealType: false,
          ind: ind,
        });
      } 
      
    }
  
    componentWillMount(){
      if(this.props.display){
        this.props.showPolling();
      }
      // if (this.props.display1){
      //   this.props.showDetails();
      // }
      
    }
    stopPropagation(e) {
        e.nativeEvent.stopImmediatePropagation();
    }
    componentDidMount(){
      document.addEventListener('click', this.closeDialog);
      if (window.sessionStorage.getItem("btc_address")){
        this.setState({
          BTCAddress: window.sessionStorage.getItem("btc_address")
        }, () => {
          this.getTypesBalance()
        })
      }
    }
    //获取到每个币种及余额
    getTypesBalance() {
      fetch(url1 + "/1.0/btc/balance?address=" + this.state.BTCAddress)
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            this.setState(
              {
                BTCBalances: res.data
              },
              () => {
                this.getBalances();
                
              }
            );
          } else {
            this.getBalances();
            
          }
        });
    }
    getBalances(){
      fetch(url1 + "/1.0/violas/balance?addr=" + window.sessionStorage.getItem('violas_address')).then(res => res.json())
        .then(res => {
          if (res.data) {
            this.setState({
              arr1: res.data.balances
            }, () => {
             if (this.state.arr2.length == 0) {
              let newArr = this.state.arr1.concat(this.state.BTCBalances)
              // console.log(newArr, '.....')
              newArr.sort((a, b) => {
                return b.balance - a.balance
              })
              this.setState(
                {
                  arr: newArr,
                  type: newArr[0].show_name,
                  type1: newArr[0].show_icon
                    .split("/")
                    [newArr[0].show_icon.split("/").length - 1].split(".")[0],
                  coinName:
                    newArr[0].show_icon
                      .split("/")
                      [newArr[0].show_icon.split("/").length - 1].split(
                        "."
                      )[0] == "violas"
                      ? "violas://"
                      : newArr[0].show_icon
                          .split("/")
                          [newArr[0].show_icon.split("/").length - 1].split(
                            "."
                          )[0] == "libra"
                      ? "diem://"
                      : "bitcoin",
                  address:
                    newArr[0].show_name == "BTC"
                      ? this.state.BTCAddress
                      : newArr[0].address,
                  ind: Object.keys(newArr)[0],
                },
                () => {
                  this.setState({
                    bech32: this.getBech32(this.state.address),
                  });
                }
              );
            }
            })
          }
        })
      fetch(url1 + "/1.0/libra/balance?addr=" + window.sessionStorage.getItem('libra_address')).then(res => res.json())
        .then(res => {
          if (res.data) {
            this.setState({
              arr2: res.data.balances
            }, () => {
              let arr = this.state.arr1.concat(this.state.arr2)
              let newArr = arr.concat(this.state.BTCBalances)
              // console.log(newArr, '........')
              newArr.sort((a, b) => {
                return b.balance - a.balance
              })
              this.setState(
                {
                  arr: newArr,
                  type: newArr[0].show_name,
                  type1: newArr[0].show_icon
                    .split("/")
                    [newArr[0].show_icon.split("/").length - 1].split(".")[0],
                  coinName:
                    newArr[0].show_icon
                      .split("/")
                      [newArr[0].show_icon.split("/").length - 1].split(
                        "."
                      )[0] == "violas"
                      ? "violas://"
                      : newArr[0].show_icon
                          .split("/")
                          [newArr[0].show_icon.split("/").length - 1].split(
                            "."
                          )[0] == "libra"
                      ? "diem://"
                      : "bitcoin",
                  address: newArr[0].address,
                  ind: Object.keys(newArr)[0],
                },
                () => {
                  this.setState({
                    bech32: this.getBech32(this.state.address),
                  });
                }
              );
            })
          } else {
            if (this.state.arr1) {
              let newArr = this.state.arr1.concat(this.state.BTCBalances)
              // console.log(newArr, '.....')
              newArr.sort((a, b) => {
                return b.balance - a.balance
              })
              this.setState(
                {
                  arr: newArr,
                  type: newArr[0].show_name,
                  type1: newArr[0].show_icon
                    .split("/")
                    [newArr[0].show_icon.split("/").length - 1].split(".")[0],
                  coinName:
                    newArr[0].show_icon
                      .split("/")
                      [newArr[0].show_icon.split("/").length - 1].split(
                        "."
                      )[0] == "violas"
                      ? "violas://"
                      : newArr[0].show_icon
                          .split("/")
                          [newArr[0].show_icon.split("/").length - 1].split(
                            "."
                          )[0] == "libra"
                      ? "diem://"
                      : "bitcoin",
                  address:
                    newArr[0].show_name == "BTC"
                      ? this.state.BTCAddress
                      : newArr[0].address,
                  ind: Object.keys(newArr)[0],
                },
                () => {
                  this.setState({
                    bech32: this.getBech32(this.state.address),
                  });
                }
              );
            }
          }
        })
    }
    handleCopy = () => {
      const spanText = document.getElementById('add').innerText;
      const oInput = document.createElement('input');
      oInput.value = spanText;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      document.body.removeChild(oInput);
      this.setState({
        dis: true
      })
      let Timer = setInterval(() => {
        this.setState({
          dis: false
        })
      }, 1000);
    };
    closeDialog = () => {
      this.setState({
        showDealType: false
      })
    }
    getFloat(number, n) {
      n = n ? parseInt(n) : 0;
      if (n <= 0) {
        return Math.round(number);
      }
      number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
      number = parseFloat(Number(number).toFixed(n)); //补足位数
      return number;
    }
    getSearchList=(e)=>{
      if (e.target.value){
        let arr = this.state.arr.filter(v => {
          if (v.show_name.indexOf(e.target.value.toUpperCase()) >= 0) {
            return v;
          }
        })
        this.setState({
          arr: arr
        })
      }else{
        this.getBalances()
      }
     
    }
    render(){
      let { address, showDealType, type, dis, arr, coinName,ind } = this.state;
      // console.log(arr, ".....arr");
        return (
          <div className="getMoney">
            <div className="dialogContent">
              <i
                className="jt"
                onClick={() => {
                  window.history.go(-1);
                }}
              >
                <img src="/img/编组 10@2x.png" />
              </i>
              <h4>{intl.get("Receive")}</h4>
              <div className="dropdown1">
                {showDealType ? (
                  <span
                    className="showClick"
                    onClick={(e) => this.getTypeShow(e)}
                  >
                    {type}
                    <i>
                      <img src="/img/路径备份 6@2x.png" />
                    </i>
                  </span>
                ) : (
                  <span onClick={(e) => this.getTypeShow(e)}>
                    {type}
                    <i>
                      <img src="/img/路径 7@2x.png" />
                    </i>
                  </span>
                )}
                {showDealType ? (
                  <div className="dropdown-content1">
                    <div className="formSearch">
                      <img src="/img/sousuo 2@2x.png" />
                      <input
                        placeholder={intl.get("Search")}
                        onChange={(e) => this.getSearchList(e)}
                      />
                    </div>
                    <div className="searchWrap">
                      {arr.map((v, i) => {
                        return (
                          <div
                            className="searchList"
                            key={i}
                            onClick={() =>
                              this.showTypes(
                                v.show_icon
                                  .split("/")
                                  [v.show_icon.split("/").length - 1].split(
                                    "."
                                  )[0],
                                v.address,
                                v.name,
                                i
                              )
                            }
                          >
                            <div className="searchEvery">
                              <img src={v.show_icon} />
                              <div className="searchEvery1">
                                <div>
                                  <h4>{v.show_name}</h4>
                                  <p>
                                    {intl.get("Balance")}：
                                    {v.show_icon
                                      .split("/")
                                      [v.show_icon.split("/").length - 1].split(
                                        "."
                                      )[0] == "btc"
                                      ? v.BTC == 0
                                        ? 0
                                        : new BigNumber(
                                            String(v.BTC / 100000000)
                                          ).toFormat(8)
                                      : v.balance == 0
                                      ? 0
                                      : this.getFloat(v.balance / 1e6, 6)}{" "}
                                    {v.show_name}
                                  </p>
                                </div>
                                <span
                                  className={
                                    ind == i ? "check active" : "check"
                                  }
                                ></span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="qrCode">
                {this.state.type1 == "violas" ? (
                  <QRCode
                    value={
                      coinName + this.state.bech32 + "?c=" + this.state.type
                    }
                  ></QRCode>
                ) : this.state.type1 == "libra" ? (
                  <QRCode
                    value={
                      coinName + this.state.bech32 + "?c=" + this.state.type
                    }
                  ></QRCode>
                ) : (
                  <QRCode value={coinName + this.state.BTCAddress}></QRCode>
                )}
              </div>
              <div className="addressCode">
                <span id="add">{address}</span>
                {dis ? (
                  <i onClick={() => this.handleCopy()}>
                    <img src="/img/fuzhi 3@2x.png" />
                  </i>
                ) : (
                  <i onClick={() => this.handleCopy()}>
                    <img src="/img/Fill 3@2x.png" />
                  </i>
                )}

                {/* {
                      dis ? <div className="warn"><img src="/img/suc.png"/></div> : null
                    } */}
              </div>
            </div>
          </div>
        );
    }
}
let mapStateToProps = (state) =>{
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
    showPolling: () => {
      dispatch({
        type: "DISPLAY",
        payload: false,
      });
    },
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(GetMoney));