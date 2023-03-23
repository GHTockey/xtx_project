import type { Brand } from "@/types/Brand";
import type { Response } from "@/types/Res";
import XtxRequestManager from "@/utils/request";

export default class HomeAPI {
    // 获取品牌数据
    static getHotBrands(limit: number) {
        return XtxRequestManager.createInstance.request<Response<Brand[]>>({
            url: '/home/brand',
            params: { limit }
        })
    }
}