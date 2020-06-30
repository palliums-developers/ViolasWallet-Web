import React, { Component } from "react";
import { connect } from "react-redux";
import "./app.scss";
// let url = "https://api.violas.io";
let url = "https://api4.violas.io"
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
        totalAmount:0.00
      }
    }
    componentWillMount(){
      
      
    }
    componentDidMount(){
      this.setState({
        addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info"))
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
    getFloat(number, n) {
      n = n ? parseInt(n) : 0;
      if (n <= 0) {
        return Math.round(number);
      }
      number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
      number = Number(number).toFixed(n); //补足位数
      return number;
    }
     getBalances(){
       fetch(url + "/1.0/btc/balance?address="+this.state.BTCAddress).then(res => res.json())
         .then(res => {
           this.setState({
             BTCBalances: res.data
           },()=>{
             let BTCBalance=0;
             this.state.BTCBalances.map((v,i)=>{
               BTCBalance += Number(this.getFloat(v.BTC / 1e8, 8))
             })
             this.setState({
               BTCBalance: BTCBalance
             },()=>{
                 fetch(url + "/1.0/violas/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
                   .then(res => {
                     this.setState({
                       arr1: res.data.balances
                     })
                   })
                 fetch(url + "/1.0/libra/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
                   .then(res => {
                     this.setState({
                       arr2: res.data.balances
                     }, () => {
                       let arr = this.state.arr1.concat(this.state.arr2)
                       arr.sort((a, b) => {
                         return b.balance - a.balance
                       })
                       this.setState({
                         checkData: arr
                       }, () => {
                         let amount = 0;
                         for (let i = 0; i < this.state.checkData.length; i++) {
                           amount += Number(this.getFloat(this.state.checkData[i].balance / 1e6, 6))
                         }

                         this.setState({
                           coinsBalance: amount
                         }, () => {
                          //  console.log(this.state.coinsBalance, this.state.BTCBalance)
                           window.sessionStorage.setItem('balances', this.state.coinsBalance + this.state.BTCBalance)
                           this.setState({
                             totalAmount: this.state.coinsBalance + this.state.BTCBalance
                           })
                          })
                       })
                     })
                   })
             })
           })
         })
       
      
    }
    
    render(){
      let { BTCAddress, BTCBalances, coinsBalance, visible, totalAmount, checkData, balance } = this.state;
        return (
            <div className="content">
              <div className="contentWrap">
                <div className="apply">
                  <p>总资产
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
                      this.props.showDetails(false);
                      }}>
                        <dt></dt>
                        <dd>Transfer</dd>
                      </dl>
                      <dl onClick={() => {
                        this.props.history.push({
                          pathname: '/homepage/home/getMoney'
                        })
                      this.props.showPolling(false);
                      this.props.showDetails(false);
                      }}>
                        <dt></dt>
                        <dd>Receive</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="assetList">
                <p><label>资产</label><i onClick={() => {
                  this.props.showPolling(!this.props.display);
                  // if (this.props.display1) {
                  //   document.querySelector(".ant-drawer").position =
                  //     "absolute!important";
                  // } else {
                  //   document.querySelector(".ant-drawer").position =
                  //     "fixed!important";
                  // }
                }}><img src="/img/编组 18@2x.png"/></i></p>
                  <div className="assetLists">
                    {
                      BTCBalances.map((v,i)=>{
                        return <div className="assetListsEvery" key={i} onClick={() => {
                          this.props.showDetails({
                            disType: !this.props.display1,
                            detailAddr: BTCAddress,
                            name:v.name
                          });
                        }}>
                          <div className="leftAsset"><i><img src={v.show_icon} /></i><label>{v.show_name}</label></div>
                          <div className="rightAsset"><span>{v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 6)}</span><label>≈$0.00</label></div>
                        </div>
                      })
                    }
                    
                    {
                    checkData.map((v, i) => {
                        return <div className="assetListsEvery" key={i} onClick={() => {
                          this.props.showDetails({
                            disType: !this.props.display1,
                            detailAddr:v.address,
                            name:v.name
                          });
                        }}>
                          <div className="leftAsset"><i><img src={v.show_icon} /></i><label>{v.show_name}</label></div>
                          <div className="rightAsset"><span>{v.balance == 0 ? 0 : this.getFloat(v.balance/1e6,6)}</span><label>≈$0.00</label></div>
                        </div>
                      })
                    }  
                     
                  </div>
                </div>
              </div>
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
    showDetails: (type) => {
      console.log(type)
      dispatch({
        type: "DISPLAY1",
        payload: {
          disType:type.disType,
          detailAddr: type.detailAddr,
          name:type.name
        }
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);