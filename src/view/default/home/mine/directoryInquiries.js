import React, { Component } from 'react';

class DirectoryInquiries extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="directoryInquiries">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/home/mine')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>地址簿</span>
                    <span onClick={() => {
                        this.props.history.push('/addAddress')
                    }}><img src="/img/Close 2@2x.png"/></span>
                </header>
                <section>
                    <div className="addressList">
                        <div className="list">
                           <label>Rxx</label>
                           <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                        </div>  
                        <div className="list">
                           <label>Rxx</label>
                           <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                        </div>  
                        <div className="list">
                           <label>Rxx</label>
                           <p>mkYUsJ8N1AidNUySQGCpwswQUaoyL2Mu8L</p>
                        </div>  
                    </div>
                </section>
            </div>
        );
    }
}

export default DirectoryInquiries;
