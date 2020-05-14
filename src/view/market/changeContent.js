import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import "../app.scss";
import RouterView from '../../router/routerView'
let url = "http://52.27.228.84:4000"

class ChangeContent extends Component {
    constructor() {
        super()
        this.state = {
            
            name: '',
        }
    }
    componentDidMount() {
        this.setState({
            name: this.props.location.pathname.split('/')[4]
        })
    }
    // getActive = (ind, val) => {
    //     this.props.history.push('/home/homeContent/' + val)
    //     this.setState({
    //         ind: ind,
    //         name: val
    //     })
    // }


    render() {
        let { routes } = this.props;
        let { name } = this.state;
        return (
            <div className="changecontent">
                 <div className="leftContent">
                    <NavLink activeStyle={{ background: 'rgba(75, 63, 152,.06)', color: 'rgba(80, 27, 162, 1)' }} to='/homepage/home/changeContent/exchange'><i className={name == 'exchange'?'ex':'noEx'}></i>Exchange</NavLink>
                    <NavLink activeStyle={{ background: 'rgba(75, 63, 152,.06)', color: 'rgba(80, 27, 162, 1)' }} to='/homepage/home/changeContent/cashPooling'><i className={name == 'cashPooling' ? 'pool' : 'noPool'}></i>Cash Pooling</NavLink>
                    {/* {
                        this.state.types.map((v, i) => {
                            return <NavLink key={i} activeStyle={{ background: 'rgba(75, 63, 152,.06)', color:'rgba(80, 27, 162, 1)'}} to={v.path}><i></i>{v.name}</NavLink>
                        })
                    } */}
                </div>
                <RouterView routes={routes}></RouterView>
            </div>
        )
    }


}

export default ChangeContent;