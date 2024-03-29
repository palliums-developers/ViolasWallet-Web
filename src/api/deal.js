import request from '../utils/request';
// let url = 'http://47.52.66.26:10088/v1';
// let url2 = 'http://52.27.228.84:4000';
let url ='https://dex.violas.io/v1';
let url2='https://api.violas.io'
// let url = 'http://18.220.66.235:38181';

//稳定币交易
export let stableCurTranfer = (params) =>{
    return request({
        url: url+'/returnTicker',
        method: 'get',
    });
}
//价格
export let getCoinPrice = (params) => {
    return request({
        url: url + '/price?give=' + params.give + '&get=' + params.get,
        method: 'get',
    });
}
//卖出的
export let stableCurDeal = (params) =>{
    return request({
        url: url+'/orderbook?base='+params.base+'&quote='+params.quote,
        method: 'get',
    });
}
//获取violas币种信息
export let getCurCoinMess = () => {
    return request({
        url: url2 + '/1.0/violas/currency',
        method: 'get',
    });
}
//获取币种信息
export let getOtherCoinMess = () => {
    return request({
        url: url + '/tokens',
        method: 'get',
    });
}
//订单
export let selfCurDeal = (params) =>{
    return request({
        url: url+'/orders?user='+params.user,
        method: 'get',
    });
}
//订单查询记录
export let getVersion = (params) => {
    return request({
        url: url + '/trades?version='+params.version ,
        method: 'get',
    });
}
