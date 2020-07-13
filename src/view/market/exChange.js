import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import "../app.scss";
import { connect } from 'react-redux';
import ExchangeDetail from '../market/exchangeDetail';
import { Drawer } from "antd";
import { timeStamp2String } from '../../utils/timer';
// import RouterView from '../router/routerView'
let url = "https://api.violas.io"
let url1 = "https://api4.violas.io"

class ExChange extends Component {
    constructor() {
        super()
        this.state = {
            showMenuViolas: false,
            showMenuViolas1: false,
            type:'',
            getFocus: false,
            getFocus1: false,
            inputAmount:'',
            outputAmount:'',
            warning:'',
            visible:false,
            selData:[],
            changeRecord:[],
            changeList:{}
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
        // document.addEventListener('click', this.closeMenu);
        this.getSelectTypes()
        this.getExchangeRecode()
    }
    getExchangeRecode = () =>{
        fetch(url1 + "/1.0/market/exchange/transaction?address=" + window.localStorage.getItem('address') + 'offset=0&limit=5').then(res => res.json())
            .then(res => {
               this.setState({
                   changeRecord: [
                       {
                           "date": 1594324849,
                           "input_amount": 10000,
                           "input_name": "VLSUSD",
                           "output_amount": 9951,
                           "output_name": "VLSEUR",
                           "status": 4001,
                           "version": 10
                       },
                       {
                           "date": 1594324849,
                           "input_amount": 10000,
                           "input_name": "VLSUSD",
                           "output_amount": 9951,
                           "output_name": "VLSEUR",
                           "status": 4001,
                           "version": 11
                       }
                   ]
               })
            })
    }
    getShow = (event) =>{
        // this.stopPropagation(event)
        this.setState({
            showMenuViolas: !this.state.showMenuViolas
        })
    }
    getShow1 = (event) => {
        // this.stopPropagation(event)
        this.setState({
            showMenuViolas1: !this.state.showMenuViolas1
        })
    }
    showMenu = (v) => {
        
        this.setState({
            type:v,
            showMenuViolas:false
        }, () => {
            this.getSelectTypes()
        })
    }
    // closeMenu = () => {
    //     this.setState({
    //         showMenuViolas: false
    //     })
    // }
    // // stopPropagation(e) {
    //     e.nativeEvent.stopImmediatePropagation();
    // }
    getSelectTypes() {
        fetch(url + "/1.0/violas/currency").then(res => res.json())
            .then(res => {
                let data = res.data.currencies
                fetch(url + "/1.0/violas/currency/published?addr="+window.localStorage.getItem('address')).then(res => res.json())
                    .then(res => {
                        let data1=[];
                        for (var i=0;i<data.length;i++) {
                            for (var j = 0; j < res.data.published.length; j++) {
                                if(data[i].show_name == res.data.published[j]){
                                    //  console.log(data[i])
                                    data1.push(data[i])
                                }
                            }
                        }
                        this.setState({
                            selData: data1
                        },()=>{
                                if (this.state.type == "") {
                                    this.setState({
                                        type: this.state.selData[0].show_name
                                    })
                                }
                        })
                })
            })
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
    onClose = () => {
        this.setState({
            visible:false
        })
    };
    showDrawer = (type) =>{
        this.setState({
            visible: type
        })
    }
    render() {
        let { type, getFocus, getFocus1, showMenuViolas, showMenuViolas1, warning, selData, changeRecord } = this.state;
        // console.log(showMenuViolas,'.......')
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
                                            showMenuViolas ? <span className="showClick" onClick={(e) => this.getShow(e)}>{type}<i><img src="/img/路径备份 6@2x.png" /></i></span> : <span onClick={(e) => this.getShow(e)}>{type}<i><img src="/img/路径 7@2x.png" /></i></span>
                                    }
                                    {showMenuViolas ? (
                                        <div className="dropdown-content1">
                                            {selData.map((v, i) => {
                                            return (
                                                <span
                                                key={i}
                                                className={v.show_name == type ? "active" : null}
                                                onClick={() => {
                                                    this.showMenu(v.show_name)
                                                }}
                                                >
                                                {v.show_name}
                                                </span>
                                            );
                                            })}
                                        </div>
                                        ) : null}
                                    {/* {
                                        showMenuViolas ? <div className='dropdown-content1'>
                                                {
                                                    names.map((v, i) => {
                                                        return <span key={i} className={name == v ? 'active' : null} onClick={() => this.showMenu(v)}>{v}</span>
                                                    })
                                                }
                                            </div> : null
                                    }
                                     */}
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
                        <div className="changeLists">
                        {
                            changeRecord.map((v,i)=>{
                                return <div className="changeList" key={i} onClick={() => {
                                        this.setState({
                                            visible: true,
                                            changeList: v
                                        })
                                    }}>
                                        <div className="list1">
                                            <span className={v.status == 4001 ? 'green' : 'red'}>{v.status == 4001 ? '兑换成功' : '兑换失败'}</span>
                                            <p>{v.input_amount}{v.input_name}</p>
                                        </div>
                                        <div className="changeImg"><img src="/img/jixuduihuan备份 7@2x.png" /></div>
                                        <div className="list2">
                                            <span>{v.input_amount}{v.input_name}</span>
                                            <p>{timeStamp2String(v.date+'000')}<i><img src="/img/rightArrow.png" /></i></p>
                                        </div>
                                    </div>
                               
                            })
                        }
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
                {/* 兑换详情 */}
                <Drawer
                    // title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    mask={false}
                >
                    <ExchangeDetail showDrawer={this.showDrawer} changeList={this.state.changeList}></ExchangeDetail>
                </Drawer>
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