import request from '../utils/request'
let url = 'http://47.106.208.207:4000/api'

export let getCurUserInfo = () => {
    return request.get(url+'/1.0/wallet/currency');
}