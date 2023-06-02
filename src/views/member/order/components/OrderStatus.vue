<!-- src/views/member/order/components/OrderStatus.vue -->
<template>
   <div class="detail-action">
      <div class="state">
         <span class="iconfont icon-order-unpay"></span>
         <p>{{ orderStatus[orderStore.orderInfo.result.orderState].label }}</p>
      </div>
      <div class="info">
         <p>订单编号: {{ orderStore.orderInfo.result.id }}</p>
         <p>下单时间: {{ orderStore.orderInfo.result.createTime }}</p>
      </div>
      <div class="btn">
         <!-- 待付款 -->
         <template v-if="orderStore.orderInfo.result.orderState === 1">
            <XtxButton @click="
               $router.push({
                  path: '/member/pay',
                  query: { orderId: orderStore.orderInfo.result.id },
               })
               " type="primary" size="small">立即付款</XtxButton>
            <XtxButton type="gray" size="small" @click="cancelOrder(orderStore.orderInfo.result.id)">取消订单</XtxButton>
         </template>
         <!-- 待发货 -->
         <template v-if="orderStore.orderInfo.result.orderState === 2">
            <XtxButton type="primary" size="small"
               @click="$router.push(`/checkout/order?id=${orderStore.orderInfo.result.id}`)">再次购买</XtxButton>
         </template>
         <!-- 待收货 -->
         <template v-if="orderStore.orderInfo.result.orderState === 3">
            <XtxButton type="primary" size="small" @click="confirmReceipt(orderStore.orderInfo.result.id)">确认收货</XtxButton>
            <XtxButton type="plain" size="small"
               @click="$router.push(`/checkout/order?id=${orderStore.orderInfo.result.id}`)">再次购买</XtxButton>
         </template>
         <!-- 待评价 -->
         <template v-if="orderStore.orderInfo.result.orderState === 4">
            <XtxButton type="primary" size="small"
               @click="$router.push(`/checkout/order?id=${orderStore.orderInfo.result.id}`)">再次购买</XtxButton>
            <XtxButton type="plain" size="small">评价商品</XtxButton>
            <XtxButton type="gray" size="small">申请售后</XtxButton>
         </template>
         <!-- 已完成 -->
         <template v-if="orderStore.orderInfo.result.orderState === 5">
            <XtxButton type="primary" size="small"
               @click="$router.push(`/checkout/order?id=${orderStore.orderInfo.result.id}`)">再次购买</XtxButton>
            <XtxButton type="plain" size="small">查看评价</XtxButton>
            <XtxButton type="gray" size="small">申请售后</XtxButton>
         </template>
         <!-- 已取消 -->
      </div>
   </div>
   <CancelOrder ref="cancelOrderInstance" @on-cancel-order-success="
      orderStore.getOrderInfoById(orderStore.orderInfo.result.id)
      " />
</template>

<script setup lang="ts">
import CancelOrder from "./CancelOrder.vue";
import XtxButton from "@/components/XtxButton.vue";
import { useOrderStore } from "@/stores/orderStore";
import { orderStatus } from "@/contants";
import { ref, getCurrentInstance } from "vue";
import Confirm from "@/components/library/Confirm";

const $ = getCurrentInstance();
const orderStore = useOrderStore();
const cancelOrderInstance = ref(); // 取消弹框实例
// 取消订单Handler
function cancelOrder(id: string) {
   cancelOrderInstance.value.visible = true; // 弹框
   cancelOrderInstance.value.orderId = id; // 存id
};
// 确认收货Handler
async function confirmReceipt(id: string) {
   try {
      await Confirm({ 'content': '确认收货吗?' })
      try {
         await orderStore.confirmReceiptGoods(id)
         $?.proxy?.$msg({ 'type': 'success', 'msg': '收货成功' })
         orderStore.getOrderInfoById(id) // 重新获取数据
      } catch (error) {
         $?.proxy?.$msg({ 'type': 'warn', 'msg': '收货失败：' + error })
      }
   } catch (error) { // 取消
   }
};
</script>
 
<style scoped lang="less">
.detail-action {
   height: 180px;
   width: 100%;
   display: flex;
   align-items: center;

   .state {
      width: 220px;
      text-align: center;

      .iconfont {
         font-size: 40px;
         color: @xtxColor;
      }

      p {
         font-size: 16px;
         color: #666;
         margin-bottom: 10px;
      }
   }

   .info {
      width: 240px;
      line-height: 30px;

      p {
         color: #999;
      }
   }

   .btn {
      flex: 1;
      text-align: right;
      margin-right: 100px;

      .xtx-button {
         margin-left: 20px;
      }
   }
}</style>