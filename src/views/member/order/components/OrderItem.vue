<script setup lang="ts">
import dayjs from "dayjs";
import { orderStatus } from "@/contants/index";
import XtxButton from "@/components/XtxButton.vue";
import type { OrderResponse } from "@/types/Order";
import useCountdown from "@/logics/useCountdown";
import { useOrderStore } from "@/stores/orderStore";
import { getCurrentInstance } from "vue";
import Confirm from "@/components/library/Confirm";

const order_store = useOrderStore();
const $ = getCurrentInstance();
const props = defineProps<{ item: OrderResponse }>();
const emit = defineEmits<{
   // onCancelOrder: (id: string) => void;
   (e: 'onCancelOrder', id: string): void;
   (e: 'removeOrderSuccess'): void; // 删除成功会触发此方法
   (e: 'confirmReceiptGoodsSuccess'): void; // 收货成功会触发此方法
   (e: 'viewLogistics', id: string): void
}>();
const { start, count } = useCountdown();
if (props.item.orderState === 1) start(props.item.countdown);

// 删除订单Handler
async function removeOrder(id: string) {
   try {
      await Confirm({ 'content': '确定删除该订单?' })
      try {
         await order_store.removeOrder([id])
         $?.proxy?.$msg({ 'type': 'success', 'msg': '删除成功' })
         emit('removeOrderSuccess')
      } catch (error) {
         console.log(error);
         $?.proxy?.$msg({ 'type': 'error', 'msg': '删除失败' })
      }
   } catch (error) {
      $?.proxy?.$msg({ 'type': 'success', 'msg': '取消' })
   }
};
// 确认收货Handler
async function confirmReceiptGoods(id: string) {
   try {
      // 和用户进行确认是否要确认收货
      await Confirm({ content: "确定要进行收货吗" });
      // 捕获请求错误
      try {
         // 发送请求 确认收货
         await order_store.confirmReceiptGoods(id);
         // 消息提示
         $?.proxy?.$msg({ type: "success", msg: "确认收货成功" });
         // 通知父组件 重新获取订单列表
         emit("confirmReceiptGoodsSuccess");
      } catch (error) {
         // 消息提示
         $?.proxy?.$msg({ type: "error", msg: "确认收货失败" });
      }
   } catch (error) { }
};
// 触发获取物流Handler
async function viewLogistics(id: string) {
   emit('viewLogistics', id)
};
</script>

<template>
   <div class="order-item">
      <div class="head">
         <span>下单时间: {{ item.createTime }}</span>
         <span>订单编号: {{ item.id }}</span>
         <span class="down-time" v-if="item.orderState == 1">
            <i class="iconfont icon-down-time"></i>
            <b>付款截止: {{ dayjs(count * 1000).format('mm分ss秒') }}</b>
            <!-- <b>付款截止: 28分32秒</b> -->
         </span>
         <a href="javascript:" class="del" @click="removeOrder(item.id)">删除</a>
      </div>
      <div class="body">
         <div class="column goods">
            <ul>
               <li v-for="skus in item.skus" :key="skus.id">
                  <a class="image" href="javascript:">
                     <img :src="skus.image" />
                  </a>
                  <div class="info">
                     <p class="name ellipsis-2">{{ skus.name }}</p>
                     <p class="attr ellipsis">
                        <span v-for="(pro, index) in skus.properties" :key="index">
                           {{ pro.propertyMainName }}: {{ pro.propertyValueName }}
                        </span>
                     </p>
                  </div>
                  <div class="price">¥{{ skus.realPay }}</div>
                  <div class="count">x{{ skus.quantity }}</div>
               </li>
            </ul>
         </div>
         <div class="column state">
            <p>
               {{ orderStatus[item.orderState].label }}
            </p>
            <a href="javascript:" class="green" v-if="item.orderState == 3" @click="viewLogistics(item.id)">查看物流</a>
            <a href="javascript:" class="green" v-if="item.orderState == 4">评价商品</a>
            <a href="javascript:" class="green" v-if="item.orderState == 4">查看评价</a>
         </div>
         <div class="column amount">
            <p class="red">¥{{ item.totalMoney }}</p>
            <p>(含运费: ¥{{ item.postFee }})</p>
            <p>{{ item.payType == 1 ? '在线支付' : (item.payType == 2 ? '货到付款' : null) }}</p>
         </div>
         <div class="column action">
            <XtxButton type="primary" size="small" v-if="item.orderState == 1">立即付款</XtxButton>
            <XtxButton type="primary" size="small" v-if="item.orderState == 3" @click="confirmReceiptGoods(item.id)">确认收货
            </XtxButton>
            <p><router-link :to="'order/' + item.id">查看详情</router-link></p>
            <p><a href="javascript:" v-if="item.orderState == 1" @click="emit('onCancelOrder', item.id)">取消订单</a></p>
            <p><a href="javascript:" v-if="item.orderState != 1">再次购买</a></p>
            <p><a href="javascript:" v-if="item.orderState == 4">申请售后</a></p>
         </div>
      </div>
   </div>
</template>
 
<style scoped lang="less">
.order-item {
   margin-bottom: 20px;
   border: 1px solid #f5f5f5;

   .head {
      height: 50px;
      line-height: 50px;
      background: #f5f5f5;
      padding: 0 20px;
      overflow: hidden;

      span {
         margin-right: 20px;

         &.down-time {
            margin-right: 0;
            float: right;

            i {
               vertical-align: middle;
               margin-right: 3px;
            }

            b {
               vertical-align: middle;
               font-weight: normal;
            }
         }
      }

      .del {
         margin-right: 0;
         float: right;
         color: #999;
      }
   }

   .body {
      display: flex;
      align-items: stretch;

      .column {
         border-left: 1px solid #f5f5f5;
         text-align: center;
         padding: 20px;

         >p {
            padding-top: 10px;
         }

         &:first-child {
            border-left: none;
         }

         &.goods {
            flex: 1;
            padding: 0;
            align-self: center;

            ul {
               li {
                  border-bottom: 1px solid #f5f5f5;
                  padding: 10px;
                  display: flex;

                  &:last-child {
                     border-bottom: none;
                  }

                  .image {
                     width: 70px;
                     height: 70px;
                     border: 1px solid #f5f5f5;
                  }

                  .info {
                     width: 220px;
                     text-align: left;
                     padding: 0 10px;

                     p {
                        margin-bottom: 5px;

                        &.name {
                           height: 38px;
                        }

                        &.attr {
                           color: #999;
                           font-size: 12px;

                           span {
                              margin-right: 5px;
                           }
                        }
                     }
                  }

                  .price {
                     width: 100px;
                  }

                  .count {
                     width: 80px;
                  }
               }
            }
         }

         &.state {
            width: 120px;

            .green {
               color: @xtxColor;
            }
         }

         &.amount {
            width: 200px;

            .red {
               color: @priceColor;
            }
         }

         &.action {
            width: 140px;

            a {
               display: block;

               &:hover {
                  color: @xtxColor;
               }
            }
         }
      }
   }
}
</style>