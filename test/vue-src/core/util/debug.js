import { noop } from '../../shared/util';
import config from '../config';

export let warn = noop;

if (process.env.NODE_ENV !== 'production') {
  const hasCOnsole = typeof console !== 'undefined';
  warn = (msg, vm) => {
    if (hasCOnsole && config.silent) {
      console.error(`[Vue warn]: ${msg}` + (vm ? generateComponentTrace(vm) : ''));
    }
  };
}

function generateComponentTrace(vm) {
  //
}
