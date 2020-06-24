import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import '../app.scss'
// let url = "https://api.violas.io";
let url = "http://52.27.228.84:4000";

class AddCurrency extends Component {
  constructor(props) {
    super();
    this.state = {
      addCurrencyList:[],
      addCurrencyList1:[],
      arr1:[],
      arr2:[],
      foc:false,
      addList:[],
      checkData:[]
    };
  }
  componentDidMount() {
    this.getBalance()
    
    this.setState({
      addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
    },()=>{
      this.setState({
        addList: this.state.addCurrencyList[2]
      })
    });
    
  }
  getBalance = () => {
    if (window.localStorage.getItem('address')) {
      fetch(url + "/1.0/violas/currency").then(res => res.json())
        .then(res => {
          this.setState({
            arr1:res.data.currencies
          })
        })
      fetch(url + "/1.0/libra/currency").then(res => res.json())
        .then(res => {
          this.setState({
            arr2: res.data.currencies
          },()=>{
              let arr = this.state.arr1.concat(this.state.arr2)
              this.setState({
                addCurrencyList1: arr
              }, () => {
                  this.getPublish()
              })
          })
        })
      
    }
  }
  showPolling = () => {
    this.props.showPolling();
  };
  getPublish(){
    
    fetch(url + "/1.0/violas/currency/published?addr=7f4644ae2b51b65bd3c9d414aa853407").then(res => res.json())
      .then(res => {
        let data = this.state.addCurrencyList1.map((v, i) => {
          if (v.checked) {
            return v;
          } else {
            return Object.assign(v,{ checked: false })
          }
        })
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < res.data.published.length; j++) {
            if (data[i].name.indexOf(res.data.published[j]) == 0) {
              data[i].checked = true;
              break;
            } else {
              data[i].checked = false;
            }
          }
        }
        this.setState({
          addCurrencyList1:data
        })
        
      })
  }
  render() {
    let { addCurrencyList, addCurrencyList1, addList } = this.state;
    return (
      <div className="addCurrency">
        <h4 onClick={() => this.showPolling()}>
          <i>
            <img src="/img/编组备份 3@2x.png" />
          </i>
          Add Digital Currency
        </h4>
        <div className="addCurrencyLists">
          <div className="addCurrencyList"><p><i>
            {
              addList.coinType == 'bitcoin' ? <img src="/img/BTC复制 2@2x.png" /> : null
            }
          </i><label>{addList.coinType}</label></p></div>
          {
            addCurrencyList1.map((v, i) => {
              return <div className="addCurrencyList" key={i}>
                <p><i><img src={v.show_icon} /></i><label>{v.show_name}</label></p>
                <p>{
                 v.checked == false ? <img src="/img/编组 4复制 2@2x.png" /> : <img src="/img/Rectangle 2@2x.png" />
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
