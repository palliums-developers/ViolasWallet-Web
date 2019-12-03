"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddressLCS {
    constructor(address) {
        this.value = address.toLowerCase();
        this.length = 32;
    }
    toString() {
        return this.value;
    }
}
exports.AddressLCS = AddressLCS;
