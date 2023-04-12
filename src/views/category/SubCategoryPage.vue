<template>
    <div class="container">
        <SubCategoryBread />
        <SubCategoryFilter @onChanged="updateFilterParams($event); sendRequest();" />
        <div class="goods-list">
            <!-- 当排序条件发生变化时重新获取分类商品 -->
            <SubCategorySort @onChanged="updateSortParams($event); sendRequest();" />
            <!-- 将商品列表传递到下层组件中 -->
            <GoodsList :goodsList="categoryGoods.result.items" />
        </div>
    </div>
</template>

<script setup lang="ts">
import SubCategoryBread from "./components/SubCategoryBread.vue";
import SubCategoryFilter from "./components/SubCategoryFilter.vue";
import SubCategorySort from "./components/SubCategorySort.vue";
import GoodsList from "./components/GoodsList.vue";

import useCategoryStore from "@/stores/categoryStore";
import type { GoodsRequestParams } from "@/types/Home/Category";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { storeToRefs } from "pinia";

const category_soter = useCategoryStore();
const route = useRoute();
let { categoryGoods } = storeToRefs(category_soter);
let { getCategoryGoods } = category_soter;


let filterParams = {};// 用于存储筛选条件
let sortParams = {};// 用于存储排序条件
let pageParams = { page: 1, pageSize: 13 };// 用于存储分页数据

// 用于更新筛选条件
function updateFilterParams(params: Partial<GoodsRequestParams>) {
    filterParams = params;
}
// 用于更新排序条件
function updateSortParams(params: Partial<GoodsRequestParams>) {
    sortParams = params;
}

// 获取请求参数
function getReqParams() {
    return { ...filterParams, ...sortParams, ...pageParams };
}
// 用于发送请求获取商品列表
function sendRequest() {
    // 合并请求参数
    const reqParams = getReqParams();
    // 发送请求获取商品列表
    getCategoryGoods(route.params.id as string, reqParams);
    // console.log(route.params);
}
// 初始获取商品列表数据
sendRequest();

onBeforeRouteUpdate(to => {
    console.log(to);
    getCategoryGoods(to.params.id as string, getReqParams())
})
</script>

<style lang="">
    
</style>