import XtxRequestManager from "@/utils/request";

import type { Response } from "@/types/Res";
import type { Address, EditAdressObject, LogisticsResponse, OrderOfCreateResponse, OrderResponse, SubmitOrderObject, SubmitOrderResponse } from "@/types/Order";
import type { Pagination } from "@/types/Home/Category";

export class OrderAPI {
   /** 生成订单API */
   static createOrder() {
      return XtxRequestManager.createInstance.request<Response<OrderOfCreateResponse>>({
         url: "/member/order/pre",
      })
   };
   /** 添加收货地址API */
   static addAddress(address: EditAdressObject) {
      return XtxRequestManager.createInstance.request<Response<{ id: string }>, EditAdressObject>({
         url: "/member/address",
         method: "post",
         data: address,
      });
   };
   /** 获取收货地址列表API */
   static getAddress() {
      return XtxRequestManager.createInstance.request<Response<Address[]>>({
         url: "/member/address",
      });
   };
   /** 修改收货地址API */
   static updateAddress(id: string, address: EditAdressObject) {
      return XtxRequestManager.createInstance.request<
         Response<{ id: string }>, EditAdressObject>({
            url: `/member/address/${id}`,
            method: "put",
            data: address,
         });
   };
   /** 提交订单API */
   static submitOrder(order: SubmitOrderObject) {
      return XtxRequestManager.createInstance.request<
         Response<SubmitOrderResponse>, SubmitOrderObject>({
            url: "/member/order",
            method: "post",
            data: order,
         });
   };
   /** 获取订单详情API */
   static getOrderInfoById(id: string) {
      return XtxRequestManager.createInstance.request<Response<OrderResponse>>({
         url: `/member/order/${id}`,
      });
   };
   /** 获取我的订单列表API */
   static getMyOrders(args: {
      page: number; pageSize: number;
      //订单状态，0为全部、1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消
      orderState: 0 | 1 | 2 | 3 | 4 | 5 | 6;
   }) {
      return XtxRequestManager.createInstance.request<Response<Pagination<OrderResponse>>>({
         url: "/member/order",
         params: args,
      });
   };
   /** 取消订单API */
   static cancelOrder(id: string, cancelReason: string) {
      return XtxRequestManager.createInstance.request<Response<OrderResponse>>({
         url: `/member/order/${id}/cancel`,
         method: "put",
         data: {
            cancelReason,
         },
      });
   };
   /** 删除订单API */
   static removeOrder(ids: string[]) {
      return XtxRequestManager.createInstance.request<Response<null>>({
         url: "/member/order",
         method: "delete",
         data: { ids }
      });
   };
   /** 确认收货API */
   static confirmReceiptGoods(id: string) {
      return XtxRequestManager.createInstance.request<Response<OrderResponse>>({
         url: `/member/order/${id}/receipt`,
         method: "put",
      });
   };
   /** 查看物流信息API */
   static viewLogistics(id: string) {
      return XtxRequestManager.createInstance.request<Response<LogisticsResponse>>({
         url: `/member/order/${id}/logistics`,
      });
   };
   /** 再次购买API */
   static createOrderById(id: string) {
      return XtxRequestManager.createInstance.request<Response<OrderOfCreateResponse>>({
         url: `/member/order/repurchase/${id}`,
      });
   }
}