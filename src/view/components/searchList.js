import React, { Component } from "react";
import "../helpCenter/index.scss";
import {withRouter} from 'react-router-dom'

class SearchList extends Component {
  constructor() {
    super();
    this.state = {
      iptVal1: "",
    };
  }
  componentDidMount() {}
  //搜索框
  inputLimit = (matClassName) => {
    let val = matClassName.replace(/[^u4e00-u9fa5w]/g, "");
    return val;
  };
  getValueFun = (e) => {
    this.setState({
      iptVal1: this.inputLimit(e.target.value),
    });
  };
  onKeyDownFun = (e) => {
    let keyCode = e.keyCode;
    let iptVal = this.inputLimit(e.target.value);
    if (keyCode == 13 && iptVal) {
      this.props.history.push("/helpCenter/searchResult?iptVal=" + iptVal);
    }
  };
  render() {
      let { iptVal1 } = this.state;
    return (
      <div className="form">
        <img src="/img/sousuo 2@2x.png" />
        <input
          maxLength="50"
          placeholder="搜索"
          value={iptVal1}
          onChange={(e) => this.getValueFun(e)}
          onKeyDown={(e) => this.onKeyDownFun(e)}
        />
      </div>
    );
  }
}

export default withRouter(SearchList);
