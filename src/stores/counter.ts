import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
/**
defineStore('counter',{});
defineStore('counter',()=>{});
这两种用法的区别在于第二种用法中，我们直接将一个函数作为参数传递给 defineStore，这个函数返回一个对象，该对象包含了 store 的各种属性。
这种用法更加简洁，适用于只需要定义 state、actions、getters 等简单属性的情况。
但是需要注意的是，使用第二种用法时，在定义 actions、getters 等属性时，需要使用箭头函数，以确保函数内部的 this 指向 store 实例。
否则，函数内部的 this 会指向当前的作用域，导致程序出错。
因此，如果你需要定义复杂的 actions、getters 等属性，
建议使用第一种用法，这样可以更加明确地定义各种属性，并且可以使用正常的函数语法，不需要特别注意 this 的指向。
*/