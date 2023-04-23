import type { Goods } from "@/types/Goods";
import type { Response } from "@/types/Res";
import XtxRequestManager from "@/utils/request";

export class GoodsAPI {
    // 根据商品 id 获取商品的详细信息
    static getGoodsInfo(id: string) {
        return XtxRequestManager.createInstance.request<Response<Goods>>({
            url: "/goods",
            params: { id },
        });
    }
    // 获取同类/猜你喜欢数据
    static getRelevantGoods(args?: { id?: string, limit?: number }) {
        if (typeof args !== "undefined" && typeof args.limit === "undefined") {
            args.limit = 16;
        } else {
            args = { limit: 16 };
        }
        return XtxRequestManager.createInstance.request<Response<Goods[]>>({
            url: "/goods/relevant",
            params: args,
        });
    }
    // 获取热销商品
    static getHotSaleGoods(id: string, limit: number, type: 1 | 2 | 3) {
        return XtxRequestManager.createInstance.request<Response<Goods[]>>({
            url: "/goods/hot",
            params: { id, limit, type },
        });
    }
}