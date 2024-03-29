"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const sha3_1 = require("sha3");
const CursorBuffer_1 = require("../common/CursorBuffer");
const Addresses_1 = __importDefault(require("../constants/Addresses"));
const Eddsa_1 = require("../crypto/Eddsa");
const Events_1 = require("./Events");
/**
 * Contains all the information relevant to a particular users accounts.
 * Beware of stale data though. Will implement refresh logic soon.
 *
 *
 */
class AccountState {
    /**
     * Returns an empty AccountState
     */
    static default(address) {
        return new AccountState(new Uint8Array(Buffer.from(address, 'hex')), new bignumber_js_1.default(0), Events_1.EventHandle.default(), Events_1.EventHandle.default(), new bignumber_js_1.default(0), true, true);
    }
    static fromBytes(bytes) {
        const cursor = new CursorBuffer_1.CursorBuffer(bytes);
        const authenticationKeyLen = cursor.read32();
        const authenticationKey = cursor.readXBytes(authenticationKeyLen);
        const balance = cursor.read64();
        const delegatedKeyRotationCapability = cursor.readBool();
        const delegatedWithdrawalCapability = cursor.readBool();
        const receivedEventsCount = new bignumber_js_1.default(cursor.read32());
        cursor.read32();
        const receivedEventsKeyLen = cursor.read32();
        const receivedEventsKey = cursor.readXBytes(receivedEventsKeyLen);
        const sentEventsCount = new bignumber_js_1.default(cursor.read32());
        cursor.read32();
        const sentEventsKeyLen = cursor.read32();
        const sentEventsKey = cursor.readXBytes(sentEventsKeyLen);
        const sequenceNumber = cursor.read64();
        return new AccountState(authenticationKey, balance, new Events_1.EventHandle(receivedEventsKey, receivedEventsCount), new Events_1.EventHandle(sentEventsKey, sentEventsCount), sequenceNumber, delegatedWithdrawalCapability, delegatedKeyRotationCapability);
    }
    constructor(authenticationKey, balance, receivedEvents, sentEvents, sequenceNumber, delegatedWithdrawalCapability, delegatedKeyRotationCapability) {
        this.balance = balance;
        this.sequenceNumber = sequenceNumber;
        this.authenticationKey = authenticationKey;
        this.sentEvents = sentEvents;
        this.receivedEvents = receivedEvents;
        this.delegatedWithdrawalCapability = delegatedWithdrawalCapability;
        this.delegatedKeyRotationCapability = delegatedKeyRotationCapability;
    }
}
exports.AccountState = AccountState;
class Account {
    static fromSecretKeyBytes(secretKeyBytes) {
        return new Account(Eddsa_1.KeyPair.fromSecretKey(secretKeyBytes));
    }
    static fromSecretKey(secretKeyHex) {
        const keyBytes = new Uint8Array(Buffer.from(secretKeyHex, 'hex'));
        return Account.fromSecretKeyBytes(keyBytes);
    }
    constructor(keyPair) {
        this.keyPair = keyPair;
    }
    getAddress() {
        if (this.address !== undefined) {
            return this.address;
        }
        const sha3 = new sha3_1.SHA3(256);
        sha3.update(Buffer.from(this.keyPair.getPublicKey()));
        this.address = new AccountAddress(new Uint8Array(sha3.digest()));
        return this.address;
    }
}
exports.Account = Account;
class InvalidAccountAddressError extends Error {
    constructor(invalidLength) {
        super(`The address is of invalid length [${invalidLength}]`);
    }
}
exports.InvalidAccountAddressError = InvalidAccountAddressError;
/**
 * Represents a validated Account address
 *
 */
class AccountAddress {
    static isValidString(addressHex) {
        const length = String(addressHex).replace(' ', '').length;
        return length === Addresses_1.default.AddressLength * 2;
    }
    static isValidBytes(addressBytes) {
        return addressBytes.length === Addresses_1.default.AddressLength;
    }
    static default() {
        return new AccountAddress(new Uint8Array(Buffer.from(Addresses_1.default.AssociationAddress, 'hex')));
    }
    constructor(addressOrHash) {
        if (typeof addressOrHash === 'string') {
            this.addressBytes = Uint8Array.from(Buffer.from(addressOrHash, 'hex'));
        }
        else if (addressOrHash instanceof AccountAddress) {
            this.addressBytes = addressOrHash.addressBytes;
        }
        else {
            // assume it a byte array
            this.addressBytes = addressOrHash.slice(0, Addresses_1.default.AddressLength);
        }
        if (!AccountAddress.isValidBytes(this.addressBytes)) {
            throw new InvalidAccountAddressError(this.addressBytes.length);
        }
    }
    isDefault() {
        return AccountAddress.default().toHex() === this.toHex();
    }
    toBytes() {
        return this.addressBytes;
    }
    toHex() {
        return Buffer.from(this.addressBytes).toString('hex');
    }
    /**
     * Alias for toHex()
     */
    toString() {
        return this.toHex();
    }
}
exports.AccountAddress = AccountAddress;
