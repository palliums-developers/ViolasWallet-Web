import { observable, action } from "mobx";

export default class Count{ 
    @observable purse

    // 初始化
    constructor(){
        this.purse = 'violas钱包';
    }

    changePurse(type) {
        this.purse = type;
    //   console.log(type)
      //type === '+' ? this.count ++ : this.count --
    }

    @action async autoAdd(type) {
        await this.changePurse(type);
    }

}   