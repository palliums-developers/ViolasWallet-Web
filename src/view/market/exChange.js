import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import "../app.scss";
import { connect } from 'react-redux';

// import RouterView from '../router/routerView'
let url = "http://52.27.228.84:4000"

class ExChange extends Component {
    constructor() {
        super()
        this.state = {
            showMenuViolas: false,
            showMenuViolas1: false,
            names: ['Violas', 'Libra','Bitcoin'],
            name:'Violas',
            getFocus: false,
            getFocus1: false,
            inputAmount:'',
            outputAmount:'',
            warning:''
            // visible:false
        }
    }
    componentWillMount(){
        if(this.props.showpooling){
            this.props.showPolling()
        } else if (this.props.visible1){
            this.props.showDrawer1()
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.closeMenu);
    }
    getShow = (event) =>{
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
    showMenu = (v) => {
        
        this.setState({
            name:v,
            showMenuViolas:false
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
    
    getInputAmount = (e) =>{
      if (e.target.value){
         this.setState({
             inputAmount: e.target.value,
             getFocus:true
         })
      }else{
          this.setState({
              inputAmount: e.target.value,
              getFocus: false
          })
      }
    }
    getOutputAmount = (e) => {
        if (e.target.value) {
            this.setState({
                outputAmount: e.target.value,
                getFocus1: true
            })
        } else {
            this.setState({
                outputAmount: e.target.value,
                getFocus1: false
            })
        }
    }
    showExchangeCode = () => {
        if (this.state.inputAmount){
            if (this.state.outputAmount) {
                this.setState({
                    warning: ''
                }, () => {
                    this.props.showDialog()
                })

            } 
            else {
                this.setState({
                    warning: '请输入兑换数量'
                })
            }
        } else {
            this.setState({
                warning: '请输入兑换数量'
            })
        }
    }
    render() {
        let { names, name, ind, getFocus, getFocus1, showMenuViolas, showMenuViolas1,warning } = this.state;

        return (
            <div className="exchange">
               <div className="exchangeContent">
                    <div className="exchangeContents">
                      <div className="form">
                        <p>gas：0.1000%</p>
                        <div className={getFocus ? 'iptForm getFormBorder' : 'iptForm'}>
                           <label>Input</label>
                           <div className="iptContent">
                                <input placeholder="0.00" onChange={(e)=>this.getInputAmount(e)}/>
                                <div className="dropdown1">
                                    {
                                            showMenuViolas ? <span className="showClick" onClick={(e) => this.getShow(e)}>{name}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow(e)}>{name}<i><img src="/img/路径 7@2x.png" /></i></span>
                                    }
                                    
                                    {
                                        showMenuViolas ? <div className='dropdown-content1'>
                                                {
                                                    names.map((v, i) => {
                                                        return <span key={i} className={name == v ? 'active' : null} onClick={() => this.showMenu(v)}>{v}</span>
                                                    })
                                                }
                                            </div> : null
                                    }
                                    
                                </div>
                           </div>
                        </div>
                        <div className="changeImg"><img src="/img/编组 2备份@2x.png"/></div>
                            <div className={getFocus1 ? 'iptForm1 getFormBorder' : 'iptForm1'}>
                            <label>Output</label>
                                <div className="iptContent">
                                    <input placeholder="0.00" onChange={(e) => this.getOutputAmount(e)}/>
                                    <div className="dropdown1">
                                        {
                                            showMenuViolas1 ? <span className="showClick" onClick={(e) => this.getShow1(e)}>选择通证<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow1(e)}>选择通证<i><img src="/img/路径 7@2x.png" /></i></span>
                                        }

                                        <div className='dropdown-content2'>
                                            <div className="search">
                                                <i><img src="/img/sousuo 2@2x.png"/></i>
                                                <input placeholder="搜索token"/>
                                            </div>
                                            <div className="searchLists">
                                               <div className="searchList">
                                                   <div className="img"><img /></div>
                                                   <div className="listContent">
                                                       <label>ETH</label>
                                                       <p>余额：0 ETH</p>
                                                   </div>
                                               </div>
                                                <div className="searchList">
                                                    <div className="img"><img /></div>
                                                    <div className="listContent">
                                                        <label>ETH</label>
                                                        <p>余额：0 ETH</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="changeRate">兑换率：—</div>
                            <div className="changeRate">矿工费用：—</div>
                      </div>
                      <div className="foot">
                        <p className="btn" onClick={()=>this.showExchangeCode()}>Exchange</p>
                        <p className="descr">{warning}</p>
                      </div>
                      <div className="changeRecord">
                        <h4>兑换记录</h4>
                         <div className="changeLists" onClick={()=>{
                                this.props.showDrawer(this.props.visible)
                         }}>
                            <div className="changeList">
                              <div className="list1">
                                  <span>兑换成功</span>
                                  <p>999ETH</p>
                              </div>
                              <div className="changeImg"><img src="/img/jixuduihuan备份 7@2x.png" /></div>
                              <div className="list2">
                                  <span>99900Violas</span>
                                  <p>01.18 15:42<i><img src="/img/rightArrow.png"/></i></p>
                              </div>
                            </div>
                        </div>
                        <div className="changeLists">
                            <div className="changeList">
                              <div className="list1">
                                  <span className="red">兑换失败</span>
                                  <p>999ETH</p>
                              </div>
                              <div className="changeImg"><img src="/img/jixuduihuan备份 7@2x.png" /></div>
                              <div className="list2">
                                  <span>99900Violas</span>
                                  <p>01.18 15:42<i><img src="/img/rightArrow.png"/></i></p>
                              </div>
                            </div>
                        </div>
                        <div className="changeLists">
                            <div className="changeList">
                              <div className="list1">
                                  <span className="yel">兑换中</span>
                                  <p>999ETH</p>
                              </div>
                              <div className="changeImg"><img src="/img/jixuduihuan备份 7@2x.png" /></div>
                              <div className="list2">
                                  <span>99900Violas</span>
                                  <p>01.18 15:42<i><img src="/img/rightArrow.png"/></i></p>
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
        showDialog: ()=>{
            dispatch({
                type: 'EXCHANGE',
                params: {
                    type: true,
                    vis:true
                }
            })
       },
        showDrawer:(type) => {
            dispatch({
                type: 'VISIBLE',
                payload: !type
            })
       },
        showDrawer1: () => {
            dispatch({
                type: 'VISIBLE1',
                payload: false
            })
        },
        showPolling: () => {
            dispatch({
                type: 'SHOWPOOL',
                payload: false
            })
        }
}
}
export default connect(mapStateToProps, mapDispatchToProps)(ExChange);