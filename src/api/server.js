import request from '../utils/request';
let url = 'http://52.27.228.84:4000';
let url1 = 'https://tchain.api.btc.com/v3/';
let url2 = 'http://192.168.1.111:10087/';
let url3 = 'http://192.168.1.111:30001/';
//新用户创建提交信息
export let createUserInfo = (params) => {
    return request({
        url: url + '/1.0/wallet',
        method: 'post',
        params: params
    });
}


//获取余额信息
export let getCurBalance = (params) => {
    if (params.name == 'violas') {
        if (params.modu) {
            return request({
                url: url + '/1.0/' + params.name + '/balance?addr=' + params.address + '&modu=' + params.modu,
                method: 'get',
            });
        } else {
            return request({
                url: url + '/1.0/' + params.name + '/balance?addr=' + params.address,
                method: 'get',
            });
        }

    } else if (params.name == 'libra') {
        return request({
            url: url + '/1.0/' + params.name + '/balance?addr=' + params.address,
            method: 'get',
        });
    } else if (params.name == 'BTC') {
        return request({
            url: url3 + 'open/1.0/search_address?net=testnet&address=' + params.address + '&page=' + params.page,
            method: 'get',
        });
    }

}

//发起libra转账
export let startCurLTranfer = (params) => {
    return request({
        url: url + '/1.0/libra/transaction',
        method: 'post',
        params: params
    });
}
//获取violas币种信息
export let getCurCoinMess = () => {
    return request({
        url: url + '/1.0/violas/currency',
        method: 'get',
    });
}
//添加币种
export let curAddCurrency = () => {
    return request({
        url: url + '/1.0/wallet/currency',
        method: 'put',
    });
}

//获取libra交易记录
export let getLibraDealRecord = (params) => {
    console.log(params, '..........')
    return request({
        url: url2 + '/1.0/libra/transaction?addr=' + params.addr + '&limit=' + params.limit + '&offset=' + params.offset,
        method: 'get',
    });
}

//获取violas交易记录
export let getViolasDealRecord = (params) => {
    return request({
        url: url + '/1.0/violas/transaction?addr=' + params.addr + '&limit=' + params.limit + '&offset=' + params.offset,
        method: 'get',
    });
}
//获取btc交易记录
export let getBTCDealRecord = (params) => {
    return request({
        url: url2 + 'ttransaction?address=' + params.address + '&page=' + params.page,
        method: 'get',
    });
}
//获取地址簿
export let getCurUserInfo = () => {
    return request({
        url: url + '/1.0/contacts',
        method: 'get'
    });
}
//添加地址信息
export let addressMessage = (params) => {
    return request({
        url: url + '/1.0/contacts',
        method: 'post',
        params: params
    });
}
//检测稳定币状态
export let checkNewCoin = (params) => {
    return request({
        url: url + '/1.0/violas/module?addr=' + params.addr + '&modu=' + params.modu,
        method: 'get'
    });
}
export let updateCoin = (params) => {
    return request({
        url: url + '/1.0/violas/module?addr=' + params.addr,
        method: 'get'
    });
}
//查询稳定币交易记录
export let get_stable_coin_list = (params) => {
    return request({
        url: url + '/1.0/violas/transaction?addr=' + params.addr + '&modu=' + params.modu,
        method: 'get'
    });
}