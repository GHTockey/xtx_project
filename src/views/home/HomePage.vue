<template lang="">
    <div>
        qwertyuiop
    </div>
</template>


<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore()
</script>


<style lang="less" scoped>
// @import "@/assets/styles/variables.less";
// @import "@/assets/styles/mixin.less";
// 关于 @import url() 和 @import 'xxx.css' 的区别: https://segmentfault.com/q/1010000016526564

div {
    color: @xtxColor;
    .hoverShadow;
}
</style>