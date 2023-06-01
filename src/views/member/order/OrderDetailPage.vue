<!-- 订单详情: src/views/member/order/OrderDetailPage.vue -->
<template>
   <div class="order-detail-page">
      <!-- 订单状态 -->
      <OrderStatus />
      <!-- 步骤条-->
      <XtxSteps :active="order_store.orderInfo.result.orderState === 6 ? 1 : order_store.orderInfo.result.orderState">
         <XtxStepItem title="提交订单" :desc="order_store.orderInfo.result.createTime"></XtxStepItem>
         <XtxStepItem title="付款成功" :desc="order_store.orderInfo.result.payTime"></XtxStepItem>
         <XtxStepItem title="商品发货" :desc="order_store.orderInfo.result.consignTime"></XtxStepItem>
         <XtxStepItem title="确认收货" :desc="order_store.orderInfo.result.endTime"></XtxStepItem>
         <XtxStepItem title="订单完成" :desc="order_store.orderInfo.result.evaluationTime"></XtxStepItem>
      </XtxSteps>
      <!-- 物流栏 -->
      <DetailLogistics v-if="[3, 4, 5].includes(order_store.orderInfo.result.orderState)" />
      <!-- 订单商品信息 -->
   </div>
</template>

<script setup lang="ts">
import OrderStatus from "./components/OrderStatus.vue";
import { useOrderStore } from "@/stores/orderStore";
import { useRoute } from "vue-router";
import { XtxSteps } from "@/components/XtxSteps";
import { XtxStepItem } from "@/components/XtxStepItem";
import DetailLogistics from "./components/DetailLogistics.vue";

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