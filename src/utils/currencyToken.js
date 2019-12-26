const Axios = require("axios");
const btoa = require("btoa");
const atob = require("atob");
const fs = require('fs');
const file1 = './currencyToken.json';
const file2 = './kulap-libra-violas/currencyToken.json'
const v2_transfer = [76, 73, 66, 82, 65, 86, 77, 10, 1, 0, 7, 1, 74, 0, 0, 0, 4, 0, 0, 0, 3, 78, 0, 0, 0, 6, 0, 0, 0, 13, 84, 0, 0, 0, 6, 0, 0, 0, 14, 90, 0, 0, 0, 6, 0, 0, 0, 5, 96, 0, 0, 0, 28, 0, 0, 0, 4, 124, 0, 0, 0, 64, 0, 0, 0, 8, 188, 0, 0, 0, 15, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 3, 0, 2, 0, 2, 4, 2, 0, 3, 2, 4, 2, 3, 0, 6, 60, 83, 69, 76, 70, 62, 6, 68, 84, 111, 107, 101, 110, 4, 109, 97, 105, 110, 8, 116, 114, 97, 110, 115, 102, 101, 114, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114, 87, 194, 65, 126, 77, 16, 56, 225, 129, 124, 143, 40, 58, 206, 46, 16, 65, 179, 57, 108, 219, 176, 153, 235, 53, 123, 190, 224, 36, 214, 20, 0, 1, 0, 2, 0, 4, 0, 12, 0, 12, 1, 19, 1, 1, 2];
const v2_publish = [76, 73, 66, 82, 65, 86, 77, 10, 1, 0, 7, 1, 74, 0, 0, 0, 4, 0, 0, 0, 3, 78, 0, 0, 0, 6, 0, 0, 0, 13, 84, 0, 0, 0, 4, 0, 0, 0, 14, 88, 0, 0, 0, 2, 0, 0, 0, 5, 90, 0, 0, 0, 27, 0, 0, 0, 4, 117, 0, 0, 0, 64, 0, 0, 0, 8, 181, 0, 0, 0, 11, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 3, 0, 2, 0, 0, 0, 3, 0, 6, 60, 83, 69, 76, 70, 62, 6, 68, 84, 111, 107, 101, 110, 4, 109, 97, 105, 110, 7, 112, 117, 98, 108, 105, 115, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114, 87, 194, 65, 126, 77, 16, 56, 225, 129, 124, 143, 40, 58, 206, 46, 16, 65, 179, 57, 108, 219, 176, 153, 235, 53, 123, 190, 224, 36, 214, 20, 0, 1, 0, 1, 0, 2, 0, 19, 1, 0, 2];
const v2_transferWithData = [76, 73, 66, 82, 65, 86, 77, 10, 1, 0, 7, 1, 74, 0, 0, 0, 4, 0, 0, 0, 3, 78, 0, 0, 0, 6, 0, 0, 0, 13, 84, 0, 0, 0, 7, 0, 0, 0, 14, 91, 0, 0, 0, 7, 0, 0, 0, 5, 98, 0, 0, 0, 38, 0, 0, 0, 4, 136, 0, 0, 0, 64, 0, 0, 0, 8, 200, 0, 0, 0, 17, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 3, 0, 2, 0, 3, 4, 2, 8, 0, 3, 3, 4, 2, 8, 3, 0, 6, 60, 83, 69, 76, 70, 62, 6, 68, 84, 111, 107, 101, 110, 4, 109, 97, 105, 110, 18, 116, 114, 97, 110, 115, 102, 101, 114, 95, 119, 105, 116, 104, 95, 100, 97, 116, 97, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114, 87, 194, 65, 126, 77, 16, 56, 225, 129, 124, 143, 40, 58, 206, 46, 16, 65, 179, 57, 108, 219, 176, 153, 235, 53, 123, 190, 224, 36, 214, 20, 0, 1, 0, 3, 0, 5, 0, 12, 0, 12, 1, 12, 2, 19, 1, 1, 2];
const v3_transfer = [76, 73, 66, 82, 65, 86, 77, 10, 1, 0, 7, 1, 74, 0, 0, 0, 4, 0, 0, 0, 3, 78, 0, 0, 0, 6, 0, 0, 0, 13, 84, 0, 0, 0, 6, 0, 0, 0, 14, 90, 0, 0, 0, 6, 0, 0, 0, 5, 96, 0, 0, 0, 33, 0, 0, 0, 4, 129, 0, 0, 0, 64, 0, 0, 0, 8, 193, 0, 0, 0, 15, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 3, 0, 2, 0, 2, 4, 2, 0, 3, 2, 4, 2, 3, 0, 6, 60, 83, 69, 76, 70, 62, 11, 86, 105, 111, 108, 97, 115, 84, 111, 107, 101, 110, 4, 109, 97, 105, 110, 8, 116, 114, 97, 110, 115, 102, 101, 114, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114, 87, 194, 65, 126, 77, 16, 56, 225, 129, 124, 143, 40, 58, 206, 46, 16, 65, 179, 57, 108, 219, 176, 153, 235, 53, 123, 190, 224, 36, 214, 20, 0, 1, 0, 2, 0, 4, 0, 12, 0, 12, 1, 19, 1, 1, 2];
const v3_publish = [76, 73, 66, 82, 65, 86, 77, 10, 1, 0, 7, 1, 74, 0, 0, 0, 4, 0, 0, 0, 3, 78, 0, 0, 0, 6, 0, 0, 0, 13, 84, 0, 0, 0, 4, 0, 0, 0, 14, 88, 0, 0, 0, 2, 0, 0, 0, 5, 90, 0, 0, 0, 32, 0, 0, 0, 4, 122, 0, 0, 0, 64, 0, 0, 0, 8, 186, 0, 0, 0, 11, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 3, 0, 2, 0, 0, 0, 3, 0, 6, 60, 83, 69, 76, 70, 62, 11, 86, 105, 111, 108, 97, 115, 84, 111, 107, 101, 110, 4, 109, 97, 105, 110, 7, 112, 117, 98, 108, 105, 115, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114, 87, 194, 65, 126, 77, 16, 56, 225, 129, 124, 143, 40, 58, 206, 46, 16, 65, 179, 57, 108, 219, 176, 153, 235, 53, 123, 190, 224, 36, 214, 20, 0, 1, 0, 1, 0, 2, 0, 19, 1, 0, 2];
const v3_transferWithData = [76, 73, 66, 82, 65, 86, 77, 10, 1, 0, 7, 1, 74, 0, 0, 0, 4, 0, 0, 0, 3, 78, 0, 0, 0, 6, 0, 0, 0, 13, 84, 0, 0, 0, 7, 0, 0, 0, 14, 91, 0, 0, 0, 7, 0, 0, 0, 5, 98, 0, 0, 0, 43, 0, 0, 0, 4, 141, 0, 0, 0, 64, 0, 0, 0, 8, 205, 0, 0, 0, 17, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 3, 0, 2, 0, 3, 4, 2, 8, 0, 3, 3, 4, 2, 8, 3, 0, 6, 60, 83, 69, 76, 70, 62, 11, 86, 105, 111, 108, 97, 115, 84, 111, 107, 101, 110, 4, 109, 97, 105, 110, 18, 116, 114, 97, 110, 115, 102, 101, 114, 95, 119, 105, 116, 104, 95, 100, 97, 116, 97, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114, 87, 194, 65, 126, 77, 16, 56, 225, 129, 124, 143, 40, 58, 206, 46, 16, 65, 179, 57, 108, 219, 176, 153, 235, 53, 123, 190, 224, 36, 214, 20, 0, 1, 0, 3, 0, 5, 0, 12, 0, 12, 1, 12, 2, 19, 1, 1, 2];
const default_token = "7257c2417e4d1038e1817c8f283ace2e1041b3396cdbb099eb357bbee024d614";

