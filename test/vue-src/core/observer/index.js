import { isObject, hasOwn, def } from '../util/index';
import Dep from './dep';

export function observe(value, asRootData) {
  if (!isObject(value)) {
    return;
  }
  let ob;
  if (hasOwn(value, '__ob__' && value.__ob__ instanceof Observer)) {
    ob = value.__ob__;
  } else if (Array.isArray(value)) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

export class Observer {
  value;
  dep;
  vmCount;
  constructor(value) {
    this.vlaue = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);

    if (Array.isArray(value)) {
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
  }
}

export function defineReactive(obj, key, value, customSetter) {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  const getter = property && property.get;
  const setter = property && property.set;

  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray) {
          dependArray(value);
        }
      }
      return value;
    },
    set: function (newVal) {
      const value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
			dep.notify();
    }
  });
}

function dependArray(value) {}
