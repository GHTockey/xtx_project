<!-- 订单详情: src/views/member/order/OrderDetailPage.vue -->
<template>
   <div class="order-detail-page">
      <!-- 订单状态 -->
      <OrderStatus />
      <!-- 步骤条-->
      <!-- 物流栏 -->
      <!-- 订单商品信息 -->
   </div>
</template>

<script setup lang="ts">
import OrderStatus from "./components/OrderStatus.vue";
import { useOrderStore } from "@/stores/orderStore";
import { useRoute } from "vue-router";

const route = useRoute();
const order_store = useOrderStore();

order_store.getOrderInfoById(route.params.id as string);
</script>
 
<style scoped lang="less">
.order-detail-page {
   background: #fff;
   height: 100%;
}
</style>