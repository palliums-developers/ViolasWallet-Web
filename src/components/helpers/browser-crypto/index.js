import { concatArrayBuffers, convertArrayBufferToHex, convertArrayBufferToUtf8, convertHexToArrayBuffer, convertUtf8ToArrayBuffer, removeHexPrefix, safeGetFromWindow, } from "@walletconnect/utils";
const AES_ALGORITHM = "AES-CBC";
const AES_LENGTH = 256;
const HMAC_ALGORITHM = "SHA-256";
export async function exportKey(cryptoKey) {
    const browserCrypto = safeGetFromWindow("crypto");
    const buffer = await browserCrypto.subtle.exportKey("raw", cryptoKey);
    return buffer;
}
export async function importKey(buffer, type = AES_ALGORITHM) {
    const aesParams = { length: AES_LENGTH, name: AES_ALGORITHM };
    const hmacParams = {
        hash: { name: HMAC_ALGORITHM },
        name: "HMAC",
    };
    const algoParams = type === AES_ALGORITHM ? aesParams : hmacParams;
    const usages = type === AES_ALGORITHM ? ["encrypt", "decrypt"] : ["sign", "verify"];
    const browserCrypto = safeGetFromWindow("crypto");
    const cryptoKey = await browserCrypto.subtle.importKey("raw", buffer, algoParams, true, usages);
    return cryptoKey;
}
export async function generateKey(length) {
    const _length = length || 256;
    const browserCrypto = safeGetFromWindow("crypto");
    const cryptoKey = await browserCrypto.subtle.generateKey({
        length: _length,
        name: AES_ALGORITHM,
    }, true, ["encrypt", "decrypt"]);
    const key = await exportKey(cryptoKey);
    return key;
}
export async function createHmac(data, key) {
    const cryptoKey = await importKey(key, "HMAC");
    const browserCrypto = safeGetFromWindow("crypto");
    const signature = await browserCrypto.subtle.sign({
        length: 256,
        name: "HMAC",
    }, cryptoKey, data);
    return signature;
}
export async function verifyHmac(payload, key) {
    const cipherText = convertHexToArrayBuffer(payload.data);
    const iv = convertHexToArrayBuffer(payload.iv);
    const hmac = convertHexToArrayBuffer(payload.hmac);
    const hmacHex = convertArrayBufferToHex(hmac, true);
    const unsigned = concatArrayBuffers(cipherText, iv);
    const chmac = await createHmac(unsigned, key);
    const chmacHex = convertArrayBufferToHex(chmac, true);
    if (removeHexPrefix(hmacHex) === removeHexPrefix(chmacHex)) {
        return true;
    }
    return false;
}
export async function aesCbcEncrypt(data, key, iv) {
    const cryptoKey = await importKey(key, AES_ALGORITHM);
    const browserCrypto = safeGetFromWindow("crypto");
    const result = await browserCrypto.subtle.encrypt({
        iv,
        name: AES_ALGORITHM,
    }, cryptoKey, data);
    return result;
}
export async function aesCbcDecrypt(data, key, iv) {
    const cryptoKey = await importKey(key, AES_ALGORITHM);
    const browserCrypto = safeGetFromWindow("crypto");
    const result = await browserCrypto.subtle.decrypt({
        iv,
        name: AES_ALGORITHM,
    }, cryptoKey, data);
    return result;
}
export async function encrypt(data, key, providedIv) {
    if (!key) {
        throw new Error("Missing key: required for encryption");
    }
    const iv = providedIv || (await generateKey(128));
    const ivHex = convertArrayBufferToHex(iv, true);
    const contentString = JSON.stringify(data);
    const content = convertUtf8ToArrayBuffer(contentString);
    const cipherText = await aesCbcEncrypt(content, key, iv);
    const cipherTextHex = convertArrayBufferToHex(cipherText, true);
    const unsigned = concatArrayBuffers(cipherText, iv);
    const hmac = await createHmac(unsigned, key);
    const hmacHex = convertArrayBufferToHex(hmac, true);
    return {
        data: cipherTextHex,
        hmac: hmacHex,
        iv: ivHex,
    };
}
export async function decrypt(payload, key) {
    if (!key) {
        throw new Error("Missing key: required for decryption");
    }
    const verified = await verifyHmac(payload, key);
    if (!verified) {
        return null;
    }
    const cipherText = convertHexToArrayBuffer(payload.data);
    const iv = convertHexToArrayBuffer(payload.iv);
    const buffer = await aesCbcDecrypt(cipherText, key, iv);
    const utf8 = convertArrayBufferToUtf8(buffer);
    let data;
    try {
        data = JSON.parse(utf8);
    }
    catch (error) {
        return null;
    }
    return data;
}
//# sourceMappingURL=index.js.map