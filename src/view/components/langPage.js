import React from "react";
import "../app.scss";
import {withRouter} from 'react-router-dom';
import intl from "react-intl-universal";

//切换语言
class LangPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      changeLang: false,
      changeLangLists: [
        {
          local: "简体中文",
          lang: "CN",
        },
        {
          local: "English",
          lang: "EN",
        },
      ],
      local: "",
    };
  }
   stopPropagation(e) {
        e.nativeEvent.stopImmediatePropagation();
    }
  async componentWillMount() {
    // intl.options.currentLocale = localStorage.getItem("local");
    let lang = intl.options.currentLocale;
    switch (lang) {
      case "zh":
        this.setState({ local: "简体中文", ind: 0 });
        break;
      case "CN":
        this.setState({ local: "简体中文", ind: 0 });
        break;
      default:
        this.setState({ local: "English", ind: 1 });
        break;
    }
    
  }
  componentDidMount() {
    document.addEventListener('mouseenter', this.getMineDialog1);
    document.addEventListener('click', this.getMineDialog1);
  }
  
  changeLanguage(lang) {
    intl.options.currentLocale = lang;
    this.props.getLanguage(lang);
    this.forceUpdate();
  }
  getMineDialog = (event) => {
    this.stopPropagation(event)
    this.setState({
      changeLang: true
    });
  };
  getMineDialog1 = (event) => {
    // event.stopPropagation();
    this.setState({
       changeLang: false
      });
    
  };
   menuMouseEnterEvent = () => {
    let timeout = Number | undefined;
    clearTimeout(timeout);
    timeout = undefined;
    this.setState({
      changeLang: true,
    });
  }

  menuMouseLeaveEvent = () => {
    this.setState({
      changeLang: false,
    });
  }
  render() {
    let { local, changeLangLists } = this.state;
    return (
          <div className="changeLangList">
                {this.state.changeLang ? (
                  <div
                    className="changeLang changeLangAct"
                    onClick={(e) => this.getMineDialog(e)}
                    
                  >
                    <label>{local}</label>
                    <img src="/img/qiehuan-2 2@2x (1).png" />
                  </div>
                ) : (
                  <div
                    className="changeLang"
                    onMouseEnter={(e) => this.getMineDialog(e)}
                    // onMouseMove={(e) => this.getMineDialog(e)}
                    // onMouseLeave={(e) => this.getMineDialog1(e)}
                    onClick={(e) => this.getMineDialog(e)}
                  >
                    <label>{local}</label>
                    <img src="/img/qiehuan-2 2@2x.png" />
                  </div>
                )}
                {this.state.changeLang ? (
                  <div className="changeLangLists"
                    onMouseEnter={() => this.menuMouseEnterEvent()}
                    onMouseLeave={() => this.menuMouseLeaveEvent()}
                  >
                    {changeLangLists.map((v, i) => {
                      return (
                        <span
                          key={i}
                          className={i == this.state.ind ? "active" : ""}
                          onClick={() => {
                            this.changeLanguage(v.lang);
                            localStorage.setItem("local", v.lang);
                            this.setState({
                              local: v.local,
                              ind: i,
                              changeLang: false,
                            });
                          }}
                        >
                          {v.local}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
    );
  }
}

export default withRouter(LangPage);