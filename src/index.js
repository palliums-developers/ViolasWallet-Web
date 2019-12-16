import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import RouterConfig from './router/routerConfig'
import "lib-flexible"
// import 'antd-mobile/dist/antd-mobile.css';
import { Provider } from 'mobx-react';
import Store from './store';
import "animate.css";

import intl from 'react-intl-universal'
import EN from './locales/index-en'
import CN from './locales/index-cn'

let lang = (navigator.languages && navigator.languages[0]) || navigator.language
intl.init({
  currentLocale: lang.split('-')[0],
  locales: {
    EN,
    CN
  }
})
ReactDOM.render(<Provider {...Store}><RouterConfig></RouterConfig></Provider>, document.getElementById('root'));
