const bitcoin = require("bitcoinjs-lib");
const testnet = bitcoin.networks.testnet;
const mainnet = bitcoin.networks.bitcoin;
const regtest = bitcoin.networks.regtest;
const bip39 = require("bip39");
const bip32 = require("bip32");
const mne1 = "sport chicken goat abandon actual extra essay build maid garbage ahead aim";
const mne2 = "various phone robot indicate cluster draw effort other sea become brother puppy";
const path = "m/44'/0'/0'/0/0";
const axios = require("axios");
const fee = 10;
const pushurl="https://tchain.api.btc.com/v3/tools/tx-publish"

class Account {
    constructor(_mne, _net) {
        this.mne = _mne;
        this.net = _net;
        this.root = this.getroot();
        this.wif = this.getwif();
        this.wallet=this.getwallet();
        this.p2pkh = this.getp2pkh();
        this.address = this.getaddress();
    }
    getroot() {
        return bip32.fromSeed(bip39.mnemonicToSeedSync(this.mne),this.net);
    }
    getwif() {
        return this.root.derivePath(path).toWIF();
    }
    getwallet(){
        // console.log(this.wif,this.net)
        return bitcoin.ECPair.fromWIF(this.wif,this.net);
    }
    getp2pkh() {
        return bitcoin.payments.p2pkh({ pubkey: this.root.derivePath(path).publicKey, network: this.net });
    }
    getaddress() {
        return this.p2pkh.address;
    }
    async get_utxo(_satoshi) {
        let total_count = 11;
        let total_utxo_list = [];
        let page = 1;
        do {
            await axios.get("https://tchain.api.btc.com/v3/address/" + this.address + "/unspent?page=" + page + "&pagesize=50")
            .then(res => {
                // console.log(res);
                    total_count = res.data.data.total_count;
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        if (!(_satoshi < 0)) {
                            total_utxo_list.push(res.data.data.list[i]);
                            _satoshi -= res.data.data.list[i].value;
                        }
                    }
                });
            page++;
        } while (Math.ceil(total_count / 50) > 1 && page <= Math.ceil(total_count / 50) && !(_satoshi < 0));
        if (_satoshi > 0) {
            console.log("not enough");
            return null;
        }
        // console.log(total_utxo_list);
        return (total_utxo_list);
    }
    async transaction(_address, _amount, _fee) {
        // console.log(this.net);
        let i=0;
        let txb = new bitcoin.TransactionBuilder(this.net);
        let total_amount = _amount + _fee;
        let utxo = await this.get_utxo(_amount + _fee);
        if (utxo == null) {
            return null;
        } else {
            for (i = 0; i < utxo.length; i++) {
                txb.addInput(utxo[i].tx_hash, utxo[i].tx_output_n);
                total_amount -= utxo[i].value;
            }
        }
        txb.addOutput(this.address, (total_amount * -1));
        txb.addOutput(_address, _amount);
        // let keypairTransaction = bitcoin.ECPair.fromWIF(this.wif, this.net);
        for(let j=0;j<i;j++){
            txb.sign(j, this.wallet);
        }
        let tx = txb.build();
        let txhex = tx.toHex();
        // console.log(txhex);
        return txhex;
    }
    async transaction_psbt(_address,_amount,_fee){
        const psbt=new bitcoin.Psbt();
        psbt.setVersion(2);
        psbt.setLocktime(0);
    }
    async push_tx(_address, _amount, _fee){
        let txhex=await this.transaction(_address, _amount, _fee);
        console.log(txhex);
        await axios.post(
            pushurl,
            {
                rawhex: txhex
            }
        ).then(res=>console.log(res.data));
    }
}
export default Account;
// console.log(testnet,'testnet'); //239
// console.log(mainnet,'mainnet'); //128
// console.log(regtest,'regtest'); //239

// let account1 = new Account(mne1, testnet);
// console.log(account1.address); //mjBLq9T4QBniBbu3NQVMBkg3EYo5Y9q3nK
// let account2 = new Account(mne2, testnet);
// console.log(account2.address); //mvtpqcCP7s5b16jpf55YEvGmXRDm3LaLuW

// let wif1=account1.wif;
// let wif2=account2.wif;
// console.log(wif1);
// console.log(wif2);

// let wif_test='L48V5rKnzw92FgRBf52FPGxtL5tWAuEprHXRDuRg5z4LDr38rTBr';
// let wallet=bitcoin.ECPair.fromWIF(wif_test,testnet);

// account1.transaction("mvtpqcCP7s5b16jpf55YEvGmXRDm3LaLuW", 10, fee);
// account1.push_tx("mvtpqcCP7s5b16jpf55YEvGmXRDm3LaLuW", 10, fee);
// account1.transaction("1GNsYZ7QJqeLDzGCwW7AR14SfRd4BBRBtK", 20000, fee);
// account2.transaction("mjBLq9T4QBniBbu3NQVMBkg3EYo5Y9q3nK", 20000, fee);
// account1.transaction_psbt();
// console.log(account1.p2pkh);

