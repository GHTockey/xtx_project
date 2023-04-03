<!-- 单个商品组件 src/views/category/components/GoodsItem.vue -->
<template>
    <RouterLink to="/" class="goods-item">
        <img :src="goods.picture" alt="" />
        <p class="name ellipsis">{{ goods.name }}</p>
        <p class="desc ellipsis">{{ goods.desc }}</p>
        <p class="price">&yen;{{ goods.price }}</p>
    </RouterLink>
</template>

<script lang="ts" setup>
import type { Goods } from '@/types/Home/Category';

let p = defineProps<{
    // 使用类型工具将参数转为可无属性
    goods: Partial<Goods>
}>()

console.log(p,1222);
</script>
  
<style scoped lang="less">
.goods-item {
    display: block;
    width: 220px;
    padding: 20px 30px;
    text-align: center;
    .hoverShadow();

    img {
        width: 160px;
        height: 160px;
    }

    p {
        padding-top: 10px;
    }

    .name {
        font-size: 16px;
    }

    .desc {
        color: #999;
        height: 29px;
    }

    .price {
        color: @priceColor;
        font-size: 20px;
    }
}
</style>