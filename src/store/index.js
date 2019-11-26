import { autorun } from 'mobx';

// 引入模块
import Index from './modules/index'
import DealIndex from './modules/dealIndex'

// 实例化
const index = new Index();
const dealIndex = new DealIndex();
// 追踪数据变化
// autorun(() => {
//   console.log('count变成了...',index);

// })

export default {
  index,
  dealIndex
}