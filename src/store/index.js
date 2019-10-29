import { autorun } from 'mobx';

// 引入模块
import Count from './modules/count'

// 实例化
const count = new Count();

// 追踪数据变化
autorun(() => {
  console.log('count变成了...',count);

})

export default {
  count
}