import XtxRequestManager from "@/utils/request";

import type { Response } from "@/types/Res";
import type { OrderOfCreateResponse } from "@/types/Order";

export class OrderAPI {
   // 生成订单
   static createOrder() {
      return XtxRequestManager.createInstance.request<Response<OrderOfCreateResponse>>({
         url: "/member/order/pre",
      })
   };
}