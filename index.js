var CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
var GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
/**
 *
 * @param {} str
 * those part switch hex between bytes
 */
const check0X = (str) => {
  let prefix = str.slice(0, 2);
  let hex = str.slice(2);
  if (prefix === "0x" || prefix === "0X") {
    return hex;
  }
  return str;
};

const hexToBytes = (hex) => {
  hex = check0X(hex);
  let bytes = [];
  for (let c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
};

const bytesToHex = (bytes) => {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join("");
};
/**
 * those part calculate encode and decode code
 * @param {*} values
 */
const polymod = (values) => {
  var chk = 1;
  for (var p = 0; p < values.length; ++p) {
    var top = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ values[p];
    for (var i = 0; i < 5; ++i) {
      if ((top >> i) & 1) {
        chk ^= GENERATOR[i];
      }
    }
  }
  return chk;
};

const hrpExpand = (hrp) => {
  var ret = [];
  var p;
  for (p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) >> 5);
  }
  ret.push(0);
  for (p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) & 31);
  }
  return ret;
};

const verifyChecksum = (hrp, data) => {
  return polymod(hrpExpand(hrp).concat(data)) === 1;
};

const createChecksum = (hrp, data) => {
  var values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  var mod = polymod(values) ^ 1;
  var ret = [];
  for (var p = 0; p < 6; ++p) {
    ret.push((mod >> (5 * (5 - p))) & 31);
  }
  return ret;
};

const encode = (hrp, data) => {
  var combined = data.concat(createChecksum(hrp, data));
  var ret = hrp + "1";
  for (var p = 0; p < combined.length; ++p) {
    ret += CHARSET.charAt(combined[p]);
  }
  return ret;
};

const decode = (bechString) => {
  var p;
  var has_lower = false;
  var has_upper = false;
  for (p = 0; p < bechString.length; ++p) {
    if (bechString.charCodeAt(p) < 33 || bechString.charCodeAt(p) > 126) {
      return null;
    }
    if (bechString.charCodeAt(p) >= 97 && bechString.charCodeAt(p) <= 122) {
      has_lower = true;
    }
    if (bechString.charCodeAt(p) >= 65 && bechString.charCodeAt(p) <= 90) {
      has_upper = true;
    }
  }
  if (has_lower && has_upper) {
    return null;
  }
  bechString = bechString.toLowerCase();
  var pos = bechString.lastIndexOf("1");
  if (pos < 1 || pos + 7 > bechString.length || bechString.length > 90) {
    return null;
  }
  var hrp = bechString.substring(0, pos);
  var data = [];
  for (p = pos + 1; p < bechString.length; ++p) {
    var d = CHARSET.indexOf(bechString.charAt(p));
    if (d === -1) {
      return null;
    }
    data.push(d);
  }
  if (!verifyChecksum(hrp, data)) {
    return null;
  }
  return { hrp: hrp, data: data.slice(0, data.length - 6) };
};

/**
 * before encode and decode, we should switch 8 to 5
 * @param {*} data
 * @param {*} inBits
 * @param {*} outBits
 * @param {*} pad
 */
const convert = (data, inBits, outBits, pad) => {
  var value = 0;
  var bits = 0;
  var maxV = (1 << outBits) - 1;

  var result = [];
  for (var i = 0; i < data.length; ++i) {
    value = (value << inBits) | data[i];
    bits += inBits;

    while (bits >= outBits) {
      bits -= outBits;
      result.push((value >> bits) & maxV);
    }
  }
  if (pad) {
    if (bits > 0) {
      result.push((value << (outBits - bits)) & maxV);
    }
  } else {
    if (bits >= inBits) return "Excess padding";
    if ((value << (outBits - bits)) & maxV) return "Non-zero padding";
  }
  return result;
};
const toWords = (bytes) => {
  var res = convert(bytes, 8, 5, true);
  if (Array.isArray(res)) return res;

  throw new Error(res);
};

/**
 * combine transfer hex to byte, toWord and encode
 * @param {*} prefix
 * @param {*} type
 * @param {*} hex_address
 * @param {*} hex_sub_address
 */
const start_encode = (prefix, type, hex_address, hex_sub_address) => {
  let temp_type = [type];
  let byte_address = hexToBytes(hex_address);
  let byte_sub_address = hexToBytes(hex_sub_address);
  let payload = temp_type.concat(
    toWords(byte_address.concat(byte_sub_address))
  );
  let result = encode(prefix, payload);
  return result;
};
/**
 * combine decode and return hex address
 */
const start_decode = (_encode) => {
  let temp_decode = decode(_encode);
  if (temp_decode === null) return null;
  let temp_toWords = temp_decode.data.splice(1);
  let temp_bytes = convert(temp_toWords, 5, 8, false);
  let byte_address = temp_bytes.splice(0, 16);
  let byte_sub_address = temp_bytes;
  let hex_address = bytesToHex(byte_address);
  let hex_sub_address = bytesToHex(byte_sub_address);
  let result = {
    prefix: temp_decode.hrp,
    type: temp_decode.data[0],
    address: "0x" + hex_address,
    sub_address: "0x" + hex_sub_address,
  };
  return result;
};

module.exports = {
  decode: start_decode,
  encode: start_encode,
};
