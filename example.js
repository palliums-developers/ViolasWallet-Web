let bech32 = require('bech32')
 
let temp1=bech32.decode('abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw')
// => {
// 	 prefix: 'abcdef',
// 	 words: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
// }
console.log(temp1) 
let words = bech32.toWords(Buffer.from('foobar', 'utf8'))
let temp2=bech32.encode('foo', words)
// => 'foo1vehk7cnpwgry9h96'
console.log(words,temp2)
let temp3=bech32.decode('lbr1p7ujcndcl7nudzwt8fglhx6wxn08kgs5tm6mz4usw5p72t')
console.log(temp3)
