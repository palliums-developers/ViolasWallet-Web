import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterConfig from './router/routerConfig';
import { Provider } from 'react-redux'
import Store from './store'
import intl from "react-intl-universal";
import EN from "./locales/index-en";
import CN from "./locales/index-cn";

let lang =
  (navigator.languages && navigator.languages[0]) || navigator.language;
intl.init({
  currentLocale: lang.split("-")[0],
  locales: {
    EN,
    CN,
  },
});

ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
        <RouterConfig></RouterConfig>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

