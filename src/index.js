import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/firebase-messaging";
import axios from "axios";

// const firebaseConfig = {
//   apiKey: "AIzaSyBG0qOh-LEIWpZk6CpArRxz0HuGUd2HzlE",
//   authDomain: "violas-push-server.firebaseapp.com",
//   projectId: "violas-push-server",
//   storageBucket: "violas-push-server.appspot.com",
//   messagingSenderId: "675290848213",
//   appId: "1:675290848213:web:d7d30fb87f4e39e38fbb5c",
//   measurementId: "G-15RHVC9K78",
// };

// var firebaseConfig = {
//   apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
//   authDomain: "myapp-project-123.firebaseapp.com",
//   databaseURL: "https://myapp-project-123.firebaseio.com",
//   projectId: "myapp-project-123",
//   storageBucket: "myapp-project-123.appspot.com",
//   messagingSenderId: "65211879809",
//   appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
//   measurementId: "G-8GSGZQ44ST",
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      violas_server: "https://api4.violas.io",
      violas_register: "/1.0/violas/device/info",
      address: "e8da60ef0f4cf18c324527f48b06c7e9",
      language: "en", // en cn
    };
  }
  componentWillMount = async () => {
    await this.initialPage();
    await this.getNotificationPermission();
    await this.setState({ token: await this.getToken() });
    console.log(this.state.token);
    await this.sendToken();
    await this.getMessage();
  };
  componentWillUnmount = () => {
    this.setTokenSentToServer(false);
  };
  initialPage = async () => {
    firebase.initializeApp(this.state.firebaseConfig);
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
      address: this.state.address,
      token: this.state.token,
      device_type: "web",
      language: this.state.language,
    };
    axios
      .post(this.state.violas_server + this.state.violas_register, post_data)
      .then((res) => {
        if (res.data.code === 2000) {
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
  render() {
    const { message } = this.state;
    return (
      <div>
        <button onClick={() => this.setTokenSentToServer(false)}>clear</button>
        {message.data && (
          <>
            <h1>
              {message.data.service === "violas_00"
                ? "系统通知"
                : message.data.service === "violas_01"
                ? "普通转账"
                : ""}
            </h1>
            <h2>{message.notification.title}</h2>
            <h3>{message.notification.body}</h3>
          </>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
