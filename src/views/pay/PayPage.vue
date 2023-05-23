<!-- src/views/pay/PayPage.vue -->
<template>
   <div class="xtx-pay-page">
      <div class="container">
         <XtxBread>
            <XtxBreadItem path="/">首页</XtxBreadItem>
            <XtxBreadItem path="/cart">购物车</XtxBreadItem>
            <XtxBreadItem>支付订单</XtxBreadItem>
         </XtxBread>
         <!-- 付款信息 -->
         <div class="pay-info">
            <span class="icon iconfont icon-queren2"></span>
            <div class="tip" v-if="isActive">
               <p>订单提交成功！请尽快完成支付。</p>
               <p>支付还剩 <span>{{ dayjs.unix(count).format('mm分ss秒') }}</span>, 超时后将取消订单</p>
            </div>
            <div class="amount">
               <span>应付总额：</span>
               <span>¥{{ order_store.orderInfo.result.payMoney.toFixed(2) }}</span>
            </div>
         </div>
         <!-- 付款方式 -->
         <div class="pay-type">
            <p class="head">选择以下支付方式付款</p>
            <div class="item">
               <p>支付平台</p>
               <a class="btn wx" href="javascript:"></a>
               <a class="btn alipay" :href="payUrl" @click="paying = true" target="_blank"></a>
            </div>
            <div class="item">
               <p>支付方式</p>
               <a class="btn" href="javascript:">招商银行</a>
               <a class="btn" href="javascript:">工商银行</a>
               <a class="btn" href="javascript:">建设银行</a>
               <a class="btn" href="javascript:">农业银行</a>
               <a class="btn" href="javascript:">交通银行</a>
            </div>
         </div>
      </div>
   </div>

   <XtxDialog title="正在支付..." v-model:visible="paying">
      <template #body>
         <div class="pay-wait">
            <img src="@/assets/images/load.gif" alt="" />
            <div>
               <p>如果支付成功：</p>
               <RouterLink :to="`/member/order/${order_store.orderInfo.result.id}`">查看订单详情></RouterLink>
               <p>如果支付失败：</p>
               <RouterLink to="/">查看相关疑问></RouterLink>
            </div>
         </div>
      </template>
   </XtxDialog>
</template>

<script setup lang="ts">
import XtxBread from "@/components/XtxBread.vue";
import XtxBreadItem from "@/components/XtxBreadItem.vue";
import { useOrderStore } from "@/stores/orderStore";
import { useRoute, useRouter } from "vue-router";
import useCountdown from "@/logics/useCountdown";
import { ref, watch } from "vue";
import dayjs from "dayjs";
import XtxDialog from "@/components/XtxDialog.vue";

const order_store = useOrderStore();
const route = useRoute();
const router = useRouter();
order_store.getOrderInfoById(route.query.orderId as string);
const { count, start, isActive } = useCountdown();

// 监听订单详细信息的获取状态
watch(
   () => order_store.orderInfo.status,
   (status) => {
      // 如果订单详细信息获取成功
      if (status === "success") {
         // 获取订单状态
         const orderState = order_store.orderInfo.result.orderState;
         // 待支付
         if (orderState === 1) {
            // 获取倒计时时间
            const countdown = order_store.orderInfo.result.countdown;
            // 如果还可以倒计时
            if (countdown > 0) {
               // 开启倒计时
               start(countdown);
            }
         } else if (orderState === 2) {
            // 已支付
            router.push("/member/order");
         }
      }
   }
);

import req from "@/utils/request";
const redirect = encodeURIComponent('http://www.corho.com:8080/#/pay/callback');
// 支付地址
const payUrl = `${req.baseURL}/pay/aliPay?orderId=${route.query.orderId}&redirect=${redirect}`;
// 支付等待标识
const paying = ref(false);
</script>
 
<style scoped lang="less">
.pay-info {
   background: #fff;
   display: flex;
   align-items: center;
   height: 240px;
   padding: 0 80px;

   .icon {
      font-size: 80px;
      color: #1dc779;
   }

   .tip {
      padding-left: 10px;
      flex: 1;

      p {
         &:first-child {
            font-size: 20px;
            margin-bottom: 5px;
         }

         &:last-child {
            color: #999;
            font-size: 16px;
         }
      }
   }

   .amount {
      span {
         &:first-child {
            font-size: 16px;
            color: #999;
         }

         &:last-child {
            color: @priceColor;
            font-size: 20px;
         }
      }
   }
}

.pay-type {
   margin-top: 20px;
   background-color: #fff;
   padding-bottom: 70px;

   p {
      line-height: 70px;
      height: 70px;
      padding-left: 30px;
      font-size: 16px;

      &.head {
         border-bottom: 1px solid #f5f5f5;
      }
   }

   .btn {
      width: 150px;
      height: 50px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 48px;
      margin-left: 30px;
      color: #666666;
      display: inline-block;

      &.active,
      &:hover {
         border-color: @xtxColor;
      }

      &.alipay {
         background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
      }

      &.wx {
         background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
      }
   }
}

.pay-wait {
   display: flex;
   justify-content: space-around;

   p {
      margin-top: 30px;
      font-size: 14px;
   }

   a {
      color: @xtxColor;
   }
}
</style>