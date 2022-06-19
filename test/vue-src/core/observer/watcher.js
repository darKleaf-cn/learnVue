import { parsePath } from '../util/index';
import Dep, {pushTarget , popTarget} from './dep';

let uid = 0;

export default class Watcher {
  vm;
  expression;
  cb;
  id;
  deep;
  user;
  lazy;
  sync;
  dirty;
  active;
  deps;
  newDeps;
  depIds;
  newDepIds;
  getter;
  value;

  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    vm._watchers.push(this);
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid;
    this.active = true;
    this.dirty = this.lazy;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '';

    // 把表达式expOrFn解析成getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = function () {};
        process.env.NODE_ENV !== 'production' && warn(`path不正确`, vm);
      }
    }
    this.value = this.lazy ? undefined : this.get();
  }
  // 获得getter的值并且重新进行依赖收集
  get() {
		pushTarget(this);
	}
}
