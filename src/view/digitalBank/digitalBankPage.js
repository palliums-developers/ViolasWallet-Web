import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// let url = "https://api4.violas.io";
let url = "https://api.violas.io";
//映射
class DigitalBankPage extends Component {
    constructor() {
        super()
        this.state = {
            visible:true,
            visible1:false,
            type:'存款市场',
            types:['存款市场','借款市场'],
            ind:0,
            orders:[
                {
                    name:'存款订单',
                    imgUrl:'/img/saveOrder.png',
                    pathname:'/homepage/home/digitalBank/saveOrder'
                },
                {
                    name: '借款订单',
                    imgUrl: '/img/borrowOrder.png',
                    pathname: '/homepage/home/digitalBank/borrowOrder'
                }
            ],
            amount:0.00,
            borrow: 0.00,
            borrows: [],
            deposits: [],
            total: 0.00,
            yesterday: 0.00
        }
    }
    stopPropagation(e) {
        e.nativeEvent.stopImmediatePropagation();
    }
    componentDidMount() {
        document.addEventListener('click', this.closeDialog);
        //账户信息
        fetch(url + "/1.0/violas/bank/account/info?address=" + window.sessionStorage.getItem('violas_address')).then(res => res.json()).then(res => {
            if (res.data){
              // console.log(res.data)
             this.setState({
               amount: res.data.amount,
               borrow:
                 res.data.borrow == 0
                   ? "0.00" + "/" + res.data.borrow_limit
                   : res.data.borrow + "/" + res.data.borrow_limit,
               //  borrows: res.data.borrows,
               //  deposits: res.data.deposits,
               total: res.data.total == 0 ? "0.00" : res.data.total,
               yesterday: res.data.yesterday == 0 ? "0.00" : res.data.yesterday,
             });
         }
        })
        //存款产品列表
        fetch(url + "/1.0/violas/bank/product/deposit").then(res => res.json()).then(res => {
            if (res.data) {
                // console.log(res.data,'.........1')
                this.setState({
                     deposits: res.data
                })
            }
        })
        //借贷产品列表
        fetch(url + "/1.0/violas/bank/product/borrow").then(res => res.json()).then(res => {
            if (res.data) {
                // console.log(res.data, '.........2')
                this.setState({
                    borrows: res.data
                })
            }
        })
    }
    closeDialog = () => {
      this.setState({
        visible1: false
      })
    }
    getMarketType = (i) =>{
      this.setState({
          ind:i
      })
    }
    render() {
        let { routes } = this.props;
        let { visible, types, ind, orders, visible1, amount, borrow, borrows, deposits, total, yesterday} = this.state
        return (
          <div className="digitalBankPage">
            <div className="apply">
              <div className="total">
                <p>
                  存款总额 ($)
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
                <div className="dropdown">
                  <span
                    onClick={(e) => {
                      this.stopPropagation(e);
                      this.setState({
                        visible1: !this.state.visible1,
                      });
                    }}
                  >
                    <img src="/img/编组 9@2x.png" />
                  </span>
                  {visible1 ? (
                    <div className="dropdown-content">
                      {orders.map((v, i) => {
                        return (
                          <NavLink key={i} to={v.pathname}>
                            <img src={v.imgUrl} />
                            <label>{v.name}</label>
                          </NavLink>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
              <p>{visible ? <span>≈ {amount}</span> : <span>******</span>}</p>
              <div className="applyContent">
                <div>
                  <p>
                    <img src="/img/meiyuan8 2@2x.png" />
                    <label>可借总额（$）</label>
                    {visible ? <span>≈ {borrow}</span> : <span>******</span>}
                  </p>
                  <p>
                    <img src="/img/形状结合备份 2@2x.png" />
                    <label>累计收益（$）</label>
                    {visible ? <span>≈ {total}</span> : <span>******</span>}
                  </p>
                </div>
                <div className="earnings">
                  <img src="/img/形状结合 2@2x.png" />
                  昨日收益 {yesterday} $
                </div>
              </div>
            </div>
            <div className="tabList">
              <div className="tabs">
                <div className="tab">
                  {types.map((v, i) => {
                    return (
                      <span
                        key={i}
                        className={ind == i ? "active" : ""}
                        onClick={() => this.getMarketType(i)}
                      >
                        {v}
                      </span>
                    );
                  })}
                </div>
                <div
                  className="goRules"
                  onClick={() => {
                    this.props.history.push("/homepage/home/ruleDescription");
                  }}
                >
                  <p>
                    存!借挖矿规则<span>＞＞</span>
                  </p>
                </div>
              </div>

              <div className="tabLists">
                {ind == 0
                  ? deposits.map((v, i) => {
                      return (
                        <div
                          className="everyList"
                          key={i}
                          onClick={() => {
                            this.props.history.push(
                              "/homepage/home/digitalBank/saveDetails"
                            );
                            window.sessionStorage.setItem("id", v.id);
                            window.sessionStorage.setItem(
                              "token_module",
                              v.token_module
                            );
                          }}
                        >
                          <p>
                            <img src="/img/BTC复制 2@2x.png" />
                            <span>{v.name}</span>
                            <label>{v.desc}</label>
                          </p>
                          <p>
                            <span>{Number(v.rate * 100).toFixed(2)}%</span>
                            <label>{v.rate_desc}</label>
                          </p>
                        </div>
                      );
                    })
                  : borrows.map((v, i) => {
                      return (
                        <div
                          className="everyList"
                          key={i}
                          onClick={() => {
                            this.props.history.push(
                              "/homepage/home/digitalBank/borrowDetails"
                            );
                            window.sessionStorage.setItem("id", v.id);
                            window.sessionStorage.setItem(
                              "token_module",
                              v.token_module
                            );
                          }}
                        >
                          <p>
                            <img src="/img/BTC复制 2@2x.png" />
                            <span>{v.name}</span>
                            <label>{v.desc}</label>
                          </p>
                          <p>
                            <span>{Number(v.rate * 100).toFixed(2)}%</span>
                            <label>{v.rate_desc}</label>
                          </p>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        );
    }


}

export default DigitalBankPage;