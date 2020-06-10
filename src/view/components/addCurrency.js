import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import '../app.scss'
let url = "https://api.violas.io";

class AddCurrency extends Component {
  constructor(props) {
    super();
    this.state = {
      addCurrencyList:[],
      addCurrencyList1:[]
    };
  }
  componentDidMount() {
    this.getBalance()
    this.setState({
      addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
    });
  }
  getBalance = () => {
    if (window.localStorage.getItem('address')) {
      fetch(url + "/explorer/violas/address/0000000000000000000000000a550c18").then(res => res.json())
        .then(res => {
          this.setState({
            addCurrencyList1: res.data.status.module_balande
          })
          console.log(res);
          // this.setState({
          //   balance: res.data.status.balance / 1e6
          // })

        })
    }
  }
  showPolling = () => {
    this.props.showPolling();
  };
  render() {
    let { addCurrencyList, addCurrencyList1 } = this.state;
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
            addCurrencyList.map((v,i)=>{
              return <div className="addCurrencyList" key={i}><p><i>
                {
                  v.coinType == 'violas' ? <img src="/img/编组 2复制 4@2x.png" /> : v.coinType == 'libra' ? <img src="/img/编组 7@2x.png" /> : v.coinType == 'bitcoin' ? <img src="/img/BTC复制 2@2x.png" /> : null
                }
                </i><label>{v.coinType}</label></p></div>
            })
          }
          {
            addCurrencyList1.map((v, i) => {
              return <div className="addCurrencyList" key={i}>
                <p><i><img src="/img/编组 38@2x.png" /></i><label>{v.name}</label></p>
                <p><img src="/img/编组 4复制 2@2x.png" /></p>
              </div>
            })
          }
          <div className="addCurrencyList"><p><i><img src="/img/编组 38@2x.png" /></i><label>BTC</label></p></div>
          <div className="addCurrencyList"><p><i><img src="/img/编组 38@2x.png" /></i><label>BTC</label></p></div>
          <div className="addCurrencyList">
            <p><i><img src="/img/编组 38@2x.png" /></i><label>AAAUSD</label></p>
            <p><img src="/img/编组 4复制 2@2x.png"/></p>
          </div>
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
