import React, { Component } from "react";
// import { NavLink } from 'react-router-dom'
import "../app.scss";
import { connect } from 'react-redux';
import ExchangeDetail from '../market/exchangeDetail';
import { Drawer } from "antd";
import { timeStamp2String } from '../../utils/timer';
import { bytes2StrHex, string2Byte, decimal2Hex, getTimestamp, int2Byte } from '../../utils/trans'
import axios from 'axios'
import WalletConnect from "../../packages/browser/src/index";
import code_data from '../../utils/code.json';
// import RouterView from '../router/routerView'
let url = "https://api.violas.io"
let url1 = "https://api4.violas.io"

class ExChange extends Component {
    constructor() {
        super()
        this.state = {
            bridge: 'https://walletconnect.violas.io',
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
            asset1: '--',
            currenciesWithType:[],
            currencies:[],
            violas_currencies:[],
            swap_in_name:'',
            swap_out_name:'',
            AddLiquidity:{},
            uniswap:{},
            swap_trial:[],
            btc_currencies:[],
            libra_currencies:[],
            swap_address:'',
            crossChainInfo:[]

        }
    }
    async componentWillMount(){
        await this.getMarketCurrencies()
        await this.getNewWalletConnect();
        this.getCrossChainInfo();
    }
    async getNewWalletConnect() {
        await this.setState({
            walletConnector: new WalletConnect({ bridge: this.state.bridge })
        });
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
                        })
                    }
                })
            });
        }
        
    }
    //按链获取币种信息
    async getMarketCurrencies() {
        axios('https://api4.violas.io/1.0/market/exchange/currency')
            .then(res => {
                this.setState({ currenciesWithType: res.data.data })
                let temp = [];
                temp = res.data.data.btc.concat(res.data.data.libra);
                temp = temp.concat(res.data.data.violas)
                this.setState({
                    currencies: temp,
                    violas_currencies: res.data.data.violas,
                    libra_currencies: res.data.data.libra,
                    btc_currencies: res.data.data.btc
                    // swap_in: temp[0].show_name,
                    // swap_out: temp[0].show_name
                },()=>{
                    this.getBalances()
                        
                })
            })
    }
    //获取余额
    getBalances = () => {
        //获取violas币种的余额
        fetch(url1 + "/1.0/violas/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json()).then(async res => {
            if (res.data) {
                let arr = this.state.violas_currencies;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j <= res.data.balances.length; j++) {
                        if (!res.data.balances[j]) {
                            arr[i].balance = 0;
                            break;
                        }
                        else if (arr[i].name == res.data.balances[j].name) {
                            arr[i].balance = res.data.balances[j].balance;
                            break;
                        }
                    }
                }
                await this.setState({
                    violas_currencies: arr
                })
            }

        })
        //获取libra币种的余额
        fetch(url1 + "/1.0/libra/balance?addr=" + window.localStorage.getItem('address')).then(res => res.json()).then(res => {
            if (res.data) {
                let arr1 = this.state.libra_currencies;
                for (let i = 0; i < arr1.length; i++) {
                    for (let j = 0; j <= res.data.balances.length; j++) {
                        if (!res.data.balances[j]) {
                            arr1[i].balance = 0;
                            break;
                        }
                        else if (arr1[i].name == res.data.balances[j].name) {
                            arr1[i].balance = res.data.balances[j].balance;
                            break;
                        }
                    }
                }
            }
        })
        //获取btc的余额
        fetch(url + "/1.0/btc/balance?address=" + this.state.BTCAddress).then(res => res.json())
            .then(res => {
                if (res.data) {
                    this.state.btc_currencies[0].balance = res.data[0].BTC
                }

                let arr = this.state.violas_currencies.concat(this.state.libra_currencies)
                let newArr = arr.concat(this.state.btc_currencies)
                // console.log(newArr[0] && newArr[0].balance)
                this.setState({
                    selData: newArr,
                    arr: newArr
                    
                }, () => {
                    if (this.state.selData) {
                        if (this.state.type == "") {
                            this.setState({
                                index: Object.keys(this.state.selData)[0],
                                type: this.state.selData[0].show_name,
                                asset: this.state.selData[0].show_name == 'BTC' ? Number(this.getFloat(this.state.selData[0].balance / 1e8, 6)) : Number(this.getFloat(this.state.selData[0].balance / 1e6, 6)),
                                swap_in_name: this.state.selData[0].show_name

                            }, () => {
                                       //判断
                                       let oldArr = this.state.arr;
                                       let newArr = [];
                                       oldArr.map((v) => {
                                           if (this.state.type != v.show_name) {
                                               newArr.push(v);
                                           }
                                       });
                                       this.setState({
                                         arr: newArr,
                                       });
                                     })
                        }
                    }
                })
            })

    }
    getTyArgs(_module, _name) {
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
    async getCrossChainInfo() {
        axios('https://api4.violas.io/1.0/market/exchange/crosschain/address/info')
            .then(async res => {
                await this.setState({ crossChainInfo: res.data.data })
            })
    }
    async getBytePath(arr) {
        let result = [];
        for (let i in arr) {
            result.push(int2Byte(arr[i]))
        }
        return result
    }
    async getSwapType(_temp) {
        if (_temp === 'BTC') {
            return 'btc';
        } else {
            for (let j in this.state.currenciesWithType.libra) {
                if (this.state.currenciesWithType.libra[j].name === _temp) {
                    return 'libra';
                }
            }
            for (let k in this.state.currenciesWithType.violas) {
                if (this.state.currenciesWithType.violas[k].name === _temp) {
                    return 'violas';
                }
            }
        }
    }
    //兑换前
    async before_getSwap(input_type, output_type) {
        
        //change show name to name
        for (let i in this.state.currencies) {
            if (this.state.currencies[i].show_name === input_type) {
                await this.setState({ swap_in_name: this.state.currencies[i].name })
            }
            if (this.state.currencies[i].show_name === output_type) {
                await this.setState({ swap_out_name: this.state.currencies[i].name })
            }
        }
       
        //get input type
        await this.setState({ swap_in_type: await this.getSwapType(this.state.swap_in_name) })
        //get output type
        await this.setState({ swap_out_type: await this.getSwapType(this.state.swap_out_name) })
        //get receiver address
        for (let l in this.state.crossChainInfo) {
            if (this.state.crossChainInfo[l].input_coin_type === this.state.swap_in_type) {
                if (this.state.crossChainInfo[l].to_coin.assets.name === this.state.swap_out_name) {
                    
                    // console.log(l, this.state.crossChainInfo[l].input_coin_type, this.state.crossChainInfo[l].to_coin.assets.name)
                    await this.setState({ swap_address: this.state.crossChainInfo[l].receiver_address });
                    break;
                }
            }
        }
    }
    getPayeeAddress() {
        let payee_address = '';
        if (this.state.swap_out_type === 'violas') {
            payee_address = sessionStorage.getItem('violas_address');
        } else if (this.state.swap_out_type === 'libra') {
            payee_address = sessionStorage.getItem('libra_address');
        } else {
            payee_address = sessionStorage.getItem('bitcoin_address')
        }
        return payee_address;
    }
    async orderCurrencies(type, input_a, input_b) {
        let index_a, index_b;
        let amount_a, amount_b = 0;

        for (let i = 0; i < this.state.violas_currencies.length; i++) {
            if (this.state.violas_currencies[i].show_name == input_a) {
                index_a = i;
            }
            if (this.state.violas_currencies[i].show_name == input_b) {
                index_b = i;
            }
        }
        if (index_a > index_b) {
            let temp = index_a;
            index_a = index_b;
            index_b = temp;
            amount_a = this.state.addLiquidityTrial;
            amount_b = this.state.input_a_amount;
        } else {
            amount_a = this.state.input_a_amount;
            amount_b = this.state.addLiquidityTrial;
        }
        if (type === 'add_liquidity') {
            await this.setState({
                AddLiquidity: {
                    coin_a: this.state.violas_currencies[index_a].show_name,
                    coin_a_amount: parseInt(amount_a),
                    coin_a_tyArgs:await this.getTyArgs(this.state.violas_currencies[index_a].module, this.state.violas_currencies[index_a].name),
                    coin_b: this.state.violas_currencies[index_b].show_name,
                    coin_b_amount: parseInt(amount_b),
                    coin_b_tyArgs:await this.getTyArgs(this.state.violas_currencies[index_b].module, this.state.violas_currencies[index_b].name),
                }
            })
        } else if (type == 'uniswap') {
            
            await this.setState({
                uniswap: {
                    coin_a: this.state.violas_currencies[index_a].show_name,
                    coin_a_tyArgs: this.getTyArgs(this.state.violas_currencies[index_a].module, this.state.violas_currencies[index_a].name),
                    coin_b: this.state.violas_currencies[index_b].show_name,
                    coin_b_tyArgs: this.getTyArgs(this.state.violas_currencies[index_b].module, this.state.violas_currencies[index_b].name),
                }
            })
        }
    }
    //violas兑换
    async getUniswap(chainId) {
        await this.orderCurrencies('uniswap', this.state.swap_in_name, this.state.swap_out_name);

        return {
            from: localStorage.getItem('address'),
            payload: {
                code: code_data.violas.swap,
                tyArgs: [
                    this.state.uniswap.coin_a_tyArgs,
                    this.state.uniswap.coin_b_tyArgs
                ],
                args: [
                    {
                        type: 'Address',
                        value: localStorage.getItem('address')
                    },
                    {
                        type: 'U64',
                        value: '' + (parseInt(this.state.inputAmount) * 1e6)
                    },
                    {
                        type: 'U64',
                        value: '10'
                    },
                    {
                        type: 'Vector',
                        value: await bytes2StrHex(await this.getBytePath(this.state.swap_trial.path))
                    },
                    {
                        type: 'Vector',
                        value: ''
                    }
                ]
            },
            chainId: chainId
        }
    }
    //btc兑换
    async getBitcoinScript(_type, _payee_address, _amount) {
        let op_return_head = '6a';
        let data_length = '3c';
        let mark = code_data.btc.violas_mark;
        let version = code_data.btc.version;
        let type = '';
        for (let key in code_data.btc.type.start) {
            if (key === _type) {
                type = code_data.btc.type.start[key];
                break;
            }
        }
        let payee_address = _payee_address;
        let sequence = await this.fullWith16(getTimestamp);
        // console.log('sequence ', sequence)
        let module_address = code_data.btc.violas_module_address;
        let amount = await this.fullWith16(_amount);
        let time = '0000';
        return op_return_head + data_length + mark + version + type + payee_address + sequence + module_address + amount + time;
    }
    async getBitcoinSwap() {
        return {
            from: this.state.BTCAddress,
            amount: '' + this.state.inputAmount,
            changeAddress: this.state.BTCAddress,
            payeeAddress: this.state.swap_address,
            script: await this.getBitcoinScript(this.state.swap_out, this.getPayeeAddress, this.state.swap_trial.amount)
        }
    }
    //libra兑换
    async getLibraScript(_flag, _type, _type_list, _address, _amount) {
        let flag = _flag;
        let type = '';
        for (let key in _type_list) {
            if (key === _type) {
                type = _type_list[key];
                break;
            }
        }
        // console.log(_type)
        let to_address = '00000000000000000000000000000000' + _address;
        let result = {
            flag: flag,
            type: type,
            times: 0,
            to_address: to_address,
            out_amount: _amount,
            state: 'start'
        }
        // console.log('script ', result)
        return JSON.stringify(result);
    }
    async getLibraSwap(chainId) {
        return {
            from: localStorage.getItem('address'),
            payload: {
                code: code_data.libra.p2p,
                tyArgs: [
                    {
                        module: this.state.swap_in_name,
                        address: code_data.btc.libra_module_address,
                        name: this.state.swap_in_name
                    }
                ],
                args: [
                    {
                        type: 'Address',
                        value: this.state.swap_address
                    },
                    {
                        type: 'U64',
                        value: ''+this.state.inputAmount
                    },
                    {
                        type: 'Vector',
                        value: await bytes2StrHex(string2Byte(await this.getLibraScript('libra', this.state.type1, code_data.libra.type.start, localStorage.getItem('address'), this.state.swap_trial.amount)))
                    },
                    {
                        type: 'Vector',
                        value: ''
                    }
                ]
            },
            chainId: chainId
        }
    }
    //violas链兑换其他测试链的币种
    async getViolas2otherSwap(chainId) {
        return {
            from: localStorage.getItem('address'),
            payload: {
                code: code_data.violas.p2p,
                tyArgs: [
                    await this.getTyArgs(this.state.swap_in_name, this.state.swap_in_name)
                ],
                args: [
                    {
                        type: 'Address',
                        value: this.state.swap_address
                    },
                    {
                        type: 'U64',
                        value: ''+this.state.inputAmount
                    },
                    {
                        type: 'Vector',
                        value: await bytes2StrHex(string2Byte(await this.getLibraScript('violas', this.state.swap_out, code_data.violas.type.start, localStorage.getItem('address'), this.state.swap_trial.amount)))
                    },
                    {
                        type: 'Vector',
                        value: ''
                    }
                ]
            },
            chainId: chainId
        }
    }
    async getViolasSwap(_out_type, chainId) {
        let tx;
        if (_out_type === 'violas') {
            tx = await this.getUniswap(chainId);
        } else {
            tx = await this.getViolas2otherSwap(chainId);
        }
        return tx;
    }
    //兑换
    async getSwap(chainId) {
        if (this.state.swap_in_type === 'btc') {
            const tx = await this.getBitcoinSwap();
            console.log('bitcoin swap', tx);
            this.state.walletConnector.sendTransaction('_bitcoin', tx).then(res => {
                console.log('Bitcoin Swap ', res);
            }).catch(err => {
                console.log('Bitcoin Swap ', err);
            });
        } else if (this.state.swap_in_type === 'libra') {
            const tx = await this.getLibraSwap(chainId);
            console.log('libra swap ', tx);
            this.state.walletConnector.sendTransaction('_libra', tx).then(res => {
                console.log('Libra Swap ', res);
            }).catch(err => {
                console.log('Libra Swap ', err);
            })
        } else if (this.state.swap_in_type === 'violas') {
            const tx = await this.getViolasSwap(this.state.swap_out_type, chainId);
            console.log('violas swag ', tx);
            this.state.walletConnector.sendTransaction('violas', tx).then(res => {
                console.log('Violas Swap ', res);
            }).catch(err => {
                console.log('Violas Swag ', err);
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
    //获取兑换记录
    getExchangeRecode = () =>{
        fetch(url1 + "/1.0/market/exchange/transaction?address=" + window.localStorage.getItem('address') + '&offset=0&limit=5').then(res => res.json())
            .then(res => {
                if(res.data){
                    this.setState({
                        changeRecord: res.data
                    })
                }
               
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
    //输入选中的币种
    showMenu = (v,bal,i) => {
        this.setState({
            swap_in_name:v,
            type: v,
            showMenuViolas: false,
            index:i
        },()=>{
                this.opinionInputAmount()
                this.opinionOutputAmount() 
               
                let oldArr = this.state.arr;
                console.log(oldArr, "输入");
                let newArr = oldArr.filter((v) => {
                  return this.state.type1 != v.show_name;
                });
                console.log(oldArr, "输入");
                this.setState({
                  arr: newArr,
                });
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

    //获取input换算数量
    opinionInputAmount = () =>{
        if (this.state.inputAmount) {
            this.before_getSwap(this.state.type, this.state.type1);
            fetch(url1 + "/1.0/market/exchange/trial?amount=" + this.state.inputAmount + '&&currencyIn=' + this.state.type + '&&currencyOut=' + this.state.type1).then(res => res.json())
                .then(res => {
                    if (res.data) {
                        this.setState({
                            swap_trial:res.data,
                            outputAmount: res.data.amount
                        })
                    }
                })
        }
    }
    //获取output换算数量
    opinionOutputAmount = () =>{
        if (this.state.outputAmount) {
            this.before_getSwap(this.state.type, this.state.type1);
            fetch(url1 + "/1.0/market/exchange/trial?amount=" + this.state.outputAmount + '&&currencyIn=' + this.state.type + '&&currencyOut=' + this.state.type1).then(res => res.json())
                .then(res => {
                    if (res.data) {
                        this.setState({
                            swap_trial: res.data,
                            inputAmount: this.getFloat(this.state.outputAmount * res.data.rate,6)
                        })
                    }
                })
        }
    }
    //输入框输入的金额
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
    //输出框输入的金额
    getOutputAmount = (e) => {
        if (e.target.value) {
            e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符   
            e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
            e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数   
            if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                e.target.value = parseFloat(e.target.value);
            }
            if (this.state.asset1!='--'){
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
    //点击兑换
    showExchangeCode = () => {
        if (this.state.inputAmount){
            if (this.state.outputAmount) {
                this.getSwap(2)
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
    //输出框选中的币种
    showTypes = (v, address,ind,bal) => {
        
        this.setState({
            type1: v,
            ind:ind,
            swap_out_name:v,
            // coinName: 'violas-' + name.toLowerCase(),
            // address: address,
            showMenuViolas1: false
        },()=>{
            //换算
            this.opinionInputAmount()
            this.opinionOutputAmount() 
            //判断 
            let oldArr = this.state.selData;
            console.log(oldArr,'输出');
            let newArr1 = oldArr.filter((v) => {
              return this.state.type != v.show_name;
            });
            console.log(newArr1, "输出");
            this.setState({
              selData: newArr1,
            });
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
                                                onClick={() =>  this.showMenu(v.show_name, v.balance,i)}
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
                                                        return <div className="searchList" key={i} onClick={() => this.showTypes(v.show_name, v.address, i, v.balance)
                                                        }>
                                                            <div className="searchEvery">
                                                                <img src={v.icon} />
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