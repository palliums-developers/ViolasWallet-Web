import React, { Component } from "react";
import { connect } from "react-redux";
import { Drawer } from "antd";
import CurrencyDetail from "./components/currencyDetail";
import Details from "./components/details";
import "./app.scss";
// let url = "https://api.violas.io";
let url = "https://api.violas.io"
let url1 = "https://tbtc1.trezor.io"

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
        display1:false,
        display2: false,
        disType:false,
        detailAddr: '',
        name: '',
        detailData:{}
      }
    }
    
    componentDidMount(){
      if (JSON.parse(window.localStorage.getItem("wallet_info"))){
        this.setState({
          addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
          typeName: JSON.parse(window.sessionStorage.getItem("typeName"))
        }, () => {
          this.state.addCurrencyList.map((v, i) => {
            if (v.coinType == 'bitcoin') {
              this.setState({
                BTCAddress: v.address
              }, () => {
                this.getBalances()
              })
            }
          })
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
      return number;
    }
    getBalances(){
       fetch(url + "/1.0/btc/balance?address="+this.state.BTCAddress).then(res => res.json())
         .then(res => {
           this.setState({
             BTCBalances: res.data
           },()=>{
               fetch(url + "/1.0/violas/value/btc?address=" + this.state.BTCAddress).then(res => res.json())
                 .then(res => {
                   let btcRate = res.data;
                   for (let i = 0; i < this.state.BTCBalances.length;i++){
                     for (let j = 0; j < btcRate.length; j++){
                       if (this.state.BTCBalances[i].name == btcRate[i].name){
                         this.state.BTCBalances[i].rate = btcRate[i].rate
                          }
                     }
                   }
                   this.setState({
                     BTCBalances: this.state.BTCBalances
                   },()=>{
                       
                         fetch(url + "/1.0/violas/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
                           .then(res => {
                             console.log(res.data,'.............')
                             if(res.data){
                               this.setState({
                                 arr1: res.data.balances
                               }, () => {
                                 //  this.state.arr1.map((v,i)=>{
                                 //    if (v.show_name == 'LBR'){
                                 //        v.show_name = 'VLS'
                                 //     }
                                 //  })
                                 let BTCBalance = 0;
                                 this.state.BTCBalances.map((v, i) => {
                                   BTCBalance += Number(this.getFloat((v.BTC / 1e8) * v.rate, 8))
                                 })
                                 this.setState({
                                   BTCBalance: BTCBalance
                                 })
                                 fetch(url + "/1.0/violas/value/violas?address=" + window.localStorage.getItem('address')).then(res => res.json())
                                   .then(res => {
                                     let vioRate = res.data;
                                     for (let i = 0; i < this.state.arr1.length; i++) {
                                       for (let j = 0; j < vioRate.length; j++) {
                                         if (this.state.arr1[i].name == vioRate[i].name) {
                                           this.state.arr1[i].rate = vioRate[i].rate
                                         }
                                       }
                                     }
                                     this.setState({
                                       arr1: this.state.arr1
                                     }, () => {
                                       fetch(url + "/1.0/libra/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
                                         .then(res => {
                                           if(res.data){
                                            this.setState({
                                             arr2: res.data.balances
                                           }, () => {
                                                fetch(url + "/1.0/violas/value/libra?address=" + window.localStorage.getItem('address')).then(res => res.json())
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
                                                      let arr = this.state.arr1.concat(this.state.arr2)
                                                      arr.sort((a, b) => {
                                                        return b.balance - a.balance
                                                      })
                                                      arr.map((v, i) => {
                                                        if (v.checked) {
                                                          return v;
                                                        } else {
                                                          return Object.assign(v, { checked: true })
                                                        }
                                                      })
                                                      if (this.state.typeName) {
                                                        // let newArr = []; 
                                                        let typeNames = JSON.parse(window.sessionStorage.getItem("typeName"));
                                                        for (let i = 0; i < arr.length; i++) {
                                                          for (let j = 0; j < typeNames.length; j++) {
                                                            if (arr[i].show_name.indexOf(typeNames[j]) == 0) {
                                                              arr[i].checked = false
                                                            }
                                                          }
                                                        }
                                                        this.setState({
                                                          checkData: arr
                                                        }, () => {
                                                          let amount = 0;
                                                          for (let i = 0; i < this.state.checkData.length; i++) {
                                                            amount += Number(this.getFloat((this.state.checkData[i].balance / 1e6) * this.state.checkData[i].rate, 6))
                                                          }

                                                          this.setState({
                                                            coinsBalance: amount
                                                          }, () => {
                                                            window.sessionStorage.setItem('balances', this.state.coinsBalance + this.state.BTCBalance)
                                                            //  console.log(this.getFloat(this.state.coinsBalance + this.state.BTCBalance, 6))
                                                            this.setState({
                                                              totalAmount: this.getFloat(this.state.coinsBalance + this.state.BTCBalance, 2)
                                                            }, () => {

                                                            })
                                                          })
                                                        })
                                                      } else {
                                                        this.setState({
                                                          checkData: arr
                                                        }, () => {
                                                          let amount = 0;
                                                          for (let i = 0; i < this.state.checkData.length; i++) {
                                                            amount += Number(this.getFloat((this.state.checkData[i].balance / 1e6) * this.state.checkData[i].rate, 6))
                                                          }

                                                          this.setState({
                                                            coinsBalance: amount
                                                          }, () => {
                                                            window.sessionStorage.setItem('balances', this.state.coinsBalance + this.state.BTCBalance)
                                                            this.setState({
                                                              totalAmount: this.getFloat(this.state.coinsBalance + this.state.BTCBalance, 2)
                                                            })
                                                          })
                                                        })
                                                      }
                                                    })
                                                  })


                                           })
                                           }
                                           
                                         })
                                     })
                                   })
                               })
                             }
                           })
                         
                   })
                   
                 })
             
           })
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
      console.log(type)
      this.setState({
        display2: type
      })
    }
    
    curDataFun = (val) => {
      console.log(val)
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
        display1:false
      })
    };
    onClose1 = () => {
      this.setState({
        display2: false
      })
    };
    render(){
      let { BTCAddress, BTCBalances, visible, totalAmount, checkData, balance } = this.state;
        return (
            <div className="content">
              <div className="contentWrap">
                <div className="apply">
                  <p>Total assets
                  <i>
                  {
                      visible ? <img onClick={()=>{
                        this.setState({
                          visible:!this.state.visible
                        })
                      }} src="/img/jurassic_openeyes 3@2x.png"/> :<img onClick={()=>{
                        this.setState({
                          visible:!this.state.visible
                        })
                      }} src="/img/biyanjing 2@2x.png"/>
                  }
                  </i>
                  </p>
                  <div className="applyContent">
                  {
                    visible ? <span>$ {totalAmount}</span> : <span>***</span>
                  }
                    
                    <div className="btns">
                      <dl onClick={() => {
                        this.props.history.push({
                          pathname: '/homepage/home/transfer'
                        })
                      this.props.showPolling(false);
                      // this.props.showDetails(false);
                      }}>
                        <dt></dt>
                        <dd>Transfer</dd>
                      </dl>
                      <dl onClick={() => {
                        this.props.history.push({
                          pathname: '/homepage/home/getMoney'
                        })
                      this.props.showPolling(false);
                      // this.props.showDetails(false);
                      }}>
                        <dt></dt>
                        <dd>Receive</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="assetList">
                <p><label>Funds</label><i onClick={() => {
                  this.props.showPolling(!this.props.display);
                 
                }}><img src="/img/编组 18@2x.png"/></i></p>
                  <div className="assetLists">
                    {
                      BTCBalances.map((v,i)=>{
                        return <div className="assetListsEvery" key={i} onClick={() => {
                          this.setState({
                            display1: !this.state.display1,
                            name: v.name,
                            detailAddr: BTCAddress,
                            rate: v.BTC == 0 ? '0.00' : v.rate == 0 ? "0.00" : this.getFloat(v.rate * (v.BTC / 1e8), 6),
                            icon:v.show_icon,
                            balance: v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 6)
                          }, () => {
                              window.sessionStorage.setItem('detailAddr', BTCAddress)
                          })
                          // window.sessionStorage.setItem('detailAddr', BTCAddress)
                          // window.sessionStorage.setItem('name', v.name)
                        }}>
                          <div className="leftAsset"><i><img src={v.show_icon} /></i><label>{v.show_name}</label></div>
                          <div className="rightAsset"><span>{v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 6)}</span><label>≈${v.BTC == 0 ? '0.00' : v.rate == 0 ? "0.00" : this.getFloat(v.rate * (v.BTC / 1e8), 6)}</label></div>
                        </div>
                      })
                    }
                    
                    {
                      checkData.map((v, i) => {
                        return <div className="assetListsEvery" style={v.checked == false ? {display:"none"} : {display:"flex"}} key={i} onClick={() => {
                          this.setState({
                            display1:!this.state.display1,
                            name: v.show_name,
                            detailAddr: v.address,
                            rate: v.balance == 0 ? '0.00' : v.rate == 0 ? "0.00" : this.getFloat(v.rate * (v.balance / 1e6), 6),
                            icon: v.show_icon,
                            balance: v.balance == 0 ? 0 : this.getFloat(v.balance / 1e6, 6)
                          },()=>{
                              window.sessionStorage.setItem('detailAddr', v.address)
                          })
                        }}>
                          <div className="leftAsset"><i><img src={v.show_icon} /></i><label>{v.show_name}</label></div>
                          <div className="rightAsset"><span>{v.balance == 0 ? 0 : this.getFloat(v.balance / 1e6, 6)}</span><label>≈${v.balance == 0 ? '0.00' : v.rate == 0 ? "0.00" : this.getFloat(v.rate * (v.balance / 1e6), 6)}</label></div>
                        </div>
                      })
                    }  
                     
                  </div>
                </div>
              </div>
              {/* 币种详情 */}
              <Drawer
                // title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.display1}
                mask={false}
                getContainer={false}
              >
              <CurrencyDetail showDetails={this.showDetails} showDetails1={this.showDetails1} curDataFun={this.curDataFun} nameType={this.state.name} detailAddrs={this.state.detailAddr} rate={this.state.rate} icon={this.state.icon} balance={this.state.balance}></CurrencyDetail>
              </Drawer>
              { /* 详情 */}
              <Drawer
                // title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose1}
                visible={this.state.display2}
                mask={false}
                getContainer={false}
              >
              <Details showEveryDetail={this.showEveryDetail} detailDatas={this.state.detailData}></Details>
              </Drawer>
            </div>
           
        )
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