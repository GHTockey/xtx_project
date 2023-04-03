import { defineStore } from "pinia";
import CategoryAPI from "@/api/CategoryAPI";
import { reactive, ref } from "vue";

import type { Status } from '@/types/Status';
import type { Category } from "@/types/Home/Category";

// interface Categories {
//     headerNav: (Category & { isOpen: boolean })[], // 导航分类
//     status: Status; // 请求状态
//     homeCategory: Category[] // 主页分类(轮播图板块)
// };
// // 箭头函数写法：
// export default defineStore('category_store', () => {
//     const categories = reactive<Categories>({
//         headerNav: [],
//         status: 'idle',
//         homeCategory: []
//     });

//     /**获取分类数据*/
//     async function getCategories(): Promise<void> {
//         categories.status = 'loading'
//         try {
//             let res = await CategoryAPI.getCategories()
//             categories.headerNav = res.result.map(el => ({ ...el, isOpen: false }))
//             categories.homeCategory = res.result.map(el => ({ ...el, children: el.children?.slice(0, 2) }))
//             categories.status = 'success'
//         } catch (error) {
//             categories.status = 'error'
//         }
//     };
//     /**导航显示切换 */
//     function displayToggle(id: string, target: boolean): void {
//         let cateEl = categories.headerNav.find(el => el.id === id);
//         cateEl && (cateEl.isOpen = target)
//     };
// })

// 定义 Store 对象中状态的类型
type State = {
    categories: {
        // 导航分类
        headerNav: (Category & { isOpen: boolean })[],
        // 请求状态
        status: Status;
        // 主页分类(轮播图板块)
        homeCategory: Category[]
    };
    // 一级分类具体信息
    topCategories: {
        result: {
            [key: string]: Category
        }
        status: Status
    }
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
            }
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
    }
});