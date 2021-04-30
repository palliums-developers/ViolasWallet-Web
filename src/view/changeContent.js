import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import RouterView from '../router/routerView'
import intl from "react-intl-universal";
import './market/market.scss'
let url = "http://52.27.228.84:4000"

//市场首页
class ChangeContent extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
        }
    }
    componentDidMount() {
        // console.log(this.props.location.pathname.split('/')[4])
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
              <div className="borderContent">
                <NavLink
                  activeStyle={{
                    background: "rgba(112, 56, 253, 1)",
                    color: "#FFF",
                  }}
                  to="/homepage/home/changeContent/exchange"
                >
                  {intl.get("SWAP")}
                </NavLink>
                <NavLink
                  activeStyle={{
                    background: "rgba(112, 56, 253, 1)",
                    color: "#FFF",
                  }}
                  to="/homepage/home/changeContent/cashPooling"
                >
                  {intl.get("POOL")}
                </NavLink>
              </div>
            </div>
            <RouterView routes={routes}></RouterView>
          </div>
        );
    }


}

export default ChangeContent;