import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb, Table, Tag, Space } from "antd";
import { NavLink } from "react-router-dom";
// import 'antd.css'

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
            data:[
                {
                    key: '1',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    yield:'5.00%',
                    status:'收益中',
                    option: '提取',
                },
                {
                    key: '2',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                },
                {
                    key: '3',
                    coin: 'CAA',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                },
                {
                    key: '4',
                    coin: 'EEB',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                },
                {
                    key: '5',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                },
                {
                    key: '6',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                }, {
                    key: '1',
                    coin: 'CAA',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                },
                {
                    key: '2',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                },
                {
                    key: '3',
                    coin: 'CAA',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                },
                {
                    key: '4',
                    coin: 'EEB',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                },
                {
                    key: '5',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
                },
                {
                    key: '6',
                    coin: 'VLS',
                    money: '1000.0',
                    income: '1000.0',
                    yield: '5.00%',
                    status: '收益中',
                    option: '提取',
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
            ]
        }
    }
    componentDidMount() {

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
                    <Table columns={this.state.columns} dataSource={this.state.data} pagination={{ pageSize:6,position:['bottomCenter']}}/>
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