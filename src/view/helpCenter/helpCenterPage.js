import React, { Component } from "react";
import LangPage from "../components/langPage";
import intl from "react-intl-universal";
import "./index.scss";
import RouterView from "../../router/routerView";
let helpCenterUrl = "http://192.168.1.119:5000";

class HelpCenterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    // this.firstPage();
  }
  firstPage = () => {
    fetch(
      helpCenterUrl +
        "/api/help_center?type=homepage&key=1&language=" +
        localStorage.getItem("local").toLowerCase()
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
         
        }
      });
  };
  getLanguage = (val) => {
    intl.options.currentLocale = val;
    this.forceUpdate();
  };
  render() {
    let { routes } = this.props;
    return (
      <div className="HelpCenterWrap">
        <div className="head">
          <div>
            <img
              className="logo"
              src="/img/编组 8@2x.png"
              onClick={() => {
                this.props.history.push("/homepage/home");
              }}
            />
            <div className="applys">
              <p>提交请求</p>
              <LangPage getLanguage={this.getLanguage}></LangPage>
            </div>
          </div>
        </div>
        <RouterView routes={routes}></RouterView>
      </div>
    );
  }
}

export default HelpCenterPage;
