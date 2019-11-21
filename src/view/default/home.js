import React, { Component } from 'react';
import RouterView from '../../router/routerView'
import { NavLink } from 'react-router-dom'
import './default.scss';

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
           ]
        }
    }
    componentDidMount(){
        this.setState({
            isShow:this.props.location.state
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
                            this.state.routes.map((v,i)=>{
                               return <NavLink key={i} to={v.to} activeClassName={`${v.activeName}${i}`}>
                                            <dt></dt>
                                            <dd>{v.name}</dd>
                                      </NavLink>
                            })
                        }
                </footer>
            </div>
        );
    }
}

export default Home;
