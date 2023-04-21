import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { GoodsAPI } from "@/api/GoodsAPI";
import type { Status } from '@/types/Status';
import type { Goods } from '@/types/Goods';
import { chunk } from "lodash";

// 声明组件向外部传递的状态的类型规范
export interface Data {
    price: string;
    oldPrice: string;
    inventory: number;
    skuId: string;
};

type State = {
    // 商品信息
    goodsInfo: { status: Status; result: Goods };
    // 同类商品和猜你喜欢
    // [{},{},{},{},{},{},{},{}]
    // [[{},{},{},{}], [{},{},{},{}]]
    relevantGoods: {
        result: Goods[][];
        status: Status;
    };
};

type Actions = {
    /** 根据商品id获取商品信息*/
    getGoodsInfo(id: string): Promise<void>;
    /** 更新商品信息(规格更新) */
    updateGoods(data: Data): void;
    /** 获取同类商品(猜你喜欢) */
    getRelevantGoods(args?: { id?: string; limit?: number }): Promise<void>;
};

type Getters = {
    // 减少层级
    mainPictures(): string[]
    // 获取商品基本信息
    baseInfo(): Pick<Goods, "name" | "desc" | "price" | "oldPrice">;
};

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
            },
            relevantGoods: {
                status: 'idle',
                result: []
            }
        }
    },

    actions: {
        async getGoodsInfo(id) {
            this.goodsInfo.status = 'loading';
            try {
                let res = await GoodsAPI.getGoodsInfo(id);
                this.goodsInfo.result = res.result;
                this.goodsInfo.status = 'success';
            } catch (error) {
                this.goodsInfo.status = 'error';
            }
        },
        updateGoods(data) {
            this.goodsInfo.result.price = data.price;
            this.goodsInfo.result.oldPrice = data.oldPrice;
            this.goodsInfo.result.inventory = data.inventory;
        },
        async getRelevantGoods(args) {
            this.relevantGoods.status = 'loading';
            try {
                let res = await GoodsAPI.getRelevantGoods(args);
                this.relevantGoods.result = chunk(res.result, 4);
                this.relevantGoods.status = 'success';
            } catch (error) {
                this.relevantGoods.status = 'error';
            }
        },

    },

    getters: {
        mainPictures() {
            return this.goodsInfo.result.mainPictures
        },
        baseInfo() {
            const { name, desc, price, oldPrice } = this.goodsInfo.result;
            return { name, desc, price, oldPrice };
        },
    }
})