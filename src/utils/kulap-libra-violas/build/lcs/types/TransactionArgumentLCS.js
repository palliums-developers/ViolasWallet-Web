"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
const transaction_pb_1 = require("../../__generated__/transaction_pb");
const BufferUtil_1 = require("../../common/BufferUtil");
const AddressLCS_1 = require("./AddressLCS");
class TransactionArgumentLCS {
    static fromU64(source) {
        const transactionArg = new TransactionArgumentLCS();
        transactionArg.type = transaction_pb_1.TransactionArgument.ArgType.U64;
        transactionArg.u64 = new bignumber_js_1.BigNumber(source);
        return transactionArg;
    }
    static fromAddress(source) {
        const transactionArg = new TransactionArgumentLCS();
        transactionArg.type = transaction_pb_1.TransactionArgument.ArgType.ADDRESS;
        transactionArg.address = source;
        return transactionArg;
    }
    static fromString(source) {
        const transactionArg = new TransactionArgumentLCS();
        transactionArg.type = transaction_pb_1.TransactionArgument.ArgType.STRING;
        transactionArg.string = source;
        return transactionArg;
    }
    static fromByteArray(source) {
        const transactionArg = new TransactionArgumentLCS();
        transactionArg.type = transaction_pb_1.TransactionArgument.ArgType.BYTEARRAY;
        transactionArg.byteArray = source;
        return transactionArg;
    }
    constructor() {
        this.u64 = new bignumber_js_1.BigNumber(0);
        this.address = new AddressLCS_1.AddressLCS('');
        this.string = '';
        this.byteArray = new Uint8Array();
        this.type = transaction_pb_1.TransactionArgument.ArgType.U64;
    }
    toString() {
        if (this.type === transaction_pb_1.TransactionArgument.ArgType.ADDRESS) {
            return '{ADDRESS: ' + this.address.toString() + '}';
        }
        else if (this.type === transaction_pb_1.TransactionArgument.ArgType.U64) {
            return '{U64: ' + this.u64.toString() + '}';
        }
        else if (this.type === transaction_pb_1.TransactionArgument.ArgType.STRING) {
            return '{STRING: ' + this.string + '}';
        }
        else if (this.type === transaction_pb_1.TransactionArgument.ArgType.BYTEARRAY) {
            return '{ByteArray: 0xb"' + BufferUtil_1.BufferUtil.toHex(this.byteArray) + '"}';
        }
        throw new Error('unknow type');
    }
}
exports.TransactionArgumentLCS = TransactionArgumentLCS;
