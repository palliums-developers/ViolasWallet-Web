//error
let test1 = {
    "from": "019887fd812da9fe65ab095c0aa566ef",
    "payload": {
        "code": "a11ceb0b01000701000202020403061004160205181d07356f08a4011000000001010000020001000003020301010004010300010501060c0108000506080005030a020a020005060c05030a020a020109000c4c696272614163636f756e741257697468647261774361706162696c6974791b657874726163745f77697468647261775f6361706162696c697479167061795f66726f6d5f776974685f6d657461646174611b726573746f72655f77697468647261775f6361706162696c69747900000000000000000000000000000001010104010c0b0011000c050e050a010a020b030b0438000b05110202",
        "tyArgs": ["070000000000000000000000000000000103564c5303564c5300"],
        "args": [
            { "type": "Address", "value": "d4f4001fba6d8b9e696cfd6ca8e47a91" },
            { "type": "Number", "value": 100000 },
            { "type": "Bytes", "value": "" },
            { "type": "Bytes", "value": "" }
        ],
        "gasCurrencyCode": "LBR"
    }
}

//right
let test2 = {
    "from": "d4f4001fba6d8b9e696cfd6ca8e47a91",
    "payload": {
        "code": "a11ceb0b01000701000202020403061004160205181d07356f08a4011000000001010000020001000003020301010004010300010501060c0108000506080005030a020a020005060c05030a020a020109000c4c696272614163636f756e741257697468647261774361706162696c6974791b657874726163745f77697468647261775f6361706162696c697479167061795f66726f6d5f776974685f6d657461646174611b726573746f72655f77697468647261775f6361706162696c69747900000000000000000000000000000001010104010c0b0011000c050e050a010a020b030b0438000b05110202",
        "tyArgs": ["0700000000000000000000000000000001034c4252034c425200"],
        "args": [
            { "type": "Address", "value": "d040ad00457129ecf5ead5d299627a44" },
            { "type": "Number", "value": "100" },
            { "type": "Bytes", "value": "" },
            { "type": "Bytes", "value": "" }
        ]
    }
}

//???
let test3 = {
    "from": "d4f4001fba6d8b9e696cfd6ca8e47a91",
    "payload": {
        "code": "a11ceb0b01000701000202020403061004160205181d07356f08a4011000000001010000020001000003020301010004010300010501060c0108000506080005030a020a020005060c05030a020a020109000c4c696272614163636f756e741257697468647261774361706162696c6974791b657874726163745f77697468647261775f6361706162696c697479167061795f66726f6d5f776974685f6d657461646174611b726573746f72655f77697468647261775f6361706162696c69747900000000000000000000000000000001010104010c0b0011000c050e050a010a020b030b0438000b05110202",
        "tyArgs": ["070000000000000000000000000000000103564c5303564c5300"],
        "args": [
            { "type": "Address", "value": "019887fd812da9fe65ab095c0aa566ef" },
            { "type": "Number", "value": "40000" },
            { "type": "Bytes", "value": "" },
            { "type": "Bytes", "value": "" }
        ],
        "gasCurrencyCode": "LBR"
    }
}

//right
let test4 = {
    "from": "019887fd812da9fe65ab095c0aa566ef",
    "payload": {
        "code": "a11ceb0b01000701000202020403061004160205181d07356f08a4011000000001010000020001000003020301010004010300010501060c0108000506080005030a020a020005060c05030a020a020109000c4c696272614163636f756e741257697468647261774361706162696c6974791b657874726163745f77697468647261775f6361706162696c697479167061795f66726f6d5f776974685f6d657461646174611b726573746f72655f77697468647261775f6361706162696c69747900000000000000000000000000000001010104010c0b0011000c050e050a010a020b030b0438000b05110202",
        "tyArgs": ["0700000000000000000000000000000001034c4252034c425200"],
        "args": [
            { "type": "Address", "value": "d4f4001fba6d8b9e696cfd6ca8e47a91" },
            { "type": "Number", "value": "300" },
            { "type": "Bytes", "value": "" },
            { "type": "Bytes", "value": "" }
        ]
    }
}

