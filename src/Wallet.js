import React from 'react';
import './App.css';

import WalletConnect1 from '@walletconnect/browser'
import WalletConnectQRCodeModal1 from '@walletconnect/qrcode-modal'

const walletConnector = new WalletConnect1({ bridge: 'https://bridge.walletconnect.org' })
class Wallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bridge: 'https://bridge.walletconnect.org',
            walletConnect: null,
        }
    }
    async componentDidMount() {
        // this.setState = ({ walletConnect: new WalletConnect({ bridge: this.state.bridge }) })
        this.checkNotificationPermission();
        // console.log(walletConnector.peerId())
    }
    QRCode1() {
        const walletConnector1 = new WalletConnect1({ bridge: 'https://bridge.walletconnect.org' })
        if (!walletConnector1.connected) {
            walletConnector1.createSession().then(() => {
                const uri = walletConnector1.uri;
                console.log(uri)
                WalletConnectQRCodeModal1.open(uri, () => {
                    console.log('QRCode closed')
                });
            });
        }
        walletConnector1.on('connect', (error, payload) => {
            if (error) {
                throw error
            }
            WalletConnectQRCodeModal1.close();
            const { accounts, chainId } = payload.params[0];
            console.log(accounts, ' ', chainId);
        });
        walletConnector1.on("session_update", (error, payload) => {
            if (error) {
                throw error;
            }
            const { accounts, chainId } = payload.params[0]
            console.log(accounts, ' ', chainId);
        });
    }
    sendTransaction1() {
        const tx = {
            from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
            to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
            data: "0x", // Required
            gasPrice: "0x02540be400", // Optional
            gasLimit: "0x9c40", // Optional
            value: "0x00", // Optional
            nonce: "0x0114" // Optional
        };
        // Send transaction
        walletConnector
            .sendTransaction(tx)
            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }
    logout1() {
        walletConnector.on("disconnect", (error, payload) => {
            if (error) {
                throw error;
            }
        })
        walletConnector.killSession();
    }
    checkNotificationPermission() {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                console.log('we are granted')
            } else {
                Notification.requestPermission().then(res => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
    showNotification() {
        let title = 'This is title';
        let delayTime = Date.now() + 120000;
        let options = {
            body: 'This is body',
            data: { prop1: 123, prop2: 'wryyyyyyyyy' },
            lang: "en-US",
            icon: '../public/logo192.png',
            timestamp: delayTime,
            vibrate: [100, 200, 100],
        };
        let myNotification = new Notification(title, options);
        myNotification.addEventListener('show', function (ev) {
            console.log('show', ev.currentTarget.data);
        });
        myNotification.addEventListener('close', function (ev) {
            console.log('close', ev.currentTarget.body)
        });
        setTimeout(myNotification.close.bind(myNotification), 3000)
    }
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <button onClick={this.showNotification}>Show Notification</button>
                    <button onClick={this.QRCode1}>walletConnect QRCode</button>
                    <button onClick={this.sendTransaction1}>walletConnect QRCode</button>
                    <button onClick={this.logout1}>walletConnect log out</button>
                </header>
            </div>
        )
    }
}
export default Wallet;
