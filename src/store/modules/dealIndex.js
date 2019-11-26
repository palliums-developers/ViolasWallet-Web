import { observable, action } from "mobx";
import { stableCurTranfer,stableCurDeal } from '../../api/deal'

export default class DealIndex{ 
    @observable isShow = false

    // 初始化
    constructor(){
        
    }

    selectChange(type) {
        this.isShow = type;
    }
  
    //创建用户信息
    @action async stableTranfer(params) {
        let data = await stableCurTranfer(params);
        console.log(data)
    }
    @action async stableDeal(params) {
        let data = await stableCurDeal(params);
        console.log(data)
    }

}   