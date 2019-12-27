import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import intl from 'react-intl-universal';

@inject("index")
@observer

class DirectoryInquiries1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      address_book:[]
    };
  }
  componentWillMount() {
    intl.options.currentLocale = localStorage.getItem("local");
  }
  componentDidMount(){
    let userInfo = JSON.parse(window.localStorage.getItem("data"));
    if (this.props.location.state.type) {
      if (this.props.location.state.type == "officialCoin") {
        if (window.localStorage.getItem("type") == intl.get("ViolasWallet")) {
          let arr = userInfo.address_book.filter(v => {
            if (
              v.type.indexOf(window.localStorage.getItem("type").slice(0, 3)) ==
              0
            ) {
              return v.type;
            }
          });
          this.setState({
            address_book: arr
          });
        } else if (
          window.localStorage.getItem("type") == intl.get("LibraWallet")
        ) {
          let arr = userInfo.address_book.filter(v => {
            if (
              v.type.indexOf(window.localStorage.getItem("type").slice(0, 3)) ==
              0
            ) {
              return v.type;
            }
          });
          this.setState({
            address_book: arr
          });
        } else if (
          window.localStorage.getItem("type") == intl.get("BTCWallet")
        ) {
          let arr = userInfo.address_book.filter(v => {
            if (v.type.indexOf(window.localStorage.getItem("type")) == 0) {
              return v.type;
            }
          });
          this.setState({
            address_book: arr
          });
        }
      } else if (this.props.location.state.type == "stableCoin") {
        if (window.localStorage.getItem("type") == intl.get("ViolasWallet")) {
          let arr = userInfo.address_book.filter(v => {
            if (
              v.type.indexOf(window.localStorage.getItem("type").slice(0, 3)) ==
              0
            ) {
              return v.type;
            }
          });
          this.setState({
            address_book: arr
          });
        }
      }
    }
  }
  deleteFun = (ind) =>{
    let userInfo = JSON.parse(window.localStorage.getItem("data"));
    let address_book = JSON.parse(window.localStorage.getItem("data")).address_book;
    address_book.splice(ind, 1);
    let data = {
      name: userInfo.name,
      password1: userInfo.password1,
      mne_arr: userInfo.mne_arr,
      wallet_name: userInfo.wallet_name,
      extra_wallet: userInfo.extra_wallet,
      address_book: address_book,
      backup: userInfo.backup
    };
    window.localStorage.setItem("data",JSON.stringify(data));
    this.forceUpdate();
  }
  getEvery = (addr) =>{
    if (this.props.location.state.type) {
      if (this.props.location.state.type == "officialCoin") {
        if (window.localStorage.getItem("type") == intl.get("ViolasWallet")) {
          this.props.index.getAddress({
            type: "vtoken",
            address: addr
          });
          this.props.history.push("/transfar");
        } else if (
          window.localStorage.getItem("type") == intl.get("LibraWallet")
        ) {
          this.props.index.getAddress({
            type: "libra",
            address: addr
          });
          this.props.history.push("/transfar");
        } else if (
          window.localStorage.getItem("type") == intl.get("BTCWallet")
        ) {
          this.props.index.getAddress({
            type: "bitcoin",
            address: addr
          });
          this.props.history.push("/transfar");
        }
      } else if (this.props.location.state.type == "stableCoin") {
        this.props.index.getAddress1({
          type: "vtoken",
          address: addr
        });
        this.props.history.push("/transfar1");
      }
    }
    
  }
  render() {
    return (
      <div className="directoryInquiries">
        <header>
          <span
            onClick={() => {
              this.props.location.state.type && this.props.location.state.type ==
              "officialCoin"
                ? this.props.history.push({
                    pathname: "/transfar",
                    state: {
                      type: this.props.location.state.type
                    }
                  })
                : this.props.history.push({
                    pathname: "/transfar1",
                    state: {
                      type: this.props.location.state.type
                    }
                  });
            }}
          >
            <img src="/img/Combined Shape 1@2x.png" />
          </span>
          <span>{intl.get("Address Book")}</span>
          <span>
            {/* <img src="/img/Close 2@2x.png" /> */}
          </span>
        </header>
        <section>
          <div className="addressList">
            {this.state.address_book &&
              this.state.address_book.map(
                (v, i) => {
                  return (
                    <div className="list" key={i} onClick={()=>this.getEvery(v.address)}>
                      <div>
                        <label>{v.name}</label>
                        <span onClick={() => this.deleteFun(i)}>
                          {intl.get("Delete")}
                        </span>
                      </div>
                      <p>{v.address}</p>
                    </div>
                  );
                }
              )}
          </div>
        </section>
      </div>
    );
  }
}

export default DirectoryInquiries1;
