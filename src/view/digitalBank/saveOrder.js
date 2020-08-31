import React, { Component } from "react";
import './digitalBank.scss';
import { DatePicker, Breadcrumb, Table, Tag, Space, Select  } from "antd";
import { NavLink } from "react-router-dom";
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
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

                    render: text => <label onClick={() => {
                        this.setState({
                            showDialog:true
                        })
                    }} style={{ color: 'rgba(112, 56, 253, 1)', cursor: 'pointer'}}>{text}</label>,
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
    componentDidMount() {
        fetch(url + "/1.0/violas/bank/deposit/orders?address=" + window.sessionStorage.getItem('violas_address')).then(res => res.json()).then(res => {
            // console.log(res)
            if(res.data){
                let newData = [];
                for (let i = 0; i < res.data.length; i++) {
                    newData.push({
                        coin:res.data[i].currency,
                        key:i + 1,
                        money:res.data[i].principal,
                        income:res.data[i].earnings,
                        yield:res.data[i].rate + '%',
                        status:res.data[i].status == 1 ? '收益中' : null,
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
    }
    onChange = (value, dateString)=>{
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
                                <div className="head"><h4>提取</h4><i onClick={()=>{
                                    this.setState({
                                        showDialog:false
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

export default SaveOrder;