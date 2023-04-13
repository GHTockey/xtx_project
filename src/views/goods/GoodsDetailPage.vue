<!-- src/views/goods/GoodsDetailPage.vue -->
<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goodsInfo.status === 'success'">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${goodsInfo.result.categories[1].id}`">{{ goodsInfo.result.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :path="`/category/sub/${goodsInfo.result.categories[1].id}/${goodsInfo.result.categories[0].id}`">
          {{ goodsInfo.result.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem> {{goodsInfo.result.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 左侧 -->
        <div class="media"></div>
        <!-- 右侧 -->
        <div class="spec"></div>
      </div>
      <!-- 同类商品 -->
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜 -->
        <div class="goods-aside"></div>
      </div>
    </div>
    <div class="container loading-container" v-if="goodsInfo.status === 'loading'">
      <img src="@/assets/images/loading.gif" alt="" />
    </div>
  </div>
</template>

<script  setup lang="ts">
import XtxBread from "@/components/XtxBread.vue";
import XtxBreadItem from "@/components/XtxBreadItem.vue";

import { useGoodsStore } from "@/stores/goodsStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const goods_store = useGoodsStore();
const route = useRoute();
let { goodsInfo } = storeToRefs(goods_store);
let { getGoodsInfo } = goods_store;

getGoodsInfo(route.params.id as string);
</script>
  
<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  background: #fff;
}
</style>