import React, { Component } from "react";

//映射
class DigitalBankPage extends Component {
    constructor() {
        super()
        this.state = {
            visible:true,
            type:'存款市场',
            types:['存款市场','借款市场'],
            ind:0
        }
    }
    componentDidMount() {

    }
    getMarketType = (i) =>{
      this.setState({
          ind:i
      })
    }
    render() {
        let { routes } = this.props;
        let { visible,types,ind } = this.state
        return (
            <div className="digitalBankPage">
                <div className="apply">
                   <div className="total">
                       <p>存款总额 ($) 
                        <i>
                        {
                            visible ? <img onClick={()=>{
                                this.setState({
                                visible:!this.state.visible
                                })
                            }} src="/img/jurassic_openeyes 3@2x.png"/> :<img onClick={()=>{
                                this.setState({
                                visible:!this.state.visible
                                })
                            }} src="/img/biyanjing 2@2x.png"/>
                        }
                        </i>
                        </p> 
                        <span><img src="/img/编组 9@2x.png"/></span>
                   </div>
                    <p>{
                        visible ? <span>≈2041.76</span> : <span>******</span>
                    }</p>
                    <div className="applyContent">
                        <div>
                            <p><img src="/img/meiyuan8 2@2x.png" /><label>可借总额（$）</label><span>≈1041.76/1500</span></p>
                            <p><img src="/img/形状结合备份 2@2x.png" /><label>累计收益（$）</label><span>≈41.76</span></p>
                        </div>
                        <div className="earnings"><img src="/img/形状结合 2@2x.png" />昨日收益 0.60 $</div>
                    </div>
                </div>
                <div className="tabList">
                    <div className="tab">
                        {
                            types.map((v,i)=>{
                            return <span key={i} className={ ind == i ? 'active' : '' } onClick={()=>this.getMarketType(i)}>{v}</span>
                            })
                        }
                    </div>
                    <div className="tabLists">
                        <div className="everyList" onClick={()=>{
                            this.props.history.push('/homepage/home/digitalBank/saveDetails')
                        }}>
                            <p><img src="/img/BTC复制 2@2x.png" /><span>BTC</span><label>持币生息的BTC</label></p> 
                            <p><span>3.70%</span><label>年化收益率</label></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default DigitalBankPage;