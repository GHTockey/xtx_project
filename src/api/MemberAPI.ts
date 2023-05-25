import XtxRequestManager from "@/utils/request";

import type { Response } from "@/types/Res";
import type { Pagination } from "@/types/Home/Category";
import type { CollectionParams, CollectionResponse } from "@/types/Member";

export class MemberAPI {
   /** 获取我的收藏列表API */
   static getCollections(params: CollectionParams) {
      return XtxRequestManager.createInstance.request<
         Response<
            Pagination<CollectionResponse
            >>,
         CollectionParams>({
            url: "/member/collect",
            data: params,
         });
   }
}