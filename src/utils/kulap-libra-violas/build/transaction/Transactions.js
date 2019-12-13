let _currencyToken = require("../../currencyToken.json")
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {
      default: mod
    };
  };
Object.defineProperty(exports, "__esModule", {
  value: true
});
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const BufferUtil_1 = require("../common/BufferUtil");
const ProgamBase64Codes_1 = __importDefault(
  require("../constants/ProgamBase64Codes")
);
const AddressLCS_1 = require("../lcs/types/AddressLCS");
const ProgramLCS_1 = require("../lcs/types/ProgramLCS");
const ScriptLCS_1 = require("../lcs/types/ScriptLCS");
const RawTransactionLCS_1 = require("../lcs/types/RawTransactionLCS");
const TransactionArgumentLCS_1 = require("../lcs/types/TransactionArgumentLCS");
const TransactionPayloadLCS_1 = require("../lcs/types/TransactionPayloadLCS");
const TransactionPayloadLCSScript_1 = require("../lcs/types/TransactionPayloadLCSScript");
class LibraTransaction {
  static createTransfer(coinType, sender, recipientAddress, numAccount, sequence) {
    // construct program
    let tokenBase64;
    let tokenHex;
    // switch (coinType) {
    //   case "violas":
    //     tokenBase64 = ProgamBase64Codes_1.default.peerToPeerTxn;
    //     break;
    //   case "S001_dtoken":
    //     tokenBase64 = ProgamBase64Codes_1.default.v2_transfer_S001_dtoken;
    //     break;
    //   case "Vbtc_dtoken":
    //     tokenBase64 = ProgamBase64Codes_1.default.v2_transfer_Vbtc_dtoken;
    //     break;
    //   default:
    //     tokenBase64 = ProgamBase64Codes_1.default.peerToPeerTxn;
    // }
    let i = 0;
    if (coinType == "libra" || coinType == "violas") {
      tokenBase64 = ProgamBase64Codes_1.default.peerToPeerTxn;
    } else {
      for (i in _currencyToken.data) {
        if (coinType == _currencyToken.data[i].name) {
          tokenBase64 = _currencyToken.data[i].transfer_base64;
          // tokenHex=_currencyToken.data[i].address_hex;
        }
      }
    }
    // console.log(tokenBase64);
    // const prog = new ProgramLCS_1.ProgramLCS();
    let prog;
    if (coinType == "libra") {
      // console.log('program')
      prog = new ProgramLCS_1.ProgramLCS();
    } else {
      // console.log('script')
      prog = new ScriptLCS_1.ScriptLCS();
    }
    // console.log(BufferUtil_1.BufferUtil.fromBase64(_currencyToken.data[2].address_base64).toString==BufferUtil_1.BufferUtil.fromHex(_currencyToken.data[2].address_hex).toString,'qqqqqq')
    // console.log(ProgamBase64Codes_1.default.peerToPeerTxn.toString == BufferUtil_1.BufferUtil.fromBase64(_currencyToken.data[0].address_base64).toString)

    prog.setCodeFromBuffer(BufferUtil_1.BufferUtil.fromBase64(tokenBase64));
    // prog.setCodeFromBuffer(BufferUtil_1.BufferUtil.fromHex(tokenHex));
    const recipientAddressLCS = new AddressLCS_1.AddressLCS(recipientAddress);
    prog.addTransactionArg(
      TransactionArgumentLCS_1.TransactionArgumentLCS.fromAddress(
        recipientAddressLCS
      )
    );
    prog.addTransactionArg(
      TransactionArgumentLCS_1.TransactionArgumentLCS.fromU64(
        numAccount.toString()
      )
    );
    // construct payload
    // const payload = TransactionPayloadLCS_1.TransactionPayloadLCS.fromProgram(prog);
    const payload = TransactionPayloadLCSScript_1.TransactionPayloadLCSScript.fromProgram(prog);
    // raw transaction
    const transaction = new RawTransactionLCS_1.RawTransactionLCS(
      sender.getAddress().toHex(),
      sequence.toString(),
      payload
    );
    // console.log(transaction,'create transaction')
    return transaction;
  }
  static publish(coinType, sender, sequence) {
    let tokenBase64;
    // switch (coinType) {
    //   case "S001_dtoken":
    //     tokenBase64 = ProgamBase64Codes_1.default.v2_publish_S001_dtoken;
    //     break;
    //   case "Vbtc_dtoken":
    //     tokenBase64 = ProgamBase64Codes_1.default.v2_publish_Vbtc_dtoken;
    //     break;
    //   default:
    //     tokenBase64 = ProgamBase64Codes_1.default.violas_publish_S001;
    // }
    let i = 0;
    for (i in _currencyToken.data) {
      if (coinType == _currencyToken.data[i].name) {
        tokenBase64 = _currencyToken.data[i].publish_base64;
      }
    }
    const prog = new ScriptLCS_1.ScriptLCS();
    prog.setCodeFromBuffer(BufferUtil_1.BufferUtil.fromBase64(tokenBase64));
    const payload = TransactionPayloadLCSScript_1.TransactionPayloadLCSScript.fromProgram(prog);
    const transaction = new RawTransactionLCS_1.RawTransactionLCS(
      sender.getAddress().toHex(),
      sequence.toString(),
      payload
    );
    return transaction;
  }

