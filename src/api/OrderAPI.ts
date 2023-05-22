import XtxRequestManager from "@/utils/request";

import type { Response } from "@/types/Res";
import type { Address, EditAdressObject, OrderOfCreateResponse } from "@/types/Order";

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
   }
}