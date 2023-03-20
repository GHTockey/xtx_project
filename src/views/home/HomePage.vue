<template lang="">
    <div>
        qwertyuiop
        <!-- {{profile.nickname}} -->
    </div>
</template>


<script setup lang="ts">
import useUserStore from "@/stores/user";
import Req from "@/utils/request";
let a = Req.createInstance()
// a.request({
//     method: 'post',
//     url: '/dd/dd/dd/d/d/d/d/d/d/d/d/p'
// })
</script>


<style lang="less" scoped>
// @import "@/assets/styles/variables.less";
// @import "@/assets/styles/mixin.less";
// 关于 @import url() 和 @import 'xxx.css' 的区别:
// https://segmentfault.com/q/1010000016526564

div {
    color: @xtxColor;
    .hoverShadow;
}
</style>