//??
let test5 = {
    "from": "d4f4001fba6d8b9e696cfd6ca8e47a91",
    "payload": {
        "code": "a11ceb0b01000701000202020403061004160205181d07356f08a4011000000001010000020001000003020301010004010300010501060c0108000506080005030a020a020005060c05030a020a020109000c4c696272614163636f756e741257697468647261774361706162696c6974791b657874726163745f77697468647261775f6361706162696c697479167061795f66726f6d5f776974685f6d657461646174611b726573746f72655f77697468647261775f6361706162696c69747900000000000000000000000000000001010104010c0b0011000c050e050a010a020b030b0438000b05110202",
        "tyArgs": ["070000000000000000000000000000000103564c5303564c5300"],
        "args": [
            { "type": "Address", "value": "019887fd812da9fe65ab095c0aa566ef" },
            { "type": "Number", "value": "7000" },
            { "type": "Bytes", "value": "" },
            { "type": "Bytes", "value": "" }
        ],
        "gasCurrencyCode": "LBR"
    }
}

let app = 'wc:367d168d-35e8-4d4b-9b92-93afe433d6fc@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=e9862f544dd345622849907609da96b726a96357c193e28e71cbcf8678a37841';
let tef = 'wc:367d168d-35e8-4d4b-9b92-93afe433d6fc@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=e9862f544dd345622849907609da96b726a96357c193e28e71cbcf8678a37841';

let app1 = { "cryptoLib": {}, "protocol": "wc", "version": 1, "_bridge": "https://bridge.walletconnect.org", "_key": {}, "_nextKey": null, "_clientId": "1e1d8784-c16a-45d8-b86d-b3401db76401", "_clientMeta": { "description": "", "url": "http://localhost:8000", "icons": ["http://localhost:8000/favicon.ico"], "name": "Violas Web Wallet" }, "_peerId": "", "_peerMeta": null, "_handshakeId": 1593681526142996, "_handshakeTopic": "b0a9e2ac-c86c-4b6f-a3af-111914f47e1f", "_accounts": [], "_chainId": 0, "_networkId": 0, "_rpcUrl": "", "_eventManager": { "_eventEmitters": [{ "event": "wc_sessionRequest" }, { "event": "wc_sessionUpdate" }, { "event": "connect" }, { "event": "session_update" }, { "event": "disconnect" }, { "event": "response:1593681526142996" }] }, "_connected": false, "_storage": {}, "_transport": { "_events": [{ "event": "message" }, { "event": "open" }, { "event": "close" }], "_initiating": true, "_bridge": "https://bridge.walletconnect.org", "_socket": null, "_queue": [{ "topic": "1e1d8784-c16a-45d8-b86d-b3401db76401", "type": "sub", "payload": "", "silent": true }], "_clientId": "1e1d8784-c16a-45d8-b86d-b3401db76401" } }
let tef1 = { "cryptoLib": {}, "protocol": "wc", "version": 1, "_bridge": "https://bridge.walletconnect.org", "_key": null, "_nextKey": null, "_clientId": "16e998ea-50ba-4ae5-b76f-50cfd7041a8d", "_clientMeta": null, "_peerId": "", "_peerMeta": null, "_handshakeId": 0, "_handshakeTopic": "", "_accounts": [], "_chainId": 0, "_networkId": 0, "_rpcUrl": "", "_eventManager": { "_eventEmitters": [{ "event": "wc_sessionRequest" }, { "event": "wc_sessionUpdate" }] }, "_connected": false, "_storage": {}, "_transport": { "_events": [{ "event": "message" }, { "event": "open" }, { "event": "close" }], "_initiating": true, "_bridge": "https://bridge.walletconnect.org", "_socket": null, "_queue": [{ "topic": "16e998ea-50ba-4ae5-b76f-50cfd7041a8d", "type": "sub", "payload": "", "silent": true }], "_clientId": "16e998ea-50ba-4ae5-b76f-50cfd7041a8d" } }
let trf2 = { "cryptoLib": {}, "protocol": "wc", "version": 1, "_bridge": "https://bridge.walletconnect.org", "_key": {}, "_nextKey": null, "_clientId": "1e1d8784-c16a-45d8-b86d-b3401db76401", "_clientMeta": null, "_peerId": "ead781a6-816a-4fa5-a2f7-36c3331e16d8", "_peerMeta": { "description": null, "icons": [""], "name": "violasPay", "url": "https://www.violas.io" }, "_handshakeId": 1593681526142996, "_handshakeTopic": "b0a9e2ac-c86c-4b6f-a3af-111914f47e1f", "_accounts": ["d4f4001fba6d8b9e696cfd6ca8e47a91"], "_chainId": "violasTest", "_networkId": 0, "_rpcUrl": "", "_eventManager": { "_eventEmitters": [{ "event": "response:1593681526142996" }, { "event": "wc_sessionRequest" }, { "event": "wc_sessionUpdate" }] }, "_connected": true, "_storage": {}, "_transport": { "_events": [{ "event": "message" }, { "event": "open" }, { "event": "close" }], "_initiating": true, "_bridge": "https://bridge.walletconnect.org", "_socket": null, "_queue": [{ "topic": "1e1d8784-c16a-45d8-b86d-b3401db76401", "type": "sub", "payload": "", "silent": true }], "_clientId": "1e1d8784-c16a-45d8-b86d-b3401db76401" } }

