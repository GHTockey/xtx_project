import { defineStore } from "pinia";
import CategoryAPI from "@/api/CategoryAPI";
import { reactive, ref } from "vue";

import type { Status } from '@/types/Status';
import type { Category, Pagination, GoodsRequestParams } from "@/types/Home/Category";
import type { Goods } from "@/types/Goods";

// 定义 Store 对象中状态的类型
type State = {
    categories: {
        // 导航分类
        headerNav: (Category & { isOpen: boolean })[],
        // 请求状态
        status: Status,
        // 主页分类(轮播图板块)
        homeCategory: Category[],
    };
    // 一级分类具体信息
    topCategories: {
        result: {
            [key: string]: Category
        }
        status: Status
    };
    // 二级分类筛选数据
    subCategoryFilters: {
        result: {
            [id: string]: Category;
        };
        status: Status;
    };
    // 二级分类商品
    categoryGoods: {
        status: Status;
        result: Pagination<Goods>;
    };
};

// 定义 Getters 对象的类型
type Getters = {
    currentTop(): (topCategoryId: string) => Category | undefined;
    currentTopAndSub(): (tid: string, sid: string) => { topCategory: Category | undefined; subCategory: Category | undefined };
};

// 定义 Actions 对象的类型
type Actions = {
    /**获取分类数据 */
    getCategories(): Promise<void>;
    /**导航显示切换 */
    displayToggle(id: string, target: boolean): void;
    /**根据一级分类 id 获取分类信息 */
    getTopCategoryById(id: string): Promise<void>;
    /**根据二级分类 id 获取该分类下的商品的筛选条件数据 */
    getSubCategoryFilters(id: string): Promise<void>;
    /** 获取二级分类商品 */
    getCategoryGoods(
        categoryId: GoodsRequestParams["categoryId"],
        reqParams?: Partial<Omit<GoodsRequestParams, "categoryId">>
    ): Promise<void>;
};

export default defineStore<string, State, Getters, Actions>('category_store', {
    state() {
        return {
            categories: {
                headerNav: [],
                status: "idle",
                homeCategory: []
            },
            topCategories: {
                result: {},
                status: 'idle'
            },
            subCategoryFilters: {
                result: {},
                status: 'idle'
            },
            categoryGoods: {
                result: {
                    page: 0,
                    pages: 0,
                    pageSize: 0,
                    counts: 0,
                    items: [],
                },
                status: 'idle',
            },
        }
    },
    getters: {
        currentTop() {
            return (topCategoryId) => this.categories.headerNav.find(el => el.id === topCategoryId);
        },
        currentTopAndSub() {
            return (tid, sid) => {
                const topCategory = this.categories.headerNav.find(el => el.id === tid);
                const subCategory = topCategory?.children?.find(el => el.id === sid);
                return { topCategory, subCategory };
            }
        },
    },
    actions: {
        async getCategories() {
            this.categories.status = "loading";
            try {
                let res = await CategoryAPI.getCategories();
                this.categories.headerNav = res.result.map(el => {
                    return { ...el, isOpen: false }
                });
                this.categories.homeCategory = res.result.map(el => {
                    return { ...el, children: el.children?.slice(0, 2) }
                });
                this.categories.status = "success";
            } catch (error) {
                this.categories.status = "error";
            }
        },
        displayToggle(id, target) {
            // console.log(target);
            let cateEl = this.categories.headerNav.find(el => el.id === id);
            cateEl && (cateEl.isOpen = target)
        },
        async getTopCategoryById(id) {
            this.topCategories.status = 'loading';
            try {
                let res = await CategoryAPI.getTopCategoryById(id);
                this.topCategories.result[res.result.id] = res.result;
                this.topCategories.status = 'success';
            } catch (error) {
                this.topCategories.status = 'error';
            }
        },
        async getSubCategoryFilters(id) {
            this.subCategoryFilters.status = 'loading'
            try {
                let res = await CategoryAPI.getSubCategoryFilters(id)
                this.subCategoryFilters.result[res.result.id] = res.result
                this.subCategoryFilters.status = 'success'
            } catch (error) {
                this.subCategoryFilters.status = 'error'
            }
        },
        async getCategoryGoods(categoryId, reqParams) {
            // console.log(this.categoryGoods.status);
            // 如果数据已经加载完成, 不再进行加载
            if (this.categoryGoods.status === "finished") return;
            // 更新加载状态
            this.categoryGoods.status = "loading";
            // 捕获错误
            try {
                // 发送请求获取二级分类商品数据
                let res = await CategoryAPI.getCategoryGoods(categoryId, reqParams);
                // console.log(reqParams);
                if (reqParams?.page === 1) {
                    // 存储二级分类商品数据
                    this.categoryGoods.result = res.result;
                } else {
                    // 不是第一页 叠加数据
                    // console.log(res.result,this.categoryGoods.result);
                    this.categoryGoods.result = {
                        ...res.result,
                        items: [
                            ...this.categoryGoods.result.items,
                            ...res.result.items,
                        ],
                    };
                    // console.log(this.categoryGoods.result);
                }

                // 如果当前请求页已经是最后一页或者服务端没有商品数据
                if (reqParams?.page === res.result.pages || res.result.pages === 0) {
                    // 更新加载状态
                    this.categoryGoods.status = "finished";
                } else {
                    // 更新加载状态
                    this.categoryGoods.status = "success";
                }
            } catch (e) {
                // 更新加载状态
                this.categoryGoods.status = "error";
            }
        },
    }
});