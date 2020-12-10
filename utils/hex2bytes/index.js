/**
 * byte型转换十六进制
 * @param b
 * @returns {string}
 * @constructor
 */
const Bytes2HexString = (b) => {
  let hexs = "";
  for (let i = 0; i < b.length; i++) {
    let hex = b[i].toString(16);
    if (hex.length === 1) {
      hexs = "0" + hex;
    }
    hexs += hex.toUpperCase();
  }
  return hexs;
};

/**
 * 十六进制转换btye型
 * @param str
 * @returns {Promise}
 */
const HexString2Byte = (str) => {
  str = check0X(str);
  let pos = 0;
  let len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  len /= 2;
  let hexA = new Array();
  for (let i = 0; i < len; i++) {
    let s = str.substr(pos, 2);
    let v = parseInt(s, 16);
    hexA.push(v);
    pos += 2;
  }
  return hexA;
};

// Convert a hex string to a byte array
const hexToBytes = (hex) => {
  hex = check0X(hex);
  let bytes=[]
  for (let c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
};

// Convert a byte array to a hex string
const bytesToHex = (bytes) => {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join("");
};

const check0X = (str) => {
  let prefix = str.slice(0, 2);
  let hex = str.slice(2);
  if (prefix === "0x" || prefix === "0X") {
    return hex;
  }
  return str;
};

module.exports = {
  bytes2hex: Bytes2HexString,
  hex2bytes: HexString2Byte,
  bytesToHex: bytesToHex,
  hexToBytes: hexToBytes,
};
