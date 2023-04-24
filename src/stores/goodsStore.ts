import { defineStore } from 'pinia';
import { GoodsAPI } from "@/api/GoodsAPI";
import type { Status } from '@/types/Status';
import type { Evaluate, EvaluateInfo, EvaluateRequestParams, Goods, GoodsDetailInfo } from '@/types/Goods';
import { chunk } from "lodash";
import type { Pagination } from '@/types/Home/Category';

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
    // [{},{},{},{},{},{},{},{}] ==> [[{},{},{},{}], [{},{},{},{}]]
    relevantGoods: {
        result: Goods[][];
        status: Status;
    };
    // 榜单
    hotSaleGoods: {
        status: Status;
        result: { // 榜单数据
            1: Goods[]; // 24小时榜
            2: Goods[]; // 周榜
            3: Goods[]; // 总榜
        };
    };
    // 商品评价信息
    evaluateInfo: {
        result: EvaluateInfo;
        status: Status;
    };
    // 商品评价列表
    evaluateList: {
        status: Status;
        result: Pagination<Evaluate>;
    };
};

type Actions = {
    /** 根据商品id获取商品信息 */
    getGoodsInfo(id: string): Promise<void>;
    /** 更新商品信息(规格更新) */
    updateGoods(data: Data): void;
    /** 获取同类商品(猜你喜欢) */
    getRelevantGoods(args?: { id?: string; limit?: number }): Promise<void>;
    /** 获取热销商品榜单处理程序 */
    getHotSaleGoodsHandler(id: string, limit: number, type: 1 | 2 | 3,): Promise<void>;
    /** 获取评价头部信息 */
    getEvaluateInfoHandler(id: string): Promise<void>;
    /** 获取评价列表 */
    getEvaluateList(id: string, reqParams: EvaluateRequestParams): Promise<void>;
};

type Getters = {
    // 减少层级
    mainPictures(): string[]
    // 获取商品基本信息
    baseInfo(): Pick<Goods, "name" | "desc" | "price" | "oldPrice">;
    // 减少层级
    goodsProperties(): GoodsDetailInfo
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
            },
            hotSaleGoods: {
                status: 'idle',
                result: { 1: [], 2: [], 3: [] }
            },
            evaluateInfo: {
                status: 'idle',
                result: {
                    salesCount: 0,
                    praisePercent: "",
                    evaluateCount: 0,
                    hasPictureCount: 0,
                    tags: [],
                },
            },
            evaluateList: {
                status: 'idle',
                result: {
                    page: 0,
                    pages: 0,
                    pageSize: 0,
                    counts: 0,
                    items: [],
                },
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
        async getHotSaleGoodsHandler(id, limit, type) {
            this.hotSaleGoods.status = 'loading';
            try {
                let res = await GoodsAPI.getHotSaleGoods(id, limit, type);
                this.hotSaleGoods.result[type] = res.result;
                this.hotSaleGoods.status = 'success';
            } catch (error) {
                this.hotSaleGoods.status = 'error';
            }
        },
        async getEvaluateInfoHandler(id) {
            this.evaluateInfo.status = 'loading';
            try {
                let res = await GoodsAPI.getEvaluateInfo(id);
                this.evaluateInfo.result = res.result;
                this.evaluateInfo.status = 'success';
            } catch (error) {
                this.evaluateInfo.status = 'error';
            }
        },
        async getEvaluateList(id, reqParams) {
            this.evaluateList.status = 'loading';
            try {
                let res = await GoodsAPI.getEvaluateList(id, reqParams);
                this.evaluateList.result = res.result;
                this.evaluateList.status = 'success';
            } catch (error) {
                this.evaluateList.status = 'error';
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
        goodsProperties() {
            return {
                pictures: this.goodsInfo.result.details.pictures, // 商品详情图片集合
                properties: this.goodsInfo.result.details.properties, // 商品属性集合
            }
        }
    }
})