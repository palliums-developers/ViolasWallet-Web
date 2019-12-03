"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const BufferUtil_1 = require("../../common/BufferUtil");
class ScriptLCS {
    constructor() {
        this.code = new Uint8Array();
        this.transactionArgs = [];
    }
    setCode(code) {
        this.code = BufferUtil_1.BufferUtil.fromString(code);
    }
    setCodeFromBuffer(code) {
        this.code = code;
    }
    addTransactionArg(arg) {
        this.transactionArgs.push(arg);
    }
    toString() {
        let result = '{' + os_1.EOL;
        result += 'code: "' + this.code.toString() + '",' + os_1.EOL;
        const args = [];
        this.transactionArgs.forEach(x => {
            args.push(x.toString());
        });
        let argStr = args.join(', ');
        argStr = '[' + argStr + ']';
        result += 'args: ' + argStr + ',' + os_1.EOL;
        result += '}';
        return result;
    }
}
exports.ScriptLCS = ScriptLCS;
