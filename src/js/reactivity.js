// let watcher =

export function effect(fn) {}

export function reactive(obj) {
  return new Proxy(obj, {
    get(trapTarget, property, receiver) {
      return trapTarget[property]
    },
  })
}
