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
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, key, value)
    return result
  }
}
export const mutableHandlers = {
  get,
  set,
  // has,
  // deleteProperty
}
