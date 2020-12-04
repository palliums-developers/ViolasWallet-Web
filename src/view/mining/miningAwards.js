import React,{Component} from "react";
import './mining.scss'

//挖矿奖励
class MiningAwards extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
          <div className="miningAwards">
            <div className="miningFundList">
              <div className="goRule">
                <img src="/img/m_矩形 4@2x.png" />
                <p
                  onClick={() => {
                    this.props.history.push("/homepage/home/ruleDescription");
                  }}
                >
                  规则说明
                  <img src="/img/m_编组 41@2x.png" />
                </p>
              </div>
              <div className="rightImg">
                <img src="/img/m_编组 15@2x.png" />
              </div>
              <div className="fundList">
                <h4>总收益 ( VLS )</h4>
                <span>19.12345678</span>
                <p
                  onClick={() => {
                    this.props.history.push("/homepage/home/miningDetails");
                  }}
                >
                  挖矿明细
                  <img src="/img/m_编组 18@2x.png" />
                </p>
              </div>
              <div className="poolingFund">
                <div className="poolingFundContent">
                  <p>资金池挖矿累计：12,229 VLS</p>
                  <p>
                    <span>
                      <label>待提取(VLS)</label>229999
                    </span>
                    <button>提取奖励</button>
                  </p>
                </div>
                <div className="line"></div>
                <div className="poolingFundContent">
                  <p>资金池挖矿累计：12,229 VLS</p>
                  <p>
                    <span>
                      <label>待提取(VLS)</label>229999
                    </span>
                    <button>提取奖励</button>
                  </p>
                  <p>
                    <img src="/img/m_wenhao 3@2x.png" />
                    当前待提取数值为查询时结果，可能与最终交易时存在误差！提取结果将以最终交易时为准。
                  </p>
                </div>
              </div>
            </div>
            <div className="getMoreVLS">
              <h3>获取更多VLS</h3>
              <div className="getMoreContent">
                <div>
                  <p>
                    <label>新用户验证</label>
                    <button className="btn">去验证</button>
                    {/* <button className="btn btn1">已验证</button> */}
                  </p>
                  <p>
                    <label>存款挖矿</label>
                    <button className="btn">去存款</button>
                  </p>
                  <p>
                    <label>资金池挖矿</label>
                    <button className="btn">去转入</button>
                  </p>
                </div>
                <div>
                  <p>
                    <label>邀请好友</label>
                    <button className="btn">去邀请</button>
                  </p>
                  <p>
                    <label>借款挖矿</label>
                    <button className="btn">去借款</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="rankingList">
              <div className="head">
                <h3>排行榜</h3>
                <p onClick={() => {
                    this.props.history.push("/homepage/home/rankingList");
                  }}>
                  查看更多
                  <img src="/img/m_编组 17@2x.png" />
                </p>
              </div>
              <div className="list">
                <p>
                  <span>
                    <img src="/img/m_编组 56备份 3@2x.png" />
                    12uww3…9312jw
                  </span>
                  <span>1.283 VLS</span>
                </p>
                <p>
                  <span>
                    <img src="/img/m_编组 56备份 3@2x.png" />
                    12uww3…9312jw
                  </span>
                  <span>1.283 VLS</span>
                </p>
                <p>
                  <span>
                    <img src="/img/m_编组 56备份 3@2x.png" />
                    12uww3…9312jw
                  </span>
                  <span>1.283 VLS</span>
                </p>
              </div>
            </div>
          </div>
        );
    }
}
 
export default MiningAwards;