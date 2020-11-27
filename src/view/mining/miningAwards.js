import React,{Component} from "react";

//挖矿奖励
class MiningAwards extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
          <div>
            挖矿奖励
            <p
              onClick={() => {
                this.props.history.push("/homepage/home/ruleDescription");
              }}
            >
              规则说明
            </p>
          </div>
        );
    }
}
 
export default MiningAwards;