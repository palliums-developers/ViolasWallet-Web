import React, { Component } from "react";
import { connect } from "react-redux";
import "./app.scss";
let url = "https://api.violas.io";
// let url1 = "http://52.27.228.84:4000"
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
        visible:true
      }
    }
    componentDidMount(){
      this.setState({
        addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
      }, () => {
        this.getBalance()

      });
      
    }
    getBalance = () => {
      let { addCurrencyList, addCurrencyList1 } = this.state;
      fetch(url + "/explorer/violas/address/7f4644ae2b51b65bd3c9d414aa853407").then(res => res.json())
        .then(res => {
          if (res.data) {
            this.setState({
              balance1: Number(this.getFloat(res.data.status.balance / 1e6, 6)),
              addCurrencyList1: res.data.status.module_balande
            }, () => {

              let amount = 0;
              for (let i = 0; i < this.state.addCurrencyList1.length; i++) {
                amount += Number(this.getFloat(this.state.addCurrencyList1[i].balance / 1e6, 6))
              }

              this.setState({
                coinsBalance: amount
              })
            })
          }

        })

      fetch(url + "/explorer/libra/address/7f4644ae2b51b65bd3c9d414aa853407").then(res => res.json())
        .then(res => {
          if (res.data) {
            this.setState({
              balance2: Number(this.getFloat(res.data.status.balance / 1e6, 6))
            })
          }
        })
      fetch(url1 + "/api/address/tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee")
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            this.setState({
              balance3: Number(this.getFloat(res.balance, 8))
            }, () => {
              let balancesData = {
                coinsBalance: this.state.coinsBalance,
                balance1: this.state.balance1,
                balance2: this.state.balance2,
                balance3: this.state.balance3
              }
                window.sessionStorage.setItem('balances', this.getFloat(this.state.coinsBalance + this.state.balance1 + this.state.balance2 + this.state.balance3, 6))
            })
          }

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
    render(){
      let { addCurrencyList, coinsBalance, visible,balance1, balance2, balance3, addCurrencyList1 } = this.state;
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
                    visible ? <span>$ {this.getFloat(coinsBalance + balance1 + balance2 + balance3,6)}</span> : <span>***</span>
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
                      addCurrencyList.map((v,i)=>{
                        return <div className="assetListsEvery" key={i} onClick={() => {
                          this.props.showDetails(!this.props.display1);
                        }}>
                          <div className="leftAsset"><i>{
                            v.coinType == 'violas' ? <img src="/img/编组 2复制 4@2x.png" /> : v.coinType == 'libra' ? <img src="/img/编组 7@2x.png" /> : v.coinType == 'bitcoin' ? <img src="/img/BTC复制 2@2x.png" /> : null
                          }</i><label>{v.coinType}</label></div>
                          <div className="rightAsset"><span>{v.coinType == 'violas' ? balance1 : v.coinType == 'libra' ? balance2 : v.coinType == 'bitcoin' ? balance3 : null}</span><label>≈$0.00</label></div>
                        </div>
                      })
                    }
                    {
                      addCurrencyList1.map((v, i) => {
                        return <div className="assetListsEvery" key={i} onClick={() => {
                          this.props.showDetails(!this.props.display1);
                        }}>
                          <div className="leftAsset"><i><img src="/img/编组 38@2x.png" /></i><label>{v.name}</label></div>
                          <div className="rightAsset"><span>{this.getFloat(v.balance/1e6,6)}</span><label>≈$0.00</label></div>
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
      dispatch({
        type: "DISPLAY1",
        payload: type,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);