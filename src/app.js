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
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  headers: {
    authorization: 'authorization-text',
  }
};

class InputEdit extends React.Component {
  onChange = (value) => {
    if (this.props.onValueChange !== undefined) {
      this.props.onValueChange(value);
    }
  };
  onBlur = (value) => {
    if (this.props.onBlur !== undefined) {
      this.props.onBlur(value);
    }
  };
  render() {
    const { className, type, placeholder, content } = this.props;
    return (
      <InputItem
        className={className}
        type={type}
        placeholder={placeholder}
        clear={false}
        maxLength="20"
        onChange={(v) => {
          this.onChange(v);
        }}
        onBlur={(v) => {
          this.onBlur(v);
        }}
        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
      >
        {content}
      </InputItem>
    );
  }
}

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
    // console.log(v,type)
    switch(type){
      case 'ip_id' : this.setState({ip_id:v});break;
      case 'ip_name' : this.setState({ip_name:v});break;
      case 'ip_intro' : this.setState({ip_intro:v});break;
      case 'token_name' : this.setState({token_name:v});break;
      case 'token_amount' : this.setState({token_amount:v});break;
      case 'token_name_for_user' : this.setState({token_name_for_user:v});break;
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
    alert(resp.result)
        if (resp.result === "success") {
          this.getSubmit();
        }
      
    });
  };
  //点击提交
  getSubmit = () =>{
    let {address,ip_id,ip_name,ip_intro,ip_file_name,token_name,token_amount,token_name_for_user,token_amount_for_user,download_fee} = this.state;
    let ipList = {
      address:address,
      ip_id:ip_id,
      ip_name:ip_name,
      ip_intro:ip_intro,
      token_name:token_name,
      token_amount:token_amount,
      token_name_for_user:token_name_for_user,
      token_amount_for_user:token_amount_for_user,
      download_fee:download_fee,
      ip_file_name:ip_file_name
    }
    axios.post(url+'/1.0/newnet/ip',ipList).then((res) => {
      console.log(res);
      if(res.data.code == 2000){
        message.success('submit successfully');
      }else if(res.data.code == 2003){
        message.success(res.data.message);
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
      this.setState(state => ({
        fileList: [...state.fileList],
      }));
    }
    return false;
  };
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
  render(){
    
    return (
      <div className="app">
        <div className="list">
          <h4>* 提交申请需要支付100 token</h4>
          <InputEdit
            placeholder="请输入 IP 号"
            content="IP 号"
            type="text"
            
            className="ant-right-input"
            onValueChange={(e) => this.onChange1(e, "ip_id")}
          />
          <InputEdit
            placeholder="请输入 IP 名称"
            content="IP 名称"
            type="text"
            className="ant-right-input"
            onValueChange={(e) => this.onChange1(e, "ip_name")}
          />
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
          <InputEdit
            placeholder="请输入 IP 通证名称"
            content="IP 通证名称"
            type="text"
            className="ant-right-input"
            onValueChange={(e) => this.onChange1(e, "token_name")}
          />
          <InputEdit
            placeholder="请输入 IP 通证数量"
            content="IP 通证数量"
            type="text"
            className="ant-right-input"
            onValueChange={(e) => this.onChange1(e, "token_amount")}
          />
          <InputEdit
            placeholder="请输入 IP 使用通证名称"
            content="IP 使用通证名称"
            type="text"
            className="ant-right-input"
            onValueChange={(e) => this.onChange1(e, "token_name_for_user")}
          />
          <InputEdit
            placeholder="请输入 IP 使用通证数量"
            content="IP 使用通证数量"
            type="text"
            className="ant-right-input"
            onValueChange={(e) => this.onChange1(e, "token_amount_for_user")}
          />
          <InputEdit
            placeholder="请输入 IP 使用通证单次下载数量"
            content="IP 单次下载数量"
            type="text"
            className="ant-right-input"
            onValueChange={(e) => this.onChange1(e, "download_fee")}
          />
          <div className="upload">
            <Upload
              {...props}
              onRemove={this.onRemove}
              beforeUpload={this.beforeUpload}
              fileList={this.state.fileList}
            >
              <Button icon={<PlusCircleOutlined />}>IP上传</Button>
            </Upload>
          </div>
        </div>
        <div className="btn">
          <WhiteSpace size="lg" />
          <Button
            className="btns"
            onClick={() =>
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
              )
            }
          >
            提交
          </Button>
        </div>
        {/* <Button className="btns" onClick={this.onDone}>支付并提交</Button> */}
      </div>
    );
  }
  
}

export default App;
