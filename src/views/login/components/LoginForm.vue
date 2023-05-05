<!-- 登录表单组件: src/views/login/components/LoginForm.vue  -->
<script setup lang="ts">
import { getCurrentInstance, ref, watch } from 'vue';
import AccountLogin from "./AccountLogin.vue";
import MessageLogin from "./MessageLogin.vue";

// 是否为账号登录
const accountLogin = ref(true);

import { useUserStore } from "@/stores/userStore";
import { useRouter } from 'vue-router';
const userStore = useUserStore();
// 获取组件实例 getCurrentInstance() 是 Vue 3 中引入的一个新函数，它允许您在 setup 函数或生命周期钩子中访问当前的 Vue 实例。
const $ = getCurrentInstance();
// 获取路由对象
const router = useRouter();

// 监听登录状态
watch(
    () => userStore.profile.status,
    (status) => {
        // 如果登录成功
        if (status === "success") {
            // 消息提示
            $?.proxy?.$msg({ type: "success", msg: "登录成功" });
            // 跳转到首页
            router.push("/");
        } else if (status === "error") {
            // 如果登录失败
            $?.proxy?.$msg({ type: "error", msg: userStore.profile.error });
        }
    }
);
</script>

<template>
    <div class="account-box">
        <div class="toggle">
            <button v-if="!accountLogin" @click="accountLogin = true">
                <i class="iconfont icon-user"></i> 使用账号登录
            </button>
            <button v-else @click="accountLogin = false">
                <i class="iconfont icon-msg"></i> 使用短信登录
            </button>
        </div>
        <div class="form">
            <!-- 账户登录 -->
            <AccountLogin v-if="accountLogin" />
            <!-- 短信登录 -->
            <MessageLogin v-else />
        </div>
        <div class="action">
            <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
            <div class="url">
                <a href="javascript:">忘记密码</a>
                <a href="javascript:">免费注册</a>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        button {
            color: @xtxColor;
            background: none;
            border: none;
            cursor: pointer;

            i {
                font-size: 14px;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}
</style>