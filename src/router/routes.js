import App from "../view/app";
import Home from '../view/home'
import HomeContent from '../view/homeContent'
import HomePage from "../view/homePage";
import ChangeContent from "../view/changeContent"
import Transfer from "../view/apply/transfer";
import GetMoney from "../view/apply/getMoney";
import Exchange from '../view/market/exChange';
import CashPooling from '../view/market/cashPooling';
import DigitalBank from "../view/digitalBank";
import Mapping from '../view/digitalBank/mapping'
import DigitalBankPage from "../view/digitalBank/digitalBankPage";
import SaveDetails from "../view/digitalBank/saveDetails";
import SaveOrder from "../view/digitalBank/saveOrder";
import BorrowOrder from "../view/digitalBank/borrowOrder";
import BorrowDetails from "../view/digitalBank/borrowDetails";
import Repayment from "../view/digitalBank/repayment";
import PushMessage from "../view/push/pushMessage";
import ViolasMapping from "../view/mapping/violasMapping";
import ViolasExchange from "../view/mapping/violasExchange";
import MiningAwards from "../view/mining/miningAwards";
import RuleDescription from "../view/mining/ruleDescription";
import MiningDetails from "../view/mining/miningDetails";
import RankingList from "../view/mining/rankingList";
import UserRewards from "../view/award/userRewards";
import InviteRewards from "../view/award/inviteRewards";
import InvitationList from "../view/award/invitationList";

let routes = [
  //首页
  {
    path: "/app",
    component: App,
  },
  {
    path: "/violasMapping",
    component: ViolasMapping,
  },
  {
    path: "/violasExchange",
    component: ViolasExchange,
  },

  {
    path: "/homepage",
    component: HomePage,
    children: [
      {
        path: "/homepage/home",
        component: Home,
        children: [
          {
            path: "/homepage/home/homeContent",
            component: HomeContent,
          },
          //推送页面
          {
            path: "/homepage/home/pushMessage",
            component: PushMessage,
          },
          //挖矿奖励
          {
            path: "/homepage/home/miningAwards",
            component: MiningAwards,
          },
          //规则说明
          {
            path: "/homepage/home/ruleDescription",
            component: RuleDescription,
          },
          //挖矿收益明细
          {
            path: "/homepage/home/miningDetails",
            component: MiningDetails,
          },
          //排行榜
          {
            path: "/homepage/home/rankingList",
            component: RankingList,
          },
          //邀请榜单
          {
            path: "/homepage/home/invitationList",
            component: InvitationList,
          },
          //新用户奖励
          {
            path: "/homepage/home/userRewards",
            component: UserRewards,
          },
          //邀请奖励
          {
            path: "/homepage/home/inviteRewards",
            component: InviteRewards,
          },
          {
            path: "/homepage/home/changeContent",
            component: ChangeContent,
            children: [
              //兑换
              {
                path: "/homepage/home/changeContent/exchange",
                component: Exchange,
              },
              //资金池
              {
                path: "/homepage/home/changeContent/cashPooling",
                component: CashPooling,
              },
              {
                path: "/homepage/home/changeContent",
                redirect: "/homepage/home/changeContent/exchange",
              },
            ],
          },
          {
            path: "/homepage/home/digitalBank",
            component: DigitalBank,
            children: [
              //映射
              {
                path: "/homepage/home/digitalBank/digitalBankPage",
                component: DigitalBankPage,
              },
              {
                path: "/homepage/home/digitalBank/mapping",
                component: Mapping,
              },
              //存款详情
              {
                path: "/homepage/home/digitalBank/saveDetails",
                component: SaveDetails,
              },
              //借款详情
              {
                path: "/homepage/home/digitalBank/borrowDetails",
                component: BorrowDetails,
              },
              //还款
              {
                path: "/homepage/home/digitalBank/repayment",
                component: Repayment,
              },
              //存款订单
              {
                path: "/homepage/home/digitalBank/saveOrder",
                component: SaveOrder,
              },
              //借款订单
              {
                path: "/homepage/home/digitalBank/borrowOrder",
                component: BorrowOrder,
              },
              {
                path: "/homepage/home/digitalBank",
                redirect: "/homepage/home/digitalBank/digitalBankPage",
              },
            ],
          },
          //转账
          {
            path: "/homepage/home/transfer",
            component: Transfer,
          },
          //收款
          {
            path: "/homepage/home/getMoney",
            component: GetMoney,
          },
          {
            path: "/homepage/home",
            redirect: "/homepage/home/homeContent",
          },
        ],
      },

      {
        path: "/homepage",
        redirect: "/homepage/home",
      },
    ],
  },
  {
    path: "/",
    redirect: "/app",
  },
];

export default routes