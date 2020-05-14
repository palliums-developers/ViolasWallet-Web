import App from "../view/app";
import App1 from '../view/app1'
import Home from '../view/home'
import HomeContent from '../view/homeContent'
import Details from '../view/detail'
import ViolasContent from "../view/homeList/violasList";
import HomePage from "../view/homePage";
import transfar from "../view/apply/transfar";
import ChangeContent from "../view/market/changeContent";
import ExChange from "../view/market/exChange";
import CashPooling from "../view/market/cashPooling";

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
                        component: HomeContent,
                        children:[
                            {
                                path: '/homepage/home/homeContent/Violas',
                                component: ViolasContent
                            },
                            {
                                path: '/homepage/home/homeContent/Libra',
                                component: ViolasContent,
                            },
                            {
                                path: '/homepage/home/homeContent/Bitcoin',
                                component: ViolasContent,
                            },
                            {
                                path: '/homepage/home/homeContent/detail/:address/:type/:nikename',
                                component: Details,
                            },
                            {
                                path: '/homepage/home/homeContent/transfar/:name',
                                component: transfar
                            },
                            
                            {
                                path: '/homepage/home/homeContent',
                                redirect: '/homepage/home/homeContent/Violas'
                            },
                        ]

                    },
                    {
                        path: '/homepage/home/changeContent',
                        component: ChangeContent,
                        children:[
                            {
                                path: '/homepage/home/changeContent/exchange',
                                component: ExChange
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