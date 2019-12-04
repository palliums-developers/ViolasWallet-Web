import request from '../utils/request';
let url2 = 'http://52.27.228.84:4000'
let url1 = 'http://192.168.1.253:8181';
let url = 'http://192.168.1.111:10088';
//稳定币交易
export let stableCurTranfer = (params) =>{
    return request({
        url: url+'/returnTicker',
        method: 'get',
    });
}
//交易记录
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
        url: url + '/prices',
        method: 'get',
    });
}
export let selfCurDeal = (params) =>{
    return request({
        url: url+'/orders?user=0x8e8f033830c60602ef491d0f850094d72d483e602c9a5df845eac7efc3387a38',
        method: 'get',
    });
}
