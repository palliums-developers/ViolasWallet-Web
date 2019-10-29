import { observable, action } from "mobx";

export default class Count{ 
    @observable counts

    // 初始化
    constructor(){
        this.counts = 1000;
    }

    changeCount(type) {
      console.log(type)
      //type === '+' ? this.count ++ : this.count --
    }

    @action async autoAdd(type) {
        await this.changeCount(type);
    }

}   