import type { Brand, Banner, HotRecommends } from "@/types/Home";
import type { Goods } from "@/types/Home/Category";
import type { Response } from "@/types/Res";
import XtxRequestManager from "@/utils/request";

export default class HomeAPI {
    /** 获取品牌数据API*/
    static getHotBrands(limit: number) {
        return XtxRequestManager.createInstance.request<Response<Brand[]>>({
            url: '/home/brand',
            params: { limit }
        })
    };
    /**获取轮播图数据API */
    static getBanners(distributionSite: 1 | 2) {
        return XtxRequestManager.createInstance.request<Response<Banner[]>>({
            url: '/home/banner',
            params: { distributionSite }
        })
    };
    /**获取新鲜好物数据API */
    static getFresh(limit?: number) {
        return XtxRequestManager.createInstance.request<Response<Goods[]>>({
            url: '/home/new',
            params: { limit }
        })
    };
    /**获取人气推荐API */
    static getHotRecommends() {
        return XtxRequestManager.createInstance.request<Response<HotRecommends[]>>({
            url: '/home/hot'
        })
    }
}