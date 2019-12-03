"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const int64_buffer_1 = require("int64-buffer");
const transaction_pb_1 = require("../__generated__/transaction_pb");
const BufferUtil_1 = require("../common/BufferUtil");
const TransactionPayloadLCS_1 = require("./types/TransactionPayloadLCS");
class LCSSerialization {
    static addressToByte(source) {
        return BufferUtil_1.BufferUtil.fromHex(source.value);
    }
    static transactionArgumentToByte(source) {
        const type = this.uint32ToByte(source.type);
        if (source.type === transaction_pb_1.TransactionArgument.ArgType.ADDRESS) {
            const data = this.addressToByte(source.address);
            return BufferUtil_1.BufferUtil.concat(type, data);
        }
        else if (source.type === transaction_pb_1.TransactionArgument.ArgType.U64) {
            const data = this.uint64ToByte(source.u64);
            return BufferUtil_1.BufferUtil.concat(type, data);
        }
        else if (source.type === transaction_pb_1.TransactionArgument.ArgType.STRING) {
            const data = this.stringToByte(source.string);
            return BufferUtil_1.BufferUtil.concat(type, data);
        }
        else if (source.type === transaction_pb_1.TransactionArgument.ArgType.BYTEARRAY) {
            const data = this.byteArrayToByte(source.byteArray);
            return BufferUtil_1.BufferUtil.concat(type, data);
        }
        return new Uint8Array();
    }
    static programToByte(source) {
        const code = this.byteArrayToByte(source.code);
        const argLen = this.uint32ToByte(source.transactionArgs.length);
        let result = BufferUtil_1.BufferUtil.concat(code, argLen);
        source.transactionArgs.forEach(x => {
            const argData = this.transactionArgumentToByte(x);
            result = BufferUtil_1.BufferUtil.concat(result, argData);
        });
        // const moduleData = this.listByteArrayToByte(source.modules);
        // result = BufferUtil_1.BufferUtil.concat(result, moduleData);
        return result;
    }
    // static programToByte(source) {
    //     const code = this.byteArrayToByte(source.code);
    //     const argLen = this.uint32ToByte(source.transactionArgs.length);
    //     let result = BufferUtil_1.BufferUtil.concat(code, argLen);
    //     source.transactionArgs.forEach(x => {
    //         const argData = this.transactionArgumentToByte(x);
    //         result = BufferUtil_1.BufferUtil.concat(result, argData);
    //     });
    //     const moduleData = this.listByteArrayToByte(source.modules);
    //     result = BufferUtil_1.BufferUtil.concat(result, moduleData);
    //     return result;
    // }
    static transactionPayloadToByte(source) {
        const code = this.uint32ToByte(source.payloadType);
        // console.log(code)
        if (source.payloadType === TransactionPayloadLCS_1.TransactionPayloadType.Program) {
            const data = this.programToByte(source.program);
            // console.log(code.length);
            return BufferUtil_1.BufferUtil.concat(code, data);
        }
        if (source.payloadType === TransactionPayloadLCS_1.TransactionPayloadType.Script) {
            const data = this.programToByte(source.program);
            // console.log(code.length);
            return BufferUtil_1.BufferUtil.concat(code, data);
        }
        return new Uint8Array();
    }
    static rawTransactionToByte(source) {
        const sender = this.addressToByte(source.sender);
        const sequence = this.uint64ToByte(source.sequenceNumber);
        let result = BufferUtil_1.BufferUtil.concat(sender, sequence);
        const payload = this.transactionPayloadToByte(source.payload);
        result = BufferUtil_1.BufferUtil.concat(result, payload);
        const maxGasAmount = this.uint64ToByte(source.maxGasAmount);
        result = BufferUtil_1.BufferUtil.concat(result, maxGasAmount);
        const gas = this.uint64ToByte(source.gasUnitPrice);
        result = BufferUtil_1.BufferUtil.concat(result, gas);
        const expire = this.uint64ToByte(source.expirtationTime);
        result = BufferUtil_1.BufferUtil.concat(result, expire);
        // console.log(result.length)
        return result;
    }
    static listByteArrayToByte(sources) {
        // console.log(sources,"source")
        let sources_length=0;
        if(sources){
            sources_length=sources.length;
        }
        const len = this.uint32ToByte(sources_length);
        let result = BufferUtil_1.BufferUtil.concat(len, new Uint8Array());
        sources?sources.forEach(source => {
            const sourceLen = this.uint32ToByte(sources_length);
            result = BufferUtil_1.BufferUtil.concat(result, sourceLen);
            result = BufferUtil_1.BufferUtil.concat(result, source);
        }):result;
        return result;
    }
    static byteArrayToByte(source) {
        const len = this.uint32ToByte(source.length);
        return BufferUtil_1.BufferUtil.concat(len, source);
    }
    static stringToByte(source) {
        const len = this.uint32ToByte(source.length);
        const buffer = new ArrayBuffer(source.length);
        const view = new DataView(buffer);
        for (let i = 0; i < source.length; i++) {
            view.setUint8(i, source.charCodeAt(i));
        }
        return BufferUtil_1.BufferUtil.concat(len, new Uint8Array(buffer));
    }
    static uint32ToByte(source) {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setUint32(0, source, true);
        return new Uint8Array(buffer);
    }
    static uint64ToByte(source) {
        const u64 = new int64_buffer_1.Uint64LE(source.toString());
        const buffer = u64.toArrayBuffer();
        return new Uint8Array(buffer);
    }
}
exports.LCSSerialization = LCSSerialization;