function nishiwoge(show_name, name) {
    if (show_name === 'LBR' || show_name === 'VLS' || show_name === 'BTC') {
        if (show_name === 'VLS') {
            // walletconnect
        } else {
            //判断出是LBR或BTC 扫码转账
        }
    } else { //剩下的都是稳定币
        if (name === 'coni1' || name === 'coin2') {
            //判断出都是LBR的稳定币 扫码转账
        } else {
            //剩下的都是VLS的稳定币 walletconnect
        }
    }
}

let wc1 = {
    "cryptoLib": {},
    "protocol": "wc",
    "version": 1,
    "_bridge": "https://walletconnect.violas.io",
    "_key": {},
    "_nextKey": null,
    "_clientId": "89a5954b-4ee0-438e-b337-ab58311ce218",
    "_clientMeta": null,
    "_peerId": "",
    "_peerMeta": null,
    "_handshakeId": 1596010188923233,
    "_handshakeTopic": "a93aa40a-da51-4596-8c93-c849453e2b00",
    "_accounts": [],
    "_chainId": 0,
    "_networkId": 0,
    "_rpcUrl": "",
    "_eventManager": {
        "_eventEmitters": [{ "event": "response:1596010188923233" },
        { "event": "wc_sessionRequest" },
        { "event": "wc_sessionUpdate" }]
    },
    "_connected": false,
    "_storage": {},
    "_transport": {
        "_events": [{ "event": "message" },
        { "event": "open" },
        { "event": "close" }],
        "_initiating": true,
        "_bridge": "https://walletconnect.violas.io",
        "_socket": null,
        "_queue": [{
            "topic": "89a5954b-4ee0-438e-b337-ab58311ce218",
            "type": "sub",
            "payload": "",
            "silent": true
        }],
        "_clientId": "89a5954b-4ee0-438e-b337-ab58311ce218"
    }
}
let wc2 = {
    "cryptoLib": {},
    "protocol": "wc",
    "version": 1,
    "_bridge": "https://walletconnect.violas.io",
    "_key": {},
    "_nextKey": null,
    "_clientId": "c3ee1b78-6bde-4be3-a438-bf176c939314",
    "_clientMeta": {
        "description": "",
        "url": "http://localhost:10088",
        "icons": ["http://localhost:10088/favicon.ico",
            "http://localhost:10088/logo192.png"],
        "name": "WalletConnect Demo"
    },
    "_peerId": "d4edeabb-6e35-4a06-9c75-1d3e413c4655",
    "_peerMeta": {
        "description": null,
        "icons": [""],
        "name": "violasPay",
        "url": "https://www.violas.io"
    },
    "_handshakeId": 1596010248384164,
    "_handshakeTopic": "b66e4cbd-e410-45dd-8d84-85395baa6ebc",
    "_accounts": ["d4f4001fba6d8b9e696cfd6ca8e47a91"],
    "_chainId": "violasTest",
    "_networkId": 0,
    "_rpcUrl": "",
    "_eventManager": {
        "_eventEmitters": [{ "event": "wc_sessionRequest" },
        { "event": "wc_sessionUpdate" },
        { "event": "connect" },
        { "event": "session_update" },
        { "event": "disconnect" },
        { "event": "response:1596010248384164" }]
    },
    "_connected": true,
    "_storage": {},
    "_transport": {
        "_events": [{ "event": "message" },
        { "event": "open" },
        { "event": "close" }],
        "_initiating": false,
        "_bridge": "https://walletconnect.violas.io",
        "_socket": {},
        "_queue": [],
        "_clientId": "c3ee1b78-6bde-4be3-a438-bf176c939314"
    }
}

