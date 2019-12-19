import { observable, action } from "mobx";
import { getBTCDealRecord, checkNewCoin, updateCoin,startCurLTranfer,getCurUserInfo,createUserInfo,getCurBalance,getCurCoinMess,getLibraDealRecord,addressMessage,getViolasDealRecord } from '../../api/server'
import axios from 'axios';
import intl from 'react-intl-universal';
intl.options.currentLocale=localStorage.getItem("local");

export default class Index{ 
    @observable purse
    @observable mnes_string
    @observable mnes_arr
    @observable addresses

    // 初始化
    constructor(){
        this.purse = 'violas钱包';
        this.mnes_string = String;
        this.mnes_arr = [];
        this.sweepCode = '';
        this.type = '';
        this.sweepCode1 = '';
        this.type1 = '';
    }

    changePurse(type) {
        window.localStorage.setItem('type',type)
        this.purse = type;
    }
    //扫描获取地址
    getAddress(params){
       this.type = params.type;
       this.sweepCode = params.address;
    }
    getAddress1(params) {
        this.type1 = params.type;
        this.sweepCode1 = params.address;
    }
    //创建用户信息
    @action async getCreateUser(params) {
        let userInfo = await createUserInfo(params);
    }
    //修改钱包名
    @action async updateWallets() {
        // let walletName = await updateWallet();
        // console.log(walletName)
    }
    //获取余额信息
    @action async getBalance(params) {
        let balance = await getCurBalance(params);
        return balance.data.data;
    }
    //获取BTC余额信息
    @action async getBTCBalance(params) {
        let balance = await getCurBalance(params);
        return balance.data.data;
    }
    //获取币种信息
    @action async getCoinMess() {
        let coins = await getCurCoinMess();
        return coins.data.data;
    }
    //发起转账
    @action async starVTranfer(params) {
        let data = await axios.post('http://52.27.228.84:4000/1.0/'+params.name+'/transaction',{
            signedtxn:params.signedtxn
        },{
            'Headers': 'Content-Type:application/json'
        }).then(res=>{
            return res.data
        });
        return data;
    }
    //获取libra交易记录
    @action async getLibDealRecord(params) {
        let records = await getLibraDealRecord(params);
        console.log(records)
        return records.data.data;
        
    }
    //获取violas交易记录
    @action async getVioDealRecord(params) {
        let records = await getViolasDealRecord(params);
        console.log(records)
        return records.data.data;
        
    }
    //获取BTC交易记录
    @action async getBTCDealRecords(params) {
        let records = await getCurBalance(params);
        return records.data.list.list;
        
    }
    //检测稳定币状态
    @action async checkCurNewCoin(params) {
        let data = await checkNewCoin(params);
        return data.data
    }
    @action async updateCurCoin(params) {
        let coins = await updateCoin(params);
        return coins.data.data;

    }
    //地址簿
    @action async autoAddress() {
        let address = await getCurUserInfo();
        return address.data.contacts;
    }
    //添加地址
    @action async getAddressMessage(params) {
        await addressMessage(params);
    }

}   