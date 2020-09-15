import code_data from './code.json';
import { getViolasTyArgs } from './trans'

let digitalBank = (operation, coinType, amount, violas_address, chainId) => {
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
                getViolasTyArgs(coinType, coinType)
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

export { digitalBank }