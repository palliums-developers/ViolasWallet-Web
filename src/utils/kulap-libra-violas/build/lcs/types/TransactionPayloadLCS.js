"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramLCS_1 = require("./ProgramLCS");
const ScriptLCS_1=require("./ScriptLCS")
class TransactionPayloadLCS {
    static fromProgram(prog) {
        const payload = new TransactionPayloadLCS();
        payload.payloadType = TransactionPayloadType.Program;
        payload.program = prog;
        return payload;
    }
    static fromScript(prog) {
        const payload = new TransactionPayloadLCS();
        payload.payloadType = TransactionPayloadType.Script;
        payload.program = prog;
        return payload;
    }
    constructor() {
        this.payloadType = TransactionPayloadType.Program;
        this.program = new ProgramLCS_1.ProgramLCS();
    }
}
exports.TransactionPayloadLCS = TransactionPayloadLCS;
var TransactionPayloadType;
(function (TransactionPayloadType) {
    TransactionPayloadType[TransactionPayloadType["Program"] = 0] = "Program";
    TransactionPayloadType[TransactionPayloadType["WriteSet"] = 1] = "WriteSet";
    TransactionPayloadType[TransactionPayloadType["Script"] = 2] = "Script";
    TransactionPayloadType[TransactionPayloadType["Module"] = 3] = "Module";
})(TransactionPayloadType = exports.TransactionPayloadType || (exports.TransactionPayloadType = {}));
