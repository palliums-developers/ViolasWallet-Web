import React, { Component } from "react";
// import "./app.scss";
import QRCode from "qrcode.react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class TransfarDialog extends Component {
  constructor(props) {
    super()
    this.state = {
      title: ''
    }
  }
  componentDidMount() {
    // if (this.props.location.pathname.split("/")[5]) {
    //   let type = this.props.location.pathname.split("/")[5];
    //   this.setState({
    //     title: type
    //   })
    // }

  }

  render() {
    let { title } = this.state;
    let { address, amount } = this.props;
    return (
      <div className="transfarDialog">
        <div className="dialogContent">
          <h4>Please confirm the transfer information on the ViolasPay</h4>
          <div className="qrCode">
            <QRCode value={title + ':' + address + '?amount=' + amount}></QRCode>
          </div>
          <div className="del" onClick={() => {
            this.props.getDisplays()
          }}><img src="/img/del.png" /></div>
        </div>
      </div>
    )
  }
}
let mapStateToProps = (state) => {
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) => {
  return {
    getDisplays: () => {
      dispatch({
        type: 'EXCHANGE',
        params: {
          type: false
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TransfarDialog));