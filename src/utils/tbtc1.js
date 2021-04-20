let dealwith_tbtc1_txid = (_tbtc1_result) => {
  let tbtc_address = _tbtc1_result.address;
   if (_tbtc1_result && !_tbtc1_result.transactions) {
     return;
   }
  let transactions = _tbtc1_result.transactions;
  let result = [];
  for (let i of transactions) {
    let tx = {
      timestamp: 0,
      show_confirmations: false,
      sender: false,
      sender_address: "",
      receive_address: "",
      fee: 0,
      txid: "",
      show_address: "",
      show_value: 0,
      show_type: "btc",
    };
    if (i.confirmations > 0) {
      tx.show_confirmations = true;
    }
    tx.timestamp = i.blockTime;
    tx.fee = parseInt(i.fees) / 1e8;
    tx.txid = i.txid;

    for (let j of i.vin) {
      if (j.addresses.includes(tbtc_address)) {
        tx.sender = true;
        break;
      }
    }

    if (!tx.sender) {
      tx.show_address = i.vin[0].addresses[0];
      tx.sender_address = i.vin[0].addresses[0];
      tx.receive_address = tbtc_address;
      tx.show_value = parseInt(i.vin[0].value) / 1e8;
    } else {
      for (let k of i.vout) {
        if (!k.addresses.includes(tbtc_address)) {
          tx.show_address = k.addresses[0];
          tx.receive_address = k.addresses[0];
          tx.sender_address = tbtc_address;
          tx.show_value = parseInt(k.value) / 1e8;
          break;
        }
      }
    }
    result.push(tx);
  }
//   console.log(result);
  return result;
};
export default dealwith_tbtc1_txid;
