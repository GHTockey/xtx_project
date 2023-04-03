<template>
    <div>
        <XtxBread>
            <XtxBreadItem path="/">首页</XtxBreadItem>
            <Transition name="fade-right" mode="out-in">
                <XtxBreadItem :key="currentItem?.topCategory?.id" :path="`/category/${route.params.id}`">{{
                    currentItem.topCategory?.name }}</XtxBreadItem>
            </Transition>
            <Transition name="fade-right" mode="out-in">
                <XtxBreadItem :key="currentItem.subCategory?.id">{{ currentItem.subCategory?.name }}</XtxBreadItem>
            </Transition>
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