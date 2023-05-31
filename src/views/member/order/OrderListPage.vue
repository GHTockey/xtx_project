<!-- 订单列表: src/views/member/order/OrderListPage.vue -->
<template>
   <div class="member-order">
      <div class="member-order">
         <XtxTabs v-model:name="name" @onTabClick="i => reqParams.orderState = <0 | 1 | 2 | 3 | 4 | 5 | 6>i">
            <XtxTabPane v-for="item in orderStatus" :label="item.label" :name="item.name">
               <div class="order-list">
                  <div class="loading" v-if="order_store.myOrderList[reqParams.orderState].status === 'loading'"></div>
                  <div class="none" v-if="order_store.myOrderList[reqParams.orderState].result.items.length === 0">
                     暂无数据
                  </div>
                  <OrderItem v-for="item in order_store.myOrderList[reqParams.orderState].result
                     .items" :key="item.id" :item="item" @onCancelOrder="onCancelOrder"
                     @removeOrderSuccess="order_store.getMyOrders(reqParams)" />
               </div>
               <XtxPagination v-model:page="reqParams.page"
                  :pages="order_store.myOrderList[reqParams.orderState].result.pages"
                  v-if="order_store.myOrderList[reqParams.orderState].result.pages > 1" />
            </XtxTabPane>
         </XtxTabs>
      </div>
   </div>
   <CancelOrder ref="cancelOrderInstance" @onCancelOrderSuccess="order_store.getMyOrders(reqParams)" />
</template>

<script setup lang="ts">
import CancelOrder from "./components/CancelOrder.vue";
import OrderItem from "./components/OrderItem.vue";
import XtxPagination from "@/components/XtxPagination.vue";
import XtxTabs from "@/components/XtxTabs";
import XtxTabPane from "@/components/XtxTabPane";
import { ref, watchEffect } from "vue";
import { orderStatus } from "@/contants";
import { useOrderStore } from "@/stores/orderStore";

const order_store = useOrderStore();
// 默认激活的订单状态名称
const name = ref("all");
// 请求订单列表的参数
const reqParams = ref<{
   page: number;
   pageSize: number;
   orderState: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}>({ page: 1, pageSize: 10, orderState: 0 });
// 取消订单弹框实例对象
const cancelOrderInstance = ref();
// 当取消订单按钮被点击时
function onCancelOrder(id: string) {
   // 显示弹框
   cancelOrderInstance.value.visible = true;
   cancelOrderInstance.value.orderId = id

}
// 当请求参数变化后重新获取订单列表
watchEffect(() => order_store.getMyOrders(reqParams.value));
</script>

<style lang="less" scoped>
.member-order {
   height: 100%;
   background: #fff;
   position: relative;
}

.order-list {
   background: #fff;
   padding: 20px;
   position: relative;

   .loading {
      height: calc(100% - 60px);
      width: 100%;
      min-height: 400px;
      position: absolute;
      left: 0;
      top: 60px;
      background: rgba(255, 255, 255, 0.9) url(@/assets/images/loading.gif) no-repeat center 18%;
   }

   .none {
      height: 400px;
      text-align: center;
      line-height: 400px;
      color: #999;
      background: rgba(255, 255, 255, 0.9);
   }
}

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