<template>
    <!-- <slot></slot> -->
    <render />
</template>

<script lang="ts" setup>
import { h, isVNode, useSlots } from "vue";
const props = defineProps<{ level: number }>();

const slots = useSlots();
console.log(slots.aaa?.()); // 虚拟dom[]
console.log('isVNode', isVNode(slots.aaa?.()[0])); // true

const render = () => h(`h${props.level}`, slots.aaa?.())


// [标签名] [元素内容] [子元素]
// const elHandler1 = () => h('div', '666') // <div>666</div>
// const elHandler2 = () => h('div', { class: 'tete' }, 6) // <div class="tete">6</div>
// // 除了 type 外，其他参数都是可选的
// h('div')
// h('div', { id: 'foo' })

// // attribute 和 property 都可以用于 prop
// // Vue 会自动选择正确的方式来分配它
// h('div', { class: 'bar', innerHTML: 'hello' })

// // class 与 style 可以像在模板中一样
// // 用数组或对象的形式书写
// h('div', { class: [foo, { bar }], style: { color: 'red' } })

// // 事件监听器应以 onXxx 的形式书写
// h('div', { onClick: () => {} })

// // children 可以是一个字符串
// h('div', { id: 'foo' }, 'hello')

// // 没有 prop 时可以省略不写
// h('div', 'hello')
// h('div', [h('span', 'hello')])

// // children 数组可以同时包含 vnode 和字符串
// h('div', ['hello', h('span', 'hello')])
</script>