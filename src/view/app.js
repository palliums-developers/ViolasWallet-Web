import React,{Component} from 'react';
import { Drawer } from 'antd';
import CurAside from "./components/curAside";
import './app.scss';

class App extends Component{
  render(){
    return (
      <div className="app">
        <header className="header">
          <div className="logo" onClick={() => {}}>
            <img src="/img/logo.png" />
          </div>
          <div className="tab">
            <span>市场</span>
            <span>我的</span>
          </div>
        </header>
        <div className="wrap"></div>
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          visible={this.props.visible1}
          mask={false}
        >
          <CurAside></CurAside>
        </Drawer>
      </div>
    );
  }
  
}

export default App;
