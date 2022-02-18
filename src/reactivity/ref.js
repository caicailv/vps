import { reactive } from '@vue/reactivity'
import { isObj } from '../shared'

export function ref(val) {
  if (isRef(val)) return val
  return new RefImpl(val)
}
export function isRef(val) {
  return !!(val && val._isRef)
}

class RefImpl {
  constructor(val) {
    this._isRef = true
    this.val = convert(val)
  }
}

function convert(val) {
  if (isObj(val)) {
    return reactive(val)
  }
}
