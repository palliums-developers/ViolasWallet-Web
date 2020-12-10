let bech = require("./index");
let {
  hex2bytes,
  hexToBytes,
  bytes2hex,
  bytesToHex,
} = require("./utils/hex2bytes");
let example = {
  prefix: "lbr",
  address: "0xf72589b71ff4f8d139674a3f7369c69b",
  sub_address: "0xcf64428bdeb62af2",
  sub_address2: "0x0000000000000000",
  checksum: "w5p72t",
  result: "lbr1p7ujcndcl7nudzwt8fglhx6wxn08kgs5tm6mz4usw5p72t",
  result1: "7ujcndcl7nudzwt8fglhx6wxn",
  result2: "08kgs5tm6mz4us",
};
function convert(data, inBits, outBits, pad) {
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
}
function toWords(bytes) {
  var res = convert(bytes, 8, 5, true);
  if (Array.isArray(res)) return res;

  throw new Error(res);
}
let byte_address1 = hex2bytes(example.address);
console.log(byte_address1);
let byte_sub_address1 = hex2bytes(example.sub_address);
let payload1 = byte_address1.concat(byte_sub_address1);

let words1 = toWords(payload1);
console.log(words1, "word1", words1.length);
let encode = bech.encode(example.prefix, words1, [1]);
console.log(encode === "lbr1p7ujcndcl7nudzwt8fglhx6wxn08kgs5tm6mz4usw5p72t");

let decode = bech.decode(encode);
console.log(decode);
