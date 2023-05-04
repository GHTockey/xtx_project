import { defineStore } from "pinia";
// import AuthAPI from "@/api/AuthAPI";
import type { Response } from "@/types/Res";

import type { User } from "@/types/User";
import type { Status } from "@/types/Status";
import { AxiosError } from "axios";

type States = {
    profile: {
        result: Partial<User>;
        status: Status;
        error: string
    }
};
type Getters = {};
type Actions = {
    login(callback: () => Promise<Response<User>>): Promise<void>;
};
export const useUserStore = defineStore<"user_store", States, Getters, Actions>('user_store', {
    state() {
        return {
            profile: {
                result: {},
                status: "idle",
                error: ''
            }
        }
    },
    // getters() { },
    actions: {
        // 用户登录(账号密码、手机验证码、QQ openid 登录)
        async login(callback) {
            this.profile.status = "loading";
            // 重置错误信息
            this.profile.error = "";
            // 捕获错误
            try {
                // 服务端响应的状态类型
                let response = await callback();
                this.profile.status = "success";
                // 存储用户信息
                this.profile.result = response.result;
            } catch (error) {
                this.profile.status = "error";
                // 存储错误信息
                if (error instanceof AxiosError) {
                    this.profile.error = error.response?.data.message;
                } else if (error instanceof Error) {
                    this.profile.error = error.message;
                }
            }
        },
    },

    persist: true, // 开启持久化存储
});