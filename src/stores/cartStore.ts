import { defineStore } from "pinia";
import type { Cart } from "@/types/Cart";
import { CartAPI } from "@/api/CartAPI";
import type { Status } from "@/types/Status";

type State = {
   carts: { result: Cart[], status: Status };
};
type Getter = {
   /** 购物车商品总数 */
   effectiveCartCount(): number;
   /** 购物车商品总价 */
   effectiveCartAmount(): number;
};
type Actions = {
   /** 将商品加入购物车Handler */
   addProductToCart(sid: string, count: number): Promise<Cart>;
   /** 获取购物车列表Handler */
   getCarts(): Promise<void>;
   /** 删除购物车商品Handler */
   removeGoodsOfCart(args: {
      ids?: string[]; // 要删除的商品id
      clearAll?: boolean; // 是否清空
      clearInvalid?: boolean; // 是否清空失效商品
   }): Promise<void>;
};

export const useCartStore = defineStore<'cart_store', State, Getter, Actions>('cart_store', {
   state() {
      return {
         carts: { result: [], status: 'idle' }
      }
   },
   getters: {
      effectiveCartAmount() {
         // 保留两位小数
         return parseFloat(this.carts.result.reduce((totalPrice, item) => (totalPrice += parseFloat(item.nowPrice)), 0).toFixed(2))
      },
      effectiveCartCount() {
         return this.carts.result.reduce((totalCount, item) => (totalCount += item.count), 0)
      }
   },
   actions: {
      async addProductToCart(sid, count) {
         let res = await CartAPI.addProductToCart(sid, count)
         try {
            this.getCarts()
         } catch (error) { }
         return res.result // 返回添加的商品
      },
      async getCarts() {
         this.carts.status = 'loading';
         try {
            let res = await CartAPI.getCarts();
            this.carts.result = res.result;
            this.carts.status = 'success';
         } catch (error) {
            this.carts.status = 'error';
         }
      },
      async removeGoodsOfCart(args) {
         let res = await CartAPI.removeGoodsOfCart(args);
         // console.log(res,'res');
         // 如果删除成功，重新获取购物车列表
         if (res.result) {
            this.getCarts()
         } else {
            throw new Error('删除购物车商品失败')
         }
      }
   },
})