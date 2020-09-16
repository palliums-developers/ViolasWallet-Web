import React, { Component } from "react";
import '../app.scss'
class WalletconnectDialog extends Component {
  constructor() {
    super();
    this.state = {
     
    };
  }
  componentDidMount() {

  }
 
  render() {
    return (
      <div className="walDialog">
        <div>
          <h3>
            请在移动端进行校验
            <img
              src="/img/guanbi-2 2@2x.png"
              onClick={() => this.props.getCloseWallet(false)}
            />
          </h3>
          <img src="/img/shouji 2@2x.png" />
        </div>
      </div>
    );
  }
}


export default WalletconnectDialog;
