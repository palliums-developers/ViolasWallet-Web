import code_data from './code.json';
import { getViolasTyArgs } from './trans'

let digitalBank = (operation, coinType, amount, violas_address, token_address, chainId) => {
    let bank_code = ''
    switch (operation) {
        case 'lock':
            bank_code = code_data.bank.lock;
            break;
        case 'redeem':
            bank_code = code_data.bank.redeem;
            break;
        case 'borrow':
            bank_code = code_data.bank.borrow;
            break;
        case 'repay':
            bank_code = code_data.bank.repay;
            break;
        default:
            break;
    }
    const tx = {
        from: violas_address,
        payload: {
            code: bank_code,
            tyArgs: [
                getViolasTyArgs(coinType, coinType, token_address)
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

let getProductId = (token_module, product_list) => {
    let result = 0;
    for (let i in product_list) {
        if (token_module === product_list[i].token_module) {
            result = product_list[i].id
        }
    }
    return result
}

export { digitalBank, getProductId }