import { defineStore } from "pinia";
import CategoryAPI from "@/api/CategoryAPI";
import { ref } from "vue";

import type { Status } from '@/types/Status';
import type { Category } from "@/types/Category";

// 定义 Store 对象中状态的类型
type State = {
    categories: {
        headerNav: Category[],
        status: Status;
    };
};

// 定义 Getters 对象的类型
type Getters = {};

// 定义 Actions 对象的类型
type Actions = {
    getCategories(): Promise<void>;
};

export default defineStore<string, State, Getters, Actions>('category_store', {
    state() {
        return {
            categories: {
                headerNav: [],
                status: "idle",
            }
        }
    },
    actions: {
        async getCategories() {
            this.categories.status = "loading";
            try {
                let res = await CategoryAPI.getCategories();
                this.categories.headerNav = res.result;
                this.categories.status = "success";
            } catch (error) {
                this.categories.status = "error";
            }
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