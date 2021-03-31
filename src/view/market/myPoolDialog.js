import React, { Component } from "react";
import "./market.scss";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import intl from "react-intl-universal";
let url1 = "https://api4.violas.io"
let url = "https://api.violas.io";

class MyPoolDialog extends Component {
    constructor(props) {
        super()
        this.state = {
            poolList:[],
            total_token:0
        }
    }
    //获取资产记录
    componentDidMount() {
        fetch(url1 + "/1.0/market/pool/info?address=" + window.sessionStorage.getItem('violas_address')).then(res => res.json())
            .then(res => {
                if (JSON.stringify(res.data) !="{}") {
                  this.setState({
                    // res.data.balance  res.data.total_token
                    poolList: res.data.balance,
                    total_token: res.data.total_token,
                  });
                }
                
            })
    }
    showPolling = () => {
        this.props.showPolling()
    };
    render() {
        let { total_token, poolList } = this.state;
        // console.log(poolList,'.......')
        return (
          <div className="myPoolDialog">
            <h4 onClick={() => this.props.showDrawer1(false)}>
              <i>
                <img src="/img/编组备份 3@2x.png" />
              </i>
              {intl.get("My Pool")}
            </h4>
            <div className="amountShow">
              <p>{intl.get("Pool token")}</p>
              <p>
                <span>{total_token / 1e6}</span>
              </p>
            </div>
            <div className="btns">
              <button
                onClick={() => {
                  window.sessionStorage.setItem(
                    "curDealType",
                    intl.get("Add Liquidity")
                  );
                  window.location.reload();
                }}
              >
                {intl.get("Add Liquidity")}
              </button>
              <button
                onClick={() => {
                  window.sessionStorage.setItem("curDealType", intl.get("Remove Liquidity"));
                  window.location.reload();
                }}
              >
                {intl.get("Remove Liquidity")}
              </button>
            </div>
            <div className="list">
              <h4>{intl.get("Fund")}</h4>
              <div className="listContent">
                {poolList.map((v, i) => {
                  return (
                    <p key={i}>
                      <label>
                        {v.coin_a.index < v.coin_b.index
                          ? v.coin_a.show_name + "/" + v.coin_b.show_name
                          : v.coin_b.show_name + "/" + v.coin_a.show_name}
                      </label>
                      <span>{v.token / 1e6}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
    }
}
let mapStateToProps = (state) => {
    return state.ListReducer;
}
let mapDispatchToProps = (dispatch) => {
    return {
        showPolling: () => {
            dispatch({
                type: 'SHOWPOOL',
                payload: false
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPoolDialog);