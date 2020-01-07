import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import intl from 'react-intl-universal';

@inject('index')
@observer

class DetailWallet1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
           oldName:''
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                oldName:this.props.location.state.name
            })
        }else{
            this.props.history.push('/welcome');
        }
    }
    getNewName = (e) =>{
        this.setState({
            oldName:e.target.value
        })
    }
    update = () =>{
        let arr = JSON.parse(window.sessionStorage.getItem('data')).wallet_name;
        let arr1 = JSON.parse(window.sessionStorage.getItem('data')).extra_wallet;
        let { name, address } = this.props.location.state;
        for(let i = 0;i < arr.length;i++){
            if((arr[i].name).indexOf(name)==0){
                arr[i] = { name: this.state.oldName, type: arr[i].type}
            }
        }
        for (let i = 0; i < arr1.length; i++) {
            if ((arr1[i].name).indexOf(name) == 0) {
                arr1[i] = { name: this.state.oldName, type: arr1[i].type, mnemoic: arr1[i].mnemoic, password: arr1[i].password }
            }
        }
        window.sessionStorage.setItem('data',JSON.stringify({
            name:JSON.parse(window.sessionStorage.getItem('data')).name,
            password1:JSON.parse(window.sessionStorage.getItem('data')).password1,
            mne_arr:JSON.parse(window.sessionStorage.getItem('data')).mne_arr,
            extra_wallet: arr1,
            address_book: JSON.parse(window.sessionStorage.getItem('data')).address_book,
            backup: JSON.parse(window.sessionStorage.getItem('data')).backup,
            wallet_name:arr
        }))
        this.props.history.push({
            pathname: '/manage1',
            state:{
                type: this.state.oldName,
                addr: address
            }
        })
    }
    render() {
        
        return (
            <div className="detailWallet">
                <header>
                    <span onClick={() => this.update()}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>{intl.get('Wallet Detail')}</span>
                </header>
                <section>
                   <div className="lists">
                       <div className="list">
                           <h4>{intl.get('Change Wallet Name')}</h4>
                           <input type="text" onChange={(e)=>this.getNewName(e)} value={this.state.oldName}/>
                       </div>
                   </div>
                </section>
            </div>
        );
    }
}

export default DetailWallet1;
