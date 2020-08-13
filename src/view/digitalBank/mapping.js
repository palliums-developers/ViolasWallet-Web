import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
let url1 = "https://api.violas.io"
let url = "https://api4.violas.io"

//映射
class DigitalBank extends Component {
  constructor() {
    super();
    this.state = {
      type:'',
      amount: "",
      warning: '',
      showDealType: false,
      balance: 0,
      ind:0,
      coinName: '',
      arr1: [],
      arr2: [],
      selData: [],
      addCurrencyList: [],
      BTCAddress: '',
      opinionType: '',
      BTCArr:[]
      
    };
  }
  componentDidMount() {
    document.addEventListener("click", this.closeDialog);
    //获取到三种钱包
    if (JSON.parse(window.localStorage.getItem("wallet_info"))) {
      this.setState({
        addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
      }, () => {
        this.state.addCurrencyList.map((v, i) => {
          if (v.coinType == 'bitcoin') {
            this.setState({
              BTCAddress: v.address
            }, () => {
              this.getTypesBalance()
            })
          }
        })
      });
    }
  }
  stopPropagation(e) {
    e.nativeEvent.stopImmediatePropagation();
  }
  //获取到每个币种及余额
  getTypesBalance() {
    fetch(url1 + "/1.0/btc/balance?address=" + this.state.BTCAddress).then(res => res.json())
      .then(res => {
        this.setState({
          BTCArr: res.data
        })
      })
    fetch(url + "/1.0/violas/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
      .then(res => {
        if (res.data) {
          this.setState({
            arr1: res.data.balances
          })
        }
      })
    fetch(url + "/1.0/libra/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
      .then(res => {
        if (res.data) {
          this.setState({
            arr2: res.data.balances
          }, () => {
            let arr = this.state.arr1.concat(this.state.arr2)
            let arrs = arr.concat(this.state.BTCArr)
            this.setState({
              selData: arrs
            }, () => {
                console.log(this.state.selData[0].show_name)
              if (this.state.type == "") {
                this.setState({
                  type: this.state.selData[0].show_name,
                  coinName: this.state.selData[0].name,
                  balance: this.state.selData[0].balance,
                  opinionType: this.state.selData[0].show_icon.split('/')[this.state.selData[0].show_icon.split('/').length - 1]
                })
              }
            })
          })
        } else {
          if (this.state.arr2) {
            let arrs = this.state.arr2.concat(this.state.BTCArr)
            this.setState({
              selData: arrs
            }, () => {
               
              if (this.state.type == "") {
                this.setState({
                  type: this.state.selData[0].show_name,
                  coinName: this.state.selData[0].name,
                  balance: this.state.selData[0].balance,
                  opinionType: this.state.selData[0].show_icon.split('/')[this.state.selData[0].show_icon.split('/').length - 1]
                })
              }
            })
          }

        }

      })
  }
  //获取到输出数量
  getTransAmount = (e) => {
    this.setState(
      {
        amount: e.target.value,
      },
      () => {
        this.amountWarn()
      }
    );
  };
  //输出数量提示
  amountWarn() {
    if (Number(this.state.amount) > Number(this.getFloat(this.state.balance / 1e6, 6))) {
      this.setState({
        warning: "余额不足",
      });
    } else {
      this.setState({
        warning: "",
      });
    }
  }
  getTypeShow = (event) => {
    this.stopPropagation(event);
    this.setState({
      showDealType: !this.state.showDealType,
    });
  };
  //转出数量选中
  showTypes = (v, bal, name, ind, opinionType) => {
    this.setState({
      type: v,
      balance: bal,
      showDealType: false,
      coinName: name,
      ind: ind,
      opinionType: opinionType
    }, () => {
      // this.getTypeBalance()
      this.getTypesBalance()
    });
  };
  //确认映射
  confirmMapping = () =>{
    if(this.state.amount == ''){
        this.setState({
          warning:'请输入转出数量'
        })
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
  render() {
    let { routes } = this.props;
    let { showDealType,type,warning,balance,selData,ind} = this.state;
    return (
      <div className="mapping">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <NavLink to="/homepage"> <img src="/img/fanhui 2@2x.png" />
              钱包</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/mapping">映射</NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="mappingContent">
          <div className="mappingList">
            <h3><img src="/img/kyye.png" />可用余额：<label>10BTC</label></h3>
            <div className="iptAmount">
              <input
                placeholder="转出数量"
                onChange={(e) => this.getTransAmount(e)}
              />
              <div className="dropdown1">
                {showDealType ? (
                  <span
                    onClick={(e) => this.getTypeShow(e)}
                  >
                    {type}
                    <i>
                      <img src="/img/路径备份 3@2x.png" />
                    </i>
                  </span>
                ) : (
                    <span onClick={(e) => this.getTypeShow(e)}>
                      {type}
                      <i>
                        <img src="/img/路径 7@2x.png" />
                      </i>
                    </span>
                  )}
                {showDealType ? (
                  <div className="dropdown-content1">
                    <div className="formSearch">
                      <img src="/img/sousuo 2@2x.png" />
                      <input placeholder="Search" onChange={(e) => this.getSearchList(e)} />
                    </div>
                    {
                      selData.map((v, i) => {
                        return <div className="searchList" key={i} onClick={() => this.showTypes(v.show_name, v.address, i, v.balance)
                        }>
                          <div className="searchEvery">
                            <img src={v.show_icon} />
                            <div className="searchEvery1">
                              <div>
                                <h4>{v.show_name}</h4>
                                <p>余额：{v.show_name == 'BTC' ? (v.balance == 0 ? 0 : this.getFloat(v.balance / 1e8, 6)) : (v.balance == 0 ? 0 : this.getFloat(v.balance / 1e6, 6))} {v.show_name}</p>
                              </div>
                              <span className={ind == i ? 'check active' : 'check'}></span>
                            </div>
                          </div>
                        </div>
                      })
                    }
                  </div>
                ) : null}
              </div>
            </div>
            <div className="arrow"><img src="/img/ai28 4@2x.png" /></div>
            <div className="showAmount">
              <label>0</label>
              <span>V-BTC</span>
            </div>
            <div className="line"></div>
            <p><label>汇率：</label><span>1 BTC = 100 V-BTC</span></p>
            <p><label>矿工费用：</label><span>0.11 BTC</span></p>
            <div className="foot">
              <p className="btn active" onClick={()=>this.confirmMapping()}>确定映射</p>
              <p className={"descr descrRed"}>{'warning'}</p>
            </div>
          </div>
          <div className="mappingRecord">
            <h4>映射记录</h4>
            <div className="recordLists">
              <div className="recordList">
                <div>
                  <span className="spanGre">映射成功</span>
                  <label>18:22 01/24</label>
                </div>
                <div>
                  <p>999BTC<img src="/img/路径 2@2x.png" />99900V-BTC</p>
                  <label>旷工费：0.01 BTC</label>
                </div>
              </div>
              <div className="recordList">
                <div>
                  <span className="spanRed">映射失败</span>
                  <label>18:22 01/24</label>
                </div>
                <div>
                  <p>999BTC<img src="/img/路径 2@2x.png" />99900V-BTC</p>
                  <label>旷工费：0.01 BTC</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalBank;
