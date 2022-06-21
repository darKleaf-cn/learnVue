/**
 * 不执行任何操作
 */
export function noop() {}

export function remove(arr, item) {
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      if (item === arr[i]) {
        return arr.splice(i, 1);
      }
    }
  }
}

export function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}

export function isPlainObject(obj) {
	return Object.prototype.toString.call(obj) === '[object object]';
}

export function hasOwn(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}