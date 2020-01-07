import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import intl from 'react-intl-universal';

@inject("index")
@observer
class DirectoryInquiries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    };
  }
  componentWillMount() {
    intl.options.currentLocale = localStorage.getItem("local");
  }
  async componentDidMount() {
    !window.sessionStorage.getItem("data") && this.props.history.push("/welcome");
  }
  deleteFun = ind => {
    let userInfo = JSON.parse(window.sessionStorage.getItem("data"));
    let address_book = JSON.parse(window.sessionStorage.getItem("data"))
      .address_book;
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
    window.sessionStorage.setItem("data", JSON.stringify(data));
    this.forceUpdate();
  };
  render() {
    return (
      window.sessionStorage.getItem("data") &&
      <div className="directoryInquiries">
        <header>
          <span
            onClick={() => {
              this.props.history.push("/home/mine");
            }}
          >
            <img src="/img/Combined Shape 1@2x.png" />
          </span>
          <span>{intl.get("Address Book")}</span>
          <span
            onClick={() => {
              this.props.history.push({
                pathname: "/addAddress",
                state: {
                  path: "directoryInquiries"
                }
              });
            }}
          >
            <img src="/img/Close 2@2x.png" />
          </span>
        </header>
        <section>
          <div className="addressList">
            {JSON.parse(window.sessionStorage.getItem("data")).address_book &&
              JSON.parse(window.sessionStorage.getItem("data")).address_book.map(
                (v, i) => {
                  return (
                    <div className="list" key={i}>
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

export default DirectoryInquiries;
