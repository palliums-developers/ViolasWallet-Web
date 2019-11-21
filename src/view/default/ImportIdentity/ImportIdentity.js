import React,{Component} from 'react';
let aes256 = require('aes256');

class ImportIdentity extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isShow:false,
        password:'',
        userInfo:{}
     }
  }
  componentDidMount(){
    
  }
  getPass = (e) =>{

     this.setState({
       password:e.target.value
     })
  }

  handleFiles = () =>{
        var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
        console.log(selectedFile)
        var name = selectedFile.name;//读取选中文件的文件名
        var size = selectedFile.size;//读取选中文件的大小
        var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(selectedFile);//读取文件的内容
        console.log(this.state.password)
        reader.onload = (e) =>{
             console.log("读取结果：", e.currentTarget.result);//当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
             console.log("读取结果转为JSON：");
             let json = aes256.decrypt(this.state.password,e.currentTarget.result);
             if(json[0] == '{'){
                alert('解密成功！！！')
                window.localStorage.setItem('data',JSON.stringify(JSON.parse(json)));
                window.localStorage.setItem('type','Violas钱包');
                this.props.history.push('/home/wallets')
             }else{
               alert('密码错误！！！')
             }
     };
    
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
                <input type="text" placeholder="输入密码" onChange={(e)=>this.getPass(e)}/>
            </div>

            <div className="btn">开始导入</div>
            <input className="btns" type="file" id="files" onChange={()=>this.handleFiles()} />
            
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
