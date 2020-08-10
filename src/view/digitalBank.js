import React, { Component } from "react";
import RouterView from '../router/routerView';
//映射
class DigitalBank extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
        }
    }
    componentDidMount() {
        
    }

    render() {
        let { routes } = this.props;
        return (
            <div className="digitalBank">
               <RouterView routes={routes}></RouterView>
            </div>
        )
    }


}

export default DigitalBank;