import React, { Component } from "react";
// import "./app.scss";
import QRCode from "qrcode.react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
let url = "https://api.violas.io";
let url1 = "https://api4.violas.io";
//收款
class GetMoney extends Component {
    constructor(props){
      super()
      this.state = {
        types: ['Violas', 'Libra','Bitcoin'],
        type: 'Violas',
        title: '',
        showDealType: false,
        address:'',
        dis: false,
        arr1:[],
        arr2:[],
        arr:[],
        BTCBalances:[],
        BTCAddress:'',
        type:'',
        coinName:'',
        coinNameType:'',
        ind:0
      }
    }
    getTypeShow = (event) => {
      // this.stopPropagation(event)
      this.setState({
        showDealType: !this.state.showDealType
      })
    }
    showTypes = (v,address,name,ind) => {
      
      if(v == 'VLS'){
        this.setState({
          type: v,
          coinName: 'violas-'+name.toLowerCase(),
          address: address,
          showDealType: false,
          ind:ind
        })
      }else{
        if (name.indexOf('VLS') == 0){
          this.setState({
            type: v,
            coinName: 'violas-' + name.toLowerCase(),
            address: address,
            showDealType: false,
            ind: ind
          })
        } else if (name == 'BTC'){
          this.setState({
            type: v,
            coinName: 'bitcoin',
            address: this.state.BTCAddress,
            showDealType: false,
            ind: ind
          })
         }else{
          this.setState({
            type: v,
            coinName: 'libra-' + name.toLowerCase(),
            address: address,
            showDealType: false,
            ind: ind
          })
         }
      }
      
    }
  
    componentWillMount(){
      if(this.props.display){
        this.props.showPolling();
      }
      // if (this.props.display1){
      //   this.props.showDetails();
      // }
      
    }
    componentDidMount(){
      // document.addEventListener('click', this.closeDialog);
      if (JSON.parse(window.localStorage.getItem("wallet_info"))){
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
        })
      }
    }
    getBalances(){
      fetch(url + "/1.0/btc/balance?address=" + this.state.BTCAddress).then(res => res.json())
        .then(res => {
          if(res.data){
            this.setState({
              BTCBalances: res.data
            })
          }
         
        })
      fetch(url1 + "/1.0/violas/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
        .then(res => {
          if (res.data) {
            this.setState({
              arr1: res.data.balances
            }, () => {
              // this.state.arr1.map((v, i) => {
              //   if (v.show_name == 'LBR') {
              //     v.show_name = 'VLS'
              //   }
              // })
              if (this.state.type == "") {
                this.setState({
                  coinName: 'violas-' + res.data.balances[0].name.toLowerCase(),
                })
              }
            })
          }
        })
      fetch(url1 + "/1.0/libra/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
        .then(res => {
          if (res.data) {
            this.setState({
              arr2: res.data.balances
            }, () => {
              let arr = this.state.arr1.concat(this.state.arr2)
              let newArr = arr.concat(this.state.BTCBalances)
              console.log(newArr, '........')
              newArr.sort((a, b) => {
                return b.balance - a.balance
              })
              this.setState({
                arr: newArr,
                type: newArr[0].show_name,
                address: newArr[0].address,
                ind: Object.keys(newArr)[0]
              })
            })
          } else {
            if (this.state.arr2) {
              let newArr = this.state.arr1.concat(this.state.BTCBalances)
              console.log(newArr, '.....')
              newArr.sort((a, b) => {
                return b.balance - a.balance
              })
              this.setState({
                arr: newArr,
                type: newArr[0].show_name,
                address: newArr[0].show_name == 'BTC' ? this.state.BTCAddress : newArr[0].address,
                ind: Object.keys(newArr)[0]
              })
            }
          }
        })
    }
    handleCopy = () => {
      const spanText = document.getElementById('add').innerText;
      const oInput = document.createElement('input');
      oInput.value = spanText;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      document.body.removeChild(oInput);
      this.setState({
        dis: true
      })
      let Timer = setInterval(() => {
        this.setState({
          dis: false
        })
      }, 1000);
    };
    // stopPropagation(e) {
    //   e.nativeEvent.stopImmediatePropagation();
    // }
    closeDialog = () => {
      this.setState({
        showDealType: false
      })
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
    getSearchList=(e)=>{
      if (e.target.value){
        let arr = this.state.arr.filter(v => {
          if (v.show_name.indexOf(e.target.value.toUpperCase()) == 0) {
            return v;
          }
        })
        this.setState({
          arr: arr
        })
      }else{
        this.getBalances()
      }
     
    }
    render(){
      let { address, showDealType, type, dis, arr, coinName,ind } = this.state;
      // console.log(this.state.showDealType,'.........')
        return (
          <div className="getMoney">
            <div className="dialogContent">
              <i className="jt" onClick={() => {
                window.history.go(-1);
              }}><img src="/img/编组 10@2x.png"/></i>
              <h4>Receive</h4>
              <div className="dropdown1">
                {
                  showDealType ? <span className="showClick" onClick={(e) => this.getTypeShow(e)}>{type}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getTypeShow(e)}>{type}<i><img src="/img/路径 7@2x.png" /></i></span>
                }
                {
                   showDealType ? <div className='dropdown-content1'>
                    <div className="formSearch">
                      <img src="/img/sousuo 2@2x.png" />
                      <input placeholder="Search" onChange={(e) => this.getSearchList(e)} />
                    </div>
                    {
                   arr.map((v, i) => {
                        return <div className="searchList" key={i} onClick={() => this.showTypes(v.show_name, v.address,v.name,i)}>
                          <div className="searchEvery">
                            <img src={v.show_icon} />
                            <div className="searchEvery1">
                              <div>
                                <h4>{v.show_name}</h4>
                                <p>余额：{v.show_name == 'BTC' ? (v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 6)) : (v.balance == 0 ? 0 : this.getFloat(v.balance / 1e6, 6))} {v.show_name}</p>
                              </div>
                              <span className={ind == i ? 'check active' : 'check'}></span>
                            </div>
                          </div>
                        </div>
                      })
                    }
                  </div> : null
                }


              </div>
               <div className="qrCode">
                <QRCode value={coinName + ':' + address+'?amount=1'}></QRCode>
               </div>
               <div className="addressCode">
                   <span id="add">{address}</span>
                   {
                     dis ? <i onClick={()=>this.handleCopy()}><img src="/img/fuzhi 3@2x.png"/></i> : <i onClick={()=>this.handleCopy()}><img src="/img/Fill 3@2x.png"/></i>
                   }
                    
                    {/* {
                      dis ? <div className="warn"><img src="/img/suc.png"/></div> : null
                    } */}
                </div>
            </div>
          </div>
        )
    }
}
let mapStateToProps = (state) =>{
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
    showPolling: () => {
      dispatch({
        type: "DISPLAY",
        payload: false,
      });
    },
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(GetMoney));