// let violas = require("kulap-libra-violas/build/index");
let violas = require("kulap-libra-violas/build/index");
let vClient = violas.LibraClient;
let vWallet = violas.LibraWallet;
let vNetwork = violas.LibraNetwork;
let axios = require("axios");
let bip39 = require("bip39");
let code_data = require("./code_data.json");

class vAccount {
    constructor(mne) {
        this.mne = this.getmne(mne);
        this.account = this.getaccount();
        this.address = this.getaddress();
        this.sequenceNum_violas = this.getsequenceNum_violas();
        this.sequenceNum_libra = this.getsequenceNum_libra();
        this.exaddress = "b45d3e7e8079eb16cd7111b676f0c32294135e4190261240e3fd7b96fe1b9b89";
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
    async transaction_libra(receiver_address, amount){
        const _client1 = new vClient({
            network: vNetwork.Testnet
        });
        const result = await _client1.transferCoins_libra(this.account, receiver_address, amount, await this.sequenceNum_libra, "libra");
        const signTx = Buffer.from(result.array[4]).toString("hex");
        //   const signTx = buf2hex(result);
        return signTx;
    }
    async transaction(receiver_address, amount, coinType) {
        const _client = new vClient({
            network: vNetwork.Testnet
        });
        const result = await _client.transferCoins(this.account, receiver_address, amount, await this.sequenceNum_violas, coinType);
        const signTx = Buffer.from(result.array[4]).toString("hex");
        //   const signTx = buf2hex(result);
        console.log(signTx);
        return signTx;
    }
    async publish(coinType) {
        const _client = new vClient({
            network: vNetwork.Testnet
        });
        let result = await _client.publish(this.account, coinType, await this.sequenceNum_violas);
        const signpublish = Buffer.from(result.array[4]).toString("hex");
        console.log(signpublish);
        return signpublish
    }
    async transactionEX(myCoinType, amount, exCoinType, tokenamount) {
        const _client = new vClient({
            network: vNetwork.Testnet
        });
        let token;
        switch (exCoinType) {
            case "S001_dtoken":
                token = code_data.S001_dtoken;
                break;
            case "Vbtc_dtoken":
                token = code_data.Vbtc_dtoken;
                break;
            case "S001":
                token = code_data.S001;
                break;
            case "S002":
                token = code_data.S002;
                break;
        }
        const data = {
            "type": "sub_ex",
            "addr": token,
            "amount": tokenamount,
            "fee": 0,
            "exp": 10000000000
        }
        let data1 = stringToByte(JSON.stringify(data));
        const result = await _client.transferEXCoins(this.account, this.exaddress, amount, await this.sequenceNum_violas, myCoinType, data1);
        const signTx = Buffer.from(result.array[4]).toString("hex");
        //   const signTx = buf2hex(result);
        console.log(signTx);
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
// let violas1 = new vAccount("display paddle crush crowd often friend topple agent entry use host begin");
// //address   b45d3e7e8079eb16cd7111b676f0c32294135e4190261240e3fd7b96fe1b9b89
// let violas2 = new vAccount("valid cactus long reform forget mouse blanket era swear call poem table");
// //address   d46b830174f84b892f2a5517b5d35eefe0a5fd676d58e79a0a977e1797a17f16
// violas1.transaction_libra("d46b830174f84b892f2a5517b5d35eefe0a5fd676d58e79a0a977e1797a17f16", 10, "libra"); //http://52.27.228.84:4000/1.0/violas/transaction
// violas1.transaction("d46b830174f84b892f2a5517b5d35eefe0a5fd676d58e79a0a977e1797a17f16", 10, "violas"); //http://52.27.228.84:4000/1.0/violas/transaction
// violas1.transactionEX("S001_dtoken",20, "Vbtc_dtoken",120); //http://52.27.228.84:4000/1.0/violas/transaction
// violas1.publish("S001");

// let new_code=new_base64(code_data.transfer_with_data_mv,code_data.S002);
// console.log(new_code);