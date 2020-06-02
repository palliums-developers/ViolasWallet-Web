import React, { Component } from "react";
import { connect } from "react-redux";
import "./app.scss";
let url = "https://api.violas.io";

class HomeContent extends Component {
    constructor(){
      super()
      this.state = {
        
      }
    }
    componentDidMount(){
      this.getBalance()
    }

    getBalance = () => {
      if (window.localStorage.getItem('address')) {
        fetch(url + "/explorer/violas/address/" + window.localStorage.getItem('address')).then(res => res.json())
          .then(res => {
            console.log(res);
            // this.setState({
            //   balance: res.data.status.balance / 1e6
            // })

          })
      }
    }
    render(){
 
        return (
            <div className="content">
              <div className="contentWrap">
                <div className="apply">
                  <p>总资产<i><img src="/img/jurassic_openeyes 3@2x.png"/></i></p>
                  <div className="applyContent">
                    <span>$0.00</span>
                    <div className="btns">
                      <dl onClick={() => {
                        this.props.history.push({
                          pathname: '/homepage/home/transfar'
                        })
                        // window.sessionStorage.setItem('address', this.props.match.params.address)
                      }}>
                        <dt></dt>
                        <dd>Transfer</dd>
                      </dl>
                      <dl onClick={() => {
                        this.props.history.push({
                          pathname: '/homepage/home/getMoney'
                        })
                        // window.sessionStorage.setItem('address', this.props.match.params.address)
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
                      <div className="assetListsEvery" onClick={() => {
                        this.props.showDetails(!this.props.display1);
                      }}>
                      <div className="leftAsset"><i><img src="/img/编组 2复制 4@2x.png"/></i><label>BTC</label></div>
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
                    </div>
                    <div className="assetListsEvery">
                      <div className="leftAsset"><i><img src="/img/编组 2复制 4@2x.png" /></i><label>BTC</label></div>
                      <div className="rightAsset"><span>0.000</span><label>≈$0.00</label></div>
                    </div>
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