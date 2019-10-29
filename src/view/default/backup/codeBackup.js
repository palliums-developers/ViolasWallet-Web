import React,{Component} from 'react';
import '../default.scss';

class CodeBackup extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="codeBackup">
        <header>
            <span onClick={() => {
            this.props.history.push('/backup')
            }}><img src="/img/Combined Shape 1@2x.png"/></span>
            <span>备份助记词</span>
        </header>
        <section>
           
        </section>
      </div>
     );
  }
}
 
export default CodeBackup;
