import type { Cart } from "@/types/Cart";
import type { Response } from "@/types/Res";
import XtxRequestManager from "@/utils/request";

export class CartAPI {
   /** 将商品加入购物车API */
   static addProductToCart(skuId: string, count: number) {
      return XtxRequestManager.createInstance.request<Response<Cart>>({
         url: "/member/cart",
         method: "post",
         data: { skuId, count },
      });
   };
   /** 获取购物车商品列表API */
   static getCarts() {
      return XtxRequestManager.createInstance.request<Response<Cart[]>>({
         url: "/member/cart",
      });
   }
}