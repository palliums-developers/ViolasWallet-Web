import React, { Component } from "react";
import './digitalBank.scss';
import { DatePicker, Breadcrumb, Table, Tag, Space, Select } from "antd";
import { NavLink } from "react-router-dom";
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { timeStamp2String } from '../../utils/timer';
let url = "https://api4.violas.io";
const { RangePicker } = DatePicker;
const { Option } = Select;


//借款订单
class BorrowOrder extends Component {
    constructor() {
        super()
        this.state = {
            saveId: 0,
            detailId:0,
            showDialog: false,
            expandedRowKeys: [],
            allCoin:[],
            allStatus:[],
            displayMenu:false,
            borrowDetails: [
            {
                id:0,
                type: '借款明细',
            }, 
            {
                id: 1,
                type: '还款明细',
            },
            {
                id: 2,
                type: '清算明细',
            }
            ],
            types: [
                {
                    id: 0,
                    type: '当前借款'
                },
                {
                    id: 1,
                    type: '借款明细'
                }
            ],
            data: [],
            data1: [],
            columns: [
                {
                    title: '币种',
                    dataIndex: 'coin',
                    key: 'coin'
                },
                {
                    title: '待还金额',
                    dataIndex: 'money',
                    key: 'money',
                },
                {
                    title: '剩余可借',
                    dataIndex: 'income',
                    key: 'income',
                },
                {
                    title: '操作',
                    key: 'option',
                    dataIndex: 'option',

                    render: texts => (
                        <div style={{ display: 'flex'}}>
                            {
                                texts.map((val,i)=>{
                                    if (val.name == '详情'){
                                        return <label key={i} style={{ display: 'flex', alignItems: 'center', marginRight: '50px', color: 'rgba(112, 56, 253, 1)', cursor: 'pointer' }}>{val.name}
                                        {
                                                val.displayMenu ? <img style={{ width: '12px', height: '12px', marginLeft: '5px' }} src="/img/编组 16@2x (3).png" /> : <img style={{ width: '12px', height: '12px', marginLeft: '5px' }} src="/img/编组 16@2x (2).png" />
                                        }
                                        </label>
                                    } else if (val.name == '还款'){
                                        return <label key={i} onClick={()=>{
                                            this.props.history.push('/homepage/home/digitalBank/repayment')
                                        }} style={{ marginRight: '50px', color: 'rgba(112, 56, 253, 1)', cursor: 'pointer' }}>{val.name}</label>
                                    }
                                    return <label key={i} onClick={() => {
                                        this.props.history.push('/homepage/home/digitalBank/borrowDetails')
                                    }} style={{ marginRight: '50px', color: 'rgba(112, 56, 253, 1)', cursor: 'pointer' }}>{val.name}</label>
                                })
                            }
                        </div>
                    ),
                    onCell: (record) => {
                        return {
                            onClick: () => this.expandRowByKey(record.key),
                        };
                        
                    },
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
                    title: '矿工费用',
                    dataIndex: 'gas',
                    key: 'gas',
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
    componentDidMount() {
        // 当前借款
        fetch(url + "/1.0/violas/bank/borrow/orders?address=" + window.sessionStorage.getItem('violas_address')).then(res => res.json()).then(res => {
            if (res.data) {
                let newData = [];
                for (let i = 0; i < res.data.length; i++) {
                    newData.push({
                        coin: res.data[i].name,
                        key: i + 1,
                        money: res.data[i].amount,
                        income: res.data[i].amount,
                        option: [
                            {
                                id: 0,
                                name: '还款'
                            },
                            {
                                id: 1,
                                name: '借款'
                            },
                            {
                                id: 2,
                                name: '详情',
                                displayMenu: false
                            }
                        ],
                    })

                }
                this.setState({
                    data: newData
                })
            } else {
                this.setState({
                    data: res.data
                })
            }

        })
        this.getBorrowDetail()
    }
    //借款明细
    getBorrowDetail = ()=>{
        fetch(url + "/1.0/violas/bank/borrow/order/list?address=" + window.sessionStorage.getItem('violas_address')).then(res => res.json()).then(res => {
            if (res.data) {
                let newData = [];
                let allCoin = [];
                let allStatus = []
                for (let i = 0; i < res.data.length; i++) {
                    newData.push({
                        time: timeStamp2String(res.data[i].date),
                        gas: '--',
                        coin: res.data[i].currency,
                        key: i + 1,
                        amount: res.data[i].value,
                        status: res.data[i].status == 1 ? '收益中' : null,
                    })
                    if (allCoin.length>0){
                        for (let j = 0; j < allCoin.length; j++){
                            if (allCoin[j] != res.data[i].currency) {
                                allCoin.push(res.data[i].currency)
                            }
                        }
                        
                    }else{
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
            } else{
                this.setState({
                    data1: res.data
                })
            }

        })
    }
    //弹出二级菜单
    expandRowByKey = (key) => {
        if (this.state.data[key - 1].option[2].displayMenu == false) {
            this.state.data[key - 1].option[2].displayMenu = true
        } else {
            this.state.data[key - 1].option[2].displayMenu = false
        }

        const { expandedRowKeys } = this.state;
        const index = expandedRowKeys.findIndex((item) => key === item);
        let keys = [...expandedRowKeys]; 
        if (index > -1) keys = keys.filter((item) => key !== item);
        else keys.push(key);
        this.setState({ expandedRowKeys: keys });
    };
    onExpand = (expanded, record) => {
        this.expandRowByKey(record.key);
    };
    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    //二级菜单内容
    expandedRowRender = (record, index, indent, expanded) => {
        let columns = [
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time'
            },
            {
                title: '数量',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            }
        ]
        let data = [
            {
                key: '1',
                time: '1:00',
                amount: '1000.0',
                status: '借款中'
            },
            {
                key: '2',
                time: '1:00',
                amount: '1000.0',
                status: '借款中'
            },
            {
                key: '3',
                time: '1:00',
                amount: '1000.0',
                status: '借款中'
            }
        ]
        return <div className="secendMenu">
            <div className="tab">
                {
                    this.state.borrowDetails.map((v,i)=>{
                    return <span key={i} className={v.id == this.state.detailId ? 'active1' : null} onClick={()=>{
                        this.setState({
                            detailId:v.id
                        })
                    }}>{v.type}</span>
                    })
                }
            </div>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    };
    onOk = (value) => {
        console.log('onOk: ', value);
    }
    
    render() {
        let { types, expandedRowKeys, allStatus,allCoin } = this.state;
        // console.log(getDialog())
        return (
            <div className="borrowOrder">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank"> <img src="/img/fanhui 2@2x.png" />
              数字银行</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/homepage/home/digitalBank/saveOrder">借款订单</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="curSaveLists">
                    <div className="tab">
                        {
                            types.map((v, i) => {
                                return <span key={i} className={this.state.saveId == v.id ? 'active' : null} onClick={() => {
                                    this.setState({
                                        saveId: v.id
                                    })
                                }}>{v.type}</span>
                            })
                        }
                    </div>
                    {
                        this.state.saveId == 0 ? <Table expandable={{
                            expandedRowKeys: expandedRowKeys,
                            onExpand: () =>this.onExpand(),
                            expandedRowRender:()=>this.expandedRowRender()
                        }}  columns={this.state.columns} dataSource={this.state.data} pagination={{ pageSize: 6, position: ['bottomCenter'] }} /> :
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
                                            allCoin.map((v,i)=>{
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
                                                return <Option key={i} value={v}>{v == 1 ? '收益中': null}</Option>
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
                                <div className="head"><h4>提取</h4><i onClick={() => {
                                    this.setState({
                                        showDialog: false
                                    })
                                }}><img src="/img/chahao.png" /></i></div>
                                <div className="inputDiv">
                                    <input placeholder="请输入提取数量" /><label>VLS</label>
                                </div>
                                <div className="inputDescr">
                                    <p><img src="/img/kyye.png" />可提数量：<span>20VLS</span></p>
                                    <p>全部</p>
                                </div>
                                <div className="extractDescr"><img src="/img/编组 4@2x.png" /><p>如果您当前有借贷操作，则需将部分存款作为质押金。提取质押金需还对应数量的借款金额。</p></div>
                                <div className="foot">
                                    <p className="btn" onClick={() => { }}>提 取</p>
                                    <p className="descr">{'请输入提取数量'}</p>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }

            </div>
        )
    }


}

export default BorrowOrder;