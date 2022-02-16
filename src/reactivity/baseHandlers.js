import { track, trigger } from './effect'
const get = createGetter()
const set = createSetter()
function createGetter() {
  return function get(target, key) {
    track(target, key)
    return target[key]
  }
}
function createSetter() {
  return function set(target, key, value) {
    target[key] = value
    return target
  }
}

export const mutableHandlers = {
  get,
  set,
  // has,
  // deleteProperty
}
