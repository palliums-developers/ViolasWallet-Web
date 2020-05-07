import App from "../view/app";
import App1 from '../view/app1'
import Home from '../view/home'
import HomeContent from '../view/homeContent'
import Details from '../view/detail'
import ViolasContent from "../view/homeList/violasList";
import HomePage from "../view/homePage";
import transfar from "../view/apply/transfar";

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