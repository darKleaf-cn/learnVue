// 初始化事件
export function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;

  // 初始化父组件attach的事件
  const listeners = vm.$options._parentListeners;
  if (listeners) {
  }
}

let target;

export function eventsMixin(Vue) {
  const hookRE = /^hook:/;

  Vue.prototype.$on = function () {};
  Vue.prototype.$once = function () {};
  Vue.prototype.$off = function () {};
  Vue.prototype.$emit = function () {};
}