let app01 = '{"cryptoLib":{},"protocol":"wc","version":1,"_bridge":"https://walletconnect.violas.io","_key":{},"_nextKey":null,"_clientId":"42c962ca-0448-44bd-91da-a215f1c560a8","_clientMeta":null,"_peerId":"","_peerMeta":null,"_handshakeId":1596016392089184,"_handshakeTopic":"74f70c66-26a9-4882-a375-40ad4bc04044","_accounts":[],"_chainId":0,"_networkId":0,"_rpcUrl":"","_eventManager":{"_eventEmitters":[{"event":"response:1596016392089184"},{"event":"wc_sessionRequest"},{"event":"wc_sessionUpdate"}]},"_connected":false,"_storage":{},"_transport":{"_events":[{"event":"message"},{"event":"open"},{"event":"close"}],"_initiating":true,"_bridge":"https://walletconnect.violas.io","_socket":null,"_queue":[{"topic":"42c962ca-0448-44bd-91da-a215f1c560a8","type":"sub","payload":"","silent":true}],"_clientId":"42c962ca-0448-44bd-91da-a215f1c560a8"}}'
let app02 = '{"cryptoLib":{},"protocol":"wc","version":1,"_bridge":"https://walletconnect.violas.io","_key":{},"_nextKey":null,"_clientId":"42c962ca-0448-44bd-91da-a215f1c560a8","_clientMeta":null,"_peerId":"","_peerMeta":null,"_handshakeId":1596016392089184,"_handshakeTopic":"74f70c66-26a9-4882-a375-40ad4bc04044","_accounts":[],"_chainId":0,"_networkId":0,"_rpcUrl":"","_eventManager":{"_eventEmitters":[{"event":"response:1596016392089184"},{"event":"wc_sessionRequest"},{"event":"wc_sessionUpdate"}]},"_connected":false,"_storage":{},"_transport":{"_events":[{"event":"message"},{"event":"open"},{"event":"close"}],"_initiating":true,"_bridge":"https://walletconnect.violas.io","_socket":null,"_queue":[{"topic":"42c962ca-0448-44bd-91da-a215f1c560a8","type":"sub","payload":"","silent":true}],"_clientId":"42c962ca-0448-44bd-91da-a215f1c560a8"}}'
console.log(app01 == app02);
let libra01 = '{"cryptoLib":{},"protocol":"wc","version":1,"_bridge":"https://walletconnect.violas.io","_key":{},"_nextKey":null,"_clientId":"42c962ca-0448-44bd-91da-a215f1c560a8","_clientMeta":null,"_peerId":"","_peerMeta":null,"_handshakeId":1596016392089184,"_handshakeTopic":"74f70c66-26a9-4882-a375-40ad4bc04044","_accounts":[],"_chainId":0,"_networkId":0,"_rpcUrl":"","_eventManager":{"_eventEmitters":[{"event":"response:1596016392089184"},{"event":"wc_sessionRequest"},{"event":"wc_sessionUpdate"}]},"_connected":false,"_storage":{},"_transport":{"_events":[{"event":"message"},{"event":"open"},{"event":"close"}],"_initiating":true,"_bridge":"https://walletconnect.violas.io","_socket":null,"_queue":[{"topic":"42c962ca-0448-44bd-91da-a215f1c560a8","type":"sub","payload":"","silent":true}],"_clientId":"42c962ca-0448-44bd-91da-a215f1c560a8"}}'
console.log(app01 == libra01);
let app03 = '{"cryptoLib":{},"protocol":"wc","version":1,"_bridge":"https://walletconnect.violas.io","_key":{},"_nextKey":null,"_clientId":"42c962ca-0448-44bd-91da-a215f1c560a8","_clientMeta":{"description":"","url":"http://localhost:10088","icons":["http://localhost:10088/favicon.ico","http://localhost:10088/logo192.png"],"name":"WalletConnect Demo"},"_peerId":"0a22e918-0cf4-44a6-8b1c-93fcd1ec0468","_peerMeta":{"description":null,"icons":[""],"name":"violasPay","url":"https://www.violas.io"},"_handshakeId":1596016392089184,"_handshakeTopic":"74f70c66-26a9-4882-a375-40ad4bc04044","_accounts":["d4f4001fba6d8b9e696cfd6ca8e47a91"],"_chainId":"violasTest","_networkId":0,"_rpcUrl":"","_eventManager":{"_eventEmitters":[{"event":"response:1596016392089184"},{"event":"wc_sessionRequest"},{"event":"wc_sessionUpdate"},{"event":"connect"},{"event":"session_update"},{"event":"disconnect"}]},"_connected":true,"_storage":{},"_transport":{"_events":[{"event":"message"},{"event":"open"},{"event":"close"}],"_initiating":false,"_bridge":"https://walletconnect.violas.io","_socket":{},"_queue":[],"_clientId":"42c962ca-0448-44bd-91da-a215f1c560a8"}}'
let qwe = {
    "VLS": 3000,
    "VLSUSD": 4000,
    "VLSEUR": 4010,
    "VLSSGD": 4020,
    "VLSGBP": 4030,
    "USD": '0x5000',
    "EUR": 0x5010,
    "SGD": 0x5020,
    "GBP": 0x5030
};
let type = '';
for (let key in qwe) {
    if (key === 'USD') {
        console.log(key)
        type = qwe[key]
        break;
    }
}
console.log(type.split('x')[1])

