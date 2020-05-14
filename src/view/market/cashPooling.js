import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import "../app.scss";
import { connect } from 'react-redux';

// import RouterView from '../router/routerView'
let url = "http://52.27.228.84:4000"

class CashPooling extends Component {
    constructor() {
        super()
        this.state = {
            showMenuViolas: false,
            showMenuViolas1: false,
            names: ['Violas', 'Libra', 'Bitcoin'],
            types:['转入','转出'],
            type:'转入',
            name: 'Violas',
            showDealType:false
            // visible:false
        }
    }
    componentWillMount(){
        if (this.props.visible) {
            this.props.showDrawer()
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.closeMenu);
    }
    getShow = (event) => {
        this.stopPropagation(event)
        this.setState({
            showMenuViolas: !this.state.showMenuViolas
        })
    }
    getShow1 = (event) => {
        this.stopPropagation(event)
        this.setState({
            showMenuViolas1: !this.state.showMenuViolas1
        })
    }
    getTypeShow = (event) => {
        this.stopPropagation(event)
        this.setState({
            showDealType: !this.state.showDealType
        })
    }
    showMenu = (v) => {

        this.setState({
            name: v,
            showMenuViolas: false
        })
    }
    closeMenu = () => {
        this.setState({
            showMenuViolas: false
        })
    }
    stopPropagation(e) {
        e.nativeEvent.stopImmediatePropagation();
    }
    showExchangeCode = () => {
        this.props.showDialog()
    }
    showTypes = (v) => {

        this.setState({
            type: v,
            showDealType: false
        })
    }
    
    render() {
        let { names, name, showMenuViolas, showMenuViolas1, types,type, showDealType } = this.state;

        return (
            <div className="exchange cashPooling">
                <div className="exchangeContent">
                    {
                        this.props.showpooling ? <div className="minePool poolClick" onClick={() => {
                            this.props.showPolling(!this.props.showpooling)
                        }}><img src="/img/形状备份 2@2x.png" />我的资金池</div> : <div className="minePool" onClick={() => {
                                this.props.showPolling(!this.props.showpooling)
                            }}><img src="/img/形状 2@2x.png" />我的资金池</div>
                    }
                    
                    <div className="exchangeContents">
                        <h4>Cash Pooling</h4>
                        <div className="form">
                            <div className="dropdown">
                                <div className="dropdown2">
                                    {
                                        showDealType ? <span className="showClick" onClick={(e) => this.getTypeShow(e)}>{type}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getTypeShow(e)}>{type}<i><img src="/img/路径 7@2x.png" /></i></span>
                                    }
                                    {
                                        showDealType ? <div className='dropdown-content2'>
                                            {
                                                types.map((v, i) => {
                                                    return <span key={i} className={v == type ? 'active' : null} onClick={() => this.showTypes(v)}>{v}</span>
                                                })
                                            }
                                        </div> : null
                                    }
                                    

                                </div>
                                <p>gas：0.1000%</p>
                            </div>
                            <div className="iptForm">
                                <label>Input</label>
                                <div className="iptContent">
                                    <input placeholder="0.00" />
                                    <div className="dropdown1">
                                        {
                                            showMenuViolas ? <span className="showClick" onClick={(e) => this.getShow(e)}>{name}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow(e)}>{name}<i><img src="/img/路径 7@2x.png" /></i></span>
                                        }

                                        {
                                            showMenuViolas ? <div className='dropdown-content1'>
                                                {
                                                    names.map((v, i) => {
                                                        return <span key={i} className={v == name ? 'active' : null} onClick={() => this.showMenu(v)}>{v}</span>
                                                    })
                                                }
                                            </div> : null
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="changeImg"><img src="/img/编组 2备份@2x.png" /></div>
                            <div className="iptForm1">
                                <label>Output</label>
                                <div className="iptContent">
                                    <input placeholder="0.00" />
                                    <div className="dropdown1">
                                        {
                                            showMenuViolas1 ? <span className="showClick" onClick={(e) => this.getShow1(e)}>选择通证<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow1(e)}>选择通证<i><img src="/img/路径 7@2x.png" /></i></span>
                                        }

                                        <div className='dropdown-content2'>
                                            <div className="search">
                                                <i><img src="/img/" /></i>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="changeRate">兑换率：— —</div>
                            <div className="changeRate">当前资金池大小：— —</div>
                            <div className="changeRate">你的资金池共有：— —</div>
                        </div>
                        <div className="foot">
                            <p className="btn" onClick={() => this.showExchangeCode()}>转入</p>
                            <p className="descr">请输入兑换数量</p>
                        </div>
                        <div className="changeRecord poolRecord">
                            <h4>资金池记录</h4>
                            <div className="poolRecordLists">
                                <div className="poolRecordList" onClick={() => {
                                    this.props.showDrawer1()
                                }}>
                                    <div className="logo"><img src="/img/编组 42备份 11@2x.png"/></div>
                                    <div className="listContent">
                                        <div className="listContents">
                                          <div>
                                              <p className="green">转入成功</p>
                                                <p><label>999ETH</label>&nbsp;&nbsp;&&nbsp;&nbsp;<label>99900Violas</label></p>
                                          </div>
                                          <div>
                                              <p>通证：+199 VETH</p>
                                              <p>01.18 15:42</p>
                                          </div>
                                        </div>
                                        <label><img src="/img/rightArrow.png"/></label>
                                    </div>
                                </div>
                                <div className="poolRecordList">
                                    <div className="logo"><img src="/img/编组 42备份 11@2x.png" /></div>
                                    <div className="listContent">
                                        <div className="listContents">
                                            <div>
                                                <p className="org">打包中</p>
                                                <p><label>999ETH</label>&nbsp;&nbsp;&&nbsp;&nbsp;<label>99900Violas</label></p>
                                            </div>
                                            <div>
                                                <p>通证：+199 VETH</p>
                                                <p>01.18 15:42</p>
                                            </div>
                                        </div>
                                        <label><img src="/img/rightArrow.png" /></label>
                                    </div>
                                </div>
                                <div className="poolRecordList">
                                    <div className="logo"><img src="/img/编组 42备份 11@2x.png" /></div>
                                    <div className="listContent">
                                        <div className="listContents">
                                            <div>
                                                <p className="red">转入失败</p>
                                                <p><label>999ETH</label>&nbsp;&nbsp;&&nbsp;&nbsp;<label>99900Violas</label></p>
                                            </div>
                                            <div>
                                                <p>通证：+199 VETH</p>
                                                <p>01.18 15:42</p>
                                            </div>
                                        </div>
                                        <label><img src="/img/rightArrow.png" /></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

let mapStateToProps = (state) => {
    return state.ListReducer;
}
let mapDispatchToProps = (dispatch) => {
    return {
        showPolling: (payload) => {
            dispatch({
                type: 'SHOWPOOL',
                payload: payload
            })
        },
        showDrawer: () => {
            dispatch({
                type: 'VISIBLE',
                payload: false
            })
        },
        showDrawer1: () => {
            dispatch({
                type: 'VISIBLE1',
                payload: true
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CashPooling);