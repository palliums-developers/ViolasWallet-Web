import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import { inject, observer } from 'mobx-react';
import intl from 'react-intl-universal';

@inject('index')
@observer

class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
           name:'',
           address:'',
           types:'',
           typeContent:['Violas','Libra','BTC'],
           ind:-1
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
        this.forceUpdate();
        !(window.localStorage.getItem('data'))&&this.props.history.push('/welcome');
    }
    componentDidMount() {
        this.setState({
            name: this.props.index.sweepCode2
        })
    }
    getValue = (e,type) =>{
        if(type == 'name'){
            this.setState({
              name:e.target.value
            })
         }else if(type == 'address'){
          this.setState({
            address:e.target.value
          })
        }
    }
    getAddress = () =>{
        this.props.history.push("/directoryInquiries");
        if(this.state.name && this.state.address){
            this.props.index.getAddressMessage()
        }
    }

    plus = () =>{
        let { name,address,types } = this.state;
        if(name == ''){
           alert(intl.get("Input your wallet type") + "!!!");
        }else if(address == ''){
           alert(intl.get("Please input address") + "!!!");
        }else if(types == ''){
           alert(intl.get("Input your wallet type") + "!!!");
        }else{
           let address_book = {
            type:types,
            name:name,
            address:address
           }
          let addressBooks = JSON.parse(window.localStorage.getItem('data'));
          addressBooks.address_book.push(address_book)
          window.localStorage.setItem('data',JSON.stringify(addressBooks));
          this.props.history.push("/directoryInquiries");
        }
    }

    render() {
        return (
          <div className="addAddress">
            <header>
              <span onClick={() => this.getAddress()}>
                <img src="/img/Combined Shape 1@2x.png" />
              </span>
              <span>{intl.get("Add Address")}</span>
            </header>
            <section>
              <div className="form">
                <div className="p">
                  <label>{intl.get("Note")}</label>
                  <div className="ipt">
                    <input
                      type="text"
                      placeholder={intl.get("Note less than 20 words")}
                      onChange={e => this.getValue(e, "name")}
                    />
                  </div>
                </div>
                <div className="line">
                  <div className="lines"></div>
                </div>
                <div className="p">
                  <label>{intl.get("Address")}</label>
                  <div className="ipt">
                    <input
                      type="text"
                      value={this.state.address}
                      placeholder={intl.get("Input address")}
                      onChange={e => this.getValue(e, "address")}
                    />
                    <div
                      className="code"
                      onClick={() => {
                        this.props.history.push("/sweepCode2");
                      }}
                    >
                      <img src="/img/code@2x.png" />
                    </div>
                  </div>
                </div>
                <div className="line">
                  <div className="lines"></div>
                </div>
                <div className="p">
                  <label>{intl.get("Type")}</label>
                  <div className="iptList">
                    {
                      this.state.typeContent.map((v,i)=>{
                        return <p className={this.state.ind == i ? 'backBl' : ''} key={i} onClick={()=>{
                          this.setState({
                            ind:i,
                            types:v
                          })
                        }}>{v}</p>
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="btn" onClick={() => this.plus()}>
                {intl.get("Add")}
              </div>
            </section>
          </div>
        );
    }
}

export default AddAddress;
