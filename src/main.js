import { reactive, effect } from './reactivity/index.js'
let dummy
let counter = reactive({ num1: 1, num2: 2 })
effect(() => {
  dummy = counter.num1 + counter.num2
  console.log(dummy) // 每次counter.num1修改都会打印日志
})
setInterval(() => {
  counter.num1++
  console.log(`counter.num1`, counter.num1)
}, 5000)
// console.log('ccc',counter);
// console.log('ccc',counter.num1);
// counter.num1 = 3
