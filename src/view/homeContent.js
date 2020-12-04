import React, { Component } from "react";
import { connect } from "react-redux";
import { Drawer, Affix } from "antd";
import CurrencyDetail from "./components/currencyDetail";
import Details from "./components/details";
import intl, { init } from "react-intl-universal";
import AddCurrency from "./components/addCurrency";
import "./app.scss";
let url1 = "https://api4.violas.io";
let url = "https://api.violas.io"

// let url1 = "https://tbtc1.trezor.io"

//钱包首页
class HomeContent extends Component {
    constructor(){
      super()
      this.state = {
        addCurrencyList: [],
        addCurrencyList1: [],
        coinsBalance:0,
        balance1: 0,
        balance2: 0,
        balance3: 0,
        visible:true,
        checkData:[],
        balance:0,
        arr1:[],
        arr2:[],
        BTCAddress:'',
        BTCBalances:[],
        BTCBalance:0,
        totalAmount:0.00,
        typeName:'',
        BTCRate:0,
        display:false,
        display1:false,
        display2: false,
        disType:false,
        detailAddr: '',
        name: '',
        detailData:{},
        init:false
      }
    }
    stopPropagation(e) {
        e.nativeEvent.stopImmediatePropagation();
    }
    async componentWillMount(){
      if(window.sessionStorage.getItem("btc_address")){
        this.getBalances();
      }
    }
    componentDidMount(){
      document.addEventListener('click', this.onClose);
      if (JSON.parse(window.localStorage.getItem("wallet_info"))){
        this.setState({
          addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
          // typeName: JSON.parse(window.sessionStorage.getItem("typeName"))
        });
      }
    }
    getFloat(number, n) {
      n = n ? parseInt(n) : 0;
      if (n <= 0) {
        return Math.round(number);
      }
      number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
      number = parseFloat(Number(number).toFixed(n)); //补足位数
      if (typeof(number) != parseFloat) {
         number.toFixed(2);
      }
      return number;
    }
    getBalances = () =>{
       let initCoinsList = [];
       fetch(
         url1 +
           "/1.0/btc/balance?address=" +
           window.sessionStorage.getItem("btc_address")
       )
         .then((res) => res.json())
         .then((res) => {
           this.setState(
             {
               BTCBalances: res.data,
             },
             () => {
               fetch(url1 + "/1.0/violas/value/btc")
                 .then((res) => res.json())
                 .then((res) => {
                   let btcRate = res.data;
                   let { BTCBalances } = this.state;
                   let BTCBalance = 0;
                   // console.log(res.data)
                   for (let i = 0; i < BTCBalances.length; i++) {
                     for (let j = 0; j < btcRate.length; j++) {
                       if (BTCBalances[i].name == btcRate[i].name) {
                         BTCBalances[i].rate = btcRate[i].rate;
                       }
                     }
                   }
                   for (let i = 0; i < BTCBalances.length; i++) {
                     BTCBalance += Number(
                       this.getFloat(
                         (BTCBalances[i].BTC / 1e8) * BTCBalances[i].rate,
                         8
                       )
                     );
                   }
                   this.setState({
                     BTCBalance: BTCBalance,
                   });
                   //violas余额列表
                   fetch(
                     url1 +
                       "/1.0/violas/balance?addr=" +
                       window.sessionStorage.getItem("violas_address")
                   )
                     .then((res) => res.json())
                     .then((res) => {
                       //  console.log(res.data,'.............')
                       if (res.data) {
                         this.setState(
                           {
                             arr1: res.data.balances,
                           },
                           () => {
                             fetch(
                               url1 +
                                 "/1.0/violas/value/violas?address=" +
                                 window.sessionStorage.getItem("violas_address")
                             )
                               .then((res) => res.json())
                               .then((res) => {
                                 let vioRate = res.data;
                                 for (
                                   let i = 0;
                                   i < this.state.arr1.length;
                                   i++
                                 ) {
                                   for (let j = 0; j < vioRate.length; j++) {
                                     if (
                                       this.state.arr1[i].name ==
                                       vioRate[i].name
                                     ) {
                                       this.state.arr1[i].rate =
                                         vioRate[i].rate;
                                     }
                                   }
                                 }
                                 this.setState(
                                   {
                                     arr1: this.state.arr1,
                                   },
                                   () => {
                                     if (this.state.arr2.length == 0) {
                                        let { arr1 } = this.state;
                                        let arrs = arr1;
                                        window.sessionStorage.setItem(
                                          "violas_Balances",
                                          JSON.stringify(arrs)
                                        );
                                        if (arr1) {
                                          arrs.sort((a, b) => {
                                            return b.balance - a.balance;
                                          });
                                          arrs.map((v, i) => {
                                            if (v.name == "LBR") {
                                              initCoinsList.push(v);
                                            }
                                          });
                                          initCoinsList.map((v, i) => {
                                            if (v.checked) {
                                              //  return v;
                                            } else {
                                              Object.assign(v, {
                                                checked: true,
                                              });
                                            }
                                          });
                                          let temp = JSON.parse(
                                            window.sessionStorage.getItem("checkData")
                                          );
                                          //  console.log(arrs,'.......');
                                          if (temp && arrs) {
                                            for (let i = 0; i < temp.length; i++) {
                                              for (let j = 0; j < arrs.length; j++) {
                                                if (temp[i].show_icon.split("/")[temp[i].show_icon.split("/").length - 1].split(".")[0] == arrs[j].show_icon.split("/")[arrs[j].show_icon.split("/").length - 1].split(".")[0]) {
                                                if (temp[i].name == arrs[j].name) {
                                                  temp[i].balance = arrs[j].balance;
                                                  break;
                                                }
                                                }
                                              }
                                            }
                                            sessionStorage.setItem(
                                              "checkData",
                                              JSON.stringify(temp)
                                            );
                                          } else {
                                            window.sessionStorage.setItem(
                                              "checkData",
                                              JSON.stringify(initCoinsList)
                                            );
                                          }
                                          this.setState({
                                            checkData: JSON.parse(
                                              window.sessionStorage.getItem(
                                                "checkData"
                                              )
                                            ),
                                          });
                                        }
                                         }
                                      });
                               });
                           }
                         );
                       }
                     });
                   //libra余额列表
                   fetch(url1 + "/1.0/libra/balance?addr=" + window.sessionStorage.getItem('libra_address')).then(res => res.json())
                     .then(res => {
                       if (res.data) {
                         this.setState({
                           arr2: res.data.balances
                         }, () => {
                           fetch(url1 + "/1.0/violas/value/libra?address=" + window.sessionStorage.getItem('libra_address')).then(res => res.json())
                             .then(res => {
                               let libRate = res.data;
                               for (let i = 0; i < this.state.arr2.length; i++) {
                                 for (let j = 0; j < libRate.length; j++) {
                                   if (this.state.arr2[i].name == libRate[i].name) {
                                     this.state.arr2[i].rate = libRate[i].rate
                                   }
                                 }
                               }
                               this.setState({
                                 arr2: this.state.arr2
                               }, () => {
                                 let { arr2,arr1 } = this.state;
                                 let arrs = arr2.concat(arr1)
                                 window.sessionStorage.setItem(
                                   "violas_Balances",
                                   JSON.stringify(arrs)
                                 );
                                 if (arr1) {
                                   
                                   arrs.sort((a, b) => {
                                     return b.balance - a.balance;
                                   });
                                   arrs.map((v, i) => {
                                     if (v.name == "LBR") {
                                       initCoinsList.push(v);
                                     }
                                   });
                                   initCoinsList.map((v, i) => {
                                     if (v.checked) {
                                       //  return v;
                                     } else {
                                       Object.assign(v, {
                                         checked: true,
                                       });
                                     }
                                   });
                                   let temp = JSON.parse(
                                     window.sessionStorage.getItem("checkData")
                                   );
                                  //  console.log(arrs,'.......');
                                   if (temp && arrs) {
                                     for (let i = 0; i < temp.length; i++) {
                                       for (let j = 0; j < arrs.length; j++) {
                                         if (temp[i].show_icon.split("/")[temp[i].show_icon.split("/").length - 1].split(".")[0] == arrs[j].show_icon.split("/")[arrs[j].show_icon.split("/").length - 1].split(".")[0]) {
                                         if (temp[i].name == arrs[j].name) {
                                           temp[i].balance = arrs[j].balance;
                                           break;
                                         }
                                        }
                                       }
                                     }
                                     sessionStorage.setItem(
                                       "checkData",
                                       JSON.stringify(temp)
                                     );
                                   } else {
                                     window.sessionStorage.setItem(
                                       "checkData",
                                       JSON.stringify(initCoinsList)
                                     );
                                   }
                                   this.setState({
                                     checkData: JSON.parse(
                                       window.sessionStorage.getItem(
                                         "checkData"
                                       )
                                     ),
                                   });
                                 }
                               })
                             })

                         })
                       } else {
                        //  let { arr1 } = this.state;
                        //  if (arr1) {
                        //    arr1.sort((a, b) => {
                        //      return b.balance - a.balance
                        //    })
                        //    arr1.map((v, i) => {
                        //      if (v.checked) {
                        //        return v;
                        //      } else {
                        //        return Object.assign(v, { checked: true })
                        //      }
                        //    })
                          //  if (this.state.typeName) {
                          //    // let newArr = [];
                          //    let typeNames = JSON.parse(window.sessionStorage.getItem("typeName"));
                          //    for (let i = 0; i < arr1.length; i++) {
                          //      for (let j = 0; j < typeNames.length; j++) {
                          //        if (arr1[i].show_name.indexOf(typeNames[j]) == 0) {
                          //          arr1[i].checked = false
                          //        }
                          //      }
                          //    }
                          //    this.setState({
                          //      checkData: arr1
                          //    }, () => {
                          //      let amount = 0;
                          //      for (let i = 0; i < this.state.checkData.length; i++) {
                          //        amount += Number(this.getFloat((this.state.checkData[i].balance / 1e6) * this.state.checkData[i].rate, 6))
                          //      }

                          //      this.setState({
                          //        coinsBalance: amount
                          //      }, () => {
                          //        window.sessionStorage.setItem('balances', this.state.coinsBalance + this.state.BTCBalance)
                          //        //  console.log(this.getFloat(this.state.coinsBalance + this.state.BTCBalance, 6))
                          //        this.setState({
                          //          totalAmount: this.getFloat(this.state.coinsBalance + this.state.BTCBalance, 2)
                          //        }, () => {

                          //        })
                          //      })
                          //    })
                          //  } else {
                          //    this.setState({
                          //      checkData: arr1
                          //    }, () => {
                          //      let amount = 0;
                          //      for (let i = 0; i < this.state.checkData.length; i++) {
                          //        amount += Number(this.getFloat((this.state.checkData[i].balance / 1e6) * this.state.checkData[i].rate, 6))
                          //      }

                          //      this.setState({
                          //        coinsBalance: amount
                          //      }, () => {
                          //        window.sessionStorage.setItem('balances', this.state.coinsBalance + this.state.BTCBalance)
                          //        this.setState({
                          //          totalAmount: this.getFloat(this.state.coinsBalance + this.state.BTCBalance, 2)
                          //        })
                          //      })
                          //    })
                          //  }
                         }
                      //  }
                     })
                 });
             }
           );
         });
         
      
      
    }
    //显示添加币种页面
    showAddCoins=(type)=>{
      this.setState({
        display: type
      })
    }
    //显示币种详情页面
    showDetails=(type)=>{
      this.setState({
        display1: type
      })
    }
    //显示详情页面
    showDetails1 = (type) =>{
      this.setState({
        display2: type
      })
    }
    
