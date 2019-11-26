import React, { Component } from 'react';
import RouterView from '../../router/routerView';
import { NavLink } from 'react-router-dom';
import { inject,observer } from 'mobx-react';
import './default.scss';

@inject('dealIndex')
@observer

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isShow:false,
           routes:[
               {
                    to:'/home/wallet',
                    name:'钱包',
                    activeName:'active'
               },
               {
                    to:'/home/market',
                    name:'市场',
                    activeName:'active'
               },
               {
                    to:'/home/mine',
                    name:'我的',
                    activeName:'active'
               }
           ],
           ind:-1,
           list:[
               {
                name:'AAAUSD'
               },
               {
                name:'BBBUSD'
               },
               {
                name:'CCCUSD'
               },
               {
                name:'DDDUSD'
               },
               {
                name:'EEEUSD'
               }
           ]
        }
    }
    componentDidMount(){
        this.setState({
            isShow:this.props.location.state
        })
        
    }
    handleMouseUp = (i) => {
        this.setState({
            ind:i
        })
        this.props.dealIndex.selectChange(false)
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
                            this.state.routes.map((v,i)=>{
                               return <NavLink key={i} to={v.to} activeClassName={`${v.activeName}${i}`}>
                                            <dt></dt>
                                            <dd>{v.name}</dd>
                                      </NavLink>
                            })
                        }
                </footer>
                {
                    this.props.dealIndex.isShow ? <div className="selectListDialog animated bounceInUp">
                                                    <div className="selectLists">
                                                        {
                                                            this.state.list.map((v,i)=>{
                                                                return  <div key={i} className="selectList" onClick={()=>this.handleMouseUp(i)}>
                                                                         <label>{v.name}</label>
                                                                         <span className={this.state.ind == i ? 'light' : 'dark'}></span>
                                                                        </div>
                                                            })
                                                        }
                                                    </div>
                                                </div> : null
                }
                
            </div>
        );
    }
}

export default Home;
