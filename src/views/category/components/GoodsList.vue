<!-- src/views/category/components/GoodsList.vue -->
<template>
  <ul>
    <li v-for="goods in goodsList" :key="goods.id">
      <GoodsItem :goods="goods" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import GoodsItem from "./GoodsItem.vue";
import type { Goods } from "@/types/Home/Category";
defineProps<{ goodsList: Goods[] }>();
</script>
  
<style scoped lang="less">
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;

  li {
    margin-right: 20px;
    margin-bottom: 20px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>