    curDataFun = (val) => {
      this.setState({
        detailData:val
      })
    }
    showEveryDetail = (type) =>{
      this.setState({
        display2: type,
        display1:true
      })
    }
    onClose = () => {
      this.setState({
        display:false,
        display1:false,
        display2: false
      })
    };
    // onClose1 = () => {
    //   this.setState({
    //     display2: false
    //   })
    // };
    getInitTotal = (val) =>{
      this.setState({
        totalAmount:val
      });
    }
    render(){
      let { BTCAddress, BTCBalances, visible, totalAmount, checkData, balance } = this.state;
        return (
          <div className="content">
            <div className="contentWrap">
              <div className="apply">
                <p>
                  {intl.get("Total assets")}
                  <i>
                    {visible ? (
                      <img
                        onClick={() => {
                          this.setState({
                            visible: !this.state.visible,
                          });
                        }}
                        src="/img/jurassic_openeyes 3@2x.png"
                      />
                    ) : (
                      <img
                        onClick={() => {
                          this.setState({
                            visible: !this.state.visible,
                          });
                        }}
                        src="/img/biyanjing 2@2x.png"
                      />
                    )}
                  </i>
                </p>
                <div className="applyContent">
                  {visible ? <span>$ {totalAmount}</span> : <span>******</span>}

                  <div className="btns">
                    <dl
                      onClick={() => {
                        this.props.history.push({
                          pathname: "/homepage/home/transfer",
                        });
                        // this.props.showPolling(false);
                        // this.props.showDetails(false);
                      }}
                    >
                      <dt></dt>
                      <dd>{intl.get("Transfer")}</dd>
                    </dl>
                    <dl
                      onClick={() => {
                        this.props.history.push({
                          pathname: "/homepage/home/getMoney",
                        });
                        // this.props.showPolling(false);
                        // this.props.showDetails(false);
                      }}
                    >
                      <dt></dt>
                      <dd>{intl.get("Receive")}</dd>
                    </dl>
                    <dl
                      onClick={() => {
                        this.props.history.push(
                          "/homepage/home/digitalBank/mapping"
                        );
                      }}
                    >
                      <dt></dt>
                      <dd>{intl.get("Mapping")}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="assetList">
                <p>
                  <label>{intl.get("Funds")}</label>
                  <i
                    onClick={(e) => {
                      this.stopPropagation(e);
                      this.setState({
                        display: true,
                      });
                      // this.props.showPolling(!this.props.display);
                    }}
                  >
                    <img src="/img/编组 18@2x.png" />
                  </i>
                </p>
                <div
                  className="goMining"
                  onClick={() => {
                    this.props.history.push("/homepage/home/miningAwards");
                  }}
                >
                  <span>挖矿领福利</span>
                </div>
                <div className="assetLists">
                  {BTCBalances.map((v, i) => {
                    return (
                      <div
                        className="assetListsEvery"
                        key={i}
                        onClick={(e) => {
                          this.stopPropagation(e);
                          this.setState(
                            {
                              display1: !this.state.display1,
                              name: v.name,
                              detailAddr: sessionStorage.getItem("btc_address"),
                              rate:
                                v.BTC == 0
                                  ? "0.00"
                                  : v.rate == 0
                                  ? "0.00"
                                  : this.getFloat(v.rate * (v.BTC / 1e8), 2),
                              icon: v.show_icon,
                              balance:
                                v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 8),
                            },
                            () => {
                              window.sessionStorage.setItem(
                                "detailAddr",
                                BTCAddress
                              );
                            }
                          );
                        }}
                      >
                        <div className="leftAsset">
                          <i>
                            <img src={v.show_icon} />
                          </i>
                          <label>{v.show_name}</label>
                        </div>
                        <div className="rightAsset">
                          {visible ? (
                            <span>
                              {v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 8)}
                            </span>
                          ) : (
                            <span>******</span>
                          )}

                          {visible ? (
                            <label>
                              ≈$
                              {v.BTC == 0
                                ? "0.00"
                                : v.rate == 0
                                ? "0.00"
                                : this.getFloat(v.rate * (v.BTC / 1e8), 2)}
                            </label>
                          ) : (
                            <label>******</label>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {JSON.parse(window.sessionStorage.getItem("checkData")) &&
                    JSON.parse(window.sessionStorage.getItem("checkData")).map(
                      (v, i) => {
                        return (
                          <div
                            className="assetListsEvery"
                            style={
                              v.checked == false
                                ? { display: "none" }
                                : { display: "flex" }
                            }
                            key={i}
                            onClick={(e) => {
                              this.stopPropagation(e);
                              this.setState(
                                {
                                  display1: !this.state.display1,
                                  name: v.show_name,
                                  detailAddr: v.address,
                                  rate:
                                    v.balance == 0
                                      ? "0.00"
                                      : v.rate == 0
                                      ? "0.00"
                                      : this.getFloat(
                                          v.rate * (v.balance / 1e6),
                                          6
                                        ),
                                  icon: v.show_icon,
                                  balance:
                                    v.balance == 0
                                      ? 0
                                      : this.getFloat(v.balance / 1e6, 6),
                                },
                                () => {
                                  window.sessionStorage.setItem(
                                    "detailAddr",
                                    v.address
                                  );
                                }
                              );
                            }}
                          >
                            <div className="leftAsset">
                              <i>
                                <img src={v.show_icon} />
                              </i>
                              <label>{v.show_name}</label>
                            </div>
                            <div className="rightAsset">
                              {visible ? (
                                <span>
                                  {v.balance == 0
                                    ? 0
                                    : this.getFloat(v.balance / 1e6, 6)}
                                </span>
                              ) : (
                                <span>******</span>
                              )}

                              {visible ? (
                                <label>
                                  ≈$
                                  {v.balance == 0
                                    ? "0.00"
                                    : v.rate == 0
                                    ? "0.00"
                                    : this.getFloat(
                                        v.rate * (v.balance / 1e6),
                                        2
                                      )}
                                </label>
                              ) : (
                                <label>******</label>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
                <div
                  className="free"
                  onClick={() => {
                    this.props.history.push("/homepage/home/userRewards");
                  }}
                >
                  <span>免费领取</span>
                </div>
            </div>
            {/* 添加币种 */}
            <Drawer
              placement="right"
              closable={false}
              // onClose={this.onClose}
              visible={this.state.display}
              mask={false}
              getContainer={false}
            >
              <AddCurrency
                showAddCoins={this.showAddCoins}
                checkData={this.state.checkData}
                BTCBalance={this.state.BTCBalance}
                getInitTotal={this.getInitTotal}
                getBalances={this.getBalances}
              ></AddCurrency>
            </Drawer>
            {/* 币种详情 */}
            <Drawer
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.display1}
              mask={false}
              getContainer={false}
            >
              <CurrencyDetail
                showDetails={this.showDetails}
                showDetails1={this.showDetails1}
                curDataFun={this.curDataFun}
                nameType={this.state.name}
                detailAddrs={this.state.detailAddr}
                rate={this.state.rate}
                icon={this.state.icon}
                balance={this.state.balance}
              ></CurrencyDetail>
            </Drawer>
            {/* 详情 */}
            <Drawer
              placement="right"
              closable={false}
              onClose={this.onClose1}
              visible={this.state.display2}
              mask={false}
              getContainer={false}
            >
              <Details
                showEveryDetail={this.showEveryDetail}
                detailDatas={this.state.detailData}
              ></Details>
            </Drawer>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);