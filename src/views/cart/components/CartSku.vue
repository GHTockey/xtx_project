<!-- src/views/cart/components/CartSku.vue -->
<template>
   <div class="cart-sku" ref="cartSkuEl">
      <div class="attrs" @click="toggleLayer">
         <span class="ellipsis">{{ attrsText }}</span>
         <i class="iconfont icon-angle-down"></i>
      </div>
      <div class="layer" v-show="layerVisibleL">
         <div class="loading" v-if="status === 'loading'"></div>
         <GoodsSku v-if="status === 'success'" :sku-id="skuId" :skus="skuInfo.skus" :specs="skuInfo.specs"
            @complete="selectSkuId = $event.skuId" @uncomplete="selectSkuId = undefined" />
         <XtxButton type="primary" size="mini" style="margin-left: 60px" v-if="status === 'success'" @click="changeSku">确定</XtxButton>
      </div>
   </div>
</template>

<script setup lang="ts">
import XtxButton from "@/components/XtxButton.vue";
import GoodsSku from "@/views/goods/components/GoodsSku.vue";
import type { Sku, Spec } from "@/types/Goods";
import type { Status } from "@/types/Status";
import { onClickOutside } from "@vueuse/core";
import { ref, getCurrentInstance } from "vue";
import { CartAPI } from "@/api/CartAPI";
import { useCartStore } from "@/stores/cartStore";

const props = defineProps<{ skuId: string; attrsText: string }>();
const cart_store = useCartStore();
const $ = getCurrentInstance();

const layerVisibleL = ref(false); // 控制下拉框的显示和隐藏
const cartSkuEl = ref(); // 目标元素
const selectSkuId = ref<string>(); // 用户选择的规格id


// 点击下拉框 显示或隐藏
function toggleLayer() {
   layerVisibleL.value = !layerVisibleL.value
   if (layerVisibleL.value) getSkuInfo()
};
// 在组件外部点击时隐藏
onClickOutside(cartSkuEl, () => {
   layerVisibleL.value = false
});

const skuInfo = ref<{ specs: Spec[], skus: Sku[] }>({ specs: [], skus: [] });
const status = ref<Status>('idle'); // 请求状态
async function getSkuInfo() {
   try {
      status.value = 'loading'
      skuInfo.value = (await CartAPI.getSkuInfo(props.skuId)).result
      status.value = 'success'
   } catch (error) {
      status.value = 'error'
   }
};

// getSkuInfo()

// 修改商品规格
async function changeSku() {
   if (typeof selectSkuId.value !== 'undefined') {
      try {
         await cart_store.alterSku(props.skuId, selectSkuId.value)
         $?.proxy?.$msg({ 'type': 'success', 'msg': '修改成功' })
      } catch (error) {
         $?.proxy?.$msg({ 'type': 'error', 'msg': '修改失败,' + error })
      }
   } else {
      $?.proxy?.$msg({ 'type': 'error', 'msg': '请选择规格' })
   }
};
</script>

<style scoped lang="less">
.cart-sku {
   height: 28px;
   border: 1px solid #f5f5f5;
   padding: 0 6px;
   position: relative;
   margin-top: 10px;
   display: inline-block;

   .attrs {
      line-height: 24px;
      display: flex;

      span {
         max-width: 230px;
         font-size: 14px;
         color: #999;
      }

      i {
         margin-left: 5px;
         font-size: 14px;
      }
   }

   .layer {
      position: absolute;
      left: -1px;
      top: 40px;
      z-index: 10;
      width: 400px;
      border: 1px solid @xtxColor;
      box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
      background: #fff;
      border-radius: 4px;
      font-size: 14px;
      padding: 20px;

      &::before {
         content: "";
         width: 12px;
         height: 12px;
         border-left: 1px solid @xtxColor;
         border-top: 1px solid @xtxColor;
         position: absolute;
         left: 12px;
         top: -8px;
         background: #fff;
         transform: scale(0.8, 1) rotate(45deg);
      }

      .loading {
         height: 224px;
         background: url(@/assets/images/loading.gif) no-repeat center;
      }
   }
}
</style>