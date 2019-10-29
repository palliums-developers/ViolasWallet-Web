import React,{Component} from 'react';
// import '../app.scss';

class ImportIdentity extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isShow:false
     }
  }
  render() { 
    return ( 
      <div className="importIdentity">
        <header>
            <span onClick={() => {
            this.props.history.push('/welcome')
            }}><img src="/img/Combined Shape 1@2x.png"/></span>
            <span>导入身份</span>
        </header>
        <section>
            <div className="form">
                <textarea type="text" placeholder="输入助记词单词，并用空格分隔">

                </textarea>
                <input type="password" placeholder="设置钱包密码"/>
                <input type="text" placeholder="再次确认密码"/>
            </div>

            <div className="btn" onClick={() => {
            this.props.history.push('/backup')
        }}>开始导入</div>
        </section>
        {
            this.state.isShow ? <div className="dialog">
            <div className="dialogContent">
                <p>助记词长度不正确</p>
                <span onClick={()=>{
                    this.setState({
                        isShow:false
                    })
                }}>好</span>
            </div> 
        </div> : null
        }
      </div>
     );
  }
}
 
export default ImportIdentity;
