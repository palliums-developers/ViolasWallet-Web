import React, { Component } from "react";
import "./app.scss";
import { connect } from 'react-redux';
import RouterView from '../router/routerView';
import 'antd/dist/antd.css'

class HomePage extends Component {
    constructor(props){
      super()
      this.state = {
        
      }
    }
    componentDidMount(){
      
      // console.log(this.props.visible)
    }
    onClose = () => {
      this.props.showPolling();
      this.props.showDetails();
    };
    render(){
        let { routes } = this.props;
        
        return (
          
            <div className="homePage">
              <RouterView routes={routes}></RouterView>
            </div>
        )
    }
}
let mapStateToProps = (state) =>{
  return state.ListReducer;
}
let mapDispatchToProps = (dispatch) =>{
  return {
  
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);