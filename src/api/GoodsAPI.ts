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
}