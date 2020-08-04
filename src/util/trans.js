
let string2Byte = (str) => {
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

let bytes2StrHex = (arrBytes) => {
    var str = "";
    for (var i = 0; i < arrBytes.length; i++) {
        var tmp;
        var num = arrBytes[i];
        if (num < 0) {
            //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
            tmp = (255 + num + 1).toString(16);
        } else {
            tmp = num.toString(16);
        }
        if (tmp.length == 1) {
            tmp = "0" + tmp;
        }
        if (i > 0) {
            str += tmp;
        } else {
            str += tmp;
        }
    }
    return str;
}

let decimal2Hex = (decimal) => {
    return decimal.toString(16);
}

// let getTimestamp = _ => {
//     return (new Date()).valueOf();  //精确到毫秒
// }
let getTimestamp = (new Date()).valueOf();  //精确到毫秒
// let getTimestamp = Date.parse(new Date());   //不精确到毫秒

let timestamp2time = (timestamp) => {
    let temp = '' + timestamp;
    if (temp.length < 13) {
        timestamp = timestamp * 1000;
    }
    let result = new Date(timestamp);
    return result
}
//07 000000001 module长度 moduleUTF8bytes name长度 nameUTF8bytes 00

export { string2Byte, bytes2StrHex, timestamp2time, getTimestamp, decimal2Hex }