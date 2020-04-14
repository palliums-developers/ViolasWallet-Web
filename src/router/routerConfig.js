import React,{Component} from 'react';
import {HashRouter, Route, Switch,Redirect} from 'react-router-dom';
import App from '../view/app'
import App1 from '../view/app1'
import Home from '../view/home'
import Detail from '../view/detail'

class RouterConfig extends Component {
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/app1" component={App1}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/detail/:address/:type" component={Detail}/>
                    <Redirect from="/" to="/" />
                </Switch>
            </HashRouter>
        )
    }
}


export default RouterConfig;