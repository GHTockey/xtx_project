<template>
    <div class="container">
        <HomeCategory />
        <HomeBanner />
        <FreshGoods />
    </div>
</template>


<script setup lang="ts">
import HomeCategory from "./components/HomeCategory.vue"; // 左侧分类组件
import HomeBanner from "./components/HomeBanner.vue"; // home 轮播图组件(其中复用了公共轮播图组件)
import FreshGoods from "./components/FreshGoods.vue"; // 新鲜好物组件
</script>


<style lang="less" scoped>
// @import "@/assets/styles/variables.less";
// @import "@/assets/styles/mixin.less";
// 关于 @import url() 和 @import 'xxx.css' 的区别:
// https://segmentfault.com/q/1010000016526564
</style>