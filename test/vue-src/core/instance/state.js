import { del, observe, set } from '../../../../vue-src/core/observer';
import Watcher from '../observer/watcher';
import { warn, isPlainObject, hasOwn, isReserved, noop } from '../util/index';

const sharedPropertyDefinition = {
	enumerable: true,
	configurable: true,
	get: noop,
	set: noop
}
export function proxy(target, sourceKey, key) {
	sharedPropertyDefinition.get = function() {
		return target[sourceKey][key];
	}
	sharedPropertyDefinition.set = function(val) {
		target[sourceKey][key] = val;
	}
	Object.defineProperty(target, key, sharedPropertyDefinition);
}
export function initState(vm) {
  vm._watchers = [];
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe((vm._data = {}), true);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {}

function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn('');
  }

  const keys = Object.keys(data);
  const props = vm.$options.props;
  let i = keys.length;

  while (i--) {
    if (hasOwn(props, keys[i])) {
			process.env.NODE_ENV !== 'production' && warn('');
    } else if(!isReserved(keys[i])) {
			proxy(data, '_data', keys[i]);
		}
  }

	observe(data, true);
}

function getData(data, vm) {
  try {
    return data.call(vm);
  } catch (e) {
    return {};
  }
}

function initMethods(vm, methods) {}

function initComputed(vm, computed) {}

function initWatch(vm, watch) {}

export function stateMixin(Vue) {
  const dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  const propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn('aviod replacing instance root $data.' + 'Use nested data properties instead.' + this);
    };
    propsDef.set = function () {
      warn('$props is readonly.', this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this;
    options = options || {};
    options.user = true;
    const watcher = new Watcher(vm, expOrFn, cb, options);
  };
}
