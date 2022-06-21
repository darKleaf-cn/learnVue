export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

const bailRE = /[^\w.$]/;
export function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj) {
    for (let i of segments) {
      if (!obj) {
        return;
      }
      obj = obj[i];
    }
    return obj;
  };
}

export function isReserved(str) {
	const c = (str + '').charCodeAt(0);
	return c === 0x24 || c === 0x5f;
}
