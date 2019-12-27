import React, { Component } from 'react';
// import { creat_account_mnemonic,get_address } from '../../../utils/kulap-function'
import intl from 'react-intl-universal'
let aes256 = require('aes256');


class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    saveJson = async () => {
        let userInfo = JSON.parse(window.localStorage.getItem('data'));

        let data = {
            name: userInfo.name,
            password1: userInfo.password1,
            mne_arr: userInfo.mne_arr,
            wallet_name: userInfo.wallet_name,
            extra_wallet: userInfo.extra_wallet,
            address_book: userInfo.address_book,
            backup: userInfo.backup
        }
        var jsonData = aes256.encrypt(userInfo.password1, JSON.stringify(data));
        var a = document.createElement("a");
        var file = new Blob([jsonData], { type: 'text/plain' });
        a.href = URL.createObjectURL(file);
        a.download = userInfo.name + '.json';
        a.click();
        await window.localStorage.clear();
        await this.props.history.push('/app')
    }

    render() {
        return (
            <div className="mine">
                <header>
                    <div className="headLogo"><img src="/img/编组复制 18备份 2@2x.png" /></div>
                    <span>{JSON.parse(window.localStorage.getItem('data')).name}</span>
                </header>
                <section>
                    <ul className="userList">
                        <li onClick={() => {
                            this.props.history.push('/dailyCash')
                        }}>
                            <span><img src="/img/编组1@2x.png" /></span>
                            <p>{intl.get('Manage Wallet')}</p>
                            <span><img src="/img/路径复制 10@2x.png" /></span>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/directoryInquiries')
                        }}>
                            <span><img src="/img/编组 62@2x.png" /></span>
                            <p>{intl.get('Address Book')}</p>
                            <span><img src="/img/路径复制 10@2x.png" /></span>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/setting')
                        }}>
                            <span><img src="/img/setting@2x.png" /></span>
                            <p>{intl.get('Settings')}</p>
                            <span><img src="/img/路径复制 10@2x.png" /></span>
                        </li>
                    </ul>
                    <div className="btn" onClick={() => this.saveJson()}>{intl.get('Logout')}</div>

                </section>
            </div>
        );
    }
}

export default Mine;
