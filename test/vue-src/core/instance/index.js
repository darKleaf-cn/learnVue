import { warn } from '../util/index';
import { initMixin } from './init';
import { stateMixin } from './state';

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the new keyword');
  }
	/**
	 * 初始化
	 */
	this._init(options);
}

initMixin(Vue);
stateMixin(Vue);

export default Vue;
