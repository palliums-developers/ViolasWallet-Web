import { observable, action } from "mobx";

export default class Count{ 
    @observable purse
    @observable mnes_string
    @observable mnes_arr

    // 初始化
    constructor(){
        this.purse = 'violas钱包';
        this.mnes_string = String;
        this.mnes_arr = [];
    }

    changePurse(type) {
        this.purse = type;
    }

    getMnes(mne) {
        console.log(mne)
    }

    @action async autoAdd(type) {
        // await this.changePurse(type);
    }

}   