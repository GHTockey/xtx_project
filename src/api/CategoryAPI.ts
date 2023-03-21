import XtxRequestManager from "@/utils/request";

import type { Category } from "@/types/Category";
import type { Response } from "@/types/Res";

export default class CategoryAPI {
    static getCategories() {
        return XtxRequestManager.createInstance().request<Response<Category[]>>({
            url: '/home/category/head'
        })
    }
}