import React, { Component } from 'react';

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    componentDidMount(){
       
    }
    
    render() {
        
        return (
            <div className="aboutUs">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/setting')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>关于我们</span>
                </header>
                <section>
                    <div className="headDescr">
                        <div className="logo"><img src="/img/mLogo@2x.png"/></div>
                        <h4>Violas 1.0.0</h4>
                    </div>
                    <div className="aboutList">
                        <p><label>官方网站</label><span>violas.io</span></p>
                        <p><label>邮箱</label><span>violas.io</span></p>
                        <p><label>微信</label><span>x x x</span></p>
                        <p><label>QQ</label><span>xxxxx</span></p>
                        <p><label>微博</label><span>xxxxxxx</span></p>
                        <p><label>Telegram电报群</label><span>xxxxx</span></p>
                        <p><label>Twitter</label><span>xxxxxx</span></p>
                        <p><label>Facebook</label><span>xxxxxx</span></p>
                    </div>
                </section>
            </div>
        );
    }
}

export default AboutUs;
