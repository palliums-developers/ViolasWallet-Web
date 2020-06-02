import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import '../app.scss'
class AddCurrency extends Component {
  constructor(props) {
    super();
    this.state = {
      addCurrencyList:[]
    };
  }
  componentDidMount() {
    this.setState({
      addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
    });
    console.log(JSON.parse(window.localStorage.getItem("wallet_info")));
  }
  showPolling = () => {
    this.props.showPolling();
  };
  render() {
    let { addCurrencyList } = this.state;
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
