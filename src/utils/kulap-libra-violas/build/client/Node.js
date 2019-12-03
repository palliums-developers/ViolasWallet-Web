"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = require("grpc");
const admission_control_grpc_pb_1 = require("../__generated__/admission_control_grpc_pb");
function initAdmissionControlClient(connectionAddress) {
    return new admission_control_grpc_pb_1.AdmissionControlClient(connectionAddress, grpc_1.credentials.createInsecure());
}
exports.initAdmissionControlClient = initAdmissionControlClient;
async function updateToLatestLedger(acClient, request) {
    return new Promise((resolve, reject) => {
        acClient.updateToLatestLedger(request, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
}
exports.updateToLatestLedger = updateToLatestLedger;
async function submitTransaction(acClient, request) {
    return new Promise((resolve, reject) => {
        acClient.submitTransaction(request, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
}
exports.submitTransaction = submitTransaction;
