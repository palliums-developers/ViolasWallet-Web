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
        !(window.sessionStorage.getItem('data')) && this.props.history.push('/welcome');
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
                        <p onClick={()=>{
                            window.open('https://violas.io');
                        }}><label>{intl.get('Official Website')}</label><span>violas.io</span></p>
                        <p><label>{intl.get('Email Address')}</label><span>violas_blockchain@violas.io</span></p>
                        <p><label>{intl.get('Wechat')}</label><span></span></p>
                        <p><label>{intl.get('Telegram Group')}</label><span></span></p>
                        <p><label>{intl.get('Twitter')}</label><span></span></p>
                        <p><label>{intl.get('Facebook')}</label><span></span></p>
                    </div>
                </section>
            </div>
        );
    }
}

export default AboutUs;