let script1 = "6a3c76696f6c617300034010null00015966194742590000000000000000000000000000000100000000000000110000";
let script2 = "6a3c76696f6c617300034010d4f4001fba6d8b9e696cfd6ca8e47a9100000173bdefc5530000000000000000000000000000000100000000000000010000"
let script3 = "6a3c76696f6c617300034010d4f4001fba6d8b9e696cfd6ca8e47a9100015966198693950000000000000000000000000000000100000000000000110000"
let script4 = "6a3c76696f6c617300034010d4f4001fba6d8b9e696cfd6ca8e47a9100000173bdf5ccd30000000000000000000000000000000100000000000000010000"

let aaa1 = '7b22666c6167223a2276696f6c6173222c2274797065223a2276326c757364222c22746f5f61646472657373223a2230303030303030303030303030303030303030303030303030303030303030306631663931356266376334333033313737623861633231623835306361646362222c227374617465223a227374617274222c226f75745f616d6f756e74223a3538373137352c2274696d6573223a31307d'
let aaa2 = '7b22666c6167223a2276696f6c6173222c2274797065223a2276326c757364222c2274696d6573223a302c22746f5f61646472657373223a2230303030303030303030303030303030303030303030303030303030303030306434663430303166626136643862396536393663666436636138653437613931222c226f75745f616d6f756e74223a383339352c227374617465223a227374617274227d'

let scri1 = '6a3c76696f6c617300034000d4f4001fba6d8b9e696cfd6ca8e47a910000017400be57480000000000000000000000000000000100000000000000230000'
let scri2 = '6a3c76696f6c617300034000d4f4001fba6d8b9e696cfd6ca8e47a9100015977403082960000000000000000000000000000000100000000000000350000'
let scri3 = '6a3c76696f6c617300034000d4f4001fba6d8b9e696cfd6ca8e47a9100015977420618570000000000000000000000000000000100000000000000230000'

let aug_19_1='6a3c76696f6c617300034000d4f4001fba6d8b9e696cfd6ca8e47a9100000174058fb8ac0000000000000000000000000000000100000000000000390000'
let aug_19_2='6a3c76696f6c617300034000d4f4001fba6d8b9e696cfd6ca8e47a9100015978211391160000000000000000000000000000000100000000000000390000'

let aug_19_3='6a3c76696f6c617300033000d4f4001fba6d8b9e696cfd6ca8e47a910000017405d29a670000000000000000000000000000000100000000000001310000'
let aug_19_4='6a3c76696f6c617300033000myvep7AM2SDfPjgCtoCSjB6piSMrjUpW5x00015978255222790000000000000000000000000000000100000000000001310000'
let aug_19_5='6a3c76696f6c617300033000d4f4001fba6d8b9e696cfd6ca8e47a9100015978258985930000000000000000000000000000000100000000000001310000'
