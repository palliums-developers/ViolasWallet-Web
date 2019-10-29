import React,{Component} from 'react';
import '../app.scss';

class CreateIdentity extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="createIdentity">
        <header>
            <span onClick={() => {
            this.props.history.push('/welcome')
            }}><img src="/img/Combined Shape 2@2x.png"/></span>
            <span>创建身份</span>
        </header>
        <section>
            <div className="form">
                <input type="text" placeholder="输入昵称"/>
                <input type="password" placeholder="设置钱包密码"/>
                <input type="password" placeholder="再次确认密码"/>
                <div className="btn" onClick={() => {
                    this.props.history.push('/backup')
                }}>创建</div>
            </div>
        </section>
      </div>
     );
  }
}
 
export default CreateIdentity;
