import { defineStore } from "pinia";
import { OrderAPI } from "@/api/OrderAPI";

import type { Address, EditAdressObject, OrderOfCreateResponse } from "@/types/Order";
import type { Status } from "@/types/Status";

type State = {
   // 被创建的临时订单信息
   orderOfCreate: {
      result: OrderOfCreateResponse;
      status: Status;
   };
   // 收货地址列表
   address: {
      result: Address[];
      status: Status;
   }
};
type Getters = {};
type Actions = {
   /** 创建订单Handler */
   createOrder(): Promise<void>;
   /** 添加收货地址Handler */
   addAddress(address: EditAdressObject): Promise<string>;
   /** 获取收货地址列表Handler */
   getAddress(): Promise<void>;
   /** 修改收货地址Handler */
   updateAddress(address: EditAdressObject): Promise<string>;
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
         },
         address: {
            result: [],
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
      },
      async addAddress(address) {
         // 发送添加收货地址的请求
         const response = await OrderAPI.addAddress(address);
         // 返回新添加的收货地址 id
         return response.result.id;
      },
      async getAddress() {
         this.address.status = 'loading'
         try {
            let res = await OrderAPI.getAddress()
            this.address.result = res.result
            this.address.status = 'success'
         } catch (error) {
            this.address.status = 'error'
         }
      },
      async updateAddress(address) {
         // 获取要修改的收货地址的id和其他信息
         const { id, ...rest } = address;
         // 发送请求 修改收货地址
         const response = await OrderAPI.updateAddress(id!, rest);
         // 返回被修改的收货地址的 id
         return response.result.id;
      },
   },
   getters: {},
})