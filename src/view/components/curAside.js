import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

class CurAside extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  componentDidMount() {}
  showPolling = () => {
    this.props.showPolling();
  };
  render() {
    return (
      <div className="curAside">
        <h4 onClick={() => this.showPolling()}>
          <i>
            <img src="/img/编组备份 3@2x.png" />
          </i>
          币种详情
        </h4>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
  return {
    showPolling: () => {
      dispatch({
        type: "DISPLAY",
        payload: false,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurAside);
