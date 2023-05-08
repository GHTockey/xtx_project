<!-- QQ登录: QQ账号绑定已有账号(手机号) src/views/login/components/QQLoginBindPhone.vue -->
<template>
   <form class="xtx-form" @submit.prevent="onSubmit">
      <div class="user-info">
         <img :src="QQUserInfo.figureurl" alt="" />
         <p>Hi, {{ QQUserInfo.nickname }} 欢迎来小兔鲜, 完成绑定后可以QQ账号一键登录哦~</p>
      </div>
      <Field name="mobile" as="div" class="xtx-form-item" v-slot="{ field }" validate-on-input>
         <div class="field">
            <i class="icon iconfont icon-phone"></i>
            <input class="input" type="text" placeholder="绑定的手机号" v-bind="field" />
         </div>
         <ErrorMessage name="mobile" as="div" class="error" v-slot="{ message }">
            {{ message }}
         </ErrorMessage>
      </Field>
      <Field name="code" as="div" class="xtx-form-item" v-slot="{ field }" validate-on-input>
         <div class="field">
            <i class="icon iconfont icon-code"></i>
            <input class="input" type="text" placeholder="短信验证码" v-bind="field" />
            <span class="code" @click="sendCode">
               {{ isActive ? `剩余${count}秒` : "发送验证码" }}
            </span>
         </div>
         <ErrorMessage name="code" as="div" class="error" v-slot="{ message }">
            {{ message }}
         </ErrorMessage>
      </Field>
      <input type="submit" class="submit" value="立即绑定" />
   </form>
</template>
 
<script setup lang="ts">
import { reactive, getCurrentInstance } from 'vue';
import { Field, ErrorMessage, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import * as zod from "zod";
import { AxiosError } from "axios";
import useCountdown from "@/logics/useCountdown";
import { AuthAPI } from "@/api/AuthAPI";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const $ = getCurrentInstance();// 获取组件实例
const { count, start, isActive } = useCountdown();
const props = defineProps<{
   openId: string;
}>();

const QQUserInfo = reactive({
   nickname: "",
   figureurl: "",
});
// 获取QQ用户的头像和昵称
window.QC.api('get_user_info').success((res: any) => {
   QQUserInfo.nickname = res.data.nickname;
   QQUserInfo.figureurl = res.data.figureurl_qq_2;
});
// 规则对象
const rules = toFormValidator(
   zod.object({
      mobile: zod
         .string({ required_error: "请输入手机号" })
         .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
      code: zod
         .string({ required_error: "请输入验证码" })
         .regex(/^\d{6}$/, "验证码格式错误"),
   })
);
const { handleSubmit, validateField, values } = useForm<{
   mobile: string; code: string;
}>({
   validationSchema: rules
});

// 发送验证码
const sendCode = () => {
   validateField("mobile").then(async (res) => {
      if (res.valid) {
         // console.log("发送验证码");
         // 如果正在倒计时 阻止发送
         if (isActive.value) return;
         try {
            // 发送验证码
            await AuthAPI.sendMsgCodeOfBindQQ(values.mobile, props.openId, 1);
            // 开始倒计时
            start(60);
            // 消息提示
            $?.proxy?.$msg({ type: "success", msg: "验证码发送成功" });
         } catch (error) {
            // 是否是 axios 错误
            if (error instanceof AxiosError) {
               const message = error.response?.data.message;
               $?.proxy?.$msg({ type: "error", msg: message });
            } else {
               $?.proxy?.$msg({ type: "error", msg: '发生错误:' + error });
            }
         }
      }
   });
};
// 表单提交
const onSubmit = handleSubmit((values) => {
   console.log(values);
   userStore.login(() => AuthAPI.loginByBindAccount(values.mobile, values.code, props.openId))
});
</script>

<style scoped lang="less">
.user-info {
   width: 320px;
   height: 70px;
   display: flex;
   background: #f2f2f2;
   align-items: center;
   padding: 0 10px;
   margin: 0 auto 20px;

   img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
   }

   p {
      padding-left: 10px;
   }
}

.code {
   position: absolute;
   right: 0;
   top: 0;
   line-height: 50px;
   width: 80px;
   color: #999;

   &:hover {
      cursor: pointer;
   }
}
</style>