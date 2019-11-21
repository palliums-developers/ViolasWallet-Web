let violas = require("kulap-libra-violas/build/index");
let vClient = violas.LibraClient;
let vWallet = violas.LibraWallet;
let vNetwork = violas.LibraNetwork;
let axios = require("axios");
let bip39 = require("bip39");
// let code_data = require("./code_data.json");

class vAccount {
    constructor(mne) {
        this.mne = this.getmne(mne);
        this.account = this.getaccount();
        this.address = this.getaddress();
        this.sequenceNum = this.getsequencenum();
    }
    getmne(mne) {
        if (mne) {
            return mne;
        } else {
            return this.mne = bip39.generateMnemonic();
        }
    }
    getaccount() {
        const _wallet = new vWallet({ mnemonic: this.mne });
        const account = _wallet.newAccount();
        return account;
    }
    getaddress() {
        return this.account.getAddress().toHex();
    }
    async getsequencenum() {
        return await axios.get("http://52.27.228.84:4000/1.0/violas/seqnum?addr=" + this.address).then(res => { return res.data.data })
    }
    async transaction(receiver_address, amount, coinType) {
        const _client = new vClient({ network: vNetwork.Testnet });
        const result = await _client.transferCoins(this.account, receiver_address, amount, await this.sequenceNum, coinType);
        const signTx = Buffer.from(result.array[4]).toString("hex");
        //   const signTx = buf2hex(result);
        console.log(signTx);
        return signTx;
    }
    async publish(coinType) {
        const _client = new vClient({ network: vNetwork.Testnet });
        let result = await _client.publish(this.account, coinType, await this.sequenceNum);
        const signpublish = Buffer.from(result.array[4]).toString("hex");
        console.log(signpublish);
        return signpublish
    }
    async transactionEX(receiver_address, amount, coinType) {
        const _client = new vClient({ network: vNetwork.Testnet });
        const data={
            "type": "sub_ex", 
            "addr": "0f7100fcf2d114ef199575f0651620001d210718c680fbe7568c72d6e0160731",
            "amount": 150, 
            "fee": 0, 
            "exp":
             10000000000
        }
        // let  data1;
        const result = await _client.transferEXCoins(this.account, receiver_address, amount, await this.sequenceNum, coinType,data);
        const signTx = Buffer.from(result.array[4]).toString("hex");
        //   const signTx = buf2hex(result);
        console.log(signTx);
        return signTx;
    }
}
export default vAccount;
// const new_base64=(_mv,_token)=>{
//     let mv_hex=Buffer.from(_mv).toString("hex");
//     let new_hex=mv_hex.replace(code_data.default_token,_token);
//     let new_byte= new_hex.match(/.{1,2}/g).map(x=>parseInt(x,16));
//     return Buffer.from(new_byte).toString("base64");
// }

// let violas1 = new vAccount("display paddle crush crowd often friend topple agent entry use host begin");
// //address   b45d3e7e8079eb16cd7111b676f0c32294135e4190261240e3fd7b96fe1b9b89
// let violas2 = new vAccount("valid cactus long reform forget mouse blanket era swear call poem table");
// //address   d46b830174f84b892f2a5517b5d35eefe0a5fd676d58e79a0a977e1797a17f16
// violas1.transaction("d46b830174f84b892f2a5517b5d35eefe0a5fd676d58e79a0a977e1797a17f16", 10, "violas"); //http://52.27.228.84:4000/1.0/violas/transaction
// violas1.publish("S001");

// let new_code=new_base64(code_data.transfer_with_data_mv,code_data.S002);
// console.log(new_code);