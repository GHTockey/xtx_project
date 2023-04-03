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
    }
}