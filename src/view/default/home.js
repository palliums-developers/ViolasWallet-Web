import React, { Component } from 'react';
import RouterView from '../../router/routerView';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import intl from 'react-intl-universal';
import './default.scss';

@inject('dealIndex')
@observer

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            routes: [
                {
                    to: '/home/wallet',
                    name: 'Wallet',
                    activeName: 'active'
                },
                {
                    to: '/home/market',
                    name: 'Market',
                    activeName: 'active'
                },
                {
                    to: '/home/mine',
                    name:'My Profile',
                    activeName: 'active'
                }
            ],
            ind:0,
            inds:1,
            list: [
                    { "addr": "0x0000000000000000000000000000000000000000000000000000000000000000", "name": "LIBRA", "decimals": 6 },
                    { "addr": "0x0f7100fcf2d114ef199575f0651620001d210718c680fbe7568c72d6e0160731", "name": "DTM", "decimals": 6 },
                    { "addr": "0x352ba42b3a2fb66bff15f08ea691b5b87eff0fe6a69b79cda364c4cdf787a0a2", "name": "XDS", "decimals": 6 },
                    { "addr": "0x76e5ed3e0805d54a9e8138164861f4fb1390a58100f9f9a63a962e22bb5ceed6", "name": "LDN", "decimals": 6 },
                    { "addr": "0x8d6bcfbdf80140a7d1020af8050f1377d77c29325741795dc269b3fd0706a9b4", "name": "XSL", "decimals": 6 },
                    { "addr": "0xb95b427af584a781a7240122c9d2582720e28174d276094429fa1aa356bc2d5d", "name": "XSL", "decimals": 6 },
                    { "addr": "0x8e8f033830c60602ef491d0f850094d72d483e602c9a5df845eac7efc3387a38", "name": "XSL", "decimals": 6 }
                ]
        }
    }
    componentWillMount(){
        intl.options.currentLocale=localStorage.getItem("local");
    }
    componentDidMount() {
        
        this.setState({
            isShow: this.props.location.state
        })

    }
    handleMouseUp = (i,val) => {
        // this.setState({
        //     ind: i
        // })
        this.props.dealIndex.changeInd(i)
        this.props.dealIndex.selectChange({
            value:val,
            isShow:false
        })
        
    }
    handlesMouseUp = (i,val) =>{
        this.props.dealIndex.changeInds(i)
        this.props.dealIndex.selectsChange({
            value:val,
            isShows:false
        })
    }
    render() {
        let { routes } = this.props;
        let {list,ind,inds} = this.props.dealIndex
        return (
            <div className="default">
                <div className="wrap">
                    <RouterView routes={routes}></RouterView>
                </div>
                {
                    this.state.isShow == true ? <div className="dialog">
                        <div className="dialogContent">
                            <p><img src="/img/编组 30@2x.png" /></p>
                            <span onClick={() => {
                                this.setState({
                                    isShow: false
                                })
                            }}>{intl.get('Start Now')}</span>
                        </div>
                    </div> : null
                }
                <footer>
                    {
                        this.state.routes.map((v, i) => {
                            return <NavLink key={i} to={v.to} activeClassName={`${v.activeName}${i}`}>
                                <dt></dt>
                                <dd>{intl.get(v.name)}</dd>
                            </NavLink>
                        })
                    }
                </footer>
                {
                    this.props.dealIndex.isShow ? <div className="selectListDialog animated bounceInUp">
                        <div className="selectLists">
                            {
                                list.map((v, i) => {
                                    return <div key={i} className="selectList" onClick={() => this.handleMouseUp(i,v.name)}>
                                        <label>{v.name}</label>
                                        <span className={ind == i ? 'light' : 'dark'}></span>
                                    </div>
                                })
                            }
                        </div>
                    </div> : null
                }
                {
                    this.props.dealIndex.isShows ? <div className="selectListDialog animated bounceInUp">
                        <div className="selectLists">
                            {
                                list.map((v, i) => {
                                    return <div key={i} className="selectList" onClick={() => this.handlesMouseUp(i,v.name)}>
                                        <label>{v.name}</label>
                                        <span className={inds == i ? 'light' : 'dark'}></span>
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
