<template>
   <div class="cart-page">
      <div class="container">
         <XtxBread>
            <XtxBreadItem path="/">首页</XtxBreadItem>
            <XtxBreadItem>购物车</XtxBreadItem>
         </XtxBread>
         <div class="cart">
            <table>
               <thead>
                  <tr>
                     <th>
                        <XtxCheckbox :model-value="cart_store.isAllSelected"
                           @update:model-value="cart_store.selecteAndDeselect(!cart_store.isAllSelected)">全选</XtxCheckbox>
                     </th>
                     <th>商品信息</th>
                     <th>单价</th>
                     <th>数量</th>
                     <th>小计</th>
                     <th>操作</th>
                  </tr>
               </thead>
               <!-- 有效商品 -->
               <tbody>
                  <tr v-for="item in cart_store.effectiveCartList" :key="item.id">
                     <td>
                        <XtxCheckbox :model-value="item.selected" @update:model-value="cart_store.alterCartGoods({
                           id: item.skuId, selected: !item.selected, count: item.count
                        })" />
                     </td>
                     <td>
                        <div class="goods">
                           <RouterLink :to="`/goods/${item.id}`"><img :src="item.picture" />
                           </RouterLink>
                           <div>
                              <p class="name ellipsis">{{ item.name }}</p>
                              <!-- 购物车选择规格组件 -->
                              <CartSku :sku-id="item.skuId" :attrs-text="item.attrsText" />
                           </div>
                        </div>
                     </td>
                     <td class="tc">
                        <p>&yen;{{ item.nowPrice }}</p>
                        <p>比加入时降价 <span class="red">&yen;{{ +item.price - +item.nowPrice }}</span></p>
                     </td>
                     <td class="tc">
                        <!-- {{ item.count }} -->
                        <XtxNumberBox :max="item.stock" :count="item.count" label="" @update:count="cart_store.alterCartGoods({
                           id: item.skuId, count: $event
                        })" />
                     </td>
                     <td class="tc">
                        <p class="f16 red">&yen;{{ parseFloat(String(+item.nowPrice * item.count)).toFixed(2) }}</p>
                     </td>
                     <td class="tc">
                        <p><a href="javascript:">移入收藏夹</a></p>
                        <p><a class="green" href="javascript:" @click="deleteGoods(item.skuId)">删除</a></p>
                        <p><a href="javascript:">找相似</a></p>
                     </td>
                  </tr>
               </tbody>
               <!-- 无效商品 -->
               <tbody v-if="cart_store.invalidCartList.length >= 1">
                  <tr>
                     <td colspan="6">
                        <h3 class="tit">失效商品</h3>
                     </td>
                  </tr>
                  <tr v-for="item in cart_store.invalidCartList" :key="item.id">
                     <td></td>
                     <td>
                        <div class="goods">
                           <RouterLink to="/"><img :src="item.picture" />
                           </RouterLink>
                           <div>
                              <p class="name ellipsis">{{ item.name }}</p>
                              <p class="attr">{{ item.attrsText }}</p>
                           </div>
                        </div>
                     </td>
                     <td class="tc">
                        <p>&yen;200.00</p>
                     </td>
                     <td class="tc">1</td>
                     <td class="tc">
                        <p>&yen;200.00</p>
                     </td>
                     <td class="tc">
                        <p><a class="green" href="javascript:">删除</a></p>
                        <p><a href="javascript:">找相似</a></p>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <!-- 操作栏 -->
         <div class="action">
            <div class="batch">
               <XtxCheckbox :model-value="cart_store.isAllSelected"
                  @update:model-value="cart_store.selecteAndDeselect(!cart_store.isAllSelected)">全选</XtxCheckbox>
               <a href="javascript:" @click="batchDelete">删除商品</a>
               <a href="javascript:">移入收藏夹</a>
               <a href="javascript:">清空失效商品</a>
            </div>
            <div class="total">
               共 {{ cart_store.effectiveCartCount }} 件商品，
               已选择 {{ cart_store.userSelectGoodsCount }} 件，商品合计：
               <span class="red">¥{{ cart_store.userSelectGoodsAmount }}</span>
               <XtxButton type="primary">
                  <XtxButton to="/checkout/order" type="primary">下单结算</XtxButton>
               </XtxButton>
            </div>
         </div>
         <!-- 猜你喜欢 -->
         <GoodsRelevant />
      </div>
   </div>
</template>

<script setup lang="ts">
import XtxBread from "@/components/XtxBread.vue";
import XtxBreadItem from "@/components/XtxBreadItem.vue";
import XtxCheckbox from "@/components/XtxCheckbox.vue";
import XtxButton from "@/components/XtxButton.vue";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant.vue";
import XtxNumberBox from "@/components/XtxNumberBox.vue";
import CartSku from "./components/CartSku.vue";
import { useCartStore } from "@/stores/cartStore";
import { getCurrentInstance } from "vue";

const cart_store = useCartStore();
const $ = getCurrentInstance();

// 删除商品
async function deleteGoods(skuId: string) {
   try {
      await $?.proxy?.$confirm({ content: '确定删除吗?' })
      try {
         await cart_store.removeGoodsOfCart({ ids: [skuId] })
         $?.proxy?.$msg({ 'msg': '删除成功', 'type': 'success' })
      } catch (error) {
         $?.proxy?.$msg({ 'msg': '删除失败,' + error, 'type': 'error' })
      }
   } catch (error) {
      $?.proxy?.$msg({ 'msg': '取消删除', 'type': 'warn' })
   }
};
// 批量删除
async function batchDelete() {
   try {
      let ids = cart_store.carts.result.map(item => {
         if (item.selected) return item.skuId
      }).filter(item => item != undefined)
      if (ids.length == 0) {
         $?.proxy?.$msg({ 'msg': '请选择要删除的商品', 'type': 'warn' })
         return
      }
      await $?.proxy?.$confirm({ content: `确定删除这 ${ids.length} 件吗?` })
      await cart_store.removeGoodsOfCart({ ids: <string[]>ids })
   } catch (error) {

   }
};
</script>
 
<style scoped lang="less">
.tc {
   text-align: center;

   .xtx-number-box {
      margin: 0 auto;
      width: 120px;
   }
}

.red {
   color: @priceColor;
}

.green {
   color: @xtxColor;
}

.f16 {
   font-size: 16px;
}

.goods {
   display: flex;
   align-items: center;

   img {
      width: 100px;
      height: 100px;
   }

   >div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
         font-size: 14px;
         color: #999;
      }
   }
}

.action {
   display: flex;
   background: #fff;
   margin-top: 20px;
   height: 80px;
   align-items: center;
   font-size: 16px;
   justify-content: space-between;
   padding: 0 30px;

   .xtx-checkbox {
      color: #999;
   }

   .batch {
      a {
         margin-left: 20px;
      }
   }

   .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
   }
}

.tit {
   color: #666;
   font-size: 16px;
   font-weight: normal;
   line-height: 50px;
}

.cart-page {
   .cart {
      background: #fff;
      color: #666;

      table {
         border-spacing: 0;
         border-collapse: collapse;
         line-height: 24px;
         width: 100%;

         th,
         td {
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;

            &:first-child {
               text-align: left;
               padding-left: 30px;
               color: #999;
            }
         }

         th {
            font-size: 16px;
            font-weight: normal;
            line-height: 50px;
         }
      }
   }
}
</style>