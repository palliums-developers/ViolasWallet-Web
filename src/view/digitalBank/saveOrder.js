import React, { Component } from "react";
import './digitalBank.scss';
import { Breadcrumb, Table, Tag, Space } from "antd";
import { NavLink } from "react-router-dom";
// import 'antd.css'
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
//存款订单
class SaveOrder extends Component {
    constructor() {
        super()
        this.state = {
            saveId:0,
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
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
            ]
        }
    }
    componentDidMount() {

    }

    render() {
        let { types } = this.state;
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
                    <Table columns={columns} dataSource={this.state.data} pagination={{ pageSize:6,position:['bottomCenter']}}/>
                </div>
            </div>
        )
    }


}

export default SaveOrder;