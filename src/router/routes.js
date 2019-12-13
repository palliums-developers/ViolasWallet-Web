import App from "../view/app";
import Welcome from "../view/default/welcome";
import CreateIdentity from "../view/default/createIdentity";
import Backup from "../view/default/backup/backup";
import Home from "../view/default/home";
import Wallet from "../view/default/home/wallet";
import Market from "../view/default/home/market";
import Mine from "../view/default/home/mine";
import Sweepcode from "../view/default/home/sweepCode";
import GetMoney from "../view/default/home/getMoney";
import ImportIdentity from "../view/default/ImportIdentity/ImportIdentity";
import AddCurrency from "../view/default/home/addCurrency";
import DailyCash from "../view/default/home/mine/dailyCash";
import AddPurse from "../view/default/home/mine/addPurse";
import CreateWallet from "../view/default/home/mine/createWallet";
import ImportWallet from "../view/default/home/mine/importWallet";
import Setting from "../view/default/home/setting/setting";
import MultiLanguage from "../view/default/home/setting/multiLanguage";
import Service from "../view/default/home/setting/service";
import AboutUs from "../view/default/home/setting/aboutUs";
import FeekBack from "../view/default/home/setting/feedBack";
import DirectoryInquiries from "../view/default/home/mine/directoryInquiries";
import CodeBackup from "../view/default/backup/codeBackup";
import Manage from "../view/default/home/manage";
import DetailWallet from "../view/default/home/detailWallet";
import AddAddress from "../view/default/home/mine/addAddress";
import Record from "../view/default/home/mine/record";
import Transfar from "../view/default/home/mine/transfer";
import ConfirmWords from "../view/default/backup/confirmWords";
import Sweepcode1 from "../view/default/home/sweepCode1";
import Record1 from "../view/default/home/mine/record1";
import WalletSystem from "../view/default/home/walletSystem";
import stablecoin from "../view/default/home/mine/stablecoin";
import Transfar1 from "../view/default/home/mine/tranfer1";
import GetMoney1 from "../view/default/home/getMoney1";
import OrderForm from "../view/default/home/market/orderForm";
import OrderDetail from "../view/default/home/market/orderDetail";

const routes = [
    //首页
    {  
        path:'/app',
        component:App
    },
    //欢迎
    {  
        path:'/welcome',
        component:Welcome
    },
    //创建身份
    {  
        path:'/createIdentity',
        component:CreateIdentity
    },
    //导入身份
    {  
        path:'/importIdentity',
        component:ImportIdentity
    },
    //备份提示
    {  
        path:'/backup',
        component:Backup
    },
    //备份助记词
    {
        path:'/codeBackup',
        component:CodeBackup
    },
    //确认助记词
    {
        path:'/confirmWords',
        component:ConfirmWords
    },
    //钱包首页
    {  
        path:'/home',
        component:Home,
        children:[
            {
                path:'/home/wallet',
                component:Wallet
            },
            {
                path:'/home/market',
                component:Market
            },
            {
                path:'/home/mine',
                component:Mine
            },
            {
                path:'/home',
                redirect:'/home/wallet'
            }
        ]
    },
    //订单
    {
        path:'/orderForm',
        component:OrderForm
    },
    //订单详情
    {
        path:'/orderDetail/:id',
        component:OrderDetail
    },
    //选择钱包体系
    {
        path:'/walletSystem',
        component:WalletSystem
    },
    //交易记录
    {
        path:'/record',
        component:Record
    },
    //转账记录
    {
        path:'/record1',
        component:Record1
    },
    //管理
    {
        path:'/manage',
        component:Manage
    },
    //钱包详情
    {
        path:'/detailWallet',
        component:DetailWallet
    },
    //扫一扫
    {
        path:'/sweepcode',
        component:Sweepcode
    },
    {
        path:'/sweepcode1',
        component:Sweepcode1
    },
    //转账
    {
        path:'/transfar',
        component:Transfar
    },
    {
        path:'/transfar1',
        component:Transfar1
    },
    //收款
    {
        path:'/getMoney',
        component:GetMoney
    },
    {
        path:'/getMoney1',
        component:GetMoney1
    },
    //添加币种
    {
        path:'/addCurrency',
        component:AddCurrency
    },
    //稳定币转账
    {
        path:'/stablecoin',
        component:stablecoin
    },
    //钱包管理
    {
        path:'/dailyCash',
        component:DailyCash
    },
    //添加钱包
    {
        path:'/addPurse',
        component:AddPurse
    },
    //创建钱包
    {
        path:'/createWallet',
        component:CreateWallet
    },
    //导入钱包importWallet
    {
        path:'/importWallet',
        component:ImportWallet
    },
    //地址簿
    {
        path:'/directoryInquiries',
        component:DirectoryInquiries
    },
    //添加地址
    {
        path:'/addAddress',
        component:AddAddress
    },
    //设置
    {
        path:'/setting',
        component:Setting
    },
    //多语言
    {
        path:'/multiLanguage',
        component:MultiLanguage
    },
    //服务协议
    {
        path:'/service',
        component:Service
    },
    //关于我们
    {
        path:'/aboutUs',
        component:AboutUs
    },
    //帮助与反馈
    {
        path:'/feekBack',
        component:FeekBack
    },
    {
        path:'/',
        redirect:'/app'
    }
]

export default routes