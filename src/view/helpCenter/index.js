import React, { Component } from "react";
import LangPage from "../components/langPage";
import Foot from "../components/foot";
import intl from "react-intl-universal";
import "./index.scss";
let url1 = "https://api4.violas.io"
let helpCenterUrl ='http://192.168.1.119:5000'

class HelpCenterIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      recommend: [],
      iptVal: "",
    };
  }
  componentDidMount() {
    this.firstPage();
  }
  firstPage = () => {
    fetch(
      helpCenterUrl +
        "/api/help_center?type=homepage&key=1&language=" +
        localStorage.getItem("local").toLowerCase()
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res,'........')
        if (res) {
          this.setState({
            category: res.category,
            recommend: res.recommend,
          });
        }
      });
  };

  getLanguage = (val) => {
    intl.options.currentLocale = val;
    this.forceUpdate();
  };
  goToEveryPage = (v, id) => {
    if (v == "Notification Center") {
      this.props.history.push("/helpCenter/newsCenter?id=" + id);
    } else if (v == "Q&A") {
      this.props.history.push("/helpCenter/FAQuestion?id=" + id);
    } else if (v == "About Violas") {
      this.props.history.push("/helpCenter/aboutViolasPage?id=" + id);
    } else if (v == "Digital Currency") {
      this.props.history.push("/helpCenter/digitalCashPage?id=" + id);
    } else if (v == "Platform Agreement") {
      this.props.history.push("/helpCenter/platformAgreement?id=" + id);
    }
  };
  //搜索框
  inputLimit = (matClassName) => {
    let val = matClassName.replace(/[^u4e00-u9fa5w]/g, "");
    return val;
  };
  getValueFun = (e) => {
    this.setState({
      iptVal: this.inputLimit(e.target.value),
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
    let { category, recommend, iptVal } = this.state;
    // console.log(category);
    return (
      <div className="HelpCenterContent">
        <div>
          <div className="formBox">
            <div className="form">
              <img src="/img/sousuo 2@2x.png" />
              <input
                value={iptVal}
                maxLength="50"
                placeholder="搜索"
                onChange={(e) => this.getValueFun(e)}
                onKeyDown={(e) => this.onKeyDownFun(e)}
              />
            </div>
          </div>
          <div className="contentBox">
            <div className="titleList">
              {category.map((v, i) => {
                return (
                  <p key={i} onClick={() => this.goToEveryPage(v.name, v.id)}>
                    {v.name}
                  </p>
                );
              })}

              {/* <div dangerouslySetInnerHTML={{__html:'<h1>qqq</h1>'}}></div> */}
            </div>
            <div className="contentList">
              <h3>公告推荐</h3>
              <div className="list">
                {recommend.map((v, i) => {
                  return (
                    <div key={i}>
                      <p
                        onClick={() => {
                          this.props.history.push(
                            "/helpCenter/allDetails?id=" + v.id
                          );
                        }}
                      >
                        {v.title}
                      </p>
                      <div className="line"></div>
                    </div>

                    // <div className="line"></div>
                    // <>
                    // <div
                    //   key={i}
                    //   dangerouslySetInnerHTML={{
                    //     __html: v.content_cn,
                    //   }}
                    // >
                    // </div>
                    //   <div className="line"></div>
                    //   </>
                  );
                })}
              </div>
            </div>
          </div>
          <Foot></Foot>
        </div>
      </div>
    );
  }
}
 
export default HelpCenterIndex;