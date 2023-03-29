import { defineStore } from "pinia";
import HomeAPI from "@/api/HomeAPI";

import type { Brand, Banner, HotRecommends, Special } from "@/types/Home";
import type { Status } from "@/types/Status";
import type { Goods, Category } from "@/types/Home/Category";

interface State {
    // 左侧品牌
    brands: {
        result: Brand[]
        status: Status
    },
    // 轮播图
    banner: {
        result: Banner[]
        status: Status
    },
    // 新鲜好物
    freshGoods: {
        result: Goods[]
        status: Status
    },
    // 人气推荐
    hotRecommends: {
        result: HotRecommends[]
        status: Status
    },
    // 产品区块
    goods: {
        result: Category[]
        status: Status
    },
    // 最新专题
    special: {
        result: Special[]
        status: Status
    }
}
type Getters = {}

interface Actions {
    /**获取品牌数据 */
    getBrands: (limit: number) => Promise<void>
    /**获取轮播图数据 */
    getBanners: (distributionSite: 1 | 2) => Promise<void>
    /**获取新鲜好物数据 */
    getFreshGoods: (limit?: number) => Promise<void>
    /**获取人气推荐数据 */
    getHotRecommends: () => Promise<void>
    /**获取产品区块数据程序 */
    getGoodsHandler: () => Promise<void>
    /**获取最新专题数据程序 */
    getSpecialHandler: () => Promise<void>
}

export default defineStore<"home_store", State, Getters, Actions>('home_store', {
    state() {
        return {
            brands: { result: [], status: 'idle' },
            banner: { result: [], status: 'idle' },
            freshGoods: { result: [], status: 'idle' },
            hotRecommends: { result: [], status: 'idle' },
            goods: { result: [], status: 'idle' },
            special: { result: [], status: 'idle' }
        }
    },
    actions: {
        async getBrands(limit = 10) {
            this.brands.status = 'loading';
            try {
                let res = await HomeAPI.getHotBrands(limit);
                this.brands.result = res.result;
                this.brands.status = 'success';
            } catch (error) {
                this.brands.status = 'error';
            }
        },
        async getBanners(distributionSite = 1) {
            this.banner.status = 'loading';
            try {
                let res = await HomeAPI.getBanners(distributionSite);
                this.banner.result = res.result;
                this.banner.status = 'success';
            } catch (error) {
                this.banner.status = 'error';
            }
        },
        async getFreshGoods(limit = 4) {
            this.freshGoods.status = 'loading';
            try {
                let res = await HomeAPI.getFresh(limit);
                this.freshGoods.result = res.result;
                this.freshGoods.status = 'success';
            } catch (error) {
                this.freshGoods.status = 'error';
            }
        },
        async getHotRecommends() {
            this.hotRecommends.status = 'loading';
            try {
                let res = await HomeAPI.getHotRecommends();
                this.hotRecommends.result = res.result;
                this.hotRecommends.status = 'success';
            } catch (error) {
                this.hotRecommends.status = 'error';
            }
        },
        async getGoodsHandler() {
            this.goods.status = 'loading';
            try {
                let res = await HomeAPI.getGoods();
                this.goods.result = res.result;
                this.goods.status = 'success';
            } catch (error) {
                this.goods.status = 'error';
            }
        },
        async getSpecialHandler() {
            this.special.status = 'loading';
            try {
                let res = await HomeAPI.getSpecial();
                this.special.result = res.result;
                this.special.status = 'success';
            } catch (error) {
                this.special.status = 'error';
            }
        },
    },
})

/**
 * <<为什么用使用 interface 约束 getters 就报错, type 反而没事?>>
 *
 * 因interface可声明合并，声明的变量类型可新增属性，不是终态，
 * 所以在给有索引签名的类型赋值时，需增加索引签名限定新增属性的类型。
 * 而使用type声明的变量类型不可新增属性，已是最终状态，
 * 只要其属性符合被赋值变量的类型，就可以直接赋值，不会报错。
 *
 * 在 Pinia 中，使用 interface 约束 getters 就会报错，而使用 type 则不会。
 * 这是因为在 TypeScript 中，interface 和 type 的区别在于 interface 可以被合并，
 * 而 type 不行。当你使用 interface 约束 getter 时，Pinia 会尝试合并 getter 的类型定义，
 * 但是由于 TypeScript 的限制，这个过程可能会出现问题。而使用 type 则不会有这个问题。
 */
// interface Getters {
//     aaa: () => number
// }