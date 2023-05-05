<template>
    <nav class="app-top-nav">
        <div class="container">
            <ul>
                <template v-if="profile.result.token">
                    <li><a href="javascript:"><i class="iconfont icon-user"></i>{{ profile.result.account }}</a></li>
                    <li><a href="javascript:" @click="logout">退出登录</a></li>
                </template>
                <template v-else>
                    <li><router-link to="/login">请先登录</router-link></li>
                    <li><a href="javascript:">免费注册</a></li>
                </template>
                <li><a href="javascript:">我的订单</a></li>
                <li><a href="javascript:">会员中心</a></li>
                <li><a href="javascript:">帮助中心</a></li>
                <li><a href="javascript:">关于我们</a></li>
                <li><a href="javascript:"><i class="iconfont icon-phone"></i>手机版</a></li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const router = useRouter();
const user_store = useUserStore();
const { profile } = storeToRefs(user_store);

function logout() {
    user_store.$reset()
    router.push('/')
}
</script>
  
<style scoped lang="less">
.app-top-nav {
    background: #333;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: @xtxColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>