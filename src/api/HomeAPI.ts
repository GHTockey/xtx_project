import type { Brand, Banner } from "@/types/Home";
import type { Response } from "@/types/Res";
import XtxRequestManager from "@/utils/request";

export default class HomeAPI {
    // 获取品牌数据
    static getHotBrands(limit: number) {
        return XtxRequestManager.createInstance.request<Response<Brand[]>>({
            url: '/home/brand',
            params: { limit }
        })
    };
    // 获取轮播图数据
    static getBanners(distributionSite: 1 | 2) {
        return XtxRequestManager.createInstance.request<Response<Banner[]>>({
            url: '/home/banner',
            params: { distributionSite }
        })
    }
}