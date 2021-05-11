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
        this.setState({
            name: this.props.location.pathname.split('/')[4]
        })
    }

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
              {/* {
                        this.state.types.map((v, i) => {
                            return <NavLink key={i} activeStyle={{ background: 'rgba(75, 63, 152,.06)', color:'rgba(80, 27, 162, 1)'}} to={v.path}><i></i>{v.name}</NavLink>
                        })
                    } */}
            </div>
            <RouterView routes={routes}></RouterView>
          </div>
        );
    }


}

export default ChangeContent;