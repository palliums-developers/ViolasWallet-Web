import React, { Component } from "react";
import './digitalBank.scss';
import { DatePicker, Breadcrumb, Table, Tag, Space, Select  } from "antd";
import { NavLink } from "react-router-dom";
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { timeStamp2String } from '../../utils/timer';
let url = "https://api4.violas.io";
const { RangePicker } = DatePicker;
const { Option } = Select;


//存款订单
class SaveOrder extends Component {
    constructor() {
        super()
        this.state = {
            saveId:0,
            showDialog:false,
            allCoin: [],
            allStatus: [],
            getId:'',
            withdrawalsList:{},
            withdrawalsAmount:'',
            warning:'',
            types:[
                {
                    id:0,
                    type:'当前存款'
                },
                {
                    id: 1,
                    type: '存款明细'
                }
            ],
            data:[],
            data1: [
                {
                    key: '1',
                    coin: 'VLS',
                    amount: '1000.0',
                    time:'18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '2',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '3',
                    coin: 'CAA',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '4',
                    coin: 'EEB',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '5',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '6',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                }, {
                    key: '1',
                    coin: 'CAA',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '2',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '3',
                    coin: 'CAA',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '4',
                    coin: 'EEB',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '5',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                },
                {
                    key: '6',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    status: '收益中'
                }
            ],
            columns:[
                {
                    title: '币种',
                    dataIndex: 'coin',
                    key: 'coin'
                },
                {
                    title: '本金',
                    dataIndex: 'money',
                    key: 'money',
                },
                {
                    title: '收益',
                    dataIndex: 'income',
                    key: 'income',
                },
                {
                    title: '年化收益率',
                    key: 'yield',
                    dataIndex: 'yield',
                    render: text => <label style={{ color: 'rgba(19, 183, 136, 1)' }}>{text}</label>,
                },
                {
                    title: '状态',
                    key: 'status',
                    dataIndex: 'status',
                    render: text => <label style={{ color: 'rgba(19, 183, 136, 1)' }}>{text}</label>,
                },
                {
                    title: '操作',
                    key: 'option',
                    dataIndex: 'option',

                    render: text => <label onClick={() => this.getOptions()} style={{ color: 'rgba(112, 56, 253, 1)', cursor: 'pointer'}}>{text}</label>,
                },
            ],
            columns1: [
                {
                    title: '时间',
                    dataIndex: 'time',
                    key: 'time'
                },
                {
                    title: '币种',
                    dataIndex: 'coin',
                    key: 'coin',
                },
                {
                    title: '数量',
                    dataIndex: 'amount',
                    key: 'amount',
                },
                {
                    title: '状态',
                    key: 'status',
                    dataIndex: 'status',
                    render: text => <label style={{ color: 'rgba(19, 183, 136, 1)' }}>{text}</label>,
                }
            ]
        }
    }
    getOptions = () =>{
        this.setState({
            showDialog: true
        },()=>{
            //存款提取
                fetch(url + "/1.0/violas/bank/deposit/withdrawal?address=" + window.sessionStorage.getItem('violas_address')+'&&id='+this.state.getId).then(res => res.json()).then(res => {
                    // console.log(res.data,'.........')
                    if (res.data){
                       this.setState({
                           withdrawalsList:res.data
                       })
                    }
                    
                })
        })
    }
    componentDidMount() {
        //当前存款
        fetch(url + "/1.0/violas/bank/deposit/orders?address=" + window.sessionStorage.getItem('violas_address')).then(res => res.json()).then(res => {
            if(res.data){
                let newData = [];
                for (let i = 0; i < res.data.length; i++) {
                    newData.push({
                        coin:res.data[i].currency,
                        key:i + 1,
                        id: res.data[i].id,
                        money:res.data[i].principal,
                        income:res.data[i].earnings,
                        yield:res.data[i].rate + '%',
                        status: res.data[i].status == 0 ? '已存款' : res.data[i].status == 1 ? '已提取' : res.data[i].status == -1 ? '提取失败':res.data[i].status == -2 ? '存款失败':null,
                        option:'提取'
                    })
                    
                }
                this.setState({
                    data:newData
                })
            }else{
                this.setState({
                    data: res.data
                })
            }
          
        })
        this.getSaveDetail()
    }
    //存款明细
    getSaveDetail = () => {
        fetch(url + "/1.0/violas/bank/deposit/order/list?address=" + window.sessionStorage.getItem('violas_address')).then(res => res.json()).then(res => {
            if (res.data) {
                // console.log(res.data,'......')
                let newData = [];
                let allCoin = [];
                let allStatus = []
                for (let i = 0; i < res.data.length; i++) {
                    newData.push({
                        time: timeStamp2String(res.data[i].date),
                        coin: res.data[i].currency,
                        key: i + 1,
                        
                        amount: res.data[i].value,
                        status: res.data[i].status == 0 ? '已存款' : res.data[i].status == 1 ? '已提取' : res.data[i].status == -1 ? '提取失败' : res.data[i].status == -2 ? '存款失败' : null,
                    })
                    if (allCoin.length > 0) {
                        for (let j = 0; j < allCoin.length; j++) {
                            if (allCoin[j] != res.data[i].currency) {
                                allCoin.push(res.data[i].currency)
                            }
                        }

                    } else {
                        allCoin.push(res.data[i].currency)
                    }
                    if (allStatus.length > 0) {
                        for (let j = 0; j < allStatus.length; j++) {
                            if (allStatus[j] != res.data[i].status) {
                                allStatus.push(res.data[i].status)
                            }
                        }

                    } else {
                        allStatus.push(res.data[i].status)
                    }

                }
                this.setState({
                    data1: newData,
                    allCoin: allCoin,
                    allStatus: allStatus
                })
            } else {
                this.setState({
                    data1: res.data
                })
            }

        })
    }
    onChange = (value, dateString)=>{
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    }

