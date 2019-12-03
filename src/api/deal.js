import request from '../utils/request';
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
        url: url+'/returnOrderBook?base='+params.base+'&quote='+params.quote,
        method: 'get',
    });
}

export let selfCurDeal = (params) =>{
    return request({
        url: url+'/returnOrders?user=0x8e8f033830c60602ef491d0f850094d72d483e602c9a5df845eac7efc3387a38',
        method: 'get',
    });
}
