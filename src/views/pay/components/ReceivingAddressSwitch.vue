<!-- 切换收货地址组件: src/views/pay/components/ReceivingAddressSwitch.vue -->
<script setup lang="ts">
import XtxDialog from "@/components/XtxDialog.vue";
import XtxButton from "@/components/XtxButton.vue";
import { useOrderStore } from "@/stores/orderStore.js";
import { ref } from "vue";
import type { Address } from "@/types/Order";

// 获取订单对象
const orderStore = useOrderStore();
// 控制对话框的显示和隐藏
const visible = ref(false);
// 暴露用于控制对话框显示和隐藏的响应式状态
defineExpose({ visible });
// 用于通知父组件切换收货地址
const emits = defineEmits<{
   (e: 'addressSwitched', address: Address): void
}>();
// 接收已渲染地址的 id
defineProps<{ finalAddressId?: string | undefined }>();
</script>

<template>
   <XtxDialog title="更换收货地址" v-model:visible="visible">
      <template #body>
         <div class="address-switch">
            <div class="text item" v-for="item in orderStore.address.result" :key="item.id"
               @click="$emit('addressSwitched', item); visible = false;" :class="{ active: item.id === finalAddressId }">
               <ul>
                  <li><span>收货人：</span>{{ item.receiver }}</li>
                  <li><span>联系方式：</span>{{ item.contact }}</li>
                  <li>
                     <span>收货地址：</span>{{ item.fullLocation + item.address }}
                  </li>
               </ul>
            </div>
         </div>
      </template>
      <template #footer>
         <XtxButton @click="visible = false" type="primary" style="margin-right: 20px">取消</XtxButton>
      </template>
   </XtxDialog>
</template>

<style scoped lang="less">
.address-switch {
   height: 478px;
   overflow-y: auto;
}

.xtx-dialog {
   .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;

      &.item {
         border: 1px solid #f5f5f5;
         margin-bottom: 10px;
         cursor: pointer;

         &.active,
         &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
         }

         >ul {
            padding: 10px;
            font-size: 14px;
            line-height: 30px;
         }
      }
   }
}
</style>