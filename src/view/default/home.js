import React, { Component } from 'react';
import RouterView from '../../router/routerView';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import intl from 'react-intl-universal';
import vAccount from '../../utils/violas';
import './default.scss';
// import coinData from '../../utils/currencyToken.json';

@inject('index', 'dealIndex')
@observer

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            coindata: [],
            otherdata: [],
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
                    name: 'My Profile',
                    activeName: 'active'
                }
            ],
            updatas: [],
            ind: 0,
            inds: 1
        }
    }
    componentWillMount() {
        intl.options.currentLocale = localStorage.getItem("local");
    }
    async componentDidMount() {
        // let coinData = await this.props.dealIndex.getCoinMess();
        let decrypted = JSON.parse(window.localStorage.getItem('data'));
        let othersData = await this.props.dealIndex.getOthersCoinMess();
        let violas = new vAccount(decrypted&&decrypted.mne_arr);
        let newData = await this.props.index.updateCurCoin({
            addr: violas.address
        })
        let data = [], data1 = [];
        data = this.addCheck(othersData && othersData);
        data1 = this.addCheck(othersData && othersData);
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < newData.length; j++) {
                if (data[i].addr.indexOf('0x' + newData[j]) == 0) {
                    data[i].checked = true;
                    break;
                } else {
                    data[i].checked = false;
                }
            }
        }
        for (let i = 0; i < data1.length; i++) {
            for (let j = 0; j < newData.length; j++) {
                if (data1[i].addr.indexOf('0x' + newData[j]) == 0) {
                    data1[i].checked = true;
                    break;
                } else {
                    data1[i].checked = false;
                }
            }
        }
        this.setState({
            coindata: data,
            othersdata: data1,
            isShow: this.props.location.state
        })

    }
    addCheck(data) {
        return data && data.map((v, i) => {

            if (v.checked) {
                return v;
            } else {
                return Object.assign(v, { checked: false })
            }

        })
    }
    handleMouseUp = (i) => {
        this.state.coindata[i].checked = true;
        this.props.dealIndex.changeInd(i)
        this.props.dealIndex.selectChange({
            isShow: false
        })

    }
    handlesMouseUp = (i) => {
        this.state.othersdata[i].checked = true;
        this.props.dealIndex.changeInds(i)
        this.props.dealIndex.selectsChange({
            isShows: false
        })
    }
    getTo(to) {
        if (window.localStorage.getItem('type') == intl.get('ViolasWallet')) {
            if (to == '/home/market') {
                return '/home/market';
            } else {
                return to;
            }
        } else {
            if (to == '/home/market') {
                return false;
            } else {
                return to;
            }
        }
    }
    render() {
        let { routes } = this.props;
        let { val, vals } = this.props.dealIndex;
        let { coindata, othersdata } = this.state;
        return (
            <div className="default">
                <div className="wrap">
                    <RouterView routes={routes}></RouterView>
                </div>
                {
                    this.state.isShow == true ? intl.get('Start Now') == "Start Now" ? <div className="dialog">
                        <div className="dialogContent">
                            <p><img src="/img/编组 30@2xen.png" /></p>
                            <span onClick={() => {
                                this.setState({
                                    isShow: false
                                })
                            }}>{intl.get('Start Now')}</span>
                        </div>
                    </div> : <div className="dialog">
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

                            return <NavLink key={i} to={this.getTo(v.to)} activeClassName={`${v.activeName}${i}`}>
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
                                coindata.map((v, i) => {
                                    return <div key={i} className="selectList" onClick={() => this.handleMouseUp(i, v.name)}>
                                        <label><span className={v.checked ? 'light' : 'dark'}></span>{v.name}</label>
                                        <span className={val == i ? 'light' : 'dark'}></span>
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
                                othersdata.map((v, i) => {
                                    return <div key={i} className="selectList" onClick={() => this.handlesMouseUp(i, v.name)}>
                                        <label><span className={v.checked ? 'light' : 'dark'}></span>{v.name}</label>
                                        <span className={vals == i ? 'light' : 'dark'}></span>
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
