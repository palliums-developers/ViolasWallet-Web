import App from "../view/app";


let routes = [
    //首页
    {
        path: '/app',
        component: App
    },
    {
        path: '/',
        redirect: '/app'
    }
]

export default routes