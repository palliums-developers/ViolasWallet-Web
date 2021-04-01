import code_data from './code.json';
import { getViolasTyArgs } from './trans'

let code_data_version=code_data.bank.v0_33_0

let digitalBank = (operation, coinType, amount, violas_address, token_address, chainId) => {
    let bank_code = ''
    switch (operation) {
        case 'lock':
            bank_code = code_data_version.lock;
            break;
        case 'redeem':
            bank_code = code_data_version.redeem;
            break;
        case 'borrow':
            bank_code = code_data_version.borrow;
            break;
        case 'repay':
            bank_code = code_data_version.repay;
            break;
        default:
            break;
    }
    const tx = {
        from: violas_address,
        payload: {
            code: bank_code,
            tyArgs: [
                getViolasTyArgs(coinType, coinType,token_address)
            ],
            args: [
                {
                    type: 'U64',
                    value: '' + amount
                },
                {
                    type: 'Vector',
                    value: ''
                }
            ]
        },
        chainId: chainId
    }
    return tx;
}

let getProductId = (token_module, _list) => {
    let result = 0;
    for (let i in _list) {
        if (token_module === _list[i].token_module) {
            result = _list[i].id
        }
    }
    return result
}

export { digitalBank, getProductId }