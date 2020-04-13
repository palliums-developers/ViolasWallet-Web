import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './view/app';
import RouterConfig from './router/routerConfig';

function init() {
  let designSize = 1920; 
  let html = document.documentElement;
  let wW = html.clientWidth;// 窗口宽度
  let rem = wW * 100 / designSize;
  document.documentElement.style.fontSize = rem + 'px';
}
init();

window.addEventListener('resize', function () {
  init();
});

ReactDOM.render(
  <React.StrictMode>
    <RouterConfig><App /></RouterConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

