import React,{Component} from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
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
                <Link to={{pathname : '/applyfor' , state : { address : '53e59e4b4fa3c35770846f6c87ca2d35'}}}>applyfor</Link>---
                <Link to={{pathname : '/applyforinfo' , state : { ipid : 'BL20201105'}}}>applyforinfo</Link>---
                <Link to={{pathname : '/approval' , state : { ipid : 'BL20201105'}}}>approval</Link>
            </div>
              
        );
    }
}
 
export default RouteList;