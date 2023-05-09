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
        <XtxBreadItem> {{ goodsInfo.result.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 左侧 -->
        <div class="media">
          <!-- 商品图片组件 -->
          <GoodsImages />
        </div>
        <!-- 右侧 -->
        <div class="spec">
          <!-- 商品信息组件 -->
          <GoodsInfo />
          <!-- 商品规格 -->
          <GoodsSku :skuId="(route.params.id as string)" :specs="goodsInfo.result.specs" :skus="goodsInfo.result.skus"
            @complete="goods_store.updateGoods($event); skuId = $event.skuId;" @uncomplete=" skuId = undefined" />
          <!-- 商品数量 -->
          <XtxNumberBox :max="goodsInfo.result.inventory" v-model:count="count" label="数量" />
          <!-- 加入购物车按钮 -->
          <XtxButton type="primary" :style="{ 'margin-top': '20px' }" @click="addProductToCart">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 同类商品 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <goodsTab />
          </div>
        </div>
        <!-- 24热榜 -->
        <div class="goods-aside">
          <GoodsHot :id="goodsInfo.result.id" :type=1 />
          <GoodsHot :id="goodsInfo.result.id" :type=2 />
          <GoodsHot :id="goodsInfo.result.id" :type=3 />
        </div>
      </div>
    </div>
    <!-- 加载状态 -->
    <div class="container loading-container" v-if="goodsInfo.status === 'loading'">
      <img src="@/assets/images/loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import XtxBread from "@/components/XtxBread.vue";
import XtxBreadItem from "@/components/XtxBreadItem.vue";
import GoodsImages from "./components/GoodsImages.vue";
import GoodsInfo from "./components/GoodsInfo.vue";
import GoodsSku from "./components/GoodsSku.vue";
import XtxNumberBox from "@/components/XtxNumberBox.vue";
import XtxButton from "@/components/XtxButton.vue";
import GoodsRelevant from "./components/GoodsRelevant.vue";
import goodsTab from "./components/goodsTab.vue";
import GoodsHot from "./components/GoodsHot.vue";

import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref, getCurrentInstance } from "vue";
import { useGoodsStore } from "@/stores/goodsStore";
import { useCartStore } from "@/stores/cartStore";
import { AxiosError } from "axios";

const route = useRoute();
const $ = getCurrentInstance();

const goods_store = useGoodsStore();
let { goodsInfo } = storeToRefs(goods_store);
let { getGoodsInfo } = goods_store;

const cart_store = useCartStore(); // 购物车 store 对象

// 用户选择的 skuId
const skuId = ref<string | undefined>();
// 获取商品信息
getGoodsInfo(route.params.id as string);

// 用户选择的商品数量
const count = ref(1);

// onBeforeRouteUpdate(to => {
//   console.log(666);
// })

// 将商品加入购物车
async function addProductToCart() {
  // console.log(skuId.value, count.value);
  // 检查用户是否选择了完整的商品规格
  if (typeof skuId.value !== 'undefined') {
    try {
      // 发送请求将商品加入购物车
      await cart_store.addProductToCart(skuId.value, count.value);
      // 提示用户加入购物车成功
      $?.proxy?.$msg({ type: "success", msg: "加入购物车成功" });
    } catch (error) {
      console.log(error);
      // 加入购物车失败的异常
      if (error instanceof AxiosError) {
        // token 验证失败的情况
        if (error.response?.data.code === "10019") {
          $?.proxy?.$msg({ type: "error", msg: `请登录` });
        }
      }
    }
  } else {
    $?.proxy?.$msg({ type: "error", msg: "请选择完整的商品规格" });
  }
}
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