import { observable, action } from "mobx";
import { stableCurTranfer,stableCurDeal,selfCurDeal } from '../../api/deal'

export default class DealIndex{ 
    @observable isShow = false
    @observable val = 'DTM'
    @observable isShows = false
    @observable vals = 'XDS'
    @observable ind = 1
    @observable inds = 2
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
    changeInd(ind){
      this.ind = ind
    }
    changeInds(ind){
        this.inds = ind
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
    @action async stableDeal(params) {
        let data = await stableCurDeal(params);
        return data.data
    }
    @action async selfDeal(params) {
        let data = await selfCurDeal(params);
        return data.data
    }
}   