import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import RouterView from '../../router/routerView'
import './default.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isShow:false,
           type:'wallet'
        }
    }
    componentDidMount(){
        this.setState({
            isShow:this.props.location.state,
            type:'wallet'
        },()=>{
            window.localStorage.setItem('type',this.state.type)
        })
        
    }
    render() {
        let { routes } = this.props;
        return (
            <div className="default">
                <div className="wrap">
                  <RouterView routes={routes}></RouterView>  
                </div>
                {
                    this.state.isShow == true ? <div className="dialog">
                    <div className="dialogContent">
                       <p><img src="/img/编组 30@2x.png"/></p>
                       <span onClick={()=>{
                           this.setState({
                               isShow:false
                           })
                       }}>马上进入</span>
                    </div> 
                </div> : null
                }
                <footer>
                        {
                            window.localStorage.getItem('type') == 'wallet' ?  <dl onClick={()=>this.navClick('wallet')}>
                            <dt><img src="/img/编组 17复制 3@2x.png"/></dt>
                            <dd style={{color:'rgba(68,33,171,1)'}}>钱包</dd>
                        </dl> : <dl onClick={()=>this.navClick('wallet')}>
                            <dt><img src="/img/编组 17复制 32@2x.png"/></dt>
                            <dd>钱包</dd>
                        </dl>
                        }
                        {
                            window.localStorage.getItem('type') == 'market' ? <dl onClick={()=>this.navClick('market')}>
                            <dt><img src="/img/编组 122@2x.png"/></dt>
                            <dd style={{color:'rgba(68,33,171,1)'}}>市场</dd>
                        </dl> : <dl onClick={()=>this.navClick('market')}>
                            <dt><img src="/img/编组 12@2x.png"/></dt>
                            <dd>市场</dd>
                        </dl>
                        }
                        {
                            window.localStorage.getItem('type') == 'mine' ? <dl onClick={()=>this.navClick('mine')}>
                            <dt><img src="/img/未点击 22@2x.png"/></dt>
                            <dd style={{color:'rgba(68,33,171,1)'}}>我的</dd>
                        </dl> : <dl onClick={()=>this.navClick('mine')}>
                            <dt><img src="/img/未点击 2@2x.png"/></dt>
                            <dd>我的</dd>
                        </dl>
                        }
                </footer>
            </div>
        );
    }
    navClick = (type) =>{
        // this.setState({
        //     type:type
        // })
        window.localStorage.setItem('type',type)
        if(type == 'wallet'){
           this.props.history.push('/home/wallet');
           
        }else if(type == 'market'){
            this.props.history.push('/home/market')
        }else if(type == 'mine'){
            this.props.history.push('/home/mine')
        }
    }
}

export default Home;
