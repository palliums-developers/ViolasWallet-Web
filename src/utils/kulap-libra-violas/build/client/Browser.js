"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admission_control_grpc_web_pb_1 = require("../__generated__/admission_control_grpc_web_pb");
function initAdmissionControlClient(connectionAddress) {
    return new admission_control_grpc_web_pb_1.AdmissionControlPromiseClient(connectionAddress, null);
}
exports.initAdmissionControlClient = initAdmissionControlClient;
async function updateToLatestLedger(acClient, request) {
    return acClient.updateToLatestLedger(request);
}
exports.updateToLatestLedger = updateToLatestLedger;
async function submitTransaction(acClient, request) {
    return acClient.submitTransaction(request);
}
exports.submitTransaction = submitTransaction;
