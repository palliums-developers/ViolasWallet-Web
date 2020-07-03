import React, { Component } from "react";
import { connect } from "react-redux";
import { timeStamp2String } from '../../utils/timer';
import { Pagination } from 'antd';
// import { withRouter } from "react-router-dom";
import '../app.scss'
// let url = 'https://api.violas.io'
let url = "https://api4.violas.io"

class CurrencyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types:[
                {
                    name:'ALL',
                    type:'all'
                },
                {
                    name: 'INTO',
                    type: 'into'
                },
                {
                    name: 'ROLL OUT',
                    type: 'out'
                }
            ],
            navType:'all',
            address: '7f4644ae2b51b65bd3c9d414aa853407',
            dataList:[],
            total:0,
            page:0,
            pageSize:10,
            curIndex:0,
            detailAddr:'',
            name:''
        };
        
    }
    componentDidMount() { 
        this.setState({
            detailAddr: window.sessionStorage.getItem('detailAddr')&&window.sessionStorage.getItem('detailAddr'),
            name: window.sessionStorage.getItem('name') && window.sessionStorage.getItem('name'),
        },()=>{
           this.getNavData() 
        })
    }
    getSubStr(str){
        if(str == null){
         return 'null'
        }
        var subStr1 = str && str.substr(0, 10);
        var subStr2 = str && str.substr(str.length - 5, 5);
        var subStr = subStr1 + "..." + subStr2;
        return subStr;
    }

    getNavData(){
        let {detailAddr,name} = this.state;
        console.log(detailAddr, name)
        if (name == 'BTC'){
            this.setState({
                dataList: []
            })
        }else{
            if (this.state.navType == 'all') {
                if (this.state.total == 0) {
                    fetch(url + '/1.0/violas/transaction?addr=' + detailAddr + '&&offset=0&&limit=20').then(res => res.json()).then(res => {

                        this.setState({
                            total: res.data.length
                        })
                    })
                }

                fetch(url + '/1.0/violas/transaction?addr=' + detailAddr + '&&offset=' + this.state.page + '&&limit=' + this.state.pageSize).then(res => res.json()).then(res => {
                    // console.log(res.data.length)
                    res.data.sort((a, b) => {
                        return b.amount - a.amount;
                    })
                    this.setState({
                        dataList: res.data
                    })
                })
            } else if (this.state.navType == 'into') {
                fetch(url + '/1.0/violas/transaction?addr=' + detailAddr + '&&flows=1').then(res => res.json()).then(res => {
                    res.data.sort((a, b) => {
                        return b.amount - a.amount;
                    })
                    this.setState({
                        total: res.data.length,
                        dataList: res.data
                    })
                })
            } else if (this.state.navType == 'out') {
                fetch(url + '/1.0/violas/transaction?addr=' + detailAddr + '&&flows=0').then(res => res.json()).then(res => {
                    res.data.sort((a, b) => {
                        return b.amount - a.amount;
                    })
                    this.setState({
                        total: res.data.length,
                        dataList: res.data
                    })
                })
            }
        }
        
        
    }
    showDetails = () => {
        this.props.showDetails();
    };
    onChange = (page,pageSize) => {
        console.log(page, pageSize)
        this.setState({
            page: page,
            pageSize:pageSize,
            curIndex:9
        },()=>{
            this.getNavData()
        });
    };
    curDataFun = (val) => {
        console.log(val)
        this.props.showDetails();
        this.props.showEveryDetail({
            display2:true,
            detailData:val
        });
        // this.props.getDetailData(val)
    }
    render() {
        let { types, navType, dataList, total, curPage} = this.state;
        let { detailAddr } = this.state;
        // console.log(dataList)
        return (
            <div className="currencyDetail">
                <h4 onClick={() => this.showDetails()}>
                    <i>
                        <img src="/img/编组备份 3@2x.png" />
                    </i>
                    Currency Detail
                </h4>
                <div className="detailContent">
                    <div className="detailNav">
                        {
                           types.map((val,ind)=>{
                             return <span key={ind} onClick={()=>{
                                 this.setState({
                                     navType:val.type
                                 },()=>{
                                     this.getNavData()
                                 })
                             }} className={navType == val.type ? 'active':null}>{val.name}</span>
                           })
                        }
                    </div>
                    <div className="detailLists">
                        {
                            dataList.map((v,i)=>{
                                return <div key={i} className="detailList" onClick={() => this.curDataFun(v)}>
                                    <i>
                                     {
                                            v.type == 0 ? <img src="/img/编组 82@2x.png" /> : v.sender == detailAddr ? <img src="/img/编组 13备份 3@2x.png" /> : v.receiver == detailAddr ? <img src="/img/编组 13备份 2@2x.png" /> : null
                                      }</i>
                                    <div className="listCenter">
                                        <p>
                                            {
                                                v.type == 0 ? this.getSubStr(v.sender) : v.sender == detailAddr ? this.getSubStr(v.receiver) : v.receiver == detailAddr ? this.getSubStr(v.sender) : null
                                            }
                                        </p>
                                        <p>{timeStamp2String(v.expiration_time+'000')}</p>
                                    </div>
                                    <div className="listResult">
                                        <p className={v.type == 0 ? 'org' : v.receiver == detailAddr ? 'org':'green'}>{v.amount / 1e6}</p>
                                        {/* <p className="org">交易中</p> */}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                {
                    total > 0 ? <Pagination defaultCurrent={1} defaultPageSize={10} total={Number(total)} onChange={this.onChange} /> : null
                }
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
    return {
        showDetails: () => {
            dispatch({
                type: "DISPLAY1",
                payload: false,
            });
        },
        showEveryDetail: (payload) => {
            dispatch({
                type: "DISPLAY2",
                payload: {
                    display2: payload.display2,
                    detailData: payload.detailData
                }
            });
        },
        // getDetailData:(payload)=>{
        //     dispatch({
        //         type: "DETAILDATA",
        //         payload: payload
        //     });
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDetail);