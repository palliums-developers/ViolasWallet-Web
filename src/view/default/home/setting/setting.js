import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import intl from 'react-intl-universal'

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
        !(window.localStorage.getItem('data'))&&this.props.history.push('/welcome'); 
    }

    render() {
        return (
            <div className="setting">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/home/mine')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Settings')}</span>
                </header>
                <section>
                    <div className="headDescr">
                        <div className="logo"><img src="/img/mLogo@2x.png" /></div>
                        <h4>Violas 1.0.0</h4>
                    </div>
                    <ul className="userList">
                        <li onClick={() => {
                            this.props.history.push('/multiLanguage')
                        }}>
                            <p>{intl.get('multiLanguage')}</p>
                            <span><img src="/img/路径复制 10@2x.png" /></span>
                        </li>
                        <div className="lines">
                            <span className="line"></span>
                        </div>
                        <li onClick={() => {
                            this.props.history.push('/service')
                        }}>
                            <p>{intl.get('Service Agreement')}</p>
                            <span><img src="/img/路径复制 10@2x.png" /></span>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/aboutUs')
                        }}>
                            <p>{intl.get('About Us')}</p>
                            <span><img src="/img/路径复制 10@2x.png" /></span>
                        </li>
                        <li onClick={() => {
                            this.props.history.push('/feekBack')
                        }}>
                            <p>{intl.get('Help&Feedback')}</p>
                            <span><img src="/img/路径复制 10@2x.png" /></span>
                        </li>
                    </ul>
                </section>
            </div>
        );
    }
}

export default Setting;
