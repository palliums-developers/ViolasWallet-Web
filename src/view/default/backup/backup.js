import React,{Component} from 'react';
import intl from 'react-intl-universal';
import '../default.scss';

class Backup extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentWillMount(){
    intl.options.currentLocale=localStorage.getItem("local");
    this.forceUpdate();
  }
  render() { 
    return ( 
      <div className="backup">
        <header>
            <span onClick={() => {
            this.props.history.push('/createIdentity')
            }}><img src="/img/Combined Shape 1@2x.png"/></span>
            <span>{intl.get('Backup Hint')}</span>
            <span onClick={() => {
            this.props.history.push({
              pathname:'/home',
              state:true
            })
            }}>{intl.get('Backup Later')}</span>
        </header>
        <section>
            <div className="backupContent">
              <h2>{intl.get('Get Mnemonic Words')}</h2>
              <p>{intl.get('Equal to own all funds in the wallet')}</p>
              <p><img src="/img/编组 6@2x.png"/></p>
              <div className="list">
                <h3><span></span> {intl.get('Backup Mnemonic Words')}</h3>
                <p>{intl.get('Write down these Mnemonic Words on a paper')}</p>
                <p>{intl.get('In case you have lost or demaged your phone，the mnemonic words will be used to recover your funds in the wallet.')}</p>
              </div>
              <div className="list">
                <h3><span></span> {intl.get('Keep Offline')}</h3>
                <p>{intl.get('Please keep it in a safe and offline place')}</p>
                <p>{intl.get('Never share or store in any online media such as email, album and social network')}</p>
              </div>
            </div>
            <div className="btn" onClick={() => {
                    this.props.history.push({
                      pathname:'/codeBackup',
                      state:{
                        id:0
                      }
                    })
            }}>{intl.get('Start Backup')}</div>
        </section>
      </div>
     );
  }
}
 
export default Backup;