  static createEXTransfer(coinType, sender, recipientAddress, numAccount, sequence, data) {
    // construct program
    let tokenBase64;
    // switch (coinType) {
    //   case "S001_dtoken":
    //     tokenBase64 = ProgamBase64Codes_1.default.v2_transfer_with_data_S001_dtoken;
    //     break;
    //   case "Vbtc_dtoken":
    //     tokenBase64 = ProgamBase64Codes_1.default.v2_transfer_with_data_Vbtc_dtoken;
    //     break;
    //   // case "S001":
    //   //   tokenBase64= ProgamBase64Codes_1.default.transfer_with_data_S001;
    //   //   break;
    //   // case "S002":
    //   //   tokenBase64=ProgamBase64Codes_1.default.violas_ex_S002;
    //   //   break;
    //   default:
    //     tokenBase64 = ProgamBase64Codes_1.default.violas_peer2peerTxn;
    // }
    let i = 0;
    for (i in _currencyToken.data) {
      if (coinType == _currencyToken.data[i].name) {
        tokenBase64 = _currencyToken.data[i].transferWithDate_base64
      }
    }
    // const prog = new ProgramLCS_1.ProgramLCS();
    const prog = new ScriptLCS_1.ScriptLCS();
    // console.log(tokenBase64)
    prog.setCodeFromBuffer(BufferUtil_1.BufferUtil.fromBase64(tokenBase64));
    const recipientAddressLCS = new AddressLCS_1.AddressLCS(recipientAddress);
    prog.addTransactionArg(
      TransactionArgumentLCS_1.TransactionArgumentLCS.fromAddress(
        recipientAddressLCS
      )
    );
    prog.addTransactionArg(
      TransactionArgumentLCS_1.TransactionArgumentLCS.fromU64(
        numAccount.toString()
      )
    );
    prog.addTransactionArg(
      TransactionArgumentLCS_1.TransactionArgumentLCS.fromByteArray(
        data
      )
    );
    // console.log(JSON.stringify(data));
    // construct payload
    // const payload = TransactionPayloadLCS_1.TransactionPayloadLCS.fromProgram(prog);
    const payload = TransactionPayloadLCSScript_1.TransactionPayloadLCSScript.fromProgram(prog);
    // console.log(payload.program.code)
    // raw transaction
    const transaction = new RawTransactionLCS_1.RawTransactionLCS(
      sender.getAddress().toHex(),
      sequence.toString(),
      payload
    );
    // console.log(transaction)
    return transaction;
  }
  static createRotateKey(sender, newAddress, sequence) {
    // construct program
    // const publicKeyNewLCS = LCSSerialization.byteArrayToByte(publicKeyNew)
    const prog = new ProgramLCS_1.ProgramLCS();
    prog.setCodeFromBuffer(
      BufferUtil_1.BufferUtil.fromBase64(
        ProgamBase64Codes_1.default.rotateAuthenticationKeyTxn
      )
    );
    prog.addTransactionArg(
      TransactionArgumentLCS_1.TransactionArgumentLCS.fromByteArray(
        BufferUtil_1.BufferUtil.fromHex(newAddress)
      )
    );
    // construct payload
    const payload = TransactionPayloadLCS_1.TransactionPayloadLCS.fromProgram(
      prog
    );
    // raw transaction
    const transaction = new RawTransactionLCS_1.RawTransactionLCS(
      sender.getAddress().toHex(),
      sequence.toString(),
      payload
    );
    transaction.gasUnitPrice = new bignumber_js_1.default(1);
    return transaction;
  }
}
exports.LibraTransaction = LibraTransaction;
class LibraTransactionResponse {
  constructor(
    signedTransaction,
    validatorId,
    acStatus,
    mempoolStatus,
    vmStatus
  ) {
    this.signedTransaction = signedTransaction;
    this.validatorId = validatorId;
    this.acStatus = acStatus;
    this.mempoolStatus = mempoolStatus;
    this.vmStatus = vmStatus;
  }
}
exports.LibraTransactionResponse = LibraTransactionResponse;
var LibraAdmissionControlStatus;
(function (LibraAdmissionControlStatus) {
  LibraAdmissionControlStatus[(LibraAdmissionControlStatus["ACCEPTED"] = 0)] =
    "ACCEPTED";
  LibraAdmissionControlStatus[
    (LibraAdmissionControlStatus["BLACKLISTED"] = 1)
  ] = "BLACKLISTED";
  LibraAdmissionControlStatus[(LibraAdmissionControlStatus["REJECTED"] = 2)] =
    "REJECTED";
  LibraAdmissionControlStatus[(LibraAdmissionControlStatus["UNKNOWN"] = -1)] =
    "UNKNOWN";
})(
  (LibraAdmissionControlStatus =
    exports.LibraAdmissionControlStatus ||
    (exports.LibraAdmissionControlStatus = {}))
);
var LibraMempoolTransactionStatus;
(function (LibraMempoolTransactionStatus) {
  LibraMempoolTransactionStatus[(LibraMempoolTransactionStatus["VALID"] = 0)] =
    "VALID";
  LibraMempoolTransactionStatus[
    (LibraMempoolTransactionStatus["INSUFFICIENTBALANCE"] = 1)
  ] = "INSUFFICIENTBALANCE";
  LibraMempoolTransactionStatus[
    (LibraMempoolTransactionStatus["INVALIDSEQNUMBER"] = 2)
  ] = "INVALIDSEQNUMBER";
  LibraMempoolTransactionStatus[
    (LibraMempoolTransactionStatus["MEMPOOLISFULL"] = 3)
  ] = "MEMPOOLISFULL";
  LibraMempoolTransactionStatus[
    (LibraMempoolTransactionStatus["TOOMANYTRANSACTIONS"] = 4)
  ] = "TOOMANYTRANSACTIONS";
  LibraMempoolTransactionStatus[
    (LibraMempoolTransactionStatus["INVALIDUPDATE"] = 5)
  ] = "INVALIDUPDATE";
  LibraMempoolTransactionStatus[
    (LibraMempoolTransactionStatus["UNKNOWN"] = -1)
  ] = "UNKNOWN";
})(
  (LibraMempoolTransactionStatus =
    exports.LibraMempoolTransactionStatus ||
    (exports.LibraMempoolTransactionStatus = {}))
);
class LibraSignedTransaction {
  constructor(transaction, publicKey, signature) {
    this.transaction = transaction;
    this.publicKey = publicKey;
    this.signature = signature;
  }
}
exports.LibraSignedTransaction = LibraSignedTransaction;
class LibraSignedTransactionWithProof {
  constructor(signedTransaction, proof, events) {
    this.signedTransaction = signedTransaction;
    this.proof = proof;
    this.events = events;
  }
}
exports.LibraSignedTransactionWithProof = LibraSignedTransactionWithProof;
// TODO: Implement abstraction over the pb classes for transaction proof
class LibraSignedTransactionProof { }
class LibraTransactionEvent {
  constructor(data, sequenceNumber, eventKey) {
    this.data = data;
    this.sequenceNumber = new bignumber_js_1.default(sequenceNumber);
    this.eventKey = eventKey;
  }
}
exports.LibraTransactionEvent = LibraTransactionEvent;