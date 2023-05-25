import type { Pagination } from "@/types/Home/Category";
import type { CollectionResponse, CollectionParams } from "@/types/Member";
import type { Status } from "@/types/Status";
import { defineStore } from "pinia";
import { MemberAPI } from "@/api/MemberAPI";

type State = {
   collections: {
      // 1. 商品  2. 专题  3. 品牌
      [type in 1 | 2 | 3]: {
         result: Pagination<CollectionResponse>;
         status: Status;
      };
   }
};
type Getters = {};
type Actions = {
   /** 获取我的收藏Handler */
   getCollections(params: CollectionParams): Promise<void>;
};

export const useMemberStore = defineStore<string, State, Getters, Actions>('member_store', {
   state() {
      return {
         collections: {
            1: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
            2: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
            3: {
               result: {
                  page: 0,
                  pages: 0,
                  pageSize: 0,
                  counts: 0,
                  items: [],
               },
               status: "idle",
            },
         }
      }
   },
   getters: {},
   actions: {
      async getCollections(params: CollectionParams) {
         this.collections[params.collectType].status = 'loading';
         try {
            let res = await MemberAPI.getCollections(params);
            this.collections[params.collectType].result = res.result;
            this.collections[params.collectType].status = 'success';
         } catch (error) {
            this.collections[params.collectType].status = 'error';
         }
      }
   }
});