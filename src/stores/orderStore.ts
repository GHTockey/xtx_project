import { defineStore } from "pinia";
import { OrderAPI } from "@/api/OrderAPI";

import type {
   Address,
   EditAdressObject,
   OrderOfCreateResponse,
   OrderResponse,
   SubmitOrderObject,
   SubmitOrderResponse,
   LogisticsResponse
} from "@/types/Order";
import type { Status } from "@/types/Status";
import type { Pagination } from "@/types/Home/Category";

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
   };
   // 订单详细信息
   orderInfo: {
      result: OrderResponse;
      status: Status;
   };
   // 我的订单列表
   myOrderList: {
      [orderStatus in 0 | 1 | 2 | 3 | 4 | 5 | 6]: {
         result: Pagination<OrderResponse>;
         status: Status;
      }
   };
   // 物流信息
   logistics: {
      result: LogisticsResponse
      status: Status
   };
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
   /** 提交订单Handler */
   submitOrder(order: SubmitOrderObject): Promise<SubmitOrderResponse>;
   /** 获取订单详细信息Handler */
   getOrderInfoById(id: string): Promise<void>;
   /** 获取我的订单列表Handler */
   getMyOrders(args: { page: number; pageSize: number; orderState: 0 | 1 | 2 | 3 | 4 | 5 | 6 }): Promise<void>;
   /** 取消订单Handler */
   cancelOrder(id: string, cancelReason: string): Promise<OrderResponse>;
   /** 删除订单Handler */
   removeOrder(ids: string[]): Promise<null>;
   /** 确认收货Handler */
   confirmReceiptGoods(id: string): Promise<OrderResponse>;
   /** 获取物流信息Handler */
   viewLogistics(id: string): Promise<void>;
   /** 再次购买Handler */
   createOrderById(id: string): Promise<void>;
};


export const useOrderStore = defineStore<string, State, Getters, Actions>('order_store', {
   state() {
      return {
         orderOfCreate: {
            result: {
               userAddresses: [], // 用户地址列表
               goods: [], // 商品列表
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
         },
         orderInfo: {
            result: {
               id: "",
               createTime: "",
               payType: 1,
               orderState: 1,
               payLatestTime: "",
               countdown: 0,
               postFee: 0,
               payMoney: 0,
               payChannel: 1,
               payState: 0,
               totalMoney: 0,
               totalNum: 0,
               deliveryTimeType: 1,
               receiverContact: "",
               receiverMobile: 0,
               provinceCode: "",
               cityCode: "",
               countyCode: "",
               receiverAddress: "",
               payTime: "",
               consignTime: "",
               endTime: "",
               closeTime: "",
               evaluationTime: "",
               arrivalEstimatedTime: "",
               skus: [],
            },
            status: "idle",
         },
         myOrderList: {
            0: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
            1: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
            2: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
            3: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
            4: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
            5: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
            6: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
         },
         logistics: {
            result: {
               count: 0,
               picture: "",
               company: {
                  name: "",
                  number: "",
                  tel: "",
               },
               list: [],
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
      async submitOrder(order) {
         let res = await OrderAPI.submitOrder(order);
         // 返回服务端的响应状态
         return res.result;
      },
      async getOrderInfoById(id) {
         this.orderInfo.status = "loading";
         try {
            const response = await OrderAPI.getOrderInfoById(id);
            this.orderInfo.result = response.result;
            this.orderInfo.status = "success";
         } catch (error) {
            this.orderInfo.status = "error";
         }
      },
      async getMyOrders(args) {
         this.myOrderList[args.orderState].status = 'loading';
         try {
            let res = await OrderAPI.getMyOrders(args);
            this.myOrderList[args.orderState].result = res.result;
            this.myOrderList[args.orderState].status = 'success';
         } catch (error) {
            this.myOrderList[args.orderState].status = 'error';
         }
      },
      async cancelOrder(id, cancelReason) {
         // 发送请求、取消订单
         const response = await OrderAPI.cancelOrder(id, cancelReason);
         // 返回响应
         return response.result;
      },
      async removeOrder(ids) {
         let res = await OrderAPI.removeOrder(ids)
         return res.result
      },
      async confirmReceiptGoods(id) {
         let res = await OrderAPI.confirmReceiptGoods(id);
         return res.result;
      },
      async viewLogistics(id) {
         this.logistics.status = 'loading'
         try {
            let res = await OrderAPI.viewLogistics(id)
            this.logistics.result = res.result
            this.logistics.status = 'success'
         } catch (error) {
            this.logistics.status = 'error'
         }
      },
      async createOrderById(id) {
         this.orderOfCreate.status = 'loading'
         try {
            let res = await OrderAPI.createOrderById(id)
            this.orderOfCreate.result = res.result
            this.orderOfCreate.status = 'success'
         } catch (error) {
            this.orderOfCreate.status = 'error'
         }
      },
   },
   getters: {},
})