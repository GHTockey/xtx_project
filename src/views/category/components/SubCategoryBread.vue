<template>
    <div>
        <XtxBread>
            <XtxBreadItem path="/">首页</XtxBreadItem>
            <XtxBreadItem :path="`/category/${route.params.id}`">{{ currentItem.topCategory?.name }}</XtxBreadItem>
            <XtxBreadItem>{{ currentItem.subCategory?.name }}</XtxBreadItem>
        </XtxBread>
    </div>
</template>

<script setup lang="ts">
// 库工具
import { computed } from "vue";
import { useRoute } from "vue-router";
// 组件
import XtxBread from "@/components/XtxBread.vue";
import XtxBreadItem from "@/components/XtxBreadItem.vue";
// store
import useCategoryStore from "@/stores/categoryStore";

const category_store = useCategoryStore();
let { currentTopAndSub } = category_store;
const route = useRoute();
// console.log(route.params);
const currentItem = computed(() => currentTopAndSub(<string>route.params.id, <string>route.params.sid));
// console.log(currentItem);
</script>

<style lang="">
    
</style>