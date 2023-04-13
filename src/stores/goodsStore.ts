import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { GoodsAPI } from "@/api/GoodsAPI";
import type { Status } from '@/types/Status';
import type { Goods } from '@/types/Goods';


type State = {
    // 商品信息
    goodsInfo: { status: Status; result: Goods };
};

type Actions = {
    /** 根据商品id获取商品信息*/
    getGoodsInfo(id: string): Promise<void>;
};

type Getters = {};

export const useGoodsStore = defineStore<string, State, Getters, Actions>('goods_store', {
    state() {
        return {
            // 商品数据
            goodsInfo: {
                status: "idle",
                result: {
                    id: "",
                    name: "",
                    desc: "",
                    price: "",
                    picture: "",
                    discount: null,
                    orderNum: null,
                    spuCode: "",
                    oldPrice: "",
                    inventory: 0,
                    brand: [],
                    salesCount: 0,
                    commentCount: 0,
                    collectCount: 0,
                    mainVideos: [],
                    videoScale: 0,
                    mainPictures: [],
                    specs: [],
                    skus: [],
                    categories: [],
                    details: { pictures: [], properties: [] },
                    isPreSale: false,
                    isCollect: false,
                    userAddresses: null,
                    similarProducts: [],
                    hotByDay: [],
                    evaluationInfo: null,
                },
            }
        }
    },

    actions: {
        /** 根据商品 id 获取商品数据 */
        async getGoodsInfo(id) {
            this.goodsInfo.status = 'loading';
            try {
                let res = await GoodsAPI.getGoodsInfo(id);
                this.goodsInfo.result = res.result;
                this.goodsInfo.status = 'success';
            } catch (error) {
                this.goodsInfo.status = 'error';
            }
        }

    }
})