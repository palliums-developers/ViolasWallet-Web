import React, { Component } from 'react';
import intl from 'react-intl-universal';
let aes256 = require('aes256');

class ImportIdentity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      password: '',
      userInfo: {}
    }
  }
  componentWillMount() {
    intl.options.currentLocale = localStorage.getItem("local");
  }
  componentDidMount() {

  }
  getPass = (e) => {

    this.setState({
      password: e.target.value
    })
  }

  handleFiles = () => {
      var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
      var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
      reader.readAsText(selectedFile);//读取文件的内容
      reader.onload = (e) => {
        let json = aes256.decrypt(this.state.password, e.currentTarget.result);
        if (json[0] == '{') {
          alert(intl.get('Decryption success')+'！！！')
          window.localStorage.setItem('data', JSON.stringify(JSON.parse(json)));
          window.localStorage.setItem('type', intl.get('ViolasWallet'));
          this.props.history.push('/home/wallets')
        } else {
          alert(intl.get('Access Code is wrong') + '！！！')
        }
      };
  }

  render() {
    return (
      <div className="importIdentity">
        <header>
          <span onClick={() => {
            this.props.history.push('/welcome')
          }}><img src="/img/Combined Shape 1@2x.png" /></span>
          <span> {intl.get('Import Identity')}</span>
        </header>
        <section>
          <div className="form">
            <input type="text" placeholder={intl.get('Input  Access Code')} onChange={(e) => this.getPass(e)} />
          </div>

          <div className="btn"> {intl.get('Start Import')}</div>
          <input className="btns" type="file" id="files" onChange={() => this.handleFiles()} />

        </section>
        {/* {
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
        } */}
      </div>
    );
  }
}

export default ImportIdentity;
