import { mutableHandlers } from './baseHandlers'
// export const reactiveMap = new WeakMap()

function createReactiveObject(target) {
  return new Proxy(target, mutableHandlers)
}

export function reactive(target) {
  return createReactiveObject(target)
}
