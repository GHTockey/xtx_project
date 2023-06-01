<!-- src/views/member/order/components/DetailLogistics.vue -->
<template>
   <div class="detail-logistics">
      <p>
         <span>{{ orderStore.logistics.result.list[0]?.text }}</span>
         <span>{{ orderStore.logistics.result.list[0]?.time }}</span>
      </p>
      <a href="javascript:" @click="orderLogisticsInstance.visible = true">查看物流</a>
   </div>
   <OrderLogistics ref="orderLogisticsInstance" />
</template>

<script setup lang="ts">
import { useOrderStore } from "@/stores/orderStore";
import { ref } from "vue";
import { useRoute } from "vue-router";
import OrderLogistics from "./OrderLogistics.vue";

// 获取订单 store 对象
const orderStore = useOrderStore();
// 获取路由信息对象
const route = useRoute();
// 发送请求获取物流信息
orderStore.viewLogistics(route.params.id as string);
// 物流信息弹框组件实例对象
const orderLogisticsInstance = ref();
</script>
 
<style scoped lang="less">
.detail-logistics {
   height: 50px;
   display: flex;
   align-items: center;
   padding: 0 30px;
   background-color: #f5f5f5;
   margin: 30px 50px 0;

   >p {
      flex: 1;

      span {
         color: #999;

         &:first-child {
            margin-right: 30px;
         }
      }
   }

   >a {
      color: @xtxColor;
      text-align: center;
   }
}
</style>