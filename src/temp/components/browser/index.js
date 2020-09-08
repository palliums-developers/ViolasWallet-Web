import Connector from "@walletconnect/core";
import { logDeprecationWarning } from "@walletconnect/utils";
import * as cryptoLib from "../helpers/browser-crypto/index";
class WalletConnect extends Connector {
    constructor(connectorOpts) {
        super({
            cryptoLib,
            connectorOpts,
            clientMeta: connectorOpts.clientMeta,
        });
        logDeprecationWarning();
    }
}
export default WalletConnect;
//# sourceMappingURL=index.js.map