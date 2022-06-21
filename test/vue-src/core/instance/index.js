import { warn } from '../util/index';
import { initMixin } from './init';
import { stateMixin } from './state';
import { renderMixin } from './render';
import { eventsMixin } from './events';
import { lifecycleMixin } from './lifecycle';

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the new keyword');
  }
  /**
   * 初始化
   */
  this._init(options);
}

// 声明_init
initMixin(Vue);
// 声明$data $props $set $delete $watch
stateMixin(Vue);
// 声明$on $once $off $emit
eventsMixin(Vue);
// 声明_update $forceUpdate $destroy
lifecycleMixin(Vue);
// 声明$nextTick _render 一系列render内部函数
renderMixin(Vue)

export default Vue;
