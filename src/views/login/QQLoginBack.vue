<!-- src/views/login/QQLoginBack.vue -->
<script setup lang="ts">
import { getCurrentInstance, ref, watch } from 'vue';
import { useRouter } from "vue-router";
import LoginHeader from "./components/LoginHeader.vue";
import LoginFooter from "./components/LoginFooter.vue";
import QQLoginRegisterNew from "./components/QQLoginRegisterNew.vue";
import QQLoginBindPhone from "./components/QQLoginBindPhone.vue";
import { useUserStore } from '@/stores/userStore';
import { AuthAPI } from "@/api/AuthAPI";

const hasAccount = ref(true);
const router = useRouter();
// 获取用于存储用户信息的store 对象
const userStore = useUserStore();
// 获取组件实例对象
const $ = getCurrentInstance();
// openId
const openId = ref('');

// 检测登录状态
const Login = window.QC.Login;
if (Login.check()) {
   Login.getMe((openid: string) => {
      console.log(openid);
      openId.value = openid;
      userStore.login(() => AuthAPI.loginByQQOpenid(openid, 1))
   })
} else {
   // router.push('/')
};

// 监听登录状态 (绑定已有账号登录、绑定新注册账号登录)
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
         $?.proxy?.$msg({
            type: "error",
            msg: userStore.profile.error + ", 请绑定账号",
         });
      }
   }
);
</script>

<template>
   <LoginHeader>联合登录</LoginHeader>
   <section class="container" v-if="userStore.profile.status === 'loading'">
      <div class="unbind">
         <div class="loading"></div>
      </div>
   </section>
   <section class="container" v-else>
      <nav class="tab">
         <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:">
            <i class="iconfont icon-bind"></i>
            <span>已有小兔鲜账号，请绑定手机</span>
         </a>
         <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:">
            <i class="iconfont icon-edit"></i>
            <span>没有小兔鲜账号，请完善资料</span>
         </a>
      </nav>
      <div class="tab-content" v-if="hasAccount">
         <QQLoginBindPhone :openId="openId" />
      </div>
      <div class="tab-content" v-else>
         <QQLoginRegisterNew :openId="openId" />
      </div>
   </section>
   <LoginFooter />
</template>

<style scoped lang="less">
.container {
   padding: 25px 0;
   position: relative;
   height: 730px;

   .unbind {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 25px 0;
      z-index: 99;

      .loading {
         height: 100%;
         background: #fff url(@/assets/images/load.gif) no-repeat center / 100px 100px;
      }
   }
}

.tab {
   background: #fff;
   height: 80px;
   padding-top: 40px;
   font-size: 18px;
   text-align: center;

   a {
      color: #666;
      display: inline-block;
      width: 350px;
      line-height: 40px;
      border-bottom: 2px solid #e4e4e4;

      i {
         font-size: 22px;
         vertical-align: middle;
      }

      span {
         vertical-align: middle;
         margin-left: 4px;
      }

      &.active {
         color: @xtxColor;
         border-color: @xtxColor;
      }
   }
}

.tab-content {
   min-height: 600px;
   background: #fff;
}
</style>