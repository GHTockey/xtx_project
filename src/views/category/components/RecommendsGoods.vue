<!-- 推荐商品组件 src/views/category/components/RecommendsGoods.vue -->
<template>
    <div v-if="topCategories.result[route.params.id as string]">
        <div class="ref-goods" v-for="item in topCategories.result[route.params.id as string].children" :key="item.id">
            <div class="head">
                <h3>- {{ item.name }} -</h3>
                <p class="tag">温暖柔软，品质之选</p>
                <XtxMore />
            </div>
            <div class="body">
                <GoodsItem :goods="sItem" v-for="sItem in item.goods" :key="sItem.id" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import { computed } from "vue";
import GoodsItem from "./GoodsItem.vue";
import XtxMore from "@/components/XtxMore.vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import useCategoryStore from "@/stores/categoryStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const category_store = useCategoryStore();
let { topCategories } = storeToRefs(category_store);
category_store.getTopCategoryById(route.params.id as string);

// 路由变化
onBeforeRouteUpdate(to => {
    category_store.getTopCategoryById(to.params.id as string);
});

// const topCategory = computed(() => category_store.currentTop(route.params.id as string))
</script>
  
<style lang="less" scoped>
.ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .head {
        .xtx-more {
            position: absolute;
            top: 20px;
            right: 20px;
        }

        .tag {
            text-align: center;
            color: #999;
            font-size: 20px;
            position: relative;
            top: -20px;
        }
    }

    .body {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 65px 30px;
    }
}
</style>