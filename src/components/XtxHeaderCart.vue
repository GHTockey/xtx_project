<!-- src/components/XtxHeaderCart.vue -->
<template>
   <div class="cart" v-if="!(route.path === '/cart')">
      <RouterLink to="/cart" class="curr">
         <i class="iconfont icon-cart"></i><em>{{ cart_store.effectiveCartCount }}</em>
      </RouterLink>
      <div class="layer">
         <div class="list">
            <div class="item" v-for="item, i in cart_store.carts.result" :key="item.id">
               <RouterLink to="">
                  <img :src="item.picture" />
                  <div class="center">
                     <p class="name ellipsis-2">{{ item.name }}</p>
                     <p class="attr ellipsis">{{ item.attrsText }}</p>
                  </div>
                  <div class="right">
                     <p class="price">&yen;{{ item.nowPrice }}</p>
                     <p class="count">x{{ item.count }}</p>
                  </div>
               </RouterLink>
               <!-- 删除按钮 -->
               <i class="iconfont icon-close-new" @click="deleteCartGoods(item.skuId)"></i>
            </div>
         </div>
         <div class="foot">
            <div class="total">
               <p>共 {{ cart_store.effectiveCartCount }} 件商品</p>
               <p>&yen;{{ cart_store.userSelectGoodsAmount }}</p>
            </div>
            <XtxButton type="plain">
               <RouterLink to="/cart">去购物车结算</RouterLink>
            </XtxButton>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import XtxButton from "./XtxButton.vue";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";
import { getCurrentInstance } from "vue";

const route = useRoute();
const cart_store = useCartStore();
const user_store = useUserStore();
const $ = getCurrentInstance();

// 如果是首页
if (route.path === '/') {
   // 且用户登录了
   if (user_store.profile.status === 'success') cart_store.getCarts(); // 获取购物车数据
} else {
   cart_store.getCarts(); // 不是首页, 获取购物车数据
};

// 删除购物车商品
async function deleteCartGoods(skuId: string) {
   try {
      // 如果点了取消则会抛出异常提示取消删除
      await $?.proxy?.$confirm({ 'content': '确定要删除该商品吗?' })
      try {
         await cart_store.removeGoodsOfCart({ ids: [skuId], clearAll: false, clearInvalid: false })
         $?.proxy?.$msg({ type: 'success', msg: '删除成功' }) // 提示删除成功
      } catch (error) {
         console.log(error);
         $?.proxy?.$msg({ type: 'error', msg: '删除失败' }) // 提示删除失败
      }
   } catch (error) {
      $?.proxy?.$msg({ type: "warn", msg: '取消删除' })
   }
};
</script>
 
<style scoped lang="less">
.cart {
   width: 50px;
   position: relative;
   z-index: 600;

   .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
         font-size: 22px;
      }

      em {
         font-style: normal;
         position: absolute;
         right: 0;
         top: 0;
         padding: 1px 6px;
         line-height: 1;
         background: @helpColor;
         color: #fff;
         font-size: 12px;
         border-radius: 10px;
         font-family: Arial, serif;
      }
   }

   &:hover {
      .layer {
         opacity: 1;
         transform: none;
      }
   }

   .layer {
      opacity: 0;
      transition: all 0.4s 0.2s;
      transform: translateY(-200px) scale(1, 0);
      width: 400px;
      height: 400px;
      position: absolute;
      top: 50px;
      right: 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      background: #fff;
      border-radius: 4px;
      padding-top: 10px;

      &::before {
         content: "";
         position: absolute;
         right: 14px;
         top: -10px;
         width: 20px;
         height: 20px;
         background: #fff;
         transform: scale(0.6, 1) rotate(45deg);
         box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
      }

      .foot {
         position: absolute;
         left: 0;
         bottom: 0;
         height: 70px;
         width: 100%;
         padding: 10px;
         display: flex;
         justify-content: space-between;
         background: #f8f8f8;
         align-items: center;

         .total {
            padding-left: 10px;
            color: #999;

            p {
               &:last-child {
                  font-size: 18px;
                  color: @priceColor;
               }
            }
         }
      }
   }

   .list {
      height: 310px;
      overflow: auto;
      padding: 0 10px;

      &::-webkit-scrollbar {
         width: 10px;
         height: 10px;
      }

      &::-webkit-scrollbar-track {
         background: #f8f8f8;
         border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
         background: #eee;
         border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
         background: #ccc;
      }

      .item {
         border-bottom: 1px solid #f5f5f5;
         padding: 10px 0;
         position: relative;

         i {
            position: absolute;
            bottom: 38px;
            right: 0;
            opacity: 0;
            color: #666;
            transition: all 0.5s;
         }

         &:hover {
            i {
               opacity: 1;
               cursor: pointer;
            }
         }

         a {
            display: flex;
            align-items: center;

            img {
               height: 80px;
               width: 80px;
            }

            .center {
               padding: 0 10px;
               width: 200px;

               .name {
                  font-size: 16px;
               }

               .attr {
                  color: #999;
                  padding-top: 5px;
               }
            }

            .right {
               width: 100px;
               padding-right: 20px;
               text-align: center;

               .price {
                  font-size: 16px;
                  color: @priceColor;
               }

               .count {
                  color: #999;
                  margin-top: 5px;
                  font-size: 16px;
               }
            }
         }
      }
   }
}
</style>