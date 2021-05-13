const inside = {
  contractAddress: "0xc6aC75b3B3f6E48Ac1228a34C2732d1F0b9BF934",
  token_USDT: "0x6f08730dA8e7de49a4064d2217c6B68d7E61E727",
};

const outside = {
  contractAddress: "0x045B0Dc3908B0c00001E35871250cA3D598E3F32",
  token_USDT: "0xb64DB0d1810De2548534c003e2E5503564D7f3E5",
};

module.exports = { inside, outside };

// https://github.com/palliums-developers/bvexchange/blob/master/docs/map-address-internal.md
// https://github.com/palliums-developers/bvexchange/blob/master/docs/map-address-external.md

// In those page:
//  name 	  address 	                                  type 	    chain 	          desc
//  ustd 	  0xb64DB0d1810De2548534c003e2E5503564D7f3E5 	contract 	kovan(ethereum) 	call approve       (token_USDT)
//  proof 	0x045B0Dc3908B0c00001E35871250cA3D598E3F32 	contract 	kovan(ethereum) 	call transferProof (contractAddress)