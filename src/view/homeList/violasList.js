import React, { Component } from 'react';

class ViolasContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            wallet_info:[],
            identityWallet:[],
            createIdentityWallet:[]

        }
    }
    componentDidMount() {
        this.setState({
           name:this.props.location.pathname.split("/")[3]
         },()=>{
           this.getWalletInfo()
         })
    }
    getWalletInfo(){
        let wallets = [];
        if(window.sessionStorage.getItem('wallet_info')){
          wallets = window.sessionStorage.getItem('wallet_info')
        }
        this.setState({
          wallet_info:JSON.parse(wallets)
        },()=>{
           this.getType()    
        })
    }
    getType = () => {
        //身份
        let identityList = this.state.wallet_info && this.state.wallet_info.filter(item=>{
          return item.identity == 0
        })
        let everyIdentityList = identityList.filter(v=>{
          return this.state.name.toLowerCase() == v.type
        })
        console.log(everyIdentityList)
        //创建、导入
        let createIdentityList = this.state.wallet_info && this.state.wallet_info.filter(item=>{
          return item.identity == 1
        })
        let everyCreateIdentityList = createIdentityList.filter(v=>{
          return this.state.name.toLowerCase() == v.type
        })
        this.setState({
          identityWallet:everyIdentityList,
          createIdentityWallet:everyCreateIdentityList
        })
      }
    render() {
        return (
            <div className="rightContent violasContent">
                <div className="identity">
                    <h2>身份</h2>
                    <div className="identityList">
                        {
                            this.state.identityWallet.map((v, i) => {
                                return <div key={i} className={v.type == 'violas' ? "listContent vBack" : v.type == 'libra' ? "listContent lBack" : v.type == 'bitcoin' ? "listContent bBack" : 'listContent'} onClick={() => {
                                    this.props.history.push('/home/homeContent/detail/'+v.address+'/'+v.type+'/'+v.name)
                                }}>
                                    <h4>{v.name}</h4>
                                    <p>{v.address}</p>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="createIdentity">
                    {
                        this.state.createIdentityWallet.length > 0 ? <h2>创建/导入</h2> : null
                    }

                    <div className="identityList createIdentityList">
                        {
                            this.state.createIdentityWallet.map((v, i) => {
                                return <div key={i} className={v.type == 'violas' ? "listContent vBack" : v.type == 'libra' ? "listContent lBack" : v.type == 'bitcoin' ? "listContent bBack" : 'listContent'}>
                                    <h4>{v.name}</h4>
                                    <p>{v.address}</p>
                                </div>
                            })
                        }
                    </div>

                </div>

            </div>
        );
    }
}


export default ViolasContent;
