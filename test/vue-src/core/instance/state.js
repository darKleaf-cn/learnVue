import { observe } from "../../../../vue-src/core/observer";

export function initState(vm) {
	vm._watchers = [];
	const opts = vm.$options;
	if(opts.props) {
		initProps(vm, opts.props);
	}
	if(opts.methods) {
		initMethods(vm, opts.methods);
	}
	if(opts.data) {
		initData(vm);
	} else {
		observe(vm._data = {}, true);
	}
	if(opts.computed) {
		initComputed(vm, opts.computed);
	}
	if(opts.watch) {
		initWatch(vm, opts.watch);
	}
}

function initProps(vm, propsOptions) {

}

function initData(vm) {

}

function initMethods(vm, methods) {

}

function initComputed(vm, computed) {

}

function initWatch(vm, watch) {

}

export function stateMixin(Vue) {
	const dataDef = {};
	dataDef.get = function() {
		return this._data;
	}
	const propsDef = {};
	propsDef.get = function() {
		return this._props;
	}
}