import React, { Component } from 'react';
import intl from 'react-intl-universal';

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    componentDidMount() {
        !(window.localStorage.getItem('data')) && this.props.history.push('/welcome');
    }
    render() {
        return (
            <div className="aboutUs">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/setting')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('About Us')}</span>
                </header>
                <section>
                    <div className="headDescr">
                        <div className="logo"><img src="/img/mLogo@2x.png" /></div>
                        <h4>Violas 1.0.0</h4>
                    </div>
                    <div className="aboutList">
                        <p><label>{intl.get('Official Website')}</label><span>violas.io</span></p>
                        <p><label>{intl.get('Email Address')}</label><span>violas.io</span></p>
                        <p><label>{intl.get('Wechat')}</label><span>x x x</span></p>
                        <p><label>{intl.get('Telegram Group')}</label><span>xxxxx</span></p>
                        <p><label>{intl.get('Twitter')}</label><span>xxxxxx</span></p>
                        <p><label>{intl.get('Facebook')}</label><span>xxxxxx</span></p>
                    </div>
                </section>
            </div>
        );
    }
}

export default AboutUs;
