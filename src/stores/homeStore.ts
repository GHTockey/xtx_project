import { defineStore } from "pinia";
import HomeAPI from "@/api/HomeAPI";

import type { Brand } from "@/types/Brand";
import type { Status } from "@/types/Status";

interface State {
    brands: {
        result: Brand[]
        status: Status
    }
}
type Getters = {}

interface Actions {
    getBrands: (limit: number) => void
}
/**
 * <<为什么用使用 interface 约束 getters 就报错, type 反而没事?>>
 * 因interface可声明合并，声明的变量类型可新增属性，不是终态，
 * 所以在给有索引签名的类型赋值时，需增加索引签名限定新增属性的类型。
 * 而使用type声明的变量类型不可新增属性，已是最终状态，
 * 只要其属性符合被赋值变量的类型，就可以直接赋值，不会报错。
 */
// interface Getters {
//     aaa: () => number
// }


export default defineStore<"home_store", State, Getters, Actions>('home_store', {
    state() {
        return {
            brands: {
                result: [],
                status: 'idle'
            }
        }
    },
    actions: {
        // 获取品牌数据
        async getBrands(limit = 10) {
            this.brands.status = 'loading';
            try {
                let res = await HomeAPI.getHotBrands(limit);
                this.brands.result = res.result;
                this.brands.status = 'success';
            } catch (error) {
                this.brands.status = 'error'
            }
        }
    },
})