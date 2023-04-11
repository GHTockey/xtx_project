import XtxRequestManager from "@/utils/request";

import type { Category, Goods, GoodsRequestParams, Pagination } from "@/types/Home/Category";
import type { Response } from "@/types/Res";

export default class CategoryAPI {
    static getCategories() {
        return XtxRequestManager.createInstance.request<Response<Category[]>>({
            url: '/home/category/head'
        })
    };
    static getTopCategoryById(id: string) {
        return XtxRequestManager.createInstance.request<Response<Category>>({
            url: '/category',
            params: { id }
        })
    };
    /** 根据二级分类ID获取该分类下的商品的筛选条件API */
    static getSubCategoryFilters(id: string) {
        return XtxRequestManager.createInstance.request<Response<Category>>({
            url: "/category/sub/filter",
            params: { id },
        });
    };
    /** 获取商品列表的 API */
    static getCategoryGoods(categoryId: GoodsRequestParams["categoryId"], reqParams?: Partial<Omit<GoodsRequestParams, "categoryId">>) {
        return XtxRequestManager.createInstance.request<Response<Pagination<Goods>>, Partial<GoodsRequestParams>>({
            url: "/category/goods",
            method: "post",
            data: { categoryId, ...reqParams },
        });
    }

}