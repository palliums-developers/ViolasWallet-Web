import React,{Component} from 'react';
import '../app.scss';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="welcome">
        <div className="head" onClick={() => {
            this.props.history.push('/welcome')
        }}>
          <p><img src="/img/编组 8@2x.png"/></p>
          <h4><img src="/img/Rectangle 6复制 32@2x.png"/></h4>
        </div>
        <div className="btns">
          <span onClick={() => {
            this.props.history.push('/createIdentity')
          }}>创建钱包</span>
          <span onClick={() => {
            this.props.history.push('/importIdentity')
          }}>导入钱包</span>
        </div>
      </div>
     );
  }
}
 
export default Welcome;
