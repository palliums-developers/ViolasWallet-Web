import App from "../view/app";
import App1 from '../view/app1'
import Home from '../view/home'
import HomeContent from '../view/homeContent'
import Details from '../view/detail'
import ViolasContent from "../view/homeList/violasList";

let routes = [
    //首页
    {
        path: '/app',
        component: App
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/home/homeContent',
                component: HomeContent,
                children:[
                    {
                        path: '/home/homeContent/Violas',
                        component: ViolasContent
                    },
                    {
                        path: '/home/homeContent/Libra',
                        component: ViolasContent,
                    },
                    {
                        path: '/home/homeContent/Bitcoin',
                        component: ViolasContent,
                    },
                    {
                        path: '/home/homeContent/detail/:address/:type/:nikename',
                        component: Details,
                    },
                    
                    {
                        path: '/home/homeContent',
                        redirect: '/home/homeContent/Violas'
                    },
                ]
            },
            {
                path: '/home',
                redirect: '/home/homeContent'
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