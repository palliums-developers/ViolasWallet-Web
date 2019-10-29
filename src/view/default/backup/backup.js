import React,{Component} from 'react';
import '../default.scss';

class Backup extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="backup">
        <header>
            <span onClick={() => {
            this.props.history.push('/createIdentity')
            }}><img src="/img/Combined Shape 1@2x.png"/></span>
            <span>备份提示</span>
            <span onClick={() => {
            this.props.history.push({
              pathname:'/home',
              state:true
            })
            }}>稍后备份</span>
        </header>
        <section>
            <div className="backupContent">
              <h2>获取助记词</h2>
              <p>等于拥有钱包资产所有权</p>
              <p><img src="/img/编组 6@2x.png"/></p>
              <div className="list">
                <h3><span></span> 备份助记词</h3>
                <p>使用纸和笔正确抄写助记词</p>
                <p>如果你的手机丢失、被盗、损坏，Keystore将可以回复你的资产</p>
              </div>
              <div className="list">
                <h3><span></span> 离线保管</h3>
                <p>请妥善保管至隔离网络的安全地方</p>
                <p>请勿将助记词在联网环境下分享和存储，比如邮件、相册、社交应用等</p>
              </div>
            </div>
            <div className="btn" onClick={() => {
                    this.props.history.push('/codeBackup')
            }}>开始备份</div>
        </section>
      </div>
     );
  }
}
 
export default Backup;