    onOk = (value) => {
        console.log('onOk: ', value);
    }
    //输入提取数量
    inputWithdrawalsAmount=(e)=>{
        if (e.target.value){
            this.setState({
                withdrawalsAmount: e.target.value,
                warning:''
            })
        }
        
    }
    withdrawals = () =>{
        if (this.state.withdrawalsAmount == ''){
            this.setState({
                warning: '请输入提取数量'
            })
        }
    }
    render() {
        let { types, allCoin, allStatus, withdrawalsList,warning } = this.state;
        // console.log(getDialog())
        return (
            <div className="saveOrder">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank"> <img src="/img/fanhui 2@2x.png" />
              数字银行</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank/saveOrder">存款订单</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="curSaveLists">
                   <div className="tab">
                       {
                           types.map((v,i)=>{
                               return <span key={i} className={this.state.saveId == v.id ? 'active' :null} onClick={()=>{
                                   this.setState({
                                       saveId:v.id
                                   })
                                }}>{v.type}</span>
                           })
                       }
                   </div>
                   {
                        this.state.saveId == 0 ? <Table onRow= { record => {
                        return {
                            onClick: () => { 
                                if(this.state.showDialog){
                                   this.setState({
                                      getId:record.id
                                   })
                                }
                            }, // 点击行
                        };
                    }} columns={this.state.columns} dataSource={this.state.data} pagination={{ pageSize: 6, position: ['bottomCenter'] }} /> : 
                        <div className="saveDetail">
                                <div className="selector">
                                    <Space direction="vertical" size={12}>
                                        <RangePicker
                                            locale={locale}
                                            showTime={{ format: 'HH:mm' }}
                                            format="YYYY-MM-DD HH:mm"
                                            onChange={this.onChange}
                                            onOk={this.onOk}
                                        />
                                    </Space>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="全部币种"
                                        optionFilterProp="children"
                                        // onChange={onChange}
                                        // onFocus={onFocus}
                                        // onBlur={onBlur}
                                        // onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            allCoin.map((v, i) => {
                                                return <Option key={i} value={v}>{v}</Option>
                                            })
                                        }
                                    </Select>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="全部状态"
                                        optionFilterProp="children"
                                        // onChange={onChange}
                                        // onFocus={onFocus}
                                        // onBlur={onBlur}
                                        // onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            allStatus.map((v, i) => {
                                                return <Option key={i} value={v}>{v == 1 ? '收益中' : null}</Option>
                                            })
                                        }
                                    </Select>
                                    <button>搜索</button>
                                </div>
                                <Table locale={locale} columns={this.state.columns1} dataSource={this.state.data1} pagination={{ pageSize: 6, position: ['bottomCenter'] }} />
                        </div>
                   }
                    
                </div>
                {
                    this.state.showDialog ? <div className="extractMark">
                        <div className="extractContent">
                            <div className="extractList">
                                <div className="head"><h4>提取</h4><i onClick={()=>{
                                    this.setState({
                                        showDialog:false
                                    })
                                }}><img src="/img/chahao.png" /></i></div>
                                <div className="inputDiv">
                                    <input placeholder="请输入提取数量" onChange={(e) => this.inputWithdrawalsAmount(e)}/><label>{withdrawalsList.token_show_name}</label>
                                </div>
                                <div className="inputDescr">
                                    <p><img src="/img/kyye.png" />可提数量：<span>{withdrawalsList.available_quantity}{withdrawalsList.token_show_name}</span></p>
                                    <p>全部</p>
                                </div>
                                <div className="extractDescr"><img src="/img/编组 4@2x.png" /><p>如果您当前有借贷操作，则需将部分存款作为质押金。提取质押金需还对应数量的借款金额。</p></div>
                                <div className="foot">
                                    <p className="btn" onClick={() => this.withdrawals()}>提 取</p>
                                    <p className="descr descrRed">{warning}</p>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
                
            </div>
        )
    }


}

export default SaveOrder;