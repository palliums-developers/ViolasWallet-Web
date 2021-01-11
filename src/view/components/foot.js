import React, { Component } from "react";
import LangPage from "../components/langPage";
import intl from "react-intl-universal";
import "../helpCenter/index.scss";
import {withRouter} from "react-router-dom";

class Foot extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
          <div className="foot">
            <p
              onClick={() => {
                this.props.history.push("/helpCenter/helpCenterIndex");
              }}
            >
              帮助中心
            </p>
            <LangPage getLanguage={this.getLanguage}></LangPage>
          </div>
        );
    }
}
 
export default withRouter(Foot);