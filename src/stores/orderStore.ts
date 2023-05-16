import { defineStore } from "pinia";
import { OrderAPI } from "@/api/OrderAPI";

import type { OrderOfCreateResponse } from "@/types/Order";
import type { Status } from "@/types/Status";

type State = {
   // 被创建的临时订单信息
   orderOfCreate: {
      result: OrderOfCreateResponse;
      status: Status;
   };
};
type Getters = {};
type Actions = {
   // 创建订单
   createOrder(): Promise<void>;
};


export const useOrderStore = defineStore<string, State, Getters, Actions>('order_store', {
   state() {
      return {
         orderOfCreate: {
            result: {
               userAddresses: [], // 用户地址列表
               goods: [], // 商品列表*
               summary: { // 订单总结
                  goodsCount: 0, // 商品总数
                  totalPrice: 0, // 商品总价
                  totalPayPrice: 0, // 实际支付总价
                  postFee: 0, // 邮费
                  discountPrice: 0, // 优惠金额
               },
            },
            status: 'idle'
         }
      }
   },
   actions: {
      async createOrder() {
         this.orderOfCreate.status = 'loading'
         try {
            // 后端会根据 token 获取购物车中的商品信息从而创建订单(不用传入参数)
            let res = await OrderAPI.createOrder()
            this.orderOfCreate.result = res.result
            this.orderOfCreate.status = 'success'
         } catch (error) {
            this.orderOfCreate.status = 'error'
         }
      }
   },
   getters: {},
})