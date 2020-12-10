// let bech32 = require("bech32");
let bech32 = require("./test2");
let {
  hex2bytes,
  hexToBytes,
  bytes2hex,
  bytesToHex,
} = require("./utils/hex2bytes");

let example = {
  address: "0xf72589b71ff4f8d139674a3f7369c69b",
  sub_address: "0xcf64428bdeb62af2",
  sub_address2: "0x0000000000000000",
  checksum: "w5p72t",
  result: "lbr1p7ujcndcl7nudzwt8fglhx6wxn08kgs5tm6mz4usw5p72t",
  result1: "7ujcndcl7nudzwt8fglhx6wxn",
  result2: "08kgs5tm6mz4us",
};

let prefix = "lbr";
let hex_address = "0xf72589b71ff4f8d139674a3f7369c69b";
let hex_sub_address = "0xcf64428bdeb62af2";

let byte_address1 = hex2bytes(hex_address);
let byte_sub_address1 = hex2bytes(hex_sub_address);
let payload1 = byte_address1.concat(byte_sub_address1);
// console.log(payload1, payload1.length);

/**
 * 0xcf64428bdeb62af2
 */
let byte_address2 = hexToBytes(hex_address);
let byte_sub_address2 = hexToBytes(hex_sub_address);
let payload2 = byte_address2.concat(byte_sub_address2);
let buffer_payload2 = Buffer.from(payload2, "utf8");
console.log(buffer_payload2);
let bech_payload2 = bech32.toWords(buffer_payload2);
console.log(bech_payload2, bech_payload2.length);
console.log(bytes2hex(bech_payload2));
let encode_payload2 = bech32.encode("lbr", bech_payload2);
console.log(encode_payload2, "encode payload2");
let decode_payload2 = bech32.decode(encode_payload2);
console.log(decode_payload2, "decode payload2");
//right:
//lbr1p7ujcndcl7nudzwt8fglhx6wxn08kgs5tm6mz4usw5p72t
//trying:
//lbr1p7ujcndcl7nudzwt8fglhx6wxn08kgs5tm6mz4usw49pvd

// let byte_sub_address3 = hex2bytes(example.sub_address2);
// console.log(byte_sub_address3);
// let payload3 = byte_address1.concat(byte_sub_address3);
// console.log(payload3);
// let buffer_payload3 = Buffer.from(payload3, "utf8");
// console.log(buffer_payload3);
// let bech_payload3 = bech32.toWords(buffer_payload3);
// console.log(bech_payload3);
// let encode_payload3 = bech32.encode(prefix, bech_payload3);
// console.log(encode_payload3);
//right:
//lbr1p7ujcndcl7nudzwt8fglhx6wxnvqqqqqqqqqqqqqflf8ma
//trying:
//lbr1p7ujcndcl7nudzwt8fglhx6wxnvqqqqqqqqqqqqqf7dcam

let decode_result = bech32.decode(
  "lbr1p7ujcndcl7nudzwt8fglhx6wxn08kgs5tm6mz4usw5p72t"
);
console.log(decode_result, "result");
console.log(bytes2hex(decode_result.words));

// let decode_example = bech32.decode(
//   "abcdef1pqpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw"
// );
// console.log(decode_example);
