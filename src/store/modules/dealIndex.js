import { observable, action } from "mobx";
import {
    stableCurTranfer,
    stableCurDeal,
    selfCurDeal,
    getCurCoinMess,
    getOtherCoinMess,
    getVersion
} from '../../api/deal'
import axios from 'axios';

export default class DealIndex{ 
    @observable isShow = false
    @observable val = 0
    @observable isShows = false
    @observable coinsData = []
    @observable coin = true
    @observable vals = 1
    @observable list = [
            { "addr": "0x0000000000000000000000000000000000000000000000000000000000000000", "name": "LIBRA", "decimals": 6 },
            { "addr": "0x0f7100fcf2d114ef199575f0651620001d210718c680fbe7568c72d6e0160731", "name": "DTM", "decimals": 6 },
            { "addr": "0x352ba42b3a2fb66bff15f08ea691b5b87eff0fe6a69b79cda364c4cdf787a0a2", "name": "XDS", "decimals": 6 },
            { "addr": "0x76e5ed3e0805d54a9e8138164861f4fb1390a58100f9f9a63a962e22bb5ceed6", "name": "LDN", "decimals": 6 },
            { "addr": "0x8d6bcfbdf80140a7d1020af8050f1377d77c29325741795dc269b3fd0706a9b4", "name": "XSL", "decimals": 6 },
            { "addr": "0xb95b427af584a781a7240122c9d2582720e28174d276094429fa1aa356bc2d5d", "name": "XSL", "decimals": 6 },
            { "addr": "0x8e8f033830c60602ef491d0f850094d72d483e602c9a5df845eac7efc3387a38", "name": "XSL", "decimals": 6 }
        ]
    // 初始化
    constructor(){
        
    }
    updateCoin(type){
        this.coin = type
    }
    changeInd(ind){
      this.val = ind
    }
    changeInds(ind){
        this.vals = ind
      }
    selectChange(type) { 
        if(type.value){
            this.val = type.value;
        } 
        this.isShow = type.isShow;
    }
    selectsChange(type) { 
        if(type.value){
            this.vals = type.value;
        } 
        this.isShows = type.isShows;
    }
    //创建用户信息
    @action async stableTranfer(params) {
        let data = await stableCurTranfer(params);
        console.log(data)
    }
    //获取币种信息
    @action async getCoinMess() {
        let coins = await getCurCoinMess();
        return coins.data.data;
    }
     @action async getOthersCoinMess() {
         let coins = await getOtherCoinMess();
         
         return coins.data; 
     }
    @action async stableDeal(params) {
        let data = await stableCurDeal(params);
        return data.data
    }
    @action async selfDeal(params) {
        let data = await selfCurDeal(params);
        return data.data.orders
    }
    //交易所兑换
    @action async exchange(params) {
        let data = await axios.post('http://52.27.228.84:4000/1.0/violas/transaction', params, {
            'Headers': 'Content-Type:application/json'
        }).then(res => {
            return res.data
        });
        return data;
    }
    @action async getCurVersion(params) {
        let data = await getVersion(params);
        return data.data.trades
    }
}   