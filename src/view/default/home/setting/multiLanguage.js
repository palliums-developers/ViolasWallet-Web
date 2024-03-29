import React, { Component } from 'react';
import intl from 'react-intl-universal';

class MultiLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        !(window.sessionStorage.getItem('data'))&&this.props.history.push('/welcome');
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
        this.forceUpdate();
    }

    changeLang(lang) {
        intl.options.currentLocale = lang;
        this.forceUpdate();
    }
    render() {

        return (
            <div className="multiLanguage">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/setting')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('multiLanguage')}</span>
                </header>
                <section>
                    <div className="list">
                        <div className="languageList" onClick={() => {
                            this.changeLang('CN');
                            localStorage.setItem('local', 'CN');
                            window.localStorage.setItem('type',intl.get('ViolasWallet'))
                        }}>
                            <h4>{intl.get('Simplified Chinese')}</h4>
                            <span className={localStorage.getItem('local') == 'CN' ? 'act' : ''}></span>
                        </div>
                        <div className="line"></div>
                        <div className="languageList" onClick={() => {
                            this.changeLang('EN');
                            localStorage.setItem('local', 'EN');
                            window.localStorage.setItem('type',intl.get('ViolasWallet'))
                        }}>
                            <h4>{intl.get('English')}</h4>
                            <span className={localStorage.getItem('local') == 'EN' ? 'act' : ''}></span>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default MultiLanguage;
