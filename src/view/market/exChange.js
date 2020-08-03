import React, { Component } from "react";
// import { NavLink } from 'react-router-dom'
import "../app.scss";
import { connect } from 'react-redux';
import ExchangeDetail from '../market/exchangeDetail';
import { Drawer } from "antd";
import { timeStamp2String } from '../../utils/timer';
// import RouterView from '../router/routerView'
let url = "https://api.violas.io"
let url1 = "https://api4.violas.io"

class ExChange extends Component {
    constructor() {
        super()
        this.state = {
            showMenuViolas: false,
            showMenuViolas1: false,
            type:'',
            type1:'选择通证',
            getFocus: false,
            getFocus1: false,
            inputAmount:'',
            outputAmount:'',
            warning:'',
            visible:false,
            selData:[],
            changeRecord:[],
            changeList:{},
            arr1: [],
            arr2: [],
            arr: [],
            ind:-1,
            index:-1,
            asset: '--',
            asset1: '--'
        }
    }
    componentWillMount(){
       
    }
    componentDidMount() {
        // document.addEventListener('click', this.closeMenu);
        // this.getSelectTypes()
        this.getExchangeRecode()
        if (JSON.parse(window.localStorage.getItem("wallet_info"))){
            this.setState({
                addCurrencyList: JSON.parse(window.localStorage.getItem("wallet_info")),
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
            });
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
    getExchangeRecode = () =>{
        fetch(url1 + "/1.0/market/exchange/transaction?address=" + window.localStorage.getItem('address') + 'offset=0&limit=5').then(res => res.json())
            .then(res => {
               this.setState({
                   changeRecord: [
                       {
                           "date": 1594324849,
                           "input_amount": 10000,
                           "input_name": "VLSUSD",
                           "output_amount": 9951,
                           "output_name": "VLSEUR",
                           "status": 4001,
                           "version": 10
                       },
                       {
                           "date": 1594324849,
                           "input_amount": 10000,
                           "input_name": "VLSUSD",
                           "output_amount": 9951,
                           "output_name": "VLSEUR",
                           "status": 4001,
                           "version": 11
                       }
                   ]
               })
            })
    }
    getShow = (event) =>{
        // this.stopPropagation(event)
        this.setState({
            showMenuViolas: !this.state.showMenuViolas
        })
    }
    getShow1 = (event) => {
        // this.stopPropagation(event)
        this.setState({
            showMenuViolas1: !this.state.showMenuViolas1
        })
    }
    showMenu = (v,bal,i) => {
        this.setState({
            type: v,
            showMenuViolas: false,
            index:i
        },()=>{
                this.opinionInputAmount()
                this.opinionOutputAmount() 
                if (this.state.type == 'BTC') {
                    if (bal == '0') {
                        this.setState({
                            asset: '0.00'
                        })
                    } else {
                        this.setState({
                            asset: this.getFloat(bal / 1e8, 6)
                        })
                    }
                } else {
                    if (bal == 0) {
                        this.setState({
                            asset: '0.00'
                        })
                    } else {
                        this.setState({
                            asset: this.getFloat(bal / 1e6, 6)
                        })
                    }
                }
        })
        
        
    }
    // closeMenu = () => {
    //     this.setState({
    //         getFocus: true,
    //         getFocus1: false
    //     })
    // }
    // stopPropagation(e) {
    //     e.nativeEvent.stopImmediatePropagation();
    // }
    // getSelectTypes() {
    //     fetch(url + "/1.0/violas/currency").then(res => res.json())
    //         .then(res => {
    //             let data = res.data.currencies
    //             fetch(url + "/1.0/violas/currency/published?addr="+window.localStorage.getItem('address')).then(res => res.json())
    //                 .then(res => {
    //                     let data1=[];
    //                     for (var i=0;i<data.length;i++) {
    //                         for (var j = 0; j < res.data.published.length; j++) {
    //                             if(data[i].show_name == res.data.published[j]){
    //                                 //  console.log(data[i])
    //                                 data1.push(data[i])
    //                             }
    //                         }
    //                     }
    //                     this.setState({
    //                         selData: data1
    //                     },()=>{
    //                             if (this.state.type == "") {
    //                                 this.setState({
    //                                     type: this.state.selData[0].show_name,

    //                                 })
    //                             }
    //                     })
    //             })
    //         })
    // }

    //获取input换算数量
    opinionInputAmount = () =>{
        if (this.state.inputAmount) {
            fetch(url1 + "/1.0/market/exchange/trial?amount=" + this.state.inputAmount + '&&currencyIn=' + this.state.type + '&&currencyOut=' + this.state.type1).then(res => res.json())
                .then(res => {
                    if (res.data) {
                        this.setState({
                            outputAmount: res.data.amount
                        })
                    }
                })
        }
    }
    opinionOutputAmount = () =>{
        if (this.state.outputAmount) {
            fetch(url1 + "/1.0/market/exchange/trial?amount=" + this.state.outputAmount + '&&currencyIn=' + this.state.type1 + '&&currencyOut=' + this.state.type).then(res => res.json())
                .then(res => {
                    if (res.data) {
                        this.setState({
                            inputAmount: res.data.amount
                        })
                    }
                })
        }
    }
    getInputAmount = (e) =>{
      if (e.target.value){
          e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符   
          e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
          e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
          e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数   
          if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
              e.target.value = parseFloat(e.target.value);
          }
        if (e.target.value>this.state.asset){
            this.setState({
                warning: '资金不足'
            })
        }else{
            this.setState({
                warning: ''
            })
        }
         this.setState({
             inputAmount: e.target.value
         },()=>{
            this.opinionInputAmount()
         })
      }else{
          this.setState({
              warning: '',
              inputAmount:'',
              outputAmount:''
          })
      }
    }
    getOutputAmount = (e) => {
        if (e.target.value) {
            e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符   
            e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
            e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数   
            if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                e.target.value = parseFloat(e.target.value);
            }
            if (e.target.value > this.state.asset) {
                this.setState({
                    warning: '资金不足'
                })
            } else {
                this.setState({
                    warning: ''
                })
            }
            this.setState({
                outputAmount: e.target.value
            },()=>{
                this.opinionOutputAmount()
            })
        } else {
            this.setState({
                warning: '',
                outputAmount: '',
                inputAmount: ''
            })
        }
    }
    showExchangeCode = () => {
        if (this.state.inputAmount){
            if (this.state.outputAmount) {
                this.setState({
                    warning: ''
                }, () => {
                    this.props.showDialog()
                })

            } 
            else {
                this.setState({
                    warning: '请输入兑换数量'
                })
            }
        } else {
            this.setState({
                warning: '请输入兑换数量'
            })
        }
    }
    onClose = () => {
        this.setState({
            visible:false
        })
    };
    showDrawer = (type) =>{
        this.setState({
            visible: type
        })
    }
    showTypes = (v, address, name,ind,bal) => {
        
        this.setState({
            type1: v,
            ind:ind,
            // coinName: 'violas-' + name.toLowerCase(),
            // address: address,
            showMenuViolas1: false
        },()=>{
            this.opinionInputAmount()
            this.opinionOutputAmount()  
                if (this.state.type1 == 'BTC') {
                    if (bal == '0') {
                        this.setState({
                            asset1: '0.00'
                        })
                    } else {
                        this.setState({
                            asset1: this.getFloat(bal / 1e8, 6)
                        })
                    }
                } else {
                    if (bal == 0) {
                        this.setState({
                            asset1: '0.00'
                        })
                    } else {
                        this.setState({
                            asset1: this.getFloat(bal / 1e6, 6)
                        })
                    }
                }
        })
    }
    getBalances() {
        fetch(url + "/1.0/btc/balance?address=" + this.state.BTCAddress).then(res => res.json())
            .then(res => {
                this.setState({
                    BTCBalances: res.data
                }, () => {
                    fetch(url1 + "/1.0/violas/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
                        .then(res => {
                            this.setState({
                                arr1: res.data.balances
                            }, () => {
                                // this.state.arr1.map((v, i) => {
                                //     if (v.show_name == 'LBR') {
                                //         v.show_name = 'VLS'
                                //     }
                                // })
                                if (this.state.type == "") {
                                    this.setState({
                                        // type: res.data.balances[0].show_name,
                                        coinName: 'violas-' + res.data.balances[0].name.toLowerCase(),
                                        // address: res.data.balances[0].address
                                    })
                                }
                            })
                        })
                    fetch(url1 + "/1.0/libra/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
                        .then(res => {
                            if (res.data){

                            this.setState({
                                arr2: res.data.balances
                            }, () => {
                                let arr = this.state.arr1.concat(this.state.arr2)
                                let newArr = arr.concat(this.state.BTCBalances)
                                newArr.sort((a, b) => {
                                    return b.balance - a.balance
                                })
                                this.setState({
                                    arr: newArr,
                                    selData:newArr
                                },()=>{
                                    if (this.state.type == "") {
                                        console.log()
                                        this.setState({
                                            index: Object.keys(this.state.selData)[0],
                                            type:this.state.selData[0].show_name,
                                            asset: this.getFloat(this.state.selData[0].balance / 1e6,6)

                                        })
                                    }
                                })
                            })
                            } else {
                                let newArr = this.state.arr2.concat(this.state.BTCBalances)
                                console.log(newArr,'.........')
                                newArr.sort((a, b) => {
                                    return b.balance - a.balance
                                })
                                this.setState({
                                    arr: newArr,
                                    selData: newArr
                                }, () => {
                                    if (this.state.type == "") {
                                        this.setState({
                                            index: Object.keys(this.state.selData)[0],
                                            type: this.state.selData[0].show_name,
                                            asset: this.state.selData[0].show_name == 'BTC' ? this.getFloat(this.state.selData[0].BTC / 1e8, 6) : this.getFloat(this.state.selData[0].balance / 1e6, 6)

                                        })
                                    }
                                })
                            }
                        })
                })
            })

    }
    getSearchList = (e) => {
        if (e.target.value) {
            let arr = this.state.arr.filter(v => {
                if (v.show_name.indexOf(e.target.value.toUpperCase()) == 0) {
                    return v;
                }
            })
            this.setState({
                arr: arr
            })
        } else {
            this.getBalances()
        }

    }
    render() {
        let { arr, type, type1, getFocus, getFocus1, showMenuViolas, showMenuViolas1, warning, selData, changeRecord,ind,index } = this.state;
        // console.log(selData,'....')
        return (
            <div className="exchange">
               <div className="exchangeContent">
                    <div className="exchangeContents">
                      <div className="form">
                        <p>gas：0.1000%</p>
                        <div className={getFocus ? 'iptForm getFormBorder' : 'iptForm'}>
                           <div className="showAsset">
                                <label>输入</label>
                                    <p><img src="/img/asset-management.png" />当前资产：{this.state.asset}{type}</p>
                           </div>
                           <div className="iptContent">
                                    <input placeholder="0.00" value={this.state.inputAmount} onFocus={()=>{
                                        this.setState({
                                            getFocus: true,
                                            getFocus1:false
                                        })
                                    }} onBlur={() => {
                                        this.setState({
                                            getFocus: false
                                        })
                                    }} onChange={(e)=>this.getInputAmount(e)}/>
                                <div className="dropdown1">
                                    {
                                            showMenuViolas ? <span className="showClick" onClick={(e) => this.getShow(e)}>{type}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow(e)}>{type}<i><img src="/img/路径 7@2x.png" /></i></span>
                                    }
                                    {
                                    showMenuViolas ? (
                                        <div className="dropdown-content1">
                                            {selData.map((v, i) => {
                                            return (
                                                <span
                                                key={i}
                                                    className={i == index ? "active" : null}
                                                onClick={() => {
                                                    if (v.show_name == 'BTC'){
                                                        this.showMenu(v.show_name, v.BTC,i)
                                                    }else{
                                                        this.showMenu(v.show_name, v.balance,i)
                                                    }
                                                    
                                                }}
                                                >
                                                {v.show_name}
                                                </span>
                                            );
                                            })}
                                        </div>
                                        ) : null}
                                    {/* {
                                        showMenuViolas ? <div className='dropdown-content1'>
                                                {
                                                    names.map((v, i) => {
                                                        return <span key={i} className={name == v ? 'active' : null} onClick={() => this.showMenu(v)}>{v}</span>
                                                    })
                                                }
                                            </div> : null
                                    }
                                     */}
                                </div>
                           </div>
                        </div>
                        <div className="changeImg"><img src="/img/编组 2备份@2x.png"/></div>
                            <div className={getFocus1 ? 'iptForm1 getFormBorder' : 'iptForm1'}>
                                <div className="showAsset">
                                    <label>输出</label>
                                    <p><img src="/img/asset-management.png" />当前资产：{this.state.asset1}{type1 == '选择通证' ? '' : type1}</p>
                                </div>
                                <div className="iptContent">
                                    <input placeholder="0.00" value={this.state.outputAmount} onFocus={() => {
                                        this.setState({
                                            getFocus1: true,
                                            getFocus: false
                                        })
                                    }} onBlur={() => {
                                        this.setState({
                                            getFocus1: false
                                        })
                                    }} onChange={(e) => this.getOutputAmount(e)}/>
                                    <div className="dropdown1">
                                        {
                                            showMenuViolas1 ? <span className="showClick" onClick={(e) => this.getShow1(e)}>{type1}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow1(e)}>{type1}<i><img src="/img/路径 7@2x.png" /></i></span>
                                        }
                                        {
                                            showMenuViolas1 ? <div className='dropdown-content1'>
                                                <div className="formSearch">
                                                    <img src="/img/sousuo 2@2x.png" />
                                                    <input placeholder="Search" onChange={(e) => this.getSearchList(e)} />
                                                </div>
                                                {
                                                    arr.map((v, i) => {
                                                        return <div className="searchList" key={i} onClick={() => {
                                                            if (v.show_name == 'BTC'){
                                                                this.showTypes(v.show_name, v.address, v.name, i,v.BTC)
                                                            }else{
                                                                this.showTypes(v.show_name, v.address, v.name, i, v.balance)
                                                            }
                                                            }
                                                        }>
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
                                        <div className='dropdown-content2'>
                                            <div className="search">
                                                <i><img src="/img/sousuo 2@2x.png"/></i>
                                                <input placeholder="搜索token"/>
                                            </div>
                                            <div className="searchLists">
                                               <div className="searchList">
                                                   <div className="img"><img /></div>
                                                   <div className="listContent">
                                                       <label>ETH</label>
                                                       <p>余额：0 ETH</p>
                                                   </div>
                                               </div>
                                                <div className="searchList">
                                                    <div className="img"><img /></div>
                                                    <div className="listContent">
                                                        <label>ETH</label>
                                                        <p>余额：0 ETH</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="changeRate">兑换率：—</div>
                            <div className="changeRate">矿工费用：—</div>
                      </div>
                      <div className="foot">
                        <p className="btn" onClick={()=>this.showExchangeCode()}>兑换</p>
                        <p className="descr">{warning}</p>
                      </div>
                      <div className="changeRecord">
                        <h4>兑换记录</h4>
                        <div className="changeLists">
                        {
                            changeRecord.map((v,i)=>{
                                return <div className="changeList" key={i} onClick={() => {
                                        this.setState({
                                            visible: true,
                                            changeList: v
                                        })
                                    }}>
                                        <div className="list1">
                                        <span className={v.status == 4001 ? 'green' : 'red'}>{v.status == 4001 ? '兑换成功' : '兑换失败'}{v.status == 4001 ? null : <i>重试</i>}</span>
                                            <p>{v.input_amount}{v.input_name}</p>
                                        </div>
                                        <div className="changeImg"><img src="/img/jixuduihuan备份 7@2x.png" /></div>
                                        <div className="list2">
                                            <span>{v.input_amount}{v.input_name}</span>
                                            <p>{timeStamp2String(v.date+'000')}<i><img src="/img/rightArrow.png" /></i></p>
                                        </div>
                                    </div>
                               
                            })
                        }
                          </div>
                        <div className="changeLists">
                            <div className="changeList">
                              <div className="list1">
                                  <span className="red">兑换失败</span>
                                  <p>999ETH</p>
                              </div>
                              <div className="changeImg"><img src="/img/jixuduihuan备份 7@2x.png" /></div>
                              <div className="list2">
                                  <span>99900Violas</span>
                                  <p>01.18 15:42<i><img src="/img/rightArrow.png"/></i></p>
                              </div>
                            </div>
                        </div>
                        <div className="changeLists">
                            <div className="changeList">
                              <div className="list1">
                                  <span className="yel">兑换中</span>
                                  <p>999ETH</p>
                              </div>
                              <div className="changeImg"><img src="/img/jixuduihuan备份 7@2x.png" /></div>
                              <div className="list2">
                                  <span>99900Violas</span>
                                  <p>01.18 15:42<i><img src="/img/rightArrow.png"/></i></p>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
               </div>
                {/* 兑换详情 */}
                <Drawer
                    // title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    mask={false}
                    getContainer={false}
                >
                    <ExchangeDetail showDrawer={this.showDrawer} changeList={this.state.changeList}></ExchangeDetail>
                </Drawer>
            </div>
        )
    }


}

let mapStateToProps = (state) => {
    return state.ListReducer;
}
let mapDispatchToProps = (dispatch) => {
    return {
        showDialog: ()=>{
            dispatch({
                type: 'EXCHANGE',
                params: {
                    type: true,
                    vis:true
                }
            })
       },
    //     showDrawer:(type) => {
    //         dispatch({
    //             type: 'VISIBLE',
    //             payload: !type
    //         })
    //    },
        // showDrawer1: () => {
        //     dispatch({
        //         type: 'VISIBLE1',
        //         payload: false
        //     })
        // },
        // showPolling: () => {
        //     dispatch({
        //         type: 'SHOWPOOL',
        //         payload: false
        //     })
        // }
}
}
export default connect(mapStateToProps, mapDispatchToProps)(ExChange);