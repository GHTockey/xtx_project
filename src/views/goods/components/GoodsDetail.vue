<!-- 商品详情组件: src/views/goods/components/GoodsDetail.vue -->
<template>
    <div class="goods-detail">
        <!-- 属性 -->
        <ul class="attrs">
            <li v-for="item in goodsProperties.properties" :key="item.name">
                <span class="dt">{{ item.name }}</span>
                <span class="dd">{{ item.value }}</span>
            </li>
        </ul>
        <!-- 图片 -->
        <img v-for="item in goodsProperties.pictures" :src="item" :alt="item" :key="item" />
    </div>
</template>

<script setup lang="ts">
import { useGoodsStore } from "@/stores/goodsStore";
import { storeToRefs } from "pinia";

const { goodsProperties } = storeToRefs(useGoodsStore());
</script>

<style scoped lang="less">
.goods-detail {
    padding: 40px;

    .attrs {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;

        li {
            display: flex;
            margin-bottom: 10px;
            width: 50%;

            .dt {
                width: 100px;
                color: #999;
            }

            .dd {
                flex: 1;
                color: #666;
            }
        }
    }

    >img {
        width: 100%;
    }
}
</style>