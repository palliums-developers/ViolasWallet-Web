"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_pb_1 = require("../__generated__/transaction_pb");
const BufferUtil_1 = require("../common/BufferUtil");
const AddressLCS_1 = require("./types/AddressLCS");
const ProgramLCS_1 = require("./types/ProgramLCS");
const RawTransactionLCS_1 = require("./types/RawTransactionLCS");
const TransactionArgumentLCS_1 = require("./types/TransactionArgumentLCS");
const TransactionPayloadLCS_1 = require("./types/TransactionPayloadLCS");
class LCSDeserialization {
    static getAddress(cursor) {
        const data = cursor.readXBytes(32);
        return new AddressLCS_1.AddressLCS(BufferUtil_1.BufferUtil.toHex(data));
    }
    static getTransactionArgumentList(cursor) {
        const argLen = cursor.read32();
        const transactionArgs = [];
        for (let i = 0; i < argLen; i++) {
            transactionArgs.push(this.getTransactionArgument(cursor));
        }
        return transactionArgs;
    }
    static getTransactionArgument(cursor) {
        const argType = cursor.read32();
        if (argType === transaction_pb_1.TransactionArgument.ArgType.U64) {
            const data = cursor.read64();
            return TransactionArgumentLCS_1.TransactionArgumentLCS.fromU64(data.toString());
        }
        else if (argType === transaction_pb_1.TransactionArgument.ArgType.ADDRESS) {
            const data = this.getAddress(cursor);
            return TransactionArgumentLCS_1.TransactionArgumentLCS.fromAddress(data);
        }
        else if (argType === transaction_pb_1.TransactionArgument.ArgType.STRING) {
            const data = this.getString(cursor);
            return TransactionArgumentLCS_1.TransactionArgumentLCS.fromString(data);
        }
        else if (argType === transaction_pb_1.TransactionArgument.ArgType.BYTEARRAY) {
            const data = this.getByteArray(cursor);
            return TransactionArgumentLCS_1.TransactionArgumentLCS.fromByteArray(data);
        }
        return new TransactionArgumentLCS_1.TransactionArgumentLCS();
    }
    static getProgram(cursor) {
        const code = this.getByteArray(cursor);
        const transactionArgs = this.getTransactionArgumentList(cursor);
        const modules = this.getListByteArray(cursor);
        const prog = new ProgramLCS_1.ProgramLCS();
        prog.setCodeFromBuffer(code);
        transactionArgs.forEach(arg => {
            prog.addTransactionArg(arg);
        });
        modules.forEach(mod => {
            prog.addModule(BufferUtil_1.BufferUtil.toHex(mod));
        });
        return prog;
    }
    static getRawTransaction(cursor) {
        const sender = this.getAddress(cursor);
        const sequence = cursor.read64();
        const payload = this.getTransactionPayload(cursor);
        const maxGasAmount = cursor.read64();
        const gasUnitPrice = cursor.read64();
        const expiryTime = cursor.read64();
        const transaction = new RawTransactionLCS_1.RawTransactionLCS(sender.value, sequence.toString(), payload);
        transaction.maxGasAmount = maxGasAmount;
        transaction.gasUnitPrice = gasUnitPrice;
        transaction.expirtationTime = expiryTime;
        return transaction;
    }
    static getTransactionPayload(cursor) {
        const payload = new TransactionPayloadLCS_1.TransactionPayloadLCS();
        payload.payloadType = cursor.read32();
        // now, only transaction with program payload is supported
        if (payload.payloadType === TransactionPayloadLCS_1.TransactionPayloadType.Program) {
            payload.program = this.getProgram(cursor);
            return payload;
        }
        throw new Error('unsupported TransactionPayload type');
    }
    static getListByteArray(cursor) {
        const len = cursor.read32();
        const byteList = [];
        for (let i = 0; i < len; i++) {
            byteList.push(this.getByteArray(cursor));
        }
        return byteList;
    }
    static getByteArray(cursor) {
        const len = cursor.read32();
        const data = cursor.readXBytes(len);
        return data;
    }
    static getString(cursor) {
        const len = cursor.read32();
        const data = [];
        for (let i = 0; i < len; i++) {
            data.push(cursor.read8());
        }
        return String.fromCharCode.apply(null, data);
    }
}
exports.LCSDeserialization = LCSDeserialization;
