import React,{Component} from 'react';
import '../default.scss';
import { inject,observer } from 'mobx-react';
let aes256 = require('aes256');

@inject('index')
@observer

class CodeBackup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mnes_arr:[]
     }
  }
  componentDidMount() {
    let decrypted = JSON.parse(aes256.decrypt('mnes', window.localStorage.getItem('mnes')));
    this.setState({ mnes_arr:decrypted.mne_arr.split(" ") });
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
           <div className="backupPaper">
             <h4>请将这些词按顺序写在纸上</h4>
             <div className="words">
               {
                 this.state.mnes_arr && this.state.mnes_arr.map((v,i)=>{
                    return <p key={i}>{v}</p>
                 })
               }
             </div>
             <div className="warning">
               <div className="warnLogo"><img src="/img/编组 4slice@2x.png"/></div>
               <div className="warnDescr">
                 <p>不要截屏或复制到剪切板 </p>
                 <p>这将可能被第三方恶意软件收集 </p>
                 <p>造成资产损失</p>
               </div>
             </div>
             <div className="btn" onClick={() => {
              this.props.history.push('/confirmWords')
              }}>
               下一步
             </div>
           </div>
        </section>
      </div>
     );
  }
}
 
export default CodeBackup;
