<!-- 账户登录: src/views/login/components/AccountLogin.vue -->
<template>
    <form @submit.prevent="onSubmit">
        <Field name="account" as="div" class="form-item" v-slot="{ field }" validate-on-input>
            <div class="input">
                <i class="iconfont icon-user"></i>
                <input type="text" placeholder="请输入用户名" v-bind="field" />
            </div>
            <ErrorMessage name="account" as="div" class="error" v-slot="{ message }">
                <i class="iconfont icon-warning">{{ message }}</i>
            </ErrorMessage>
        </Field>
        <Field name="password" as="div" class="form-item" v-slot="{ field }" validate-on-input>
            <div class="input">
                <i class="iconfont icon-lock"></i>
                <input autocomplete="on" type="password" placeholder="请输入密码" v-bind="field" />
            </div>
            <ErrorMessage name="password" as="div" class="error" v-slot="{ message }">
                <i class="iconfont icon-warning">{{ message }}</i>
            </ErrorMessage>
        </Field>
        <Field name="isAgree" as="div" class="form-item" validate-on-input>
            <div class="agree">
                <XtxCheckbox @update:valueModel="setFieldValue('isAgree', $event);
                validateField('isAgree');" />
                <span>我已同意</span>
                <a href="javascript:">《隐私条款》</a>
                <span>和</span>
                <a href="javascript:">《服务条款》</a>
            </div>
            <ErrorMessage name="isAgree" as="div" class="error" v-slot=" { message } ">
                <i class="iconfont icon-warning">{{ message }}</i>
            </ErrorMessage>
        </Field>
        <button type="submit" class="btn">登录</button>
    </form>
</template>

<script setup lang="ts">
import XtxCheckbox from "@/components/XtxCheckbox.vue";
import { toFormValidator } from "@vee-validate/zod";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as zod from "zod";
import { useUserStore } from "@/stores/userStore";
import { AuthAPI } from "@/api/AuthAPI";
import { watch } from "vue";
import { useRouter } from "vue-router";

const validationSchema = toFormValidator(
    zod.object({
        account: zod
            .string({ required_error: "请输入用户名" })
            .regex(/^[a-zA-Z]\w{5,19}$/, "字母开头且6-20个字符"),
        password: zod
            .string({ required_error: "请输入密码" })
            .regex(/^\w{6,24}$/, "密码是6-24个字符"),
        // isAgree: zod.literal(true, {
        //     errorMap: () => ({ message: "请勾选同意用户协议" }),
        // }),
    })
);
// 表单验证对象
const { handleSubmit, values, setFieldValue, validateField } = useForm({
    // 设置表单验证规则
    validationSchema,
    // 表单初始值
    initialValues: {
        account: "",
        password: "",
        isAgree: false,
    },
});

const user_store = useUserStore();
const router = useRouter();

// 表单提交
const onSubmit = handleSubmit(async (formValue) => {
    // console.log(formValue);
    await user_store.login(() => AuthAPI.loginByAccount(formValue.account, formValue.password))
});

watch(() => user_store.profile.status, (status) => {
    if (status === 'success') {
        alert('登录成功')
        router.push('/')
    } else if (status === 'error') {
        alert('登录失败')
    }
})
</script>