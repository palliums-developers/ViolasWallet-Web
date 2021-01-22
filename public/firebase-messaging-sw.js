importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

let config = {
  apiKey: "AIzaSyBG0qOh-LEIWpZk6CpArRxz0HuGUd2HzlE",
  authDomain: "violas-push-server.firebaseapp.com",
  projectId: "violas-push-server",
  storageBucket: "violas-push-server.appspot.com",
  messagingSenderId: "675290848213",
  appId: "1:675290848213:web:d7d30fb87f4e39e38fbb5c",
  measurementId: "G-15RHVC9K78",
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
/**
 * when user get message and handle it on background
 */
messaging.setBackgroundMessageHandler((payload) => {
  console.log("on message back handler: " + payload);
});
