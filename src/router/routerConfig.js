import React,{Component} from 'react';
import {HashRouter, Route, Switch,Redirect} from 'react-router-dom';
import App from '../view/app'
import Home from '../view/home'
import Detail from '../view/detail'

class RouterConfig extends Component {
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/detail/:address" component={Detail}/>
                    <Redirect from="/" to="/" />
                </Switch>
            </HashRouter>
        )
    }
}


export default RouterConfig;