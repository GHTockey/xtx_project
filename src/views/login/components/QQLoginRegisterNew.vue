<!-- QQ登录: 注册新账号, 使用新账号绑定QQ号 src/views/login/components/QQLoginRegisterNew.vue -->
<template>
   <form class="xtx-form" @submit.prevent="onSubmit">
      <Field name="account" as="div" class="xtx-form-item" v-slot="{ field }" validate-on-input>
         <div class="field">
            <i class="icon iconfont icon-user"></i>
            <input class="input" type="text" placeholder="请输入用户名" v-bind="field" />
         </div>
         <ErrorMessage name="account" as="div" class="error" />
      </Field>
      <Field name="mobile" as="div" class="xtx-form-item" v-slot="{ field }" validate-on-input>
         <div class="field">
            <i class="icon iconfont icon-phone"></i>
            <input class="input" type="text" placeholder="请输入手机号" v-bind="field" />
         </div>
         <ErrorMessage name="mobile" as="div" class="error" />
      </Field>
      <Field name="code" as="div" class="xtx-form-item" v-slot="{ field }" validate-on-input>
         <div class="field">
            <i class="icon iconfont icon-code"></i>
            <input class="input" type="text" placeholder="请输入验证码" v-bind="field" />
            <span class="code" @click="sendCode">
               {{ isActive ? `剩余${count}秒` : "发送验证码" }}
            </span>
         </div>
         <ErrorMessage name="code" as="div" class="error" />
      </Field>
      <div class="xtx-form-item">
         <Field as="div" name="password" class="field" v-slot="{ field }" validate-on-input>
            <i class="icon iconfont icon-lock"></i>
            <input v-bind="field" class="input" type="password" placeholder="请输入密码" autocomplete="on" />
         </Field>
         <ErrorMessage as="div" name="password" class="error"></ErrorMessage>
      </div>
      <div class="xtx-form-item">
         <Field as="div" name="confirm" class="field" v-slot="{ field }" validate-on-input>
            <i class="icon iconfont icon-lock"></i>
            <input v-bind="field" class="input" type="password" placeholder="请确认密码" autocomplete="on" />
         </Field>
         <ErrorMessage as="div" name="confirm" class="error"></ErrorMessage>
      </div>
      <input type="submit" class="submit" value="立即绑定" />
   </form>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import * as zod from "zod";
import { AuthAPI } from "@/api/AuthAPI";
import { useUserStore } from "@/stores/userStore";
import useCountdown from "@/logics/useCountdown";
import { getCurrentInstance } from "vue";
import { AxiosError } from "axios";

const user_store = useUserStore();
const { count, start, isActive } = useCountdown();
const $ = getCurrentInstance();
const props = defineProps<{ openId: string }>();

// 表单验证规则
const roule = toFormValidator(
   zod.object({
      account: zod
         .string({ required_error: "请输入用户名" })
         .regex(/^[a-zA-Z]\w{5,19}$/, "字母开头且6-20个字符"),
      mobile: zod
         .string({ required_error: "请输入手机号" })
         .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
      code: zod
         .string({ required_error: "请输入验证码" })
         .regex(/^\d{6}$/, "验证码格式错误"),
      password: zod
         .string({ required_error: "请输入密码" })
         .regex(/^\w{6,24}$/, "密码是6-24个字符"),
      confirm: zod.string({ required_error: "请再次输入密码" }),
      // 只有在所有字段都验证通过后(至少1次)才会执行 refine 中的回调函数
   }).refine((data) => data.password === data.confirm, {
      message: "两次密码输入不一致",
      path: ["confirm"],
   })
);

// 验证用户名唯一性
const checkAccountUnique = zod.string().refine(async (account) => {
   let res = await AuthAPI.checkAccountUnique(account);
   // console.log(account, res);
   // true 已存在 false 不存在
   return !res.result.valid;
}, "用户名已存在");

// 应用规则对象
const { handleSubmit, validateField, setFieldError, values } = useForm<{
   account: string;
   mobile: string;
   code: string;
   password: string;
   confirm: string;
}>({ validationSchema: roule });

// 提交表单
const onSubmit = handleSubmit(async (formValues) => {
   try {
      // 检查用户名唯一性
      await checkAccountUnique.parseAsync(formValues.account);
      // 发送注册请求
      user_store.login(() => AuthAPI.loginByBindNewAccount(props.openId, formValues))
   } catch (error) {
      if (error instanceof zod.ZodError) {
         setFieldError("account", error.issues[0].message);
      }
   }
});

// 发送验证码
const sendCode = () => {
   // 验证是否输入手机号
   validateField("mobile").then(async (res) => {
      if (!res.valid) return // 如果手机号验证不通过, 阻止执行后续代码
      if (isActive.value) return // 如果正在倒计时, 阻止执行后续代码
      try {
         // 发送验证码
         await AuthAPI.sendMsgCodeOfRegister(values.mobile);
         // 开始倒计时
         start(60);
         // 消息提示
         $?.proxy?.$msg({ type: "success", msg: "验证码发送成功" });
      } catch (error) {
         // 检查错误类型
         if (error instanceof AxiosError) {
            $?.proxy?.$msg({ type: "error", msg: error.response?.data?.message });
         } else {
            $?.proxy?.$msg({ type: "error", msg: "验证码发送失败" });
         }
      }

   })
};
</script>

<style scoped lang="less">
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