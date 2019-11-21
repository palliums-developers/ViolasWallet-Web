import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';

@inject('index')
@observer

class DetailWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
           oldName:''
        }
    }
    componentDidMount(){
        this.setState({
            oldName:this.props.location.state.name
        })
    }
    getNewName = (e) =>{
        this.setState({
            oldName:e.target.value
        })
    }
    update = () =>{
        let arr = JSON.parse(window.localStorage.getItem('data')).wallet_name;
        for(let i = 0;i < arr.length;i++){
            if((arr[i].name).indexOf(this.props.location.state.name)==0){
                arr[i] = {name:this.state.oldName}
            }
        }
        window.localStorage.setItem('data',JSON.stringify({
            name:JSON.parse(window.localStorage.getItem('data')).name,
            password1:JSON.parse(window.localStorage.getItem('data')).password1,
            mne_arr:JSON.parse(window.localStorage.getItem('data')).mne_arr,
            wallet_name:arr
        }))
        this.props.history.push('/manage')
    }
    render() {
        
        return (
            <div className="detailWallet">
                <header>
                    <span onClick={() => this.update()}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>钱包详情</span>
                </header>
                <section>
                   <div className="lists">
                       <div className="list">
                           <h4>更换钱包名</h4>
                           <input type="text" onChange={(e)=>this.getNewName(e)} value={this.state.oldName}/>
                       </div>
                   </div>
                </section>
            </div>
        );
    }
}

export default DetailWallet;
