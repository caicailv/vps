// dep 本质上是set
export const createDep = () => {
  const dep = new Set()
  dep.w = 0
  dep.n = 0
  return dep
}
