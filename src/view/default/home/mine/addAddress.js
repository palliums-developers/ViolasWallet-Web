import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import { inject,observer } from 'mobx-react';

@inject('index')
@observer

class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
           name:'',
           address:'',
           types:''
        }
    }
    componentDidMount(){
    //    this.props.index.getAddressMessage()
    }
    getValue = (e,type) =>{
        if(type == 'type'){
            this.setState({
              types:e.target.value
            })
         }else if(type == 'name'){
          this.setState({
            name:e.target.value
          })
        }else if(type == 'address'){
          this.setState({
            address:e.target.value
          })
        }
       
    }
    getAddress = () =>{
        this.props.history.push('/directoryInquiries')
        if(this.state.name && this.state.address){
            this.props.index.getAddressMessage()
        }
        
    }

    plus = () =>{
        let { name,address,types } = this.state;
        if(name == ''){
        alert('请输入昵称！！！')
        }else if(address == ''){
        alert('请填写备注！！！')
        }else if(types == ''){
        alert('请输入地址！！！')
        }else{
           let address_book = {
            type:types,
            name:name,
            address:address
           }
          let addressBooks = JSON.parse(window.localStorage.getItem('data'));
          console.log(addressBooks.address_book)
          addressBooks.address_book.push(address_book)
          console.log(addressBooks.address_book,'........')
          window.localStorage.setItem('data',JSON.stringify(addressBooks))
          this.props.history.push('/directoryInquiries');
        }
    }

    render() {
        return (
            <div className="addAddress">
                <header>
                    <span onClick={() => this.getAddress()}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>添加地址</span>
                </header>
                <section>
                    <div className="form">
                        <div className="p">
                            <label>type</label>
                            <div className="ipt">
                                <input type="text" placeholder="请输入钱包种类" onChange={(e)=>this.getValue(e,'type')}/>
                            </div>
                        </div>
                        <div className="line">
                          <div className="lines"></div>  
                        </div>  
                        <div className="p">
                            <label>备注</label>
                            <div className="ipt">
                                <input type="text" placeholder="备注信息少于20个字" onChange={(e)=>this.getValue(e,'name')}/>
                            </div>
                        </div>
                        <div className="line">
                          <div className="lines"></div>  
                        </div>  
                        <div className="p">
                            <label>地址</label>
                            <div className="ipt">
                                <input type="text" placeholder="输入地址" onChange={(e)=>this.getValue(e,'address')}/>   
                                <div className="code"><img src="/img/code@2x.png"/></div>
                            </div>
                        </div><div className="line"><div className="lines"></div></div>
                        
                    </div>
                    <div className="btn" onClick={()=>this.plus()}>添加</div>
                </section>
            </div>
        );
    }
}

export default AddAddress;
