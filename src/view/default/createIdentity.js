import React,{Component} from 'react';

import '../app.scss';
let mnemonic_random = require("bip39");
let aes256 = require('aes256');

class CreateIdentity extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       name:'',
       pass1:'',
       pass2:'',
    }
  }

  getValue = (e,type) =>{
    if(type == 'name'){
      this.setState({
        name:e.target.value
      })
    }else if(type == 'pass1'){
      this.setState({
        pass1:e.target.value
      })
    }else if(type == 'pass2'){
      this.setState({
        pass2:e.target.value
      })
    }
    
  }
  createFun = () =>{
     let { name,pass1,pass2 } = this.state;
     if(name == ''){
       alert('请输入昵称！！！')
     }else if(pass1 == ''){
       alert('请设置钱包密码！！！')
     }else if(pass2 == ''){
       alert('再次确认密码！！！')
     }else if(pass1.indexOf(pass2) == -1){
       alert('两次输入密码不同！！！')
     }else{
       window.localStorage.setItem('userInfo',aes256.encrypt('userInfo',JSON.stringify({
        name:name,
        password1:pass1,
        password2:pass2
      })))
      window.localStorage.setItem('mnes',aes256.encrypt('mnes',JSON.stringify({
        mne_arr:mnemonic_random.generateMnemonic()
      }))) 
      this.props.history.push('/backup')
     }
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
                <input type="text" placeholder="输入昵称" onChange={(e)=>this.getValue(e,'name')}/>
                <input type="password" placeholder="设置钱包密码" onChange={(e)=>this.getValue(e,'pass1')}/>
                <input type="password" placeholder="再次确认密码" onChange={(e)=>this.getValue(e,'pass2')}/>
                <div className="btn" onClick={() => this.createFun()}>创建</div>
            </div>
        </section>
      </div>
     );
  }
}
 
export default CreateIdentity;
