import React,{Component} from 'react';
import intl from 'react-intl-universal';
import '../app.scss';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentWillMount(){
      intl.options.currentLocale=localStorage.getItem("local");
    
  }
  componentDidMount(){
    
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
          }}>{intl.get('Create Wallet')}</span>
          <span onClick={() => {
            this.props.history.push('/importIdentity')
          }}>{intl.get('Import Wallet')}</span>
        </div>
      </div>
     );
  }
}
 
export default Welcome;
