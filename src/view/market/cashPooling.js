import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import "../app.scss";
import { connect } from 'react-redux';
import { timeStamp2String } from '../../utils/timer';
import PoolingDetail from '../market/poolingDetail'
import { Drawer } from "antd";
// import RouterView from '../router/routerView'
// let url = "http://52.27.228.84:4000"
let url = "https://api.violas.io"
let url1 = "https://api4.violas.io"

class CashPooling extends Component {
    constructor() {
        super()
        this.state = {
            showMenuViolas: false,
            showMenuViolas1: false,
            showMenuViolas2: false,
            names: ['Violas', 'Libra', 'Bitcoin'],
            types:['转入','转出'],
            type:'转入',
            name: '选择通证',
            showDealType: false,
            getFocus: false,
            getFocus1: false,
            inputAmount: '',
            outputAmount: '',
            warning: '',
            changeRecord:[],
            selData: [],
            arr1: [],
            arr2: [],
            arr: [],
            ind: -1,
            ind1:-1,
            type1:'选择通证',
            type2: '选择通证',
            visible1:false,
            changeList:{},
            asset:'--',
            asset1: '--',
            index:-1
            // visible:false
        }
    }
    componentWillMount(){
        if (this.props.visible) {
            this.props.showDrawer()
        }
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
        number = Number(number).toFixed(n); //补足位数
        return number;
    }
    getExchangeRecode = () => {
        fetch(url1 + "/1.0/market/pool/transaction?address=" + window.localStorage.getItem('address') + 'offset=0&limit=5').then(res => res.json())
            .then(res => {
                this.setState({
                    changeRecord: [
                        {
                            "amounta": 10000,
                            "amountb": 10014,
                            "coina": "VLSUSD",
                            "coinb": "VLSEUR",
                            "date": 1594323548,
                            "status": 4001,
                            "token": 9999,
                            "transaction_type": "ADD_LIQUIDITY",
                            "version": 14
                        },
                        {
                            "amounta": 10001,
                            "amountb": 10015,
                            "coina": "VLSUSD",
                            "coinb": "VLSEUR",
                            "date": 1594323549,
                            "status": 4001,
                            "token": 10000,
                            "transaction_type": "REMOVE_LIQUIDITY",
                            "version": 15
                        }
                    ]
                },()=>{
                    this.optionType()
                })
            })
    }
    optionType(){
        if (this.state.type == '转入') {
            let newArr = this.state.changeRecord.filter(v => v.transaction_type == 'ADD_LIQUIDITY')
            this.setState({
                changeRecord: newArr
            })
        } else {
            let newArr = this.state.changeRecord.filter(v => v.transaction_type == 'REMOVE_LIQUIDITY')
            this.setState({
                changeRecord: newArr
            })
        }
    }
    getShow = (event) => {
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
    getShow2 = (event) => {
        // this.stopPropagation(event)
        this.setState({
            showMenuViolas2: !this.state.showMenuViolas2
        })
    }
    getTypeShow = (event) => {
        this.stopPropagation(event)
        this.setState({
            showDealType: !this.state.showDealType
        }, () => {
            this.getSelectTypes()
        })
    }
    //显示输入时通证列表
    showMenu = (v,bal,i) => {

        this.setState({
            name: v,
            showMenuViolas: false,
            index: i
        }, () => {
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
                        asset: this.getFloat(bal / 1e8, 6)
                    })
                }
            }
        })
    }
    // closeMenu = () => {
    //     this.setState({
    //         showMenuViolas: false
    //     })
    // }
    // stopPropagation(e) {
    //     e.nativeEvent.stopImmediatePropagation();
    // }
    
    showType = (v) => {

        this.setState({
            type: v,
            showDealType: false
        },()=>{
                this.getExchangeRecode()
        })
    }
    
    // getSelectTypes() {
    //     fetch(url + "/1.0/violas/currency").then(res => res.json())
    //         .then(res => {
    //             let data = res.data.currencies
    //             fetch(url + "/1.0/violas/currency/published?addr=" + window.localStorage.getItem('address')).then(res => res.json())
    //                 .then(res => {
    //                     let data1 = [];
    //                     for (var i = 0; i < data.length; i++) {
    //                         for (var j = 0; j < res.data.published.length; j++) {
    //                             if (data[i].show_name == res.data.published[j]) {
    //                                 //  console.log(data[i])
    //                                 data1.push(data[i])
    //                             }
    //                         }
    //                     }
    //                     this.setState({
    //                         selData: data1
    //                     }, () => {
    //                         if (this.state.name == "") {
    //                             this.setState({
    //                                 name: this.state.selData[0].show_name
    //                             })
    //                         }
    //                     })
    //                 })
    //         })
    // }
    getInputAmount = (e) => {
        if (e.target.value) {
            this.setState({
                inputAmount: e.target.value,
                getFocus: true
            })
        } else {
            this.setState({
                inputAmount: e.target.value,
                getFocus: false
            })
        }
    }
    getOutputAmount = (e) => {
        if (e.target.value) {
            this.setState({
                outputAmount: e.target.value,
                getFocus1: true
            })
        } else {
            this.setState({
                outputAmount: e.target.value,
                getFocus1: false
            })
        }
    }
    showExchangeCode = () => {
        if (this.state.inputAmount) {
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
    //显示输入时通证列表
    showTypes = (v, address, name, ind) => {
        this.setState({
            type1: v,
            ind: ind,
            // coinName: 'violas-' + name.toLowerCase(),
            // address: address,
            showMenuViolas1: false
        })
    }
    //显示输出时通证列表
    showTypes1 = (v, address, name,bal, ind) => {
        this.setState({
            type2: v,
            ind1: ind,
            asset1:bal,
            // coinName: 'violas-' + name.toLowerCase(),
            // address: address,
            showMenuViolas2: false
        }, () => {
            if (this.state.type2 == 'BTC') {
                if (this.state.type2 == '0') {
                    this.setState({
                        asset1: '0.00'
                    })
                } else {
                    this.setState({
                        asset1: this.getFloat(bal / 1e8, 6)
                    })
                }
            } else {
                if (this.state.type2 == '0') {
                    this.setState({
                        asset1: '0.00'
                    })
                } else {
                    this.setState({
                        asset1: this.getFloat(bal / 1e8, 6)
                    })
                }
            }
        })
    }
    //转入下拉列表 第一个输入框
    //转入下拉列表 第二个输入框
    getBalances() {
        fetch(url + "/1.0/btc/balance?address=" + this.state.BTCAddress).then(res => res.json())
            .then(res => {
                this.setState({
                    BTCBalances: res.data
                }, () => {
                    fetch(url + "/1.0/violas/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
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
                    fetch(url + "/1.0/libra/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json())
                        .then(res => {
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
                                }, () => {
                                    if (this.state.type == "") {
                                        this.setState({
                                            index: Object.keys(this.state.selData)[0],
                                            name: this.state.selData[0].show_name,
                                            asset: this.getFloat(this.state.selData[0].balance / 1e6, 6)

                                        })
                                    }
                                })
                            })
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
    //判断转入/转出成功或失败
    optionTypes(transaction_type, status){
        if (transaction_type == 'ADD_LIQUIDITY'){
            if (status == 4001){
               return '转入成功'
            }else{
                return '转入失败'
            }
       }else{
            if (status == 4001) {
                return '转出成功'
            } else {
                return '转出失败'
            }
       }
    }
    //显示关闭侧边栏
    onClose = () => {
        this.setState({
            visible1: false
        })
    };
    showDrawer = (type) => {
        this.setState({
            visible1: type
        })
    }
    render() {
        let { names, name, showMenuViolas, showMenuViolas1, types, type, showDealType, warning, getFocus, getFocus1, changeRecord, selData, type1, arr, ind,index, type2, ind1, showMenuViolas2 } = this.state;
        // console.log(showMenuViolas,'....')
        return (
            <div className="exchange cashPooling">
                <div className="exchangeContent">
                    {
                        this.props.showpooling ? <div className="minePool poolClick" onClick={() => {
                            this.props.showPolling(!this.props.showpooling)
                        }}><img src="/img/形状备份 2@2x.png" />我的资金池</div> : <div className="minePool" onClick={() => {
                                this.props.showPolling(!this.props.showpooling)
                            }}><img src="/img/形状 2@2x.png" />我的资金池</div>
                    }
                    
                    <div className="exchangeContents">
                        <div className="form">
                            <div className="dropdown">
                                <div className="dropdown2">
                                    {
                                        showDealType ? <span className="showClick" onClick={(e) => this.getTypeShow(e)}>{type}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getTypeShow(e)}>{type}<i><img src="/img/路径 7@2x.png" /></i></span>
                                    }
                                    {
                                        showDealType ? <div className='dropdown-content2'>
                                            
                                            {
                                                types.map((v, i) => {
                                                    return <span key={i} className={v == type ? 'active' : null} onClick={() => this.showType(v)}>{v}</span>
                                                })
                                            }
                                        </div> : null
                                    }
                                    

                                </div>
                                <p>gas：0.1000%</p>
                            </div>
                            {
                                type == '转入' ? <div className={getFocus ? 'iptForm1 getFormBorder' : 'iptForm1'}>
                                    <div className="showAsset">
                                        <label>转入</label>
                                        <p><img src="/img/asset-management.png" />当前资产：{this.state.asset}{name == '选择通证' ? '' : name}</p>
                                    </div>
                                    <div className="iptContent">
                                        <input placeholder="0.00" onChange={(e) => this.getInputAmount(e)} />
                                        <div className="dropdown1">
                                            {
                                                showMenuViolas ? <span className="showClick" onClick={(e) => this.getShow(e)}>{name}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow(e)}>{name}<i><img src="/img/路径 7@2x.png" /></i></span>
                                            }

                                            {
                                                showMenuViolas ? <div className='dropdown-content1'>
                                                    <div className="formSearch">
                                                        <img src="/img/sousuo 2@2x.png" />
                                                        <input placeholder="Search" onChange={(e) => this.getSearchList(e)} />
                                                    </div>
                                                    {
                                                        selData.map((v, i) => {
                                                            return <div className="searchList" key={i} onClick={() => {
                                                                if (v.show_name == 'BTC') {
                                                                    this.showMenu(v.show_name, v.BTC, i)
                                                                } else {
                                                                    this.showMenu(v.show_name, v.balance, i)
                                                                }
                                                            }}>
                                                                <div className="searchEvery">
                                                                    <img src={v.show_icon} />
                                                                    <div className="searchEvery1">
                                                                        <div>
                                                                            <h4>{v.show_name}</h4>
                                                                            <p>余额：{v.show_name == 'BTC' ? (v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 6)) : (v.balance == 0 ? 0 : this.getFloat(v.balance / 1e6, 6))} {v.show_name}</p>
                                                                        </div>
                                                                        <span className={index == i ? 'check active' : 'check'}></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                    {/* {selData.map((v, i) => {
                                                            return (
                                                                <span
                                                                    key={i}
                                                                    className={i == index ? "active" : null}
                                                                    onClick={() => {
                                                                        if (v.show_name == 'BTC') {
                                                                            this.showMenu(v.show_name, v.BTC, i)
                                                                        } else {
                                                                            this.showMenu(v.show_name, v.balance, i)
                                                                        }
                                                                    }}
                                                                >
                                                                    {v.show_name}
                                                                </span>
                                                            );
                                                        })} */}
                                                  
                                                </div> : null
                                            }

                                        </div>
                                    </div>
                                </div> : <div className={getFocus ? 'iptForm getFormBorder' : 'iptForm iptForm1'}>
                                        <div className="showAsset">
                                            <label>资金池通证</label>
                                            <p><img src="/img/asset-management.png" />当前资产：{this.state.asset1}{type2 == '选择通证' ? '' : type2}</p>
                                        </div>
                                        <div className="iptContent">
                                            <input placeholder="0.00" onChange={(e) => this.getOutputAmount(e)} />
                                            <div className="dropdown1">
                                                {
                                                    showMenuViolas2 ? <span className="showClick" onClick={(e) => this.getShow2(e)}>{type2}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow2(e)}>{type2}<i><img src="/img/路径 7@2x.png" /></i></span>
                                                }

                                                {
                                                    showMenuViolas2 ? <div className='dropdown-content1'>
                                                        <div className="formSearch">
                                                            <img src="/img/sousuo 2@2x.png" />
                                                            <input placeholder="Search" onChange={(e) => this.getSearchList1(e)} />
                                                        </div>
                                                        {
                                                            arr.map((v, i) => {
                                                                return <div className="searchList" key={i} onClick={() => {
                                                                    if (v.show_name == 'BTC') {
                                                                        this.showTypes1(v.show_name, v.address, v.name,v.BTC, i)
                                                                    } else {
                                                                        this.showTypes1(v.show_name, v.address, v.name, v.balance, i)
                                                                    }
                                                                    
                                                                }}>
                                                                    <div className="searchEvery">
                                                                        <img src={v.show_icon} />
                                                                        <div className="searchEvery1">
                                                                            <div>
                                                                                <h4>{v.show_name}</h4>
                                                                                <p>余额：{v.show_name == 'BTC' ? (v.BTC == 0 ? 0 : this.getFloat(v.BTC / 1e8, 6)) : (v.balance == 0 ? 0 : this.getFloat(v.balance / 1e6, 6))} {v.show_name}</p>
                                                                            </div>
                                                                            <span className={ind1 == i ? 'check active' : 'check'}></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                    </div> : null
                                                }

                                            </div>
                                        </div>
                                    </div>
                            }
                            
                            <div className="changeImg">&</div>
                            {
                                type == '转入' ? <div className={getFocus1 ? 'iptForm1 getFormBorder' : 'iptForm1'}>
                                    <div className="showAsset">
                                        <label>转入</label>
                                        <p><img src="/img/asset-management.png" />当前资产：--</p>
                                    </div>
                                    <div className="iptContent">
                                        <input placeholder="0.00" onChange={(e) => this.getOutputAmount(e)} />
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
                                                            return <div className="searchList" key={i} onClick={() => this.showTypes(v.show_name, v.address, v.name, i)}>
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
                                    </div>
                                </div> : <div className={getFocus1 ? 'iptForm1 getFormBorder' : 'iptForm1'}>
                                        <div className="showAsset">
                                            <label>转出</label>
                                            {/* <p><img src="/img/asset-management.png" />当前资产：--</p> */}
                                        </div>
                                        <div className="iptContent">
                                            <input placeholder="0.00" onChange={(e) => this.getOutputAmount(e)} />
                                            
                                        </div>
                                    </div>
                            }
                            <div className="changeRate">兑换率：1:100</div>
                            {/* <div className="changeRate">当前资金池大小：— —</div> */}
                            <div className="changeRate">你的资金池共有：— —</div>
                        </div>
                        <div className="foot">
                            {
                                type == '转入' ? <p className="btn" onClick={() => this.showExchangeCode()}>转入</p> : <p className="btn" onClick={() => this.showExchangeCode()}>转出</p>
                            }
                            
                            <p className="descr">{warning}</p>
                        </div>
                        <div className="changeRecord poolRecord">
                            <h4>资金池记录</h4>
                            <div className="poolRecordLists">
                                {
                                    changeRecord.map((v,i)=>{
                                        return <div key={i} className="poolRecordList" onClick={() => {
                                            this.setState({
                                                visible1: true,
                                                changeList: v
                                            })
                                        }}>
                                            <div className="logo"><img src={this.optionTypes(v.transaction_type, v.status).slice(0, 2) == '转入' ? "/img/编组 9备份 5@2x.png" : "/img/编组 14备份@2x.png"} />{
                                                
                                            }</div>
                                            <div className="listContent">
                                                <div className="listContents">
                                                    <div>
                                                        <p className={this.optionTypes(v.transaction_type, v.status).slice(2,4) == '成功' ?'green':'red'}>{this.optionTypes(v.transaction_type, v.status)
                                                        }</p>
                                                        <p><label>{v.amounta}{v.coina}</label>&nbsp;&nbsp;&&nbsp;&nbsp;<label>{v.amountb}{v.coinb}</label></p>
                                                    </div>
                                                    <div>
                                                        <p>通证：+{v.token}</p>
                                                        <p>{timeStamp2String(v.date + '000')}</p>
                                                    </div>
                                                </div>
                                                <label><img src="/img/rightArrow.png" /></label>
                                            </div>
                                        </div>
                                    })
                                }
                                
                                {/* <div className="poolRecordList">
                                    <div className="logo"><img src="/img/编组 13备份 3@2x.png" /></div>
                                    <div className="listContent">
                                        <div className="listContents">
                                            <div>
                                                <p className="org">打包中</p>
                                                <p><label>999ETH</label>&nbsp;&nbsp;&&nbsp;&nbsp;<label>99900Violas</label></p>
                                            </div>
                                            <div>
                                                <p>通证：+199 VETH</p>
                                                <p>01.18 15:42</p>
                                            </div>
                                        </div>
                                        <label><img src="/img/rightArrow.png" /></label>
                                    </div>
                                </div> */}
                                {/* <div className="poolRecordList">
                                    <div className="logo"><img src="/img/编组 13备份 2@2x.png" /></div>
                                    <div className="listContent">
                                        <div className="listContents">
                                            <div>
                                                <p className="red">转入失败</p>
                                                <p><label>999ETH</label>&nbsp;&nbsp;&&nbsp;&nbsp;<label>99900Violas</label></p>
                                            </div>
                                            <div>
                                                <p>通证：+199 VETH</p>
                                                <p>01.18 15:42</p>
                                            </div>
                                        </div>
                                        <label><img src="/img/rightArrow.png" /></label>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 资金池详情 */}
                <Drawer
                    // title="Basic Drawer"
                    placement="right"
                    closable={false}
                    visible={this.state.visible1}
                    mask={false}
                    getContainer={false}
                >
                    <PoolingDetail showDrawer={this.showDrawer} changeList={this.state.changeList}></PoolingDetail>
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
        showDialog: () => {
            dispatch({
                type: 'EXCHANGE',
                params: {
                    type: true,
                    vis: true
                }
            })
        },
        showPolling: (payload) => {
            dispatch({
                type: 'SHOWPOOL',
                payload: payload
            })
        },
        showDrawer: () => {
            dispatch({
                type: 'VISIBLE',
                payload: false
            })
        },
        showDrawer1: (type) => {
            dispatch({
                type: 'VISIBLE1',
                payload: !type
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CashPooling);