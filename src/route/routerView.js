import React,{Component} from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import App from '../app';
import PatentDetail from '../patentDetail'
import MeetingDetail from '../meetingDetail'
import RouteList from '../routeList'
class RouterView extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
             <BrowserRouter>
                {/* <Link to={{pathname:'/applyfor',query:{address:'53e59e4b4fa3c35770846f6c87ca2d35'}}}>applyfor</Link>---
                <Link to={{pathname:'/applyforinfo',query:{ipid:'12134245'}}}>applyforinfo</Link>---
                <Link to={{pathname:'/approval',query:{ipid:'12134245'}}}>approval</Link> */}
                <Switch>
                    <Route path="/routeList" component={RouteList} />
                    <Route path="/applyfor" component={App} />
                    <Route path="/applyforinfo" component={PatentDetail} />
                    <Route path="/approval" component={MeetingDetail} />
                    {/* <Route path="/test" component={Test} />
                    <Route path="/message/:id" component={Message} />
                    路由不正确时，默认跳回home页面*/}
                    <Route path="/" render={() => <Redirect to="/routeList" />} /> 
                </Switch>

            </BrowserRouter>
              
        );
    }
}
 
export default RouterView;
