import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
// import "../app.scss";
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
                市场
            </div>
        )
    }


}

export default ChangeContent;