import React,{Component} from 'react'
import {
  Link
} from "react-router-dom";

class RouteList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
          <div>
            <Link to="/applyfor?address=53e59e4b4fa3c35770846f6c87ca2d35">
              applyfor
            </Link>
            ---
            <Link to="/applyforinfo?ipid=BL20201105">applyforinfo</Link>
            ---
            <Link to="/approval?ipid=BL20201105">approval</Link>
          </div>
        );
    }
}
 
export default RouteList;