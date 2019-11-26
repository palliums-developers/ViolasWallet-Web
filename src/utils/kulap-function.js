const {
  LibraWallet,
  LibraClient,
  Account,
  LibraNetwork
} = require("kulap-libra");
// const fs = require("fs");
// const inspect = require("util").inspect;
// const client=require('kulap-libra/build/client/index.js');


/**
 *
 * @param {mnemonic} enter_mnemonic
 */
const creat_account_mnemonic = enter_mnemonic => {
  const wallet = new LibraWallet({
    mnemonic: enter_mnemonic
  });
  const account = wallet.newAccount();
  return account;
};
var address_mnemonic = creat_account_mnemonic(
  "boy boring upgrade blue bicycle toy"
);
var address_mnemonic=creat_account_mnemonic('upgrade salt toy stable drop paddle');
// console.log(address_mnemonic.getAddress().toHex());
// console.log(address_mnemonic.keyPair);
// console.log(address_mnemonic.address);
// console.log(address_mnemonic);

const get_address = _account => {
  return _account.getAddress().toHex();
};
// let address=get_address(address_mnemonic)
// console.log(address);

/**
 *
 * @param {key} enter_key
 */
const creat_account_key = enter_key => {
  const account = Account.fromSecretKey(enter_key);
  return account;
};
var address_key=creat_account_key('pub-hex-secret-key-here violas');
// console.log(address_key.getAddress().toHex());
// console.log(address_key.keyPair);
// console.log(address_key.getAddress());

/**
 *
 * @param {mint} address
 */
const mint = async address => {
  const client = new LibraClient({ network: LibraNetwork.Testnet });
  // const account=wallet.newAccount();
  const result = await client.mintWithFaucetService(address, 20e6);
  console.log("address " + result);
};
// mint(address_key);
let state = async address_hex => {
  const client = new LibraClient({ network: LibraNetwork.Testnet });
  const accountState = await client.getAccountState(address_hex);
  return (accountState);
};
// state(address_mnemonic.getAddress().toHex());
/**
 *
 * @param {balance} address_hex
 */
const balance = async address_hex => {
  const client = new LibraClient({ network: LibraNetwork.Testnet });
  const accountState = await client.getAccountState(address_hex);
  // console.log(accountState.balance.toString());
  return accountState.balance.toString();
};
// balance(address_mnemonic.getAddress().toHex());
// balance(address_key.getAddress().toHex());

/**
 * transferring
 * @param {sender} account_from
 * @param {receiver} account_to_hex
 */
const transfer = async (account_from, account_to_hex, amount) => {
  const client = new LibraClient({ network: LibraNetwork.Testnet });
  const result = await client.transferCoins(
    account_from,
    account_to_hex,
    amount
  );
  // console.log(result);
  return result;
};


module.exports = {
  state,
  creat_account_mnemonic,
  balance,
  transfer,
  get_address
};
