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
        url: url1+'/returnOrderBook?base='+params.base+'&quote='+params.quote,
        method: 'get',
    });
}

export let selfCurDeal = (params) =>{
    return request({
        url: url1+'/returnOrders?user=0xb95b427af584a781a7240122c9d2582720e28174d276094429fa1aa356bc2d5d&base=0x352ba42b3a2fb66bff15f08ea691b5b87eff0fe6a69b79cda364c4cdf787a0a2&quote=0x0f7100fcf2d114ef199575f0651620001d210718c680fbe7568c72d6e0160731',
        method: 'get',
    });
}