const token = async () => {
    let currency = await Axios.get('http://52.27.228.84:4000/1.0/violas/currency').then(res => { return (res.data.data) });
    return currency;
}
const byte2base64 = _byte => {
    return Buffer.from(_byte).toString("base64");
}
const byte2hex = _byte => {
    return Buffer.from(_byte).toString("hex");
}
const string2base64 = async (string_token) => {
    return (btoa(string_token));
}
// console.log(string2base64('4c49425241564d0a010007014a00000004000000034e000000060000000d54000000060000000e5a0000000600000005600000001c000000047c0000004000000008bc0000000f00000000000101000200010300020002040200030204020300063c53454c463e0644546f6b656e046d61696e087472616e736665720000000000000000000000000000000000000000000000000000000000000000e90e4f077bef23b32a6694a18a1fa34244532400869e4e8c87ce66d0b6c004bd000100020004000c000c0113010102'))
const base642string = async (base64_token) => {
    return (atob(base64_token));
}
// string2base64("05599ef248e215849cc599f563b4883fc8aff31f1e43dff1e3ebe4de1370e054")
// base642string("SGVsbG8sIFdvcmxkIQ==")
// console.log(byte2base64(v2_transfer));
const final_code = async (_transfer,_transferWithData,_publish) => {
    let transfer_hex = byte2hex(_transfer);
    let transferWithData_hex = byte2hex(_transferWithData);
    let publish_hex = byte2hex(_publish);
    let token_address = await token();
    let _transfer_hex_arry = [];
    let _transfer_base64_arry = [];
    let _publish_hex_arry = [];
    let _publish_base64_arry = [];
    let _transferWithData_hex_arry = [];
    let _transferWithData_base64_arry = [];
    for (i in token_address) {
        _transfer_hex_arry.push(transfer_hex.replace(default_token, token_address[i].address));
        _transferWithData_hex_arry.push(transferWithData_hex.replace(default_token, token_address[i].address));
        _publish_hex_arry.push(publish_hex.replace(default_token, token_address[i].address));
    }
    for (i in _transfer_hex_arry) {
        _transfer_base64_arry.push(Buffer.from(_transfer_hex_arry[i], "hex").toString("base64"));
        _transferWithData_base64_arry.push(Buffer.from(_transferWithData_hex_arry[i], "hex").toString("base64"));
        _publish_base64_arry.push(Buffer.from(_publish_hex_arry[i], "hex").toString("base64"));
    }
    let result = { data: [] };
    // result.data.push({
    //     name: 'violas',
    //     description: 'vtoken',
    //     address: default_token,
    //     address_hex: byte2hex(v2_transfer),
    //     transfer_base64: byte2base64(v2_transfer),
    //     transferWithDate_base64: 'null',
    //     publish_base64: 'null'
    // })
    for (let i = 0; i < token_address.length; i++) {
        result.data.push({
            name: token_address[i].name,
            description: token_address[i].description,
            address: token_address[i].address,
            address_hex: _transfer_hex_arry[i],
            transfer_base64: _transfer_base64_arry[i],
            transferWithDate_base64: _transferWithData_base64_arry[i],
            publish_base64: _publish_base64_arry[i]
        })
    }
    // console.log(temp)
    // console.log(result)
    return result;
}
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
}
const writeToken = async (_transfer,_transferWithData,_publish) => {
    fs.writeFileSync(file1, JSON.stringify(await final_code(_transfer,_transferWithData,_publish)));
    fs.writeFileSync(file2, JSON.stringify(await final_code(_transfer,_transferWithData,_publish)));
}

writeToken(v3_transfer,v3_transferWithData,v3_publish);