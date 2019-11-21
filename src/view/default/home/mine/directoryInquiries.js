import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';

@inject('index')
@observer

class DirectoryInquiries extends Component {
    constructor(props) {
        super(props);
        this.state = {
           addresses:[]
        }
    }
    async componentDidMount(){
        let data = await this.props.index.autoAddress();
        this.setState({
            addresses:data
        })
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
                        {
                            JSON.parse(window.localStorage.getItem('data')).address_book && JSON.parse(window.localStorage.getItem('data')).address_book.map((v,i)=>{
                               return <div className="list" key={i}>
                               <label>{v.name}</label>
                               <p>{v.address}</p>
                            </div>  
                            })
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default DirectoryInquiries;
