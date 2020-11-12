import React from 'react';
import './css/app.css';
import "antd-mobile/dist/antd-mobile.css";
import "antd/dist/antd.css";
import {
  Button,
  InputItem,
  TextareaItem,
  WhiteSpace,
  Modal,
  Toast,
} from "antd-mobile";
import { Upload, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// import { createForm } from "rc-form";
import { callHandler, registerHandler } from "./utils/jsbridge";
import { rndNum } from "./utils/redomNum";
let url = "http://94.191.95.240:4000"
const axios = require('axios');
const prompt = Modal.prompt;
let isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);

let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: (e) => e.preventDefault(),
  };
}


// class InputEdit extends React.Component {
//   onChange = (value) => {
//     if (this.props.onValueChange !== undefined) {
//       this.props.onValueChange(value);
//     }
//   };
//   onBlur = (value) => {
//     if (this.props.onBlur !== undefined) {
//       this.props.onBlur(value);
//     }
//   };
//   render() {
//     const { className, type, placeholder, content } = this.props;
//     return (
//       <InputItem
//         className={className}
//         type={type}
//         placeholder={placeholder}
//         clear={false}
//         maxLength="20"
//         onChange={(v) => {
//           this.onChange(v);
//         }}
//         onBlur={(v) => {
//           this.onBlur(v);
//         }}
//         moneyKeyboardWrapProps={moneyKeyboardWrapProps}
//       >
//         {content}
//       </InputItem>
//     );
//   }
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipvalue: "",
      files: [],
      fileList:[],
      id:'',
      address:'',
      ip_id:'',
      ip_name:'',
      ip_intro:'',
      token_name:'',
      token_amount:'',
      token_name_for_user:'',
      token_amount_for_user:'',
      download_fee:'',
      ip_file_name:''
    };
    
  }
  componentWillMount(){
    this.setState({
      id: rndNum(100),
      address: this.props.location.search.split("=")[1],
    });
    registerHandler("callJavaScript", (data, responseCallback) => {
      console.log("from native to js " + data);
      this.setState({
        ipvalue: data,
      });
      responseCallback("js callback to java");
    });
    
  }
  onChange1 = (v,type) => {
    console.log(v,type)
    switch(type){
      case 'ip_id' : this.setState({ ip_id: v.replace(/[^\w_]/g, "") });break;
      case 'ip_name' : this.setState({ip_name:v});break;
      case 'ip_intro' : this.setState({ip_intro:v});break;
      case 'token_name' :this.setState({ token_name: v.replace(/[\W]/g, "") });break;
      case 'token_amount' : this.setState({token_amount:v});break;
      case 'token_name_for_user' : this.setState({ token_name_for_user: v.replace(/[\W]/g, "") });break;
      case 'token_amount_for_user' : this.setState({token_amount_for_user:v});break;
      case 'download_fee' : this.setState({download_fee:v});break;
      default: return;
    }
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };
  //向移动端发起请求 验证密码
  onDone = (msg) => {
    callHandler("callNative", JSON.stringify(msg),(resp)=> {
    // alert(JSON.parse(resp).result)
        if (JSON.parse(resp).result === "success") {
          this.getSubmit();
        }
      
    });
  };
  //点击提交
  getSubmit = () =>{
    let {address,ip_id,ip_name,ip_intro,ip_file_name,token_name,token_amount,token_name_for_user,token_amount_for_user,download_fee} = this.state;
    let ipList = {
      address: address,
      ip_id: ip_id,
      ip_name: ip_name,
      ip_intro: ip_intro,
      token_name: token_name,
      token_amount: token_amount * 1e6,
      token_name_for_user: token_name_for_user,
      token_amount_for_user: token_amount_for_user * 1e6,
      download_fee: download_fee * 1e6,
      ip_file_name: ip_file_name,
    };
    axios.post(url+'/1.0/newnet/ip',ipList).then((res) => {
      console.log(res);
      if(res.data.code == 2000){
        message.success('submit successfully');
        setTimeout(()=>{
          this.closePage()
        },500)
      }else if(res.data.code == 2003){
        message.error(res.data.message);
      }else{
        message.error('submit failure');
      }
    })
    .catch((error)=> {
      console.log(error);
    })
  }
  //文件上传之前的操作
  beforeUpload=(file)=>{
    if(this.state.fileList.length===0){
      message.success(`${file.name} file uploaded successfully`);
      this.setState(state => ({
        ip_file_name:file.name,
        fileList: [...state.fileList, file],
      }));
    }else{
      message.error('只能上传一个文件');
      this.setState(
        (state) => ({
          fileList: [...state.fileList],
        }));
    }
    return false;
  };
  // uploadFile = () => {
  //   alert("uploadFile");
  //   let { fileList } = this.state;
  //   console.log(fileList, fileList[0].name);
  //   let param = new FormData(); //创建form对象
  //   console.log(param)
  //   param.append("file", fileList[0], fileList[0].name); //通过append向form对象添加数据
  //   console.log(param);
  //   param.append("chunk", "0"); //添加form表单中其他数据
  //   console.log(param.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
  //   axios
  //     .post(url + "/1.0/newnet/ip/file", param, {
  //       headers: { "Content-type": "multipart/form-data" },
  //     })
  //     .then((res) => {
  //       alert(JSON.stringify(res));
  //       if (res.data.code == 2000) {
  //       } else {
  //         message.error("submit failure");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  //删除文件
  onRemove=(file)=>{
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }
  //关闭页面
  closePage = () =>{
    callHandler(
      "callNative",
      JSON.stringify({
        id: this.state.id,
        method: "closePage",
        params: [],
      }),
      (resp) => {
         alert(JSON.stringify(resp));
        if (JSON.parse(resp).result === "success") {
        }
      }
    );
  }
  getVerify = () =>{
    let {
      ip_id,
      ip_name,
      ip_intro,
      ip_file_name,
      token_name,
      token_amount,
      token_name_for_user,
      token_amount_for_user,
      download_fee,
    } = this.state;
    if (ip_id == "") {
      message.error('请输入 IP 号')
    } else if (ip_name == "") {
      message.error("请输入 IP 名称");
    } else if (ip_intro == "") {
      message.error("请输入 IP 介绍");
    }  else if (token_name == "") {
      message.error("请输入 IP 通证名称");
    } else if (token_amount == "") {
      message.error("请输入 IP 通证数量");
    } else if (token_name_for_user == "") {
      message.error("请输入 IP 使用通证名称");
    } else if (token_amount_for_user == "") {
      message.error("请输入 IP 使用通证数量");
    } else if (download_fee == "") {
      message.error("请输入 IP 使用通证单次下载数量");
    } else if (ip_file_name == "") {
      message.error("请输入上传 IP ");
    } else {
      prompt(
        "输入密码",
        "",
        (password) => {
          this.onDone({
            id: this.state.id,
            method: "checkAuthorize",
            params: [password + ""],
          });
        },
        "secure-text"
      );
    }
    
  }
  render(){
    let arr = {
      name: "ip_file",
      action: "http://94.191.95.240:4000/1.0/newnet/ip/file",
      // beforeUpload: this.beforeUpload,
      onRemove:this.onRemove,
      onChange: (info) => {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        
        alert(info.file.response)
        if (info.file.response.code == 2000) {
          this.setState({
            ip_file_name: info.file.response.data.file_name,
          },()=>{
            message.success(`${info.file.name} file uploaded successfully`);
          });
        }
        
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
    };
    return (
      <div className="app">
        <div className="list">
          <h4>* 提交申请需要支付100 token</h4>
          <InputItem
            maxLength="20"
            placeholder="请输入 IP 号"
            type="text"
            className="ant-right-input"
            clear={false}
            onChange={(e) => this.onChange1(e, "ip_id")}
          >
            IP 号
          </InputItem>
          <InputItem
            maxLength="20"
            placeholder="请输入 IP 名称"
            type="text"
            className="ant-right-input"
            clear={false}
            onChange={(e) => this.onChange1(e, "ip_name")}
          >
            IP 名称
          </InputItem>
          <TextareaItem
            className="ant-right-input"
            title="IP 介绍"
            placeholder="请输入 IP 介绍"
            data-seed="logId"
            rows="3"
            maxLength="200"
            ref={(el) => (this.autoFocusInst = el)}
            autoHeight
            onChange={(e) => this.onChange1(e, "ip_intro")}
          />
          <InputItem
            maxLength="6"
            placeholder="请输入 IP 通证名称"
            type="text"
            className="ant-right-input"
            clear={false}
            onChange={(e) => this.onChange1(e, "token_name")}
            value={this.state.token_name}
          >
            IP 通证名称
          </InputItem>
          <InputItem
            maxLength="20"
            placeholder="请输入 IP 通证数量"
            type="number"
            className="ant-right-input"
            clear={false}
            onChange={(e) => this.onChange1(e, "token_amount")}
          >
            IP 通证数量
          </InputItem>
          <InputItem
            maxLength="6"
            placeholder="请输入 IP 使用通证名称"
            type="text"
            className="ant-right-input"
            clear={false}
            onChange={(e) => this.onChange1(e, "token_name_for_user")}
          >
            IP 使用通证名称
          </InputItem>
          <InputItem
            maxLength="20"
            placeholder="请输入 IP 使用通证数量"
            type="number"
            className="ant-right-input"
            clear={false}
            onChange={(e) => this.onChange1(e, "token_amount_for_user")}
          >
            IP 使用通证数量
          </InputItem>
          <InputItem
            maxLength="20"
            placeholder="请输入 IP 使用通证单次下载数量"
            type="number"
            className="ant-right-input"
            clear={false}
            onChange={(e) => this.onChange1(e, "download_fee")}
          >
            IP 单次下载数量
          </InputItem>
          <div className="upload">
            <Upload
              {...arr}
              // onRemove={this.onRemove}
              // beforeUpload={this.beforeUpload}
              // fileList={this.state.fileList}
            >
              <Button icon={<PlusCircleOutlined />}>IP上传</Button>
            </Upload>
          </div>
        </div>
        <div className="btn">
          <WhiteSpace size="lg" />
          <Button className="btns" onClick={() => this.getVerify()}>
            提交
          </Button>
        </div>
        {/* <Button className="btns" onClick={this.onDone}>支付并提交</Button> */}
      </div>
    );
  }
  
}

export default App;
