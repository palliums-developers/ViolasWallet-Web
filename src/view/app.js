import React,{Component} from 'react';
import './app.scss';
import { inject,observer } from 'mobx-react'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="app">
        <div onClick={() => {
            this.props.history.push('/welcome')
        }}>
          <p><img src="/img/编组 8@2x.png"/></p>
          <h4><img src="/img/Rectangle 6复制 32@2x.png"/></h4>
        </div>
      </div>
     );
  }
}
 
export default App;
