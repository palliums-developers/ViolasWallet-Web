import React, { Component } from "react";
import { connect } from "react-redux";
import { timeStamp2String } from '../../utils/timer';
import { Pagination } from 'antd';
import intl from "react-intl-universal";
// import { withRouter } from "react-router-dom";
import '../app.scss';
// let url = 'https://api.violas.io'
let url = "https://api4.violas.io"

//币种详情
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
            address: '7f4644ae2b51b65bd3c9d414aa853407',
            dataList:[],
            total:0,
            page:0,
            pageSize:6,
            curIndex:0,
            dis: false,
            detailAddrs:'',
            name:'',
            type:''
        };
        
    }
    async componentWillMount() {
        // console.log(this.props.detailAddrs)
        if (this.props.detailAddrs){
            this.setState({
                detailAddrs: this.props.detailAddrs,
                name: this.props.name
            }, () => {
                this.getNavData()
            })
        }
        
        

    }
    componentWillReceiveProps(nextProps){
        this.setState(
          {
            detailAddrs: nextProps.detailAddrs,
            name: nextProps.nameType,
            type:
              nextProps.icon
                .split("/")
                [nextProps.icon.split("/").length - 1].split(".")[0] 
          },
          () => {
            this.getNavData();
          }
        );
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
        let { detailAddrs, type } = this.state;
        if (type == "btc") {
          this.setState({
            dataList: [],
          });
        } else {
          if (this.state.navType == "all") {
            if (this.state.total == 0) {
              fetch(url + "/1.0/"+type+"/transaction?addr=" + detailAddrs)
                .then((res) => res.json())
                .then((res) => {
                  this.setState({
                    total: res.data.length,
                  });
                });
            }

            fetch(
              url +
                "/1.0/" +
                type +
                "/transaction?addr=" +
                detailAddrs +
                "&&offset=" +
                this.state.page +
                "&&limit=" +
                this.state.pageSize
            )
              .then((res) => res.json())
              .then((res) => {
                // console.log(res.data.length)

                this.setState({
                  dataList: res.data,
                });
              });
          } else if (this.state.navType == "into") {
            fetch(
              url +
                "/1.0/" +
                type +
                "transaction?addr=" +
                detailAddrs +
                "&&flows=1" +
                "&&offset=" +
                this.state.page +
                "&&limit=" +
                this.state.pageSize
            )
              .then((res) => res.json())
              .then((res) => {
                this.setState({
                  total: res.data.length,
                  dataList: res.data,
                });
              });
          } else if (this.state.navType == "out") {
            fetch(
              url +
                "/1.0/" +
                type +
                "transaction?addr=" +
                detailAddrs +
                "&&flows=0" +
                "&&offset=" +
                this.state.page +
                "&&limit=" +
                this.state.pageSize
            )
              .then((res) => res.json())
              .then((res) => {
                this.setState({
                  total: res.data.length,
                  dataList: res.data,
                });
              });
          }
        }
        
        
    }
    // showDetails = () => {
    //     this.props.showDetails();
    // };
    onChange = (page,pageSize) => {
        // console.log(page, pageSize)
        this.setState({
            page: page,
            pageSize:pageSize,
            curIndex:9
        },()=>{
            this.getNavData()
        });
    };

    handleCopy = () => {
        const spanText = document.getElementById('add').innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        this.setState({
            dis: true
        })
        let Timer = setInterval(() => {
            this.setState({
                dis: false
            })
        }, 1000);
    };
    
    render() {
        let { types, navType, dataList, total,dis} = this.state;
        let { detailAddrs,nameType,icon,rate,balance } = this.props;
        
        return (
          <div className="currencyDetail">
            <h4 onClick={() => this.props.showDetails(false)}>
              <i>
                <img src="/img/编组备份 3@2x.png" />
              </i>
              {intl.get("Currency Detail")}
            </h4>

            <div className="detailsBalance">
              <p className="title">
                <img src={icon} />
                <label>{nameType}</label>
              </p>
              <div className="bal">
                <span>{balance}</span>
                <span>≈${rate}</span>
              </div>
              <div className="addressCode">
                <span id="add">{detailAddrs}</span>
                {dis ? (
                  <i onClick={() => this.handleCopy()}>
                    <img src="/img/fuzhi 3@2x.png" />
                  </i>
                ) : (
                  <i onClick={() => this.handleCopy()}>
                    <img src="/img/Fill 3@2x.png" />
                  </i>
                )}
              </div>
            </div>
            <div className="detailContent">
              <div className="detailNav">
                {types.map((val, ind) => {
                  return (
                    <span
                      key={ind}
                      onClick={() => {
                        this.setState(
                          {
                            navType: val.type,
                          },
                          () => {
                            this.getNavData();
                          }
                        );
                      }}
                      className={navType == val.type ? "active" : null}
                    >
                      {val.name}
                    </span>
                  );
                })}
              </div>
              <div className="detailLists">
                {dataList.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="detailList"
                      onClick={() => {
                        this.props.showDetails(false);
                        this.props.curDataFun(v);
                        this.props.showDetails1(true);
                      }}
                    >
                      <i>
                        {v.type == 0 ? (
                          <img src="/img/编组 82@2x.png" />
                        ) : v.sender == detailAddrs ? (
                          <img src="/img/编组 13备份 3@2x.png" />
                        ) : v.receiver == detailAddrs ? (
                          <img src="/img/编组 13备份 2@2x.png" />
                        ) : null}
                      </i>
                      <div className="listCenter">
                        <p>
                          {v.type == 0
                            ? this.getSubStr(v.sender)
                            : v.sender == detailAddrs
                            ? this.getSubStr(v.receiver)
                            : v.receiver == detailAddrs
                            ? this.getSubStr(v.sender)
                            : null}
                        </p>
                        <p>{timeStamp2String(v.expiration_time + "000")}</p>
                      </div>
                      <div className="listResult">
                        <p
                          className={
                            v.type == 0
                              ? "org"
                              : v.receiver == detailAddrs
                              ? "org"
                              : "green"
                          }
                        >
                          {v.type == 0
                            ? ""
                            : v.sender == detailAddrs
                            ? "-"
                            : v.receiver == detailAddrs
                            ? "+"
                            : null}
                          {v.amount / 1e6}
                        </p>
                        {/* <p className="org">交易中</p> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {dataList.length > 0 ? (
              <Pagination
                defaultCurrent={1}
                defaultPageSize={6}
                total={Number(total)}
                onChange={this.onChange}
              />
            ) : null}
          </div>
        );
    }
}
let mapStateToProps = (state) => {
    return state.ListReducer;
};
let mapDispatchToProps = (dispatch) => {
    return {
        // showDetails: () => {
        //     dispatch({
        //         type: "DISPLAY1",
        //         payload: false,
        //     });
        // },
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
