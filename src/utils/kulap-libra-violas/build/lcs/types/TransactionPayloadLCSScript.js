"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScriptLCS_1 = require("./ScriptLCS");
class TransactionPayloadLCSScript {
    static fromProgram(prog) {
        const payload = new TransactionPayloadLCSScript();
        payload.payloadType = TransactionPayloadType.Script;
        payload.program = prog;
        return payload;
    }
    constructor() {
        this.payloadType = TransactionPayloadType.Script;
        this.program = new ScriptLCS_1.ScriptLCS();
    }
}
exports.TransactionPayloadLCSScript = TransactionPayloadLCSScript;
var TransactionPayloadType;
(function (TransactionPayloadType) {
    TransactionPayloadType[TransactionPayloadType["Program"] = 0] = "Program";
    TransactionPayloadType[TransactionPayloadType["WriteSet"] = 1] = "WriteSet";
    TransactionPayloadType[TransactionPayloadType["Script"] = 2] = "Script";
    TransactionPayloadType[TransactionPayloadType["Module"] = 3] = "Module";
})(TransactionPayloadType = exports.TransactionPayloadType || (exports.TransactionPayloadType = {}));
