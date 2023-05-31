<!-- src/views/member/order/components/CancelOrder.vue -->
<script setup lang="ts">
import XtxDialog from "@/components/XtxDialog.vue";
import XtxButton from "@/components/XtxButton.vue";
import { cancelReason } from "@/contants";
import { getCurrentInstance, ref } from "vue";
import { useOrderStore } from "@/stores/orderStore";
// 用于控制弹框的显示和隐藏
const visible = ref(false);
// 用于存储用户选择的取消原因
const selected = ref("");
// 用于存储要取消的订单 id
const orderId = ref("");
// 获取用于存储订单信息的 store 对象
const orderStore = useOrderStore();
// 获取组件实例对象
const $ = getCurrentInstance();
// 声明组件要触发的自定义事件
const emit = defineEmits<{ (e: "onCancelOrderSuccess"): void }>();

// 取消订单
async function cancelOrder() {
   // 检测用户是否选择了取消原因
   if (!selected.value) {
      // 消息提示
      return $?.proxy?.$msg({ type: "warn", msg: "请选择取消订单的原因" });
   }
   // 捕获错误
   try {
      // 发送请求 取消订单
      await orderStore.cancelOrder(orderId.value, selected.value);
      // 通知父组件重新获取订单列表
      emit("onCancelOrderSuccess");
      // 消息提示
      $?.proxy?.$msg({ type: "success", msg: "订单取消成功" });
      // 关闭弹框
      visible.value = false;
   } catch (error) {
      // 消息提示
      $?.proxy?.$msg({ type: "error", msg: "订单取消失败" });
   }
}

// 导出
defineExpose({ visible, orderId });
</script>

<template>
   <XtxDialog title="取消订单" v-model:visible="visible">
      <!-- 组件内容 -->
      <template #body>
         <div class="cancel-info">
            <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
            <p class="tip">请选择取消订单的原因（必选）：</p>
            <div class="btn">
               <a v-for="reason in cancelReason" :key="reason" :class="{ active: reason === selected }"
                  @click="selected = reason">{{ reason }}</a>
            </div>
         </div>
      </template>
      <!-- 按钮操作 -->
      <template #footer>
         <XtxButton @click="visible = false" type="gray" style="margin-right: 20px">取消</XtxButton>
         <XtxButton type="primary" @click="cancelOrder">确认</XtxButton>
      </template>
   </XtxDialog>
</template>

<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
   width: 620px;
}

.cancel-info {
   p {
      font-size: 16px;
      line-height: 35px;

      &.tip {
         color: #999;
      }
   }

   .btn {
      padding-top: 21px;
      display: flex;
      flex-wrap: wrap;

      a {
         width: 250px;
         height: 45px;
         line-height: 45px;
         text-align: center;
         background-color: #ffffff;
         border: 1px solid #e4e4e4;
         margin-right: 20px;
         margin-bottom: 20px;
         color: #666;

         &:nth-child(2n) {
            margin-right: 0;
         }

         &:hover,
         &.active {
            background-color: #e3f9f4;
            border-color: @xtxColor;
         }
      }
   }
}
</style>