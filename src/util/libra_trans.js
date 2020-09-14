import { getLibraTyArgs } from './trans';
import code_data from './code.json';

let getLibraTx = (_from, _to, _amount, _module, _name, _chainId, _script) => {
    let tx = {
        from: _from,
        payload: {
            code: code_data.libra.p2p,
            tyArgs: [
                getLibraTyArgs(_module, _name)
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

let getLibraPub = (_from, _module, _name, _chainId) => {
    let tx = {
        from: _from,
        payload: {
            code: code_data.libra.publish,
            tyArgs: [
                getLibraTyArgs(_module, _name)
            ],
            args: []
        },
        chainId: _chainId
    }
    return tx;
}
export { getLibraTx, getLibraPub };