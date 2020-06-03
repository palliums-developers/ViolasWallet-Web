import App from "../view/app";
import Home from '../view/home'
import HomeContent from '../view/homeContent'
import HomePage from "../view/homePage";
import ChangeContent from "../view/changeContent"
import Transfer from "../view/apply/transfer";
import GetMoney from "../view/apply/getMoney";

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
                        component: ChangeContent
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