import { getViolasTyArgs } from './trans';
import code_data from './code.json';

let getViolasTx = (_from, _to, _amount, _module, _name, _chainId, _script) => {
    let tx = {
        from: _from,
        payload: {
            code: code_data.violas.p2p,
            tyArgs: [
                getViolasTyArgs(_module, _name)
            ],
            args: [
                {
                    type: 'Address',
                    value: _to
                },
                {
                    type: 'U64',
                    value: '' + _amount
                },
                {
                    type: 'Vector',
                    value: _script
                },
                {
                    type: 'Vector',
                    value: ''
                }
            ]
        },
        chainId: _chainId
    }
    return tx;
}
export { getViolasTx };