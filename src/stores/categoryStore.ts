import { defineStore } from "pinia";
import CategoryAPI from "@/api/CategoryAPI";
import { ref } from "vue";

import type { Status } from '@/types/Status';
import type { Category } from "@/types/Category";

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
};

// 定义 Getters 对象的类型
type Getters = {};

// 定义 Actions 对象的类型
type Actions = {
    getCategories(): Promise<void>;
    displayToggle(id: string, target: boolean): void;
};

export default defineStore<string, State, Getters, Actions>('category_store', {
    state() {
        return {
            categories: {
                headerNav: [],
                status: "idle",
                homeCategory: []
            }
        }
    },
    actions: {
        // 获取分类数据
        async getCategories() {
            this.categories.status = "loading";
            try {
                let res = await CategoryAPI.getCategories();
                this.categories.headerNav = res.result.map(el => {
                    return { ...el, isOpen: false }
                });
                this.categories.homeCategory = res.result.map(el=>{
                    return {...el,children:el.children?.slice(0,2)}
                });
                this.categories.status = "success";
            } catch (error) {
                this.categories.status = "error";
            }
        },
        // 导航显示切换
        displayToggle(id, target) {
            // console.log(target);
            let cateEl = this.categories.headerNav.find(el => el.id === id);
            cateEl && (cateEl.isOpen = target)
        },
    }
});

export let sss = defineStore('category_store', () => {
    const categories = {
        headerNav: [],
        status: "idle",
    }

    
    const getCategories = async () => {
        categories.status = "loading";
        try {
            let res = await CategoryAPI.getCategories();
            (categories.headerNav as Category[]) = res.result;
            categories.status = "success";
        } catch (error) {
            categories.status = "error";
        }
    }
});