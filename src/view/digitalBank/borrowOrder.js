import React, { Component } from "react";
import './digitalBank.scss';
import { DatePicker, Breadcrumb, Table, Tag, Space, Select } from "antd";
import { NavLink } from "react-router-dom";
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;
const { Option } = Select;


//借款订单
class BorrowOrder extends Component {
    constructor() {
        super()
        this.state = {
            saveId: 0,
            showDialog: false,
            types: [
                {
                    id: 0,
                    type: '当前存款'
                },
                {
                    id: 1,
                    type: '存款明细'
                }
            ],
            data: [
                {
                    key: '1',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款','借款','详情'],
                },
                {
                    key: '2',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                },
                {
                    key: '3',
                    coin: 'CAA',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                },
                {
                    key: '4',
                    coin: 'EEB',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                },
                {
                    key: '5',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                },
                {
                    key: '6',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                }, {
                    key: '1',
                    coin: 'CAA',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                },
                {
                    key: '2',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                },
                {
                    key: '3',
                    coin: 'CAA',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                },
                {
                    key: '4',
                    coin: 'EEB',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                },
                {
                    key: '5',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                },
                {
                    key: '6',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    option: ['还款', '借款', '详情'],
                }
            ],
            data1: [
                {
                    key: '1',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas:'0.1',
                    status: '收益中'
                },
                {
                    key: '2',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                },
                {
                    key: '3',
                    coin: 'CAA',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                },
                {
                    key: '4',
                    coin: 'EEB',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                },
                {
                    key: '5',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                },
                {
                    key: '6',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                }, {
                    key: '1',
                    coin: 'CAA',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                },
                {
                    key: '2',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                },
                {
                    key: '3',
                    coin: 'CAA',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                },
                {
                    key: '4',
                    coin: 'EEB',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                },
                {
                    key: '5',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                },
                {
                    key: '6',
                    coin: 'VLS',
                    amount: '1000.0',
                    time: '18:22  01/24/2018',
                    gas: '0.1',
                    status: '收益中'
                }
            ],
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
                    title: '剩余金额',
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
                                texts.map((val)=>{
                                    if (val == '详情'){
                                        return <label style={{ display: 'flex', alignItems: 'center', marginRight: '50px', color: 'rgba(112, 56, 253, 1)', cursor: 'pointer' }}>{val}<img expandable= '111' style={{ width: '12px', height: '12px',marginLeft:'5px' }} src="/img/编组 16@2x (2).png"/></label>
                                    } else if (val == '还款'){
                                        return <label onClick={()=>{
                                            this.props.history.push('/homepage/home/digitalBank/repayment')
                                        }} style={{ marginRight: '50px', color: 'rgba(112, 56, 253, 1)', cursor: 'pointer' }}>{val}</label>
                                    }
                                   return <label style={{ marginRight:'50px',color: 'rgba(112, 56, 253, 1)', cursor: 'pointer' }}>{val}</label>
                                })
                            }
                        </div>
                    )
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

    }
    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk = (value) => {
        console.log('onOk: ', value);
    }
    render() {
        let { types } = this.state;
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
                        this.state.saveId == 0 ? <Table columns={this.state.columns} dataSource={this.state.data} pagination={{ pageSize: 6, position: ['bottomCenter'] }} /> :
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
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
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
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
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