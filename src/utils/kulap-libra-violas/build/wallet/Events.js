"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class EventHandle {
    static default() {
        return new EventHandle(new Uint8Array(), new bignumber_js_1.default(0));
    }
    constructor(key, count) {
        this.key = key;
        this.count = count;
    }
}
exports.EventHandle = EventHandle;
