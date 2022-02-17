let activeEffect = null
const targetMap = new WeakMap()
export function track(target, key) {
  debugger
  targetMap.get(target)
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, (depsMap = new Map()))
  let deps = depsMap.get(key)
  if (!deps) deps = new Set()
  if (!deps.has(activeEffect) && activeEffect) deps.add(activeEffect)
  depsMap.set(key, deps)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)
  if (!deps) return
  deps.forEach((effectFn) => {
    if (effectFn.scheduler) {
      effectFn.scheduler()
    } else {
      effectFn()
    }
  })
}

export function effect(fn, options = {}) {
  const effectFn = () => {
    try {
      activeEffect = effectFn
      return fn()
    } finally {
      activeEffect = null
    }
  }
  if (!options.lazy) {
    //没有配置lazy 直接执行
    effectFn()
  }
  effectFn.scheduler = options.scheduler // 调度时机 watchEffect回用到
  return effectFn
}
