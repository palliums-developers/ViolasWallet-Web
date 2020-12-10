/**
 *   1, 30, 28, 18, 24, 19, 13, 24, 31, 30,
    19, 28, 13,  2, 14, 11,  7,  9,  8, 31,
    23,  6, 26, 14,  6, 19, 15,  7, 22,  8,
    16, 20, 11, 27, 26, 27,  2, 21, 28, 16
 */

const { encode, decode } = require("./index");

let example = {
  prefix: "lbr",
  type: 1,
  address: "0xf72589b71ff4f8d139674a3f7369c69b",
  sub_address1: "0xcf64428bdeb62af2",
  sub_address2: "0x0000000000000000",
  checksum: "w5p72t",
  result1: "lbr1p7ujcndcl7nudzwt8fglhx6wxn08kgs5tm6mz4usw5p72t",
  result2: "lbr1p7ujcndcl7nudzwt8fglhx6wxnvqqqqqqqqqqqqqflf8ma",
};

let encode1 = encode(
  example.prefix,
  example.type,
  example.address,
  example.sub_address1
);
console.log(encode1, encode1 === example.result1);

let decode1 = decode(encode1);
console.log(decode1);

let encode2 = encode(
  example.prefix,
  example.type,
  example.address,
  example.sub_address2
);
console.log(encode2, encode2 === example.result2);

let decode2 = decode(encode2);
console.log(decode2);
