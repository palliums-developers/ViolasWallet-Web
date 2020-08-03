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

let routes = [
    //首页
    {
        path: '/app',
        component: App
    },
    {
        path: '/homepage',
        component: HomePage,
        children:[
            {
                path: '/homepage/home',
                component: Home,
                children: [
                    {
                        path: '/homepage/home/homeContent',
                        component: HomeContent

                    },
                    {
                        path: '/homepage/home/changeContent',
                        component: ChangeContent,
                        children: [
                            {
                                path: '/homepage/home/changeContent/exchange',
                                component: Exchange
                            },
                            {
                                path: '/homepage/home/changeContent/cashPooling',
                                component: CashPooling
                            },
                            {
                                path: '/homepage/home/changeContent',
                                redirect: '/homepage/home/changeContent/exchange'
                            },
                        ]
                    },
                    {
                        path: '/homepage/home/digitalBank',
                        component: DigitalBank

                    },
                    {
                        path: '/homepage/home/transfer',
                        component:Transfer
                    },
                    {
                        path: '/homepage/home/getMoney',
                        component: GetMoney
                    },
                    {
                        path: '/homepage/home',
                        redirect: '/homepage/home/homeContent'
                    }
                ]
            },
            
            
            {
                path: '/homepage',
                redirect: '/homepage/home'
            }
        ]
       
    },
    // //详情
    // {
    //     path: '/detail/:address/:type/:nikename',
    //     component: Detail
    // },
    {
        path: '/',
        redirect: '/app'
    }
]

export default routes