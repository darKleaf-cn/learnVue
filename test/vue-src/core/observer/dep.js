import { remove } from '../../shared/util';

let uid = 0;

export default class Dep {
  static target;
  id;
  subs;
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.pesh(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;
const targetStack = [];

export function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(_target);
  }
  Dep.target = _target;
}

export function popTarget() {
  Dep.target = targetStack.pop();
}
