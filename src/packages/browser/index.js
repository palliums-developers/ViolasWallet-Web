"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// import Connector from '@walletconnect/core'
var index_1 = require("../core/index");
// import { IWalletConnectOptions } from '../../types/index'
var webStorage_1 = require("./webStorage");
var cryptoLib = require("./webCrypto");
var WalletConnect = /** @class */ (function (_super) {
    __extends(WalletConnect, _super);
    function WalletConnect(opts) {
        return _super.call(this, cryptoLib, opts, null, webStorage_1.default) || this;
    }
    return WalletConnect;
}(index_1.default));
exports.default = WalletConnect;
