import { initRender } from './render';
import { initEvents } from './events';
import { initLifecycle } from './lifecycle';
import { initState } from './state';

let uid = 0;

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm._uid = uid++;
    vm._isVue = true;

    // 合并options

    // expose real self
    vm._self = vm;
    // 初始化生命周期
    initLifecycle(vm);
		// 初始化事件
		initEvents(vm);
		// 初始化render
		initRender(vm);
		// 初始化state
		initState(vm);
  };
}
