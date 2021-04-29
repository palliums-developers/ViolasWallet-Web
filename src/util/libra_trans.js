import { getLibraTyArgs } from "./trans";
import code_data from "./code.json";

let code_data_version = code_data.libra.v0_8_0;

let getLibraTx = (
  _from,
  _to,
  _amount,
  _module,
  _name,
  _chainId,
  _script = ""
) => {
  let tx = {
    from: _from,
    payload: {
      code: code_data_version.p2p,
      tyArgs: [getLibraTyArgs(_module, _name)],
      args: [
        {
          type: "Address",
          value: _to,
        },
        {
          type: "U64",
          value: "" + _amount,
        },
        {
          type: "Vector",
          value: _script,
        },
        {
          type: "Vector",
          value: "",
        },
      ],
    },
    maxGasAmount: 400000,
    gasUnitPrice: 1,
    chainId: _chainId,
  };
  return tx;
};

let getLibraPub = (_from, _module, _name, _chainId) => {
  let tx = {
    from: _from,
    payload: {
      code: code_data_version.publish,
      tyArgs: [getLibraTyArgs(_module, _name)],
      args: [],
    },
    maxGasAmount: 400000,
    gasUnitPrice: 1,
    chainId: _chainId,
  };
  return tx;
};
export { getLibraTx, getLibraPub };
