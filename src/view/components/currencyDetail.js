import React, { Component } from "react";
import { connect } from "react-redux";
import { timeStamp2String } from '../../utils/timer';
import { Pagination } from 'antd';
// import { withRouter } from "react-router-dom";
import '../app.scss'
let url = 'https://api.violas.io'
class CurrencyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types:[
                {
                    name:'全部',
                    type:'all'
                },
                {
                    name: '转入',
                    type: 'into'
                },
                {
                    name: '转出',
                    type: 'out'
                }
            ],
            navType:'all',
            address: '0000000000000000000000000a550c18',
            dataList:[],
            total:0,
            page:0
        };
        
    }
    componentDidMount() { 
        console.log(window)
        this.getNavData()
    }
    getSubStr(str){
        var subStr1 = str && str.substr(0, 10);
        var subStr2 = str && str.substr(str.length - 5, 5);
        var subStr = subStr1 + "..." + subStr2;
        return subStr;
    }

    getNavData(){
        fetch(url + '/explorer/violas/address/0000000000000000000000000a550c18?offset='+this.state.page+'&limit=5').then(res => res.json()).then(res => {
            if (this.state.navType == 'all') {
                this.setState({
                    total: res.data.status.received_tx_count + res.data.status.sent_tx_count,
                    dataList: res.data.transactions
                })
            } else if (this.state.navType == 'into') {
                let data = res.data.transactions.filter((v) => {
                    console.log(v.receiver.slice(8,20))
                    return v.receiver == this.state.address
                })
                this.setState({
                    dataList:data
                })
            } else if (this.state.navType == 'out') {
                let data = res.data.transactions.filter((v) => {
                    return v.sender == this.state.address
                })
                this.setState({
                    dataList: data
                })
            }

        })
    }
    showDetails = () => {
        this.props.showDetails();
    };
    onChange = (page,pageSize) => {
        console.log(page, pageSize);
        this.setState({
            page: page,
        },()=>{
            this.getNavData()
        });
    };
    render() {
        let { types, navType, dataList, total, curPage} = this.state;
        console.log(total)
        return (
            <div className="currencyDetail">
                <h4 onClick={() => this.showDetails()}>
                    <i>
                        <img src="/img/编组备份 3@2x.png" />
                    </i>
                    币种详情
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
                                return <div key={i} className="detailList" onClick={() => {
                                    this.props.showDetails();
                                    this.props.showEveryDetail();
                                }}>
                                    <i>
                                     {
                                            v.type.slice(0, 7) == 'PUBLISH' ? <img src="/img/编组 82@2x.png" /> : v.sender == this.state.address ? <img src="/img/编组 13备份 3@2x.png" /> : v.receiver == this.state.address ? <img src="/img/编组 13备份 2@2x.png" /> : null
                                      }</i>
                                    <div className="listCenter">
                                        <p>
                                            {
                                                v.type.slice(0, 7) == 'PUBLISH' ? 'Null' : v.sender == this.state.address ? this.getSubStr(v.receiver) : v.receiver == this.state.address ? this.getSubStr(v.sender) : null
                                            }
                                        </p>
                                        <p>{timeStamp2String(v.expiration_time+'000')}</p>
                                    </div>
                                    <div className="listResult">
                                        <p className={v.type.slice(0, 7) == 'PUBLISH' ? 'org' : v.receiver == this.state.address ? 'org':'green'}>{v.amount / 1e6}</p>
                                        {/* <p className="org">交易中</p> */}
                                    </div>
                                </div>
                            })
                        }
                        {
                            total > 0 ? <Pagination defaultCurrent={1} defaultPageSize={5} total={Number(total)} onChange={this.onChange} /> : null
                        }
                        {/* <div className="detailList">
                            <i><img src="/img/编组 13备份 3@2x.png" /></i>
                            <div className="listCenter">
                                <p>dhhoiwei…djoiejodjo</p>
                                <p>01/18  12:06:23</p>
                            </div>
                            <div className="listResult">
                                <p className="gre">99900</p>
                            </div>
                        </div>
                        <div className="detailList">
                            <i><img src="/img/编组 52@2x.png" /></i>
                            <div className="listCenter">
                                <p>dhhoiwei…djoiejodjo</p>
                                <p>01/18  12:06:23</p>
                            </div>
                            <div className="listResult">
                                <p className="org">99900</p>
                            </div>
                        </div>
                        <div className="detailList">
                            <i><img src="/img/编组 82@2x.png" /></i>
                            <div className="listCenter">
                                <p>dhhoiwei…djoiejodjo</p>
                                <p>01/18  12:06:23</p>
                            </div>
                            <div className="listResult">
                                <p className="org">99900</p>
                            </div>
                        </div> */}
                    </div>
                </div>
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
        showEveryDetail: () => {
            dispatch({
                type: "DISPLAY2",
                payload: true,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDetail);
