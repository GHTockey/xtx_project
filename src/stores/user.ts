import { defineStore } from "pinia";
import { ref } from "vue";

import type { User } from "@/types/User";

type States = {
    profile: Partial<User>;
};
type Getters = {};
type Actions = {};
export default defineStore<"user", States, Getters, Actions>('user', {
    state: () => ({
        profile: {
            nickname: 'zs',
        },
    }),
    // getters() { },
    // actions() { },

    persist: true, // 开启持久化存储
});