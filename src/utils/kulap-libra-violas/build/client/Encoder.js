"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Program, RawTransaction, TransactionArgument } from '../__generated__/transaction_pb';
/**
 * Internal class used by LibraClient
 * to encode Libra* classes exposed by library into pb classes used with rbc
 */
class ClientEncoder {
    constructor(client) {
        this.client = client;
    }
}
exports.ClientEncoder = ClientEncoder;
