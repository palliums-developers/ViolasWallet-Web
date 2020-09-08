import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import "../app.scss";
import { connect } from 'react-redux';
import { timeStamp2String } from '../../utils/timer';
import PoolingDetail from '../market/poolingDetail'
import { Drawer } from "antd";
import { bytes2StrHex, string2Byte } from '../../utils/trans'
import code_data from '../../utils/code.json';
import WalletConnect from "../../packages/browser/src/index";
// import RouterView from '../router/routerView'
// let url = "http://52.27.228.84:4000"
let url = "https://api.violas.io"
let url1 = "https://api4.violas.io"
let newArr = [];

//资金池页面
class CashPooling extends Component {
    constructor() {
        super()
        this.state = {
            bridge: 'https://walletconnect.violas.io',
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
            inputAmount1:'',
            outputAmount: '',
            outputAmount1: '',
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
            asset2: '--',
            index:-1,
            poolArr:[],
            poolList1: [],
            total_token:0,
            aName:'',
            bName:'',
            violasArr:[],
            AddLiquidity: {},
            walletConnector: {},
            aModule: '',
            bModule: '',
            coin_a_value:'',
            coin_b_value: '',
            focusActive: false
            // visible:false
        }
    }
    async componentWillMount() {
        if (this.props.visible) {
            this.props.showDrawer()
        }
        await this.getNewWalletConnect();
    }
    async getNewWalletConnect() {
        await this.setState({
            walletConnector: new WalletConnect({ bridge: this.state.bridge })
        });
    }
    componentDidMount() {
        // document.addEventListener('click', this.closeMenu);
        // this.getSelectTypes()
        if (!window.sessionStorage.getItem('curDealType')){
            window.sessionStorage.setItem('curDealType', this.state.type)
        }else{
            this.setState({
                type: window.sessionStorage.getItem('curDealType')
            })
        }
        
        this.getExchangeRecode()
        this.getOutBalances()
        if (window.sessionStorage.getItem("btc_address")){
            this.setState({
                BTCAddress: window.sessionStorage.getItem("btc_address")
            }, () => {
                this.getBalances()
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
    getExchangeRecode = () => {
        fetch(url1 + "/1.0/market/pool/transaction?address=" + window.sessionStorage.getItem('violas_address') + '&offset=0&limit=5').then(res => res.json())
            .then(res => {
                // console.log(res,'.....')
                if(res.data){
                    this.setState({
                        changeRecord: res.data
                    }, () => {
                        this.optionType()
                    })
                }
                
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
        // this.stopPropagation(event)
        this.setState({
            showDealType: !this.state.showDealType,
            warning: ''
        },)
    }
    //显示输入时通证列表
    showMenu = (v,bal,i) => {

        this.setState({
            name: v,
            showMenuViolas: false,
            index: i
        }, () => {
            this.opinionInputAmount()
            this.opinionInputAmount1() 
            if (this.state.name == 'BTC') {
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
    //         showMenuViolas: false
    //     })
    // }
    // stopPropagation(e) {
    //     e.nativeEvent.stopImmediatePropagation();
    // }
    
    showType = (v) => {
        window.sessionStorage.setItem('curDealType',v)
        this.setState({
            type: window.sessionStorage.getItem('curDealType'),
            showDealType: false
        },()=>{
            this.getExchangeRecode()
        })
    }

    //第一个输入框 输入金额
    getInputAmount = (e) => {
        if (e.target.value) {
            e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符   
            e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
            e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数   
            if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                e.target.value = parseFloat(e.target.value);
            }
            if (this.state.asset != '--'){
                if (e.target.value > this.state.asset) {
                    this.setState({
                        warning: '资金不足'
                    })
                } else {
                    this.setState({
                        warning: ''
                    })
                }
            }
            
            this.setState({
                inputAmount: e.target.value
            }, () => {
                this.opinionInputAmount()
            })
        } else {
            this.setState({
                warning: '',
                inputAmount: '',
                inputAmount1:''
            })
        }
    }
    //第二个输入框
    getInputAmount1 = (e) => {
        if (e.target.value) {
            e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符   
            e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
            e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数   
            if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                e.target.value = parseFloat(e.target.value);
            }
            if (this.state.asset2 != '--'){
                if (e.target.value > this.state.asset2) {
                    this.setState({
                        warning: '资金不足'
                    })
                } else {
                    this.setState({
                        warning: ''
                    })
                }
            }
            
            this.setState({
                inputAmount1: e.target.value
            }, () => {
                this.opinionInputAmount1()
            })
        } else {
            this.setState({
                warning: '',
                inputAmount1: '',
                inputAmount:''
            })
        }
    }
    //第一个输出框 资金池通证
    getOutputAmount = (e) =>{
        if (e.target.value) {
            e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符   
            e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
            e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数   
            if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                e.target.value = parseFloat(e.target.value);
            }
            
            if (this.state.asset1 != '--'){
                if (e.target.value > this.state.asset1) {
                    this.setState({
                        warning: '资金不足'
                    })
                } else {
                    this.setState({
                        warning: ''
                    })
                }
            }
            
            this.setState({
                outputAmount: e.target.value
            }, () => {
                this.opinionOutputAmount()
            })
        } else {
            this.setState({
                warning: '',
                outputAmount: '',
                outputAmount1: ''
            })
        }
        
    }
    //第二个输出框
    getOutputAmount1 = (e) => {
        if (e.target.value) {
            this.setState({
                outputAmount1: e.target.value
            })
        } else {
            this.setState({
                outputAmount1: e.target.value
            })
        }
    }
    
    
    //显示输入时通证列表
    showTypes = (v, address, name, ind,bal) => {
        this.setState({
            type1: v,
            ind: ind,
            // coinName: 'violas-' + name.toLowerCase(),
            // address: address,
            showMenuViolas1: false
        },()=>{
                this.opinionInputAmount()
                this.opinionInputAmount1() 
                console.log(this.state.type1,'.........')
                if (this.state.type1 == 'BTC') {
                    if (bal == '0') {
                        this.setState({
                            asset2: '0.00'
                        })
                    } else {
                        this.setState({
                            asset2: this.getFloat(bal / 1e8, 6)
                        })
                    }
                } else {
                    if (bal == 0) {
                        this.setState({
                            asset2: '0.00'
                        })
                    } else {
                        this.setState({
                            asset2: this.getFloat(bal / 1e6, 6)
                        })
                    }
                }
        })
    }
    //显示输出时通证列表
    showTypes1 = (aModule,bModule,aName, bName,token, ind) => {
        this.setState({
            type2: aName+'/'+bName,
            ind1: ind,
            asset1:token,
            aName:aName,
            bName:bName,
            aModule: aModule,
            bModule: bModule,
            // coinName: 'violas-' + name.toLowerCase(),
            // address: address,
            showMenuViolas2: false
        },()=>{
            // console.log('111111')
            this.opinionOutputAmount()
             
        })
    }
    //转入下拉列表 第一个输入框
    //转入下拉列表 第二个输入框
    getBalances() {
        fetch(url1 + "/1.0/market/exchange/currency").then(res => res.json())
        .then(res => {
            let temp = [];
            temp = res.data.btc.concat(res.data.libra);
            temp = temp.concat(res.data.violas)
            
             this.setState({
                 violasArr: res.data.violas,
                 currencies: temp,
             },()=>{
                     fetch(url1 + "/1.0/violas/balance?addr=" + window.sessionStorage.getItem('violas_address')).then(res => res.json())
                         .then(res => {
                            //  console.log(res, '...........')
                             this.setState({
                                 arr1: res.data.balances
                             }, () => {
                                //  console.log(this.state.arr1)
                                for (let i = 0; i < this.state.violasArr.length;i++){
                                    for (let j = 0; j < this.state.arr1.length; j++) {
                                        if (this.state.violasArr[i].name == this.state.arr1[j].name){
                                            newArr.push(this.state.arr1[j])
                                            // return;
                                            
                                       }
                                    }
                                 }
                                     this.setState({
                                         arr: newArr,
                                         selData: newArr
                                     }, () => {
                                         if (this.state.type == "") {
                                             this.setState({
                                                 coinName: 'violas-' + this.state.selData[0].name.toLowerCase(),
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
    //第一个输入框搜索
    getSearchList = (e) => {
        if (e.target.value) {
            let arr = this.state.arr.filter(v => {
                if (v.show_name.indexOf(e.target.value.toUpperCase()) == 0) {
                    return v;
                }
            })
            this.setState({
                selData: arr
            })
        } else {
            this.getBalances()
        }

    }
    //第二个输入框搜索
    getSearchList1 = (e) => {
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
    getSearchList2 = (e) => {
        if (e.target.value){
            let arrs = this.state.poolArr.filter(v => {
                if (String(v.token).indexOf(e.target.value) == 0) {
                    return v;
                }
            })
            this.setState({
                poolArr: arrs
            })
        }else{
            this.getOutBalances()
        }
    }
    //转出下拉列表 第一个输入框
    getOutBalances(){
        fetch(url1 + "/1.0/market/pool/info?addr=" + window.sessionStorage.getItem('violas_address')).then(res => res.json())
            .then(res => {
                // console.log(res,'.......')
                if(res.data){
                    this.setState({
                        // res.data.balance  res.data.total_token
                        poolArr: res.data.balance,
                        total_token: res.data.total_token
                    })
                }
                
            })
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
    //获取输入换算数量
    opinionInputAmount = () => {
        if (this.state.inputAmount) {
            fetch(url1 + "/1.0/market/pool/deposit/trial?amount=" + this.state.inputAmount + '&&coin_a=' + this.state.type1 + '&&coin_b=' + this.state.name).then(res => res.json())
                .then(res => {
                    if (res.data) {
                        this.setState({
                            inputAmount1: res.data
                        })
                    }
                })
        }
    }
    opinionInputAmount1 = () => {
        if (this.state.inputAmount1) {
            fetch(url1 + "/1.0/market/pool/deposit/trial?amount=" + this.state.inputAmount1 + '&&coin_a=' + this.state.name + '&&coin_b=' + this.state.type1).then(res => res.json())
                .then(res => {
                    if (res.data) {
                        this.setState({
                            inputAmount: res.data
                        })
                    }
                })
        }
    }
    //获取输出换算数量
    opinionOutputAmount=()=>{
        if (this.state.outputAmount) {
            fetch(url1 + "/1.0/market/pool/withdrawal/trial?address=" + window.sessionStorage.getItem('violas_address') + '&amount=' + this.state.outputAmount + '&&coin_a=' + this.state.aName + '&&coin_b=' + this.state.bName).then(res => res.json())
                .then(res => {
                    // console.log(res, '.........')
                    if (res.data) {
                            this.setState({
                                outputAmount1: res.data.coin_a_value + res.data.coin_a_name + '/' + res.data.coin_b_value + res.data.coin_b_name,
                                coin_a_value: res.data.coin_a_value,
                                coin_b_value: res.data.coin_b_value
                            })
                        
                    }
                })
        }
    }
    //转入转出tyargs
    async getTyArgs(_module, _name) {
        let address = '00000000000000000000000000000001';
        let prefix = '07';
        let suffix = '00';
        let module_length = _module.length;
        if (module_length < 10) {
            module_length = '0' + module_length;
        }
        let _module_hex = bytes2StrHex(string2Byte(_module));
        let name_length = _name.length;
        if (name_length < 10) {
            name_length = '0' + name_length;
        }
        let _name_hex = bytes2StrHex(string2Byte(_name));
        let result = prefix + address + module_length + _module_hex + name_length + _name_hex + suffix;
        return result;
    }
    //点击转入前的判断
    async orderCurrencies(input_a, input_b) {
        let index_a, index_b, amount_a, amount_b = 0;
        for (let i = 0; i < this.state.violasArr.length; i++) {
            if (this.state.violasArr[i].show_name == input_a) {
                index_a = i;
            }
            if (this.state.violasArr[i].show_name == input_b) {
                index_b = i;
            }
        }
        if (index_a > index_b) {
            let temp = index_a;
            index_a = index_b;
            index_b = temp;
            amount_a = this.state.inputAmount1;
            amount_b = this.state.inputAmount;
        } else {
            amount_a = this.state.inputAmount1;
            amount_b = this.state.inputAmount;
        }
        this.setState({
            AddLiquidity: {
                coin_a: this.state.violasArr[index_a].show_name,
                coin_a_amount: amount_a,
                coin_a_tyArgs: await this.getTyArgs(this.state.violasArr[index_a].module, this.state.violasArr[index_a].name),
                coin_b: this.state.violasArr[index_b].show_name,
                coin_b_amount: amount_b,
                coin_b_tyArgs: await this.getTyArgs(this.state.violasArr[index_b].module, this.state.violasArr[index_b].name),
            }
        })
        // console.log(this.state.AddLiquidity)
    }
    //点击转入
    async getAddLiquidity(chainId) {

        await this.orderCurrencies(this.state.name, this.state.type1)
        // console.log(this.state.AddLiquidity.coin_a_amount, '..........')
        const tx = {
            from: sessionStorage.getItem('violas_address'),
            payload: {
                code: code_data.violas.add_liquidity,
                tyArgs: [
                    this.state.AddLiquidity.coin_a_tyArgs,
                    this.state.AddLiquidity.coin_b_tyArgs
                ],
                args: [
                    {
                        type: 'U64',
                        value: ''+(parseInt(this.state.AddLiquidity.coin_a_amount) * 1e6)
                    },
                    {
                        type: 'U64',
                        value: ''+(parseInt(this.state.AddLiquidity.coin_b_amount) * 1e6)
                    },
                    {
                        type: 'U64',
                        value: '10'
                    },
                    {
                        type: 'U64',
                        value: '10'
                    }
                ]
            },
            chainId: chainId
        }
        console.log('Add Liquidity ', tx);
        this.state.walletConnector.sendTransaction('violas', tx).then(res => {
            console.log('Add Liquidity ', res);
            if (res == 'success') {
                this.setState({
                    warning: '转入成功'
                })
            }

        }).catch(err => {
            console.log('Add Liquidity ', err);
            this.setState({
                warning: '转入失败'
            })
        });
    }
    showExchangeCode = () => {
        if (this.state.inputAmount) {
            if (this.state.inputAmount1) {
                this.getAddLiquidity(sessionStorage.getItem("violas_chainId"))
                this.setState({
                    warning: '',
                    focusActive:true
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
    //点击转出
    async getRemoveLiquidity(chainId) {
        const tx = {
            from: sessionStorage.getItem('violas_address'),
            payload: {
                code: code_data.violas.remove_liquidity,
                tyArgs: [
                    await this.getTyArgs(this.state.aModule, this.state.aName),
                    await this.getTyArgs(this.state.bModule, this.state.bName),
                ],
                args: [
                    {
                        type: 'U64',
                        value: ''+(parseInt(this.state.outputAmount)*1e6)
                    },
                    {
                        type: 'U64',
                        value: ''+this.state.coin_a_value
                    },
                    {
                        type: 'U64',
                        value: '' + this.state.coin_b_value
                    }
                ]
            },
            chainId: chainId
        }
        console.log('Remove Liquidity ', tx);
        this.state.walletConnector.sendTransaction('violas', tx).then(res => {
            console.log('Remove Liquidity ', res);
            if (res == 'success') {
                this.setState({
                    warning: '转出成功'
                })
            }
        }).catch(err => {
            console.log('Remove Liquidity ', err);
            this.setState({
                warning: '转出失败'
            })
        });
    }
    showExchangeCode1 = () => {
        if (this.state.outputAmount) {
            if (this.state.outputAmount1) {
                this.getRemoveLiquidity(sessionStorage.getItem("violas_chainId"))
                this.setState({
                    warning: '',
                    focusActive: true
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
    render() {
        let { names, name, showMenuViolas, showMenuViolas1, types, type, showDealType, warning, getFocus, getFocus1, changeRecord, selData, type1, arr, ind, index, type2, ind1, showMenuViolas2, poolArr, focusActive } = this.state;
        // console.log(this.state.outputAmount1,'....')
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
                                <p>费率：--</p>
                            </div>
                            {
                                type == '转入' ? <div className={getFocus ? 'iptForm1 getFormBorder' : 'iptForm1'}>
                                    <div className="showAsset">
                                        <label>转入</label>
                                        <p><img src="/img/asset-management.png" />当前资产：{this.state.asset}{name == '选择通证' ? '' : name}</p>
                                    </div>
                                    <div className="iptContent">
                                        <input placeholder="0.00" value={this.state.inputAmount} onChange={(e) => this.getInputAmount(e)} onFocus={() => {
                                            this.setState({
                                                getFocus: true,
                                                getFocus1: false
                                            })
                                        }} onBlur={() => {
                                            this.setState({
                                                getFocus: false
                                            })
                                        }}/>
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
                                            <p><img src="/img/asset-management.png" />当前资产：{this.state.asset1}</p>
                                        </div>
                                        <div className="iptContent">
                                            <input placeholder="0.00" onChange={(e) => this.getOutputAmount(e)} />
                                            <div className="dropdown1">
                                                {
                                                    showMenuViolas2 ? <span className="showClick" onClick={(e) => this.getShow2(e)}>{type2}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow2(e)}>{type2}<i><img src="/img/路径 7@2x.png" /></i></span>
                                                }

                                                {
                                                    showMenuViolas2 ? <div className='dropdown-content1 dropdown-content3'>
                                                        <div className="formSearch">
                                                            <img src="/img/sousuo 2@2x.png" />
                                                            <input placeholder="Search" onChange={(e) => this.getSearchList2(e)} />
                                                        </div>
                                                        {
                                                            poolArr.map((v, i) => {
                                                                return <div className="searchList" key={i} onClick={() => {
                                                                    if (v.coin_a.index < v.coin_b.index){
                                                                        this.showTypes1(v.coin_a.module, v.coin_b.module,v.coin_a.show_name, v.coin_b.show_name, v.token, i)
                                                                    }else{
                                                                        this.showTypes1(v.coin_a.module, v.coin_b.module,v.coin_b.show_name, v.coin_a.show_name, v.token, i)
                                                                    }
                                                                    
                                                                }}>
                                                                    <div className="searchEvery">
                                                                        {/* <img src={v.show_icon} /> */}
                                                                        <div className="searchEvery1">
                                                                            <div>
                                                                                <h4>{v.coin_a.show_name + '/' + v.coin_b.show_name}</h4>
                                                                                <p>通证：{v.token}</p>
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
                                        <p><img src="/img/asset-management.png" />当前资产：{this.state.asset2}{type1 == '选择通证' ? '' : type1}</p>
                                    </div>
                                    <div className="iptContent">
                                        <input placeholder="0.00" value={this.state.inputAmount1} onFocus={() => {
                                            this.setState({
                                                getFocus: false,
                                                getFocus1: true
                                            })
                                        }} onBlur={() => {
                                            this.setState({
                                                getFocus1: false
                                            })
                                        }} onChange={(e) => this.getInputAmount1(e)} />
                                        <div className="dropdown1">
                                            {
                                                showMenuViolas1 ? <span className="showClick" onClick={(e) => this.getShow1(e)}>{type1}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow1(e)}>{type1}<i><img src="/img/路径 7@2x.png" /></i></span>
                                            }
                                            {
                                                showMenuViolas1 ? <div className='dropdown-content1'>
                                                    <div className="formSearch">
                                                        <img src="/img/sousuo 2@2x.png" />
                                                        <input placeholder="Search" onChange={(e) => this.getSearchList1(e)} />
                                                    </div>
                                                    {
                                                        arr.map((v, i) => {
                                                            return <div className="searchList" key={i} onClick={() => {
                                                                if (v.show_name == 'BTC') {
                                                                    this.showTypes(v.show_name, v.address, v.name, i, v.BTC)
                                                                } else {
                                                                    this.showTypes(v.show_name, v.address, v.name, i, v.balance)
                                                                }
                                                            }}>
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
                                            <input value={this.state.outputAmount1} placeholder="0.00" onChange={(e) => this.getOutputAmount1(e)} />
                                            
                                        </div>
                                    </div>
                            }
                            <div className="changeRate">兑换率：--</div>
                            {/* <div className="changeRate">当前资金池大小：— —</div> */}
                            {/* <div className="changeRate">你的资金池共有：{type == '转入' ? '--':total_token}</div> */}
                        </div>
                        <div className="foot">
                            {
                                type == '转入' ? <p className={focusActive == false ? 'btn' : 'btn focusActive'} onClick={() => this.showExchangeCode()}>转入</p> : <p className={focusActive == false ? 'btn' : 'btn focusActive'} onClick={() => this.showExchangeCode1()}>转出</p>
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
                                                        {this.optionTypes(v.transaction_type, v.status).slice(2, 4) == '成功' ? <p><label>{v.amounta / 1e6}{v.coina}</label>&nbsp;&nbsp;&&nbsp;&nbsp;<label>{v.amountb / 1e6}{v.coinb}</label></p> : <p>-- & --</p>}
                                                    </div>
                                                    <div>
                                                        {this.optionTypes(v.transaction_type, v.status).slice(2, 4) == '成功' ? <p>通证：+{v.token / 1e6}</p> : <p>--</p>}
                                                        
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