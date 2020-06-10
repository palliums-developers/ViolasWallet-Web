import React, { Component } from "react";
import { connect } from "react-redux";
import "./app.scss";
let url = "https://api.violas.io";
let url1 = "http://52.27.228.84:4000"

class HomeContent extends Component {
    constructor(){
      super()
      this.state = {
        addCurrencyList: [],
        addCurrencyList1:[],
        balance:'0.00',
        visible:true
      }
    }
    componentDidMount(){
      this.getBalance()

      this.setState({
        addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
      });
    }

    getBalance = () => {
      if (window.localStorage.getItem('address')) {
        fetch(url + "/explorer/violas/address/0000000000000000000000000a550c18" ).then(res => res.json())
          .then(res => {
            this.setState({
              balance: res.data.status.balance/1e6,
              addCurrencyList1: res.data.status.module_balande
            })
            // console.log(res);
            // this.setState({
            //   balance: res.data.status.balance / 1e6
            // })

          })
        // fetch(url + "http://52.27.228.84:4000/explorer/libra/address/0000000000000000000000000a550c18").then(res => res.json())
        //   .then(res => {
          
        //     console.log(res);
        //     // this.setState({
        //     //   balance: res.data.status.balance / 1e6
        //     // })

        //   })
      }
    }
    render(){
      let { addCurrencyList, balance, visible, addCurrencyList1 } = this.state;
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
                    visible ? <span>${balance}</span> : <span>***</span>
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
                          <div className="rightAsset"><span>0.000</span><label>≈$0.00</label></div>
                        </div>
                      })
                    }
                    {
                      addCurrencyList1.map((v, i) => {
                        return <div className="assetListsEvery" onClick={() => {
                          this.props.showDetails(!this.props.display1);
                        }}>
                          <div className="leftAsset"><i><img src="/img/编组 38@2x.png" /></i><label>{v.name}</label></div>
                          <div className="rightAsset"><span>{v.balance}</span><label>≈$0.00</label></div>
                        </div>
                      })
                    }  
                    {/* <div className="assetListsEvery">
                      <div className="leftAsset"><i><img src="/img/编组 2复制 4@2x.png" /></i><label>BTC</label></div>
                      <div className="rightAsset"><span>0.000</span><label>≈$0.00</label></div>
                    </div>
                    <div className="assetListsEvery">
                      <div className="leftAsset"><i><img src="/img/编组 2复制 4@2x.png" /></i><label>BTC</label></div>
                      <div className="rightAsset"><span>0.000</span><label>≈$0.00</label></div>
                    </div>
                    <div className="assetListsEvery">
                      <div className="leftAsset"><i><img src="/img/编组 2复制 4@2x.png" /></i><label>BTC</label></div>
                      <div className="rightAsset"><span>0.000</span><label>≈$0.00</label></div>
                    </div>
                    <div className="assetListsEvery">
                      <div className="leftAsset"><i><img src="/img/编组 2复制 4@2x.png" /></i><label>BTC</label></div>
                      <div className="rightAsset"><span>0.000</span><label>≈$0.00</label></div>
                    </div> */}
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