import { defineStore } from "pinia";
import type { Cart } from "@/types/Cart";
import { CartAPI } from "@/api/CartAPI";

type State = {};
type Getter = {};
type Actions = {
   /** 将商品加入购物车Handler */
   addProductToCart(sid: string, count: number): Promise<Cart>;
};

export const useCartStore = defineStore<'cart', State, Getter, Actions>('cart', {
   state() {
      return {

      }
   },
   getters: {},
   actions: {
      async addProductToCart(sid, count) {
         let res = await CartAPI.addProductToCart(sid, count)
         return res.result
      },
   },
})