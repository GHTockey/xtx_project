<!-- src/views/login/components/MessageLogin.vue -->
<template>
    <form @submit.prevent="onSubmit">
        <Field name="mobile" class="form-item" as="div" v-slot="{ field }">
            <div class="input">
                <i class="iconfont icon-user"></i>
                <input type="text" placeholder="请输入手机号" v-bind="field" />
            </div>
            <ErrorMessage name="mobile" as="div" class="error" v-slot="{ message }">
                <i class="iconfont icon-warning">{{ message }}</i>
            </ErrorMessage>
        </Field>
        <Field name="code" as="div" class="form-item" v-slot="{ field }" validate-on-input>
            <div class="input">
                <i class="iconfont icon-code"></i>
                <input type="password" placeholder="请输入验证码" v-bind="field" />
                <span class="code" @click="sendMsgCode">{{ isActive ? `剩余${count}秒` : "发送验证码" }}</span>
            </div>
            <ErrorMessage name="code" as="div" class="error" v-slot="{ message }">
                <i class="iconfont icon-warning">{{ message }}</i>
            </ErrorMessage>
        </Field>
        <Field name="isAgree" as="div" class="form-item">
            <div class="agree">
                <XtxCheckbox />
                <span>我已同意</span>
                <a href="javascript:">《隐私条款》</a>
                <span>和</span>
                <a href="javascript:">《服务条款》</a>
            </div>
            <ErrorMessage name="isAgree" as="div" class="error">
                <i class="iconfont icon-warning"></i>
            </ErrorMessage>
        </Field>
        <button type="submit" class="btn">登录</button>
    </form>
</template>

<script setup lang="ts">
import XtxCheckbox from "@/components/XtxCheckbox.vue";
import { toFormValidator } from "@vee-validate/zod";
import { Field, ErrorMessage, useForm } from "vee-validate";
import { getCurrentInstance } from "vue";
import * as zod from "zod";
import { AuthAPI } from "@/api/AuthAPI";
import { AxiosError } from "axios";
import useCountdown from "@/logics/useCountdown";
import { useUserStore } from "@/stores/userStore";

const $ = getCurrentInstance(); // 组件实例
const { start, isActive, count } = useCountdown();

// 创建表单规则对象
const rules = toFormValidator(
    zod.object({
        mobile: zod
            .string()
            .regex(/^1[3456789]\d{9}$/, '请输入正确的手机号码'),
        code: zod
            .string()
            .regex(/^\d{6}$/, '请输入正确的验证码'),
        // ... 是否同意规则
    }));
// 应用规则
const { handleSubmit, validateField, values } = useForm({
    validationSchema: rules,
    initialValues: {
        mobile: '',
        code: '',
        isAgree: false
    }
});
// 表单提交
const onSubmit = handleSubmit(() => {
    useUserStore().login(() => AuthAPI.loginByMobileMsgCode(values.mobile, values.code))
})

// 发送验证码事件
async function sendMsgCode() {
    // 正在倒计时 代码停止执行
    if (isActive.value) return;
    // 检查手机号
    let { valid } = await validateField('mobile');
    if (!valid) return; // 验证不通过，阻止执行
    try {
        await AuthAPI.sendMsgCodeOfMobileLogin(values.mobile) // 发起请求
        start(60);
        $?.proxy?.$msg({ type: 'success', msg: '手机验证码发送成功' }) // 消息提示
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            $?.proxy?.$msg({ type: 'error', msg: error.response?.data.message }) // 消息提示
        } else {
            $?.proxy?.$msg({ type: "error", msg: <string>error || "手机验证码发送失败" })
        }
    };
};

</script>