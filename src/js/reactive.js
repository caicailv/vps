import { createDep } from './dep'
// 该结构中 储存的是    targt- Map 键值对
const targetMap = new WeakMap()
export function createGetter() {
  return function get(target, key, receiver) {
    track(target, key)
    return target[key]
  }
}
export function createSetter() {
  return function set(target, key, value) {
    trigger(target, 'set', key, value)
    target[key] = value
    return target
  }
}
export const mutableHandlers = {
  get: createGetter(),
  set: createSetter(),
}

export function track(target, key) {
  // 收集到依赖树

  // 查询该target是否已被收集
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = depsMap.set(key, (dep = createDep()))
  }

  trackEffects(dep, {})
}
export function trigger(target, type, key, value) {
  const depsMap = targetMap.get(target)
  console.log('depsMap',depsMap);
  if (!depsMap) return
  let deps = depsMap[key]
  deps.forEach((el) => {
    console.log('trigger e', el)
  })
}

export function trackEffects() {}

export function reactive(target) {
  if (typeof target !== 'object') return console.log('传入的不是对象', target)

  return new Proxy(target, mutableHandlers)
}
