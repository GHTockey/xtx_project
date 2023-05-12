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
   };
   /** 删除购物车中的商品API */
   static removeGoodsOfCart(args: { ids?: string[]; clearAll?: boolean; clearInvalid?: boolean }) {
      return XtxRequestManager.createInstance.request<Response<boolean>>({
         url: "/member/cart",
         method: "delete",
         data: args,
      });
   };
   /** 修改购物车商品信息API */
   static alterCartGoods(args: { id: string; selected?: boolean; count?: number; }) {
      return XtxRequestManager.createInstance.request<Response<Cart>>({
         url: `/member/cart/${args.id}`,
         method: "put",
         data: args,
      });
   };
   /** 全选、取消全选API */
   static selecteAndDeselect(selected: boolean) {
      return XtxRequestManager.createInstance.request<Response<null>>({
         url: "/member/cart/selected",
         method: "put",
         data: { selected },
      });
   }
}