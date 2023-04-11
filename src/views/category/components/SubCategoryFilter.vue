<!-- src/views/category/components/SubCategoryFilter.vue -->
<template>
    <div class="sub-filter" v-if="subCategoryFilters.status === 'success'">
        <div class="item">
            <div class="head">品牌：</div>
            <div class="body">
                <a :class="{ active: selectedFilters.brandId === undefined }" href="javascript:"
                    @click="selectedFiltersChanged({ brandId: undefined })">全部</a>
                <a href="javascript:" :class="{ active: selectedFilters.brandId === brand.id }"
                    @click="selectedFiltersChanged({ brandId: brand.id })"
                    v-for="brand in subCategoryFilters.result[route.params.sid as string].brands" :key="brand.id">{{
                        brand.name }}</a>
            </div>
        </div>
        <div class="item" v-for="saleProperties in subCategoryFilters.result[route.params.sid as string].saleProperties"
            :key="saleProperties.id">
            <div class="head">{{ saleProperties.name }}:</div>
            <div class="body">
                <a :class="{ active: selectedFilters[saleProperties.name] === undefined }" href="javascript:"
                    @click="selectedFiltersChanged({ [saleProperties.name]: undefined })">全部</a>
                <a href="javascript:" :class="{ active: selectedFilters[saleProperties.name] === property.name }"
                    @click="selectedFiltersChanged({ [saleProperties.name]: property.name })"
                    v-for="property in saleProperties.properties" :key="property.id">
                    {{ property.name }}
                </a>
            </div>
        </div>
    </div>
    <!-- 骨架屏 -->
    <div class="sub-filter" v-else-if="subCategoryFilters.status === 'loading'">
        <XtxSkeleton class="item" width="800px" height="25px" />
        <XtxSkeleton class="item" width="800px" height="25px" />
        <XtxSkeleton class="item" width="600px" height="25px" />
        <XtxSkeleton class="item" width="600px" height="25px" />
        <XtxSkeleton class="item" width="600px" height="25px" />
    </div>
</template>

<script setup lang="ts">
import XtxSkeleton from "@/components/XtxSkeleton.vue";
import useCategoryStore from "@/stores/categoryStore";
import type { GoodsRequestParams } from "@/types/Home/Category";
import { storeToRefs } from "pinia";
import { ref, onUpdated } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import omitBy from "lodash/omitBy";
import transform from "lodash/transform";

const category_store = useCategoryStore();
const route = useRoute();
const { subCategoryFilters } = storeToRefs(category_store);
const { getSubCategoryFilters } = category_store;
getSubCategoryFilters(route.params.sid as string);
onBeforeRouteUpdate((to) => {
    getSubCategoryFilters(to.params.sid as string);
});


// 用户选择筛选条件时使用的类型
interface SelectedFilters {
    brandId: string;
    [key: string]: string;
};
// 请求时参数的类型
type FilterParams = Partial<Pick<GoodsRequestParams, "brandId" | "attrs">>;

// 用于存储用户选择的筛选条件
// 由于所有的筛选条件都是可选的, 所以此处使用了 Partial
let selectedFilters = ref<Partial<SelectedFilters>>({});
// let selectedFilters = reactive<Partial<SelectedFilters>>({});

function selectedFiltersChanged(filters: Partial<SelectedFilters>) {
    selectedFilters.value = { ...selectedFilters.value, ...filters } // ref
    // selectedFilters = Object.assign(selectedFilters, filters) // reactive

    // 清除属性值为空字符串的属性
    selectedFilters.value = omitBy(selectedFilters.value, (value) => value === undefined);

    // 源对象  cb  
    let r = transform(selectedFilters.value, (res: FilterParams, val, key) => {
        if (key === 'brandId') {
            res[key] = val
        } else {
            if (typeof res.attrs === 'undefined') res.attrs = []
            res.attrs.push({
                groupName: key,
                propertyName: val as string
            })
        }
    }, {})
    console.log(r);
};

// onUpdated(() => {
//     console.log('页面更新');
// });
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
// 整个组件
.xtx-skeleton {
  margin: 10px 0;
}
</style>