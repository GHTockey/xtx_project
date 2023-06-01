<!-- src/views/member/order/components/OrderLogistics.vue -->
<script setup lang="ts">
import XtxDialog from "@/components/XtxDialog.vue";
import { ref } from 'vue';
import { useOrderStore } from "@/stores/orderStore";

// 用于控制对话框的显示和隐藏
const visible = ref(false);

const order_store = useOrderStore();

// 导出
defineExpose({ visible });
</script>

<template>
   <XtxDialog v-model:visible="visible" title="物流信息">
      <template #body>
         <div class="order-logistics-goods">
            <a class="image" href="javascript:"><img
                  src="https://yanxuan-item.nosdn.127.net/8c22451f7841aaa07f4525e6c49ad098.png" alt="" />
               <p>{{ order_store.logistics.result.count }}件商品</p>
            </a>
            <div class="info">
               <p>
                  <span>配送企业：</span>{{ order_store.logistics.result.company.name }}
               </p>
               <p>
                  <span>快递单号：</span>{{ order_store.logistics.result.company.number }}
               </p>
               <p>
                  <span>联系电话：</span>{{ order_store.logistics.result.company.tel }}
               </p>
            </div>
         </div>
         <div class="order-logistics-list">
            <div class="item" v-for="(item, index) in order_store.logistics.result.list" :key="item.id">
               <div class="line" :class="{ active: index === 0 }"></div>
               <div class="logistics">
                  <p>{{ item.text }}</p>
                  <p>{{ item.time }}</p>
               </div>
            </div>
         </div>
      </template>
   </XtxDialog>
</template>

<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
   width: 680px;
}

.order-logistics-goods {
   display: flex;
   background-color: #f5f5f5;
   height: 130px;
   align-items: center;
   padding: 0 20px;
   margin-bottom: 20px;
   font-size: 14px;

   .image {
      width: 92px;
      height: 92px;
      border: 1px solid #e4e4e4;
      position: relative;

      p {
         position: absolute;
         left: 0;
         bottom: 0;
         width: 100%;
         height: 20px;
         line-height: 20px;
         color: #fff;
         background-color: rgba(0, 0, 0, 0.5);
         text-align: center;
      }
   }

   .info {
      flex: 1;
      padding-left: 20px;
      line-height: 30px;

      span {
         color: #999;
      }
   }
}

.order-logistics-list {
   position: relative;
   padding-top: 10px;
   font-size: 14px;

   .item {
      display: flex;

      &:last-child {
         .line {
            border-color: transparent;

            &::before {
               top: 0;
            }
         }
      }

      .line {
         width: 27px;
         border-right: 2px solid #f5f5f5;
         margin-right: 25px;
         position: relative;

         &::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(7px, 0);
            border-radius: 50%;
         }

         &::before {
            width: 12px;
            height: 12px;
            background: #e4e4e4;
         }

         // 激活
         &.active {
            &::before {
               background: @xtxColor;
               z-index: 1;
            }

            &::after {
               content: "";
               position: absolute;
               top: 0;
               right: 0;
               transform: translate(11px, -4px);
               border-radius: 50%;
               width: 20px;
               height: 20px;
               background: #e3f9f4;
            }
         }
      }

      .logistics {
         flex: 1;
         padding-bottom: 35px;
         position: relative;
         top: -3px;

         p {
            &:first-child {
               color: #666;
            }

            &:last-child {
               color: #999;
               margin-top: 6px;
            }
         }
      }
   }
}
</style>