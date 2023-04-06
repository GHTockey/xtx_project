<!-- src/views/category/components/SubCategoryFilter.vue -->
<template>
    <div class="sub-filter" v-if="subCategoryFilters.status === 'success'">
        <div class="item">
            <div class="head">品牌：</div>
            <div class="body">
                <a class="active" href="javascript:">全部</a>
                <a href="javascript:" v-for="brand in subCategoryFilters.result[route.params.sid as string].brands"
                    :key="brand.id">{{ brand.name }}</a>
            </div>
        </div>
        <div class="item" v-for="saleProperties in subCategoryFilters.result[route.params.sid as string].saleProperties"
            :key="saleProperties.id">
            <div class="head">{{ saleProperties.name }}:</div>
            <div class="body">
                <a class="active" href="javascript:">全部</a>
                <a href="javascript:" v-for="property in saleProperties.properties" :key="property.id">
                    {{ property.name }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useCategoryStore from "@/stores/categoryStore";
import { storeToRefs } from "pinia";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

// 获取存储分类状态的 store 对象
const category_store = useCategoryStore();
// 获取路由信息对象
const route = useRoute();
// 获取筛选条件状态
const { subCategoryFilters } = storeToRefs(category_store);
// 获取请求筛选条件的方法
const { getSubCategoryFilters } = category_store;
// 获取筛选条件
getSubCategoryFilters(route.params.sid as string);
// 路由切换前
onBeforeRouteUpdate((to) => {
    // 获取目标页面的筛选条件
    getSubCategoryFilters(to.params.sid as string);
});
</script>
  
<style scoped lang="less">
.sub-filter {
    background: #fff;
    padding: 25px;

    .item {
        display: flex;
        line-height: 40px;

        .head {
            width: 80px;
            color: #999;
        }

        .body {
            flex: 1;

            a {
                margin-right: 36px;
                transition: all 0.3s;
                display: inline-block;

                &.active,
                &:hover {
                    color: @xtxColor;
                }
            }
        }
    }
}
</style>