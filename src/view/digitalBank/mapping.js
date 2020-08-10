import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

//映射
class DigitalBank extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {}

  render() {
    let { routes } = this.props;
    return (
      <div className="mapping">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <NavLink to="/homepage"> <img src="/img/fanhui 2@2x.png" />
              钱包</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/homepage/home/digitalBank/mapping">映射</NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        ,
      </div>
    );
  }
}

export default DigitalBank;
