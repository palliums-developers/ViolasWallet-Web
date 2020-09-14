import code_data from './code.json';

let string2Byte = (str) => {
    // var bytes = new Array();
    var bytes = [];
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
        if (tmp.length === 1) {
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
    decimal = parseInt(decimal)
    return decimal.toString(16);
}

let int2Byte = (int) => {
    let b = int & 0xFF;
    let c = 0;
    if (b >= 128) {
        c = b % 128;
        c = -1 * (128 - c);
    } else {
        c = b;
    }
    return (c)
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

let getViolasTyArgs = (_module, _name) => {
    // let address = '00000000000000000000000000000001';
    let address = code_data.btc.violas_module_address;
    let prefix = '07';
    let suffix = '00';
    let _module_length = _module.length;
    if (_module_length < 10) {
        _module_length = '0' + _module_length;
    }
    let _module_hex = bytes2StrHex(string2Byte(_module));
    let name_length = _name.length;
    if (name_length < 10) {
        name_length = '0' + name_length;
    }
    let _name_hex = bytes2StrHex(string2Byte(_name));
    let result = prefix + address + _module_length + _module_hex + name_length + _name_hex + suffix;
    return result;
}
let getLibraTyArgs = (_module, _name) => {
    // let address = '00000000000000000000000000000001';
    let address = code_data.btc.libra_module_address;
    let result = {
        'module': _module,
        'address': address,
        'name': _name
    }
    return result;
}
let fullWith16 = (temp) => {
    temp = '' + temp;
    let temp_length = temp.length;
    if (temp_length < 16) {
        let zero = '';
        for (let i = 0; i < 16 - temp_length; i++) {
            zero += '0';
        }
        temp = zero + temp;
    }
    return temp
}

let getBitcoinScript = (_type, _payee_address, _amount) => {
    let op_return_head = '6a';
    let data_length = '3c';
    let mark = code_data.btc.violas_mark;
    let version = code_data.btc.version;
    let type = _type;
    for (let key in code_data.btc.type.start) {
        if (key === _type) {
            type = code_data.btc.type.start[key];
            break;
        }
    }
    let payee_address = _payee_address;
    let sequence = fullWith16(getTimestamp);
    console.log('sequence ', sequence)
    let module_address = code_data.btc.violas_module_address;
    let amount = fullWith16(decimal2Hex(_amount));
    let time = '0000';
    return op_return_head + data_length + mark + version + type + payee_address + sequence + module_address + amount + time;
}

let getLibraScript = (_flag, _type, _type_list, _address, _amount) => {
    let flag = _flag;
    let type = _type;
    if (_type_list.length > 0) {
        for (let key in _type_list) {
            if (key === _type) {
                type = _type_list[key];
                break;
            }
        }
    }
    // console.log(_type)
    let to_address = _address;
    let result = {
        flag: flag,
        type: type,
        times: 0,
        to_address: to_address,
        out_amount: _amount,
        state: 'start'
    }
    console.log('script ', result)
    return bytes2StrHex(string2Byte(JSON.stringify(result)));
}

let getMapScript = (_flag, _type, _to_address) => {
    let result = {
        flag: _flag,
        type: _type,
        to_address: _to_address,
        state: 'start',
        times: 1
    }
    console.log('script ', result)
    return bytes2StrHex(string2Byte(JSON.stringify(result)));
}

export {
    string2Byte,
    bytes2StrHex,
    timestamp2time,
    getTimestamp,
    decimal2Hex,
    int2Byte,
    getLibraTyArgs,
    getViolasTyArgs,
    fullWith16,
    getBitcoinScript,
    getLibraScript,
    getMapScript
}