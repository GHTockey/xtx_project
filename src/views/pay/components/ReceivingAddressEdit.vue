<!-- src/views/pay/components/ReceivingAddressEdit.vue -->
<script setup lang="ts">
import { ref, getCurrentInstance, reactive } from 'vue';
import XtxDialog from "@/components/XtxDialog.vue";
import XtxCity from "@/components/XtxCity.vue";
import XtxButton from "@/components/XtxButton.vue";

import { useOrderStore } from '@/stores/orderStore';

// 用于控制弹框的显示和隐藏
const visible = ref(false);
// 向外暴露用于控制弹框显示和隐藏的响应式状态
defineExpose({ visible });

import type { EditAdressObject } from "@/types/Order";
// 表单初始值
const initalValues: EditAdressObject = {
   // 收货人姓名
   receiver: "",
   // 联系方式
   contact: "",
   // 所在省份编码
   provinceCode: "",
   // 所在城市编码
   cityCode: "",
   // 所在区/县编码
   countyCode: "",
   // 详细地址
   address: "",
   // 邮政编码
   postalCode: "",
   // 地址标签,以英文逗号分割
   addressTags: "",
   // 是否为默认，0为是，1为否
   isDefault: false,
};
const formValues = ref<EditAdressObject>({ ...initalValues });

const order_store = useOrderStore();
const $ = getCurrentInstance();
const emits = defineEmits<{ (e: 'onAddressEditSuccess', id: string): void }>();

// 对当前的操作进行标识 (添加或修改)
const flag = reactive({ isAlter: false, text: "添加" });
// 添加收货地址
async function onAddressEdit() {
   // 将布尔值重置为接口需要的0和1
   formValues.value.isDefault = formValues.value.isDefault ? 0 : 1;
   // console.log(formValues.value);
   try {
      // 服务器端返回的收货地址 id
      //  let id = await order_store.updateAddress(formValues.value);
      let id = await order_store.addAddress(formValues.value);
      // 更新收货地址列表
      await order_store.getAddress();
      // 消息提示
      $?.proxy?.$msg({
         type: "success",
         msg: `收货地址${flag.text}成功`,
      });
      // 通知父组件收货地址添加或修改成功
      emits("onAddressEditSuccess", id);
   } catch (error) {
      // 消息提示
      $?.proxy?.$msg({ type: "success", msg: `收货地址${flag.text}失败` });
   }
   // 关闭弹框
   visible.value = false;
}
</script>

<template>
   <XtxDialog v-model:visible="visible" title="添加收货地址">
      <template #body>
         <div class="address-edit">
            <div class="xtx-form">
               <div class="xtx-form-item">
                  <div class="label">收货人：</div>
                  <div class="field">
                     <input class="input" v-model="formValues.receiver" placeholder="请输入收货人" />
                  </div>
               </div>
               <div class="xtx-form-item">
                  <div class="label">手机号：</div>
                  <div class="field">
                     <input class="input" v-model="formValues.contact" placeholder="请输入手机号" />
                  </div>
               </div>
               <div class="xtx-form-item">
                  <div class="label">地区：</div>
                  <div class="field">
                     <XtxCity placeholder="请选择所在地区" v-model:full-location="(formValues.fullLocation as string)"
                        @on-change="
                           formValues.provinceCode = $event.provinceCode!,
                           formValues.cityCode = $event.cityCode!,
                           formValues.countyCode = $event.countyCode!
                           "/>
                  </div>
               </div>
               <div class="xtx-form-item">
                  <div class="label">详细地址：</div>
                  <div class="field">
                     <input class="input" v-model="formValues.address" placeholder="请输入详细地址" />
                  </div>
               </div>
               <div class="xtx-form-item">
                  <div class="label">邮政编码：</div>
                  <div class="field">
                     <input class="input" v-model="formValues.postalCode" placeholder="请输入邮政编码" />
                  </div>
               </div>
               <div class="xtx-form-item">
                  <div class="label">地址标签：</div>
                  <div class="field">
                     <input class="input" v-model="formValues.addressTags" placeholder="请输入地址标签，逗号分隔" />
                  </div>
               </div>
               <div class="xtx-form-item">
                  <div class="label">是否设置为默认地址：</div>
                  <div class="field">
                     <input type="checkbox" class="checkbox" v-model="(formValues.isDefault as boolean)" />
                  </div>
               </div>
            </div>
         </div>
      </template>
      <template #footer>
         <XtxButton @click="visible = false" type="gray" style="margin-right: 20px">
            取消
         </XtxButton>
         <XtxButton type="primary" @click="onAddressEdit">确认</XtxButton>
      </template>
   </XtxDialog>
</template>

<style scoped lang="less">
.xtx-dialog {
   :deep(.wrapper) {
      width: 780px;

      .body {
         font-size: 14px;
      }
   }

   .xtx-city {
      width: 320px;

      :deep(.select) {
         height: 50px;
         line-height: 48px;
         display: flex;
         padding: 0 10px;
         justify-content: space-between;

         .placeholder {
            color: #ccc;
         }

         i {
            color: #ccc;
            font-size: 18px;
         }

         .value {
            font-size: 14px;
         }
      }

      :deep(.option) {
         top: 49px;
      }
   }
}

.xtx-form {
   padding: 0;

   .xtx-form-item {
      width: auto;

      &:last-child {
         padding-bottom: 0;
      }
   }

   input {
      outline: none;

      &::placeholder {
         color: #ccc;
      }
   }
}
</style>