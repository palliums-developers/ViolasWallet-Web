import { IWalletConnectSession } from "../../types";
declare class SessionStorage {
  storageId: string;
  getSession(): IWalletConnectSession | null;
  setSession(session: IWalletConnectSession): IWalletConnectSession;
  removeSession(): void;
}
export default SessionStorage;
//# sourceMappingURL=storage.d.ts.map
