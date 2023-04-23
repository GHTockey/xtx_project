<!-- src/views/goods/components/GoodsHot.vue -->
<template>
    <div class="goods-hot">
        <h3>{{ listNames[type] }}</h3>
        <GoodsItem :goods="item" v-for="item,i in hotSaleGoods.result[type]" :key="item.id"></GoodsItem>
    </div>
</template>

<script setup lang="ts">
import GoodsItem from "../../category/components/GoodsItem.vue"; // 复用分类页的 goodsItem 组件
import { storeToRefs } from "pinia";
import { useGoodsStore } from "@/stores/goodsStore";

const goods_store = useGoodsStore();
const { getHotSaleGoodsHandler } = goods_store;
const { hotSaleGoods } = storeToRefs(goods_store);

const props = defineProps<{ id: string; type: 1 | 2 | 3 }>();
getHotSaleGoodsHandler(props.id, 3, props.type)

// id: 商品 id  type: 榜单类型
const listNames = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
</script>

<style scoped lang="less">
.goods-hot {
    h3 {
        height: 70px;
        background: @helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    :deep(.goods-item) {
        background: #fff;
        width: 100%;
        margin-bottom: 10px;

        img {
            width: 200px;
            height: 200px;
        }

        p {
            margin: 0 10px;
        }

        &:hover {
            transform: none;
            box-shadow: none;
        }
    }
}
</style>