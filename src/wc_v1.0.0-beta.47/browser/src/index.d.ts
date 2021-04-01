import Connector from '../../core/src/index';
import { IWalletConnectOptions } from '../../types';
declare class WalletConnect extends Connector {
    constructor(opts: IWalletConnectOptions);
}
export default WalletConnect;
