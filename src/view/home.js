import React from "react";
import "./app.scss";
import { connect } from "react-redux";
import RouterView from "../router/routerView";
import WalletConnect from "../packages/browser/src/index";
import intl from "react-intl-universal";
import Head from "./components/head";
import LangPage from "./components/langPage";
import { Badge } from "antd";
import firebase from "firebase/app";
import "firebase/firebase-messaging";
import axios from "axios";
let url = "https://api4.violas.io";
let url1 = "https://api.violas.io";
//首页
class Home extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      // bridge: "http://47.52.66.26:5000",
      bridge: "https://walletconnect.violas.io",
      walletConnector: {},
      active: "",
      showMineDialog: false,
      ind: 0,
      ifMobile: false,
      firebaseConfig: {
        apiKey: "AIzaSyBG0qOh-LEIWpZk6CpArRxz0HuGUd2HzlE",
        authDomain: "violas-push-server.firebaseapp.com",
        projectId: "violas-push-server",
        storageBucket: "violas-push-server.appspot.com",
        messagingSenderId: "675290848213",
        appId: "1:675290848213:web:d7d30fb87f4e39e38fbb5c",
        measurementId: "G-15RHVC9K78",
      },
      message: "",
      private_key:
        "BBdwIYTO0CyiJz9XQJInZhaDxlSaDsdgXbsxFnbd_qUMleNCY_3wCAIa4gWYp9gYwJ6JTimYBKUFzjStR6aFlaE",
      token: "",
      firebase_token:"",
      violas_server: "https://api4.violas.io",
      violas_register: "/1.0/violas/device/info",
      address: "e8da60ef0f4cf18c324527f48b06c7e9",
      language: "en", // en cn
      unreadCount:0

    };
  }
  getMineDialog = (event) => {
    // event.stopPropagation();
    this.setState({
      showMineDialog: !this.state.showMineDialog,
    });
  };

  async componentWillMount() {
    await this.getNewWalletConnect();
    await this.initialPage();
    await this.getNotificationPermission();
    await this.setState({ token: await this.getToken() }); 
    
    await this.sendToken();
    await this.getUnreadCount();
    await this.getMessage();
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      window.localStorage.clear();
      window.sessionStorage.clear();
      // this.props.history.push('/app')
    });
  }
  //获取未读消息数
  getUnreadCount() {
    fetch(
      url +
        "/1.0/violas/messages/unread/count?token=" +
        window.sessionStorage.getItem("firebase_token")
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if(res.data){
          this.setState({
            unreadCount:res.data.notice+res.data.message
          });
        }
      });
  }
  componentWillUnmount = () => {
    this.setTokenSentToServer(false);
  };
  initialPage = async () => {
    if (!firebase.apps.length) {
      // firebase.initializeApp(config);
      firebase.initializeApp(this.state.firebaseConfig);
    }
  };
  getNotificationPermission = () => {
    let temp_messaging = firebase.messaging();
    temp_messaging
      .requestPermission()
      .then(() => {
        console.log("have permission");
      })
      .catch((err) => {
        console.log("Error Occurred " + err);
      });
  };
  getToken = () => {
    let temp_messaging = firebase.messaging();
    return temp_messaging
      .getToken()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("Error Occurred " + err);
      });
  };
  sendToken = () => {
    if (this.state.token) {
      this.sendTokenToServer(this.state.token);
      // updateUIForPushEnabled(this.state.token);
    } else {
      // Show permission request.
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // Show permission UI.
      // updateUIForPushPermissionRequired();
      this.setTokenSentToServer(false);
    }
  };
  register = () => {
    let post_data = {
      address: window.sessionStorage.getItem("violas_address"),
      fcm_token: this.state.token,
      platform: "web",
      language: this.state.language,
    };
    axios
      .post(this.state.violas_server + this.state.violas_register, post_data)
      .then((res) => {
        if (res.data.code === 2000) {
          window.sessionStorage.setItem(
            "firebase_token",
            res.data && res.data.data.token
          );
          this.setState({
            firebase_token: res.data.data.token,
          });
          console.log("send token successed");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
  getMessage = () => {
    let temp_messaging = firebase.messaging();
    temp_messaging.onMessage(async (payload) => {
      console.log("on message: " + JSON.stringify(payload.data));
      await this.setState({ message: payload });
      await this.showNotification();
    });
  };
  setTokenSentToServer = (sent) => {
    window.localStorage.setItem("sentToServer", sent ? "1" : "0");
  };
  sendTokenToServer = (currentToken) => {
    if (!this.isTokenSentToServer()) {
      console.log("Sending token to server...");
      this.register();
      this.setTokenSentToServer(true);
    } else {
      console.log(
        "Token already sent to server so won't send it again " +
          "unless it changes"
      );
    }
  };
  isTokenSentToServer = () => {
    return window.localStorage.getItem("sentToServer") === "1";
  };
  checkNotificationPermission() {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        console.log("we are granted");
      } else {
        Notification.requestPermission()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
  showNotification() {
    let { message } = this.state;
    console.log(message, "message");
    this.checkNotificationPermission();
    let title = message.notification.title;
    let delayTime = Date.now() + 120000;
    let options = {
      body: message.notification.body,
      data: { prop1: 123, prop2: "wryyyyyyyyy" },
      lang: "en-US",
      icon: "/images/hexiangu.jpg",
      timestamp: delayTime,
      vibrate: [100, 200, 100],
    };
    let myNotification = new Notification(title, options);
    myNotification.addEventListener("show", function (ev) {
      console.log("show", ev.currentTarget.data);
    });
    myNotification.addEventListener("close", function (ev) {
      console.log("close", ev.currentTarget.body);
    });
    setTimeout(myNotification.close.bind(myNotification), 3000);
  }
  componentDidMount() {
    // document.addEventListener('click', this.closeDialog);
    // console.log(window.localStorage.getItem('walletconnector'),'..............')
    this.setState({
      active: this.props.location.pathname.split("/")[3],
    });
    this.state.walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      console.log("wallet disconnected");
    });
  }

  // closeDialog = () => {
  //   this.setState({
  //     showMineDialog: false
  //   })
  // }
  getFloat(number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = parseFloat(Number(number).toFixed(n)); //补足位数
    return number;
  }

  async getNewWalletConnect() {
    await this.setState({
      walletConnector: new WalletConnect({ bridge: this.state.bridge }),
    });
  }
  async logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    await this.state.walletConnector.killSession();
    await this.getNewWalletConnect();
    this.props.history.push("/app");
  }
  getLanguage = (val) => {
    intl.options.currentLocale = val;
    this.forceUpdate();
  };
  render() {
    let { routes } = this.props;
    let { active, message, unreadCount } = this.state;
    // console.log(message, ".......");
    this.getUnreadCount();
    if (this.props.location) {
      if (this.props.location.search) {
        this.setState({
          ifMobile: true,
        });
      }
    }
    return (
      <div className={this.state.ifMobile == false ? "home" : "home home1"}>
        {/* <div style={{position:'absolute'}}>log out</div> */}
        {this.state.ifMobile == false ? (
          <div className="header header1">
            <div
              className="logo"
              onClick={() => {
                this.props.history.push("/homepage/home");
              }}
            >
              <img src="/img/logo1.png" />
            </div>
            {
              <div className="route">
                <span
                  onClick={() => {
                    this.props.history.push("/homepage/home/homeContent");
                  }}
                  className={
                    active == "homeContent"
                      ? "active"
                      : active == "transfer"
                      ? "active"
                      : active == "getMoney"
                      ? "active"
                      : active == "pushMessage"
                      ? "active"
                      : null
                  }
                >
                  <i
                    className="noWal"
                    // {
                    //   active == "homeContent"
                    //     ? "wal"
                    //     : active == "transfer"
                    //       ? "wal"
                    //       : active == "getMoney"
                    //         ? "wal"
                    //         : "l"
                    // }
                  ></i>
                  <label>{intl.get("Wallet")}</label>
                </span>
                <span
                  onClick={() => {
                    this.props.history.push("/homepage/home/changeContent");
                    // this.props.showDetails()
                    // this.props.showPolling()
                  }}
                  className={active == "changeContent" ? "active" : null}
                >
                  <i className="noMar"></i>
                  <label>{intl.get("Market")}</label>
                </span>
                <span
                  onClick={() => {
                    this.props.history.push("/homepage/home/digitalBank");
                  }}
                  className={active == "digitalBank" ? "active" : null}
                >
                  <i className="noBank"></i>
                  <label>{intl.get("Bank")}</label>
                </span>
              </div>
            }
          </div>
        ) : null}

        <div className="box">
          {this.state.ifMobile == false ? (
            <div className="boxHead">
              <div className="boxHeadList">
                <div
                  className="badge"
                  onClick={() => {
                    this.props.history.push("/homepage/home/pushMessage");
                  }}
                >
                  <Badge count={unreadCount}>
                    <img src="/img/编组 12@2x.png" />
                  </Badge>
                </div>
                <Head></Head>
                {/* <span>Download</span> */}
                <LangPage getLanguage={this.getLanguage}></LangPage>
              </div>
            </div>
          ) : null}

          <RouterView routes={routes}></RouterView>
        </div>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
  return {
    getTypes: (type) => {
      dispatch({
        type: "t_type",
        params: type.types,
      });
    },
    getTypes1: (type) => {
      dispatch({
        type: "t_types",
        params: type.types1,
      });
    },
    showEveryDetail: () => {
      dispatch({
        type: "DISPLAY2",
        payload: false,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
