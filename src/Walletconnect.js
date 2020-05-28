import WalletConnect from './packages/browser/src/index';
// import WalletConnect from '@walletconnect/browser';

const walletConnector = new WalletConnect({ bridge: 'https://bridge.walletconnect.org' })
class Walletconnect {
    constructor(){
    }
    QRCode() {
        if (!walletConnector.connected) {
            walletConnector.createSession().then(() => {
                const uri = walletConnector.uri;
                console.log(uri)
            })
        }
        walletConnector.on("connect", (error, payload) => {
            if (error) {
                throw error;
            }
            WalletConnectQRCodeModal.close();
            console.log('you have connected')
            const { accounts, chainId } = payload.params[0]
        })
        walletConnector.on("session_update", (error, payload) => {
            if (error) {
                throw error;
            }
            const { accounts, chainId } = payload.params[0];
        });
        walletConnector.on("disconnect", (error, payload) => {
            if (error) {
                throw error;
            }
            console.log('wallet disconnected')
        })
    }
    getAccount() {
        walletConnector.get_accounts().then(res => {
            console.log('get account ', res)
        }).catch(err => {
            console.log('get account ', err)
        })
    }
    async getSeqNumb(_address) {
        await axios(`https://api.violas.io/1.0/violas/seqnum?addr=${_address}`).then(res => {
            return res.data.data + 1
        });
    }
    async sendTransaction() {
        const seq = await this.getSeqNumb(this.state.from).then(res => {
            return res
        }).catch(err => {
            console.log(err)
        })
        const tx = {
            from: this.state.from,
            payload: {
                code: 'a11ceb0b010007014600000004000000034a0000000c000000045600000002000000055800000009000000076100000029000000068a00000010000000099a0000001200000000000001010200010101000300010101000203050a020300010900063c53454c463e0c4c696272614163636f756e740f7061795f66726f6d5f73656e646572046d61696e00000000000000000000000000000000010000ffff030005000a000b010a023e0002',
                tyArgs: [
                    '0600000000000000000000000000000000034c4252015400'
                ],
                args: [
                    {
                        type: 'Address',
                        value: this.state.address
                    },
                    {
                        type: 'Bytes',
                        value: ''
                    },
                    {
                        type: 'Number',
                        value: this.state.value
                    }
                ]
            },
            maxGasAmount: 400000,
            gasUnitPrice: 0,
            sequenceNumber: seq
        }
        walletConnector.sendTransaction(tx).then(res => {
            console.log('send transaction ', res);
        }).catch(err => {
            console.log('send transaction ', err);
        })
    }
    logout() {
        walletConnector.killSession();
    }
}

const aaa=new Walletconnect();
aaa.QRCode();

// export default Walletconnect;