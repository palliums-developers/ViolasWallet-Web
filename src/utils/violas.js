// let violas = require("./kulap-libra-violas/build/index.js"); //test violas.js
let violas = require("kulap-libra-violas/build/index"); //wallet
let vClient = violas.LibraClient;
let vWallet = violas.LibraWallet;
let vNetwork = violas.LibraNetwork;
let axios = require("axios");
let bip39 = require("bip39");
let code_data = require("./code_data.json");
let _currencyToken = require("./currencyToken.json")
const _mne1 = "display paddle crush crowd often friend topple agent entry use host begin";
const _mne2 = "valid cactus long reform forget mouse blanket era swear call poem table";

class vAccount {
    constructor(mne) {
        this.mne = this.getmne(mne);
        this.account = this.getaccount();
        this.address = this.getaddress();
        this.sequenceNum_violas = this.getsequenceNum_violas();
        this.sequenceNum_libra = this.getsequenceNum_libra();
        // this.dexAddress = "b45d3e7e8079eb16cd7111b676f0c32294135e4190261240e3fd7b96fe1b9b89";
        this.dexAddress = "07e92f79c67fdd6b80ed9103636a49511363de8c873bc709966fffb2e3fcd095"
    }
    getmne(mne) {
        if (mne) {
            return mne;
        } else {
            return this.mne = bip39.generateMnemonic();
        }
    }
    getaccount() {
        const _wallet = new vWallet({
            mnemonic: this.mne
        });
        const account = _wallet.newAccount();
        return account;
    }
    getaddress() {
        return this.account.getAddress().toHex();
    }
    async getsequenceNum_violas() {
        return await axios.get("http://52.27.228.84:4000/1.0/violas/seqnum?addr=" + this.address).then(res => {
            return res.data.data
        })
    }
    async getsequenceNum_libra() {
        return await axios.get("http://52.27.228.84:4000/1.0/libra/seqnum?addr=" + this.address).then(res => {
            return res.data.data
        })
    }
    async transaction_libra(receiver_address, amount) {
        const _client = new vClient({
            network: vNetwork.Testnet
        });
        const result = await _client.transferCoins_libra(this.account, receiver_address, amount, await this.sequenceNum_libra, "libra");
        const signTx = Buffer.from(result.array[4]).toString("hex");
        // const signTx = buf2hex(result);
        // console.log(signTx);
        return signTx;
    }
    async transaction_violas(receiver_address, amount, coinType) {
        const _client = new vClient({
            network: vNetwork.Testnet
        });
        const result = await _client.transferCoins(this.account, receiver_address, amount, await this.sequenceNum_violas, coinType);
        const signTx = Buffer.from(result.array[4]).toString("hex");
        // const signTx = buf2hex(result);
        // console.log(signTx);
        return signTx;
    }
    async publish(coinType) {
        const _client = new vClient({
            network: vNetwork.Testnet
        });
        let result = await _client.publish(this.account, coinType, await this.sequenceNum_violas);
        const signpublish = Buffer.from(result.array[4]).toString("hex");
        // console.log(signpublish);
        return signpublish
    }
    async transactionEX(myCoinType, myAmount, exCoinType, exAmount) {
        console.log(myCoinType, myAmount, exCoinType, exAmount)
        const _client = new vClient({
            network: vNetwork.Testnet
        });
        let token;
        let i = 0;
        for (i in _currencyToken.data) {
            if (exCoinType == _currencyToken.data[i].name) {
                token = _currencyToken.data[i].address
            }
        }
        const data = {
            "type": "sub_ex",
            "addr": token,
            "amount": exAmount,
            "fee": 0,
            "exp": 10000000000
        }
        // let data_string = null;
        let data_string = stringToByte(JSON.stringify(data));
        // console.log(data_string)
        const result = await _client.transferEXCoins(this.account, this.dexAddress, myAmount, await this.sequenceNum_violas, myCoinType, data_string);
        const signTx = Buffer.from(result.array[4]).toString("hex");
        //   const signTx = buf2hex(result);
        // console.log(signTx);
        return signTx;
    }
    async transactionEXWithdraw(myCoinType, version) {
        const _client = new vClient({
            network: vNetwork.Testnet
        });
        const data = {
            "type": "wd_ex",
            "ver": version
        }
        let data1 = stringToByte(JSON.stringify(data));
        const result = await _client.transferEXCoins(this.account, this.dexAddress, 0, await this.sequenceNum_violas, myCoinType, data1);
        const signTx = Buffer.from(result.array[4]).toString("hex");
        // console.log(signTx);
        return signTx;
    }
}

const new_base64 = (_mv, _token) => {
    let mv_hex = Buffer.from(_mv).toString("hex");
    let new_hex = mv_hex.replace(code_data.default_token, _token);
    let new_byte = new_hex.match(/.{1,2}/g).map(x => parseInt(x, 16));
    return Buffer.from(new_byte).toString("base64");
}
const stringToByte = (str) => {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}
export default vAccount;

// console.log(code_data.transfer==code_data.transfer2);
// let violastrans=new_base64(code_data.transfer2,code_data.default_token);
// console.log(violastrans);
// let violas1 = new vAccount(_mne1);  //address   b45d3e7e8079eb16cd7111b676f0c32294135e4190261240e3fd7b96fe1b9b89
// let violas2 = new vAccount(_mne2); //address   d46b830174f84b892f2a5517b5d35eefe0a5fd676d58e79a0a977e1797a17f16
// violas1.transaction_libra("d46b830174f84b892f2a5517b5d35eefe0a5fd676d58e79a0a977e1797a17f16", 10); //http://52.27.228.84:4000/1.0/violas/transaction
// violas1.transaction_violas("07e92f79c67fdd6b80ed9103636a49511363de8c873bc709966fffb2e3fcd095", 10, "violas"); //http://52.27.228.84:4000/1.0/violas/transaction
// violas1.transaction_violas("d46b830174f84b892f2a5517b5d35eefe0a5fd676d58e79a0a977e1797a17f16", 20, "HIJUSD"); //http://52.27.228.84:4000/1.0/violas/transaction
// violas1.transactionEX("ABCUSD",20, "HIJUSD",20); //http://52.27.228.84:4000/1.0/violas/transaction
// violas1.transactionEXWithdraw("ABCUSD",76444);
// violas1.publish("HIJUSD");
// let new_code=new_base64(code_data.transfer_with_data_mv,code_data.S002);
// console.log(new_code);

/**
 * salt file: build/constants/HashSaltValues.js
 */