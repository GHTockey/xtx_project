import XtxRequestManager from "@/utils/request";

import type { Category } from "@/types/Home/Category";
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
    /**根据二级分类ID获取该分类下的商品的筛选条件API */
    static getSubCategoryFilters(id: string) {
        return XtxRequestManager.createInstance.request<Response<Category>>({
            url: "/category/sub/filter",
            params: { id },
        });
    }
}