<!-- src/components/XtxCheckbox.vue -->
<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ref, watch } from 'vue';

// modelValue: v-model
// checked 不使用双向数据绑定时, 状态的默认值
// 此处注意: 虽然 modelValue 是可选的, 但是它的默认值不是 undefined 而是 false
const props = withDefaults(
    defineProps<{ modelValue?: boolean; checked?: boolean }>(),
    { modelValue: undefined }
);
// 声明组件要触发的自定义事件
const emit = defineEmits<{
    (e: "update:modelValue"): void;
    (e: "onChange", checked: boolean): void;
}>();

// 是否使用双向数据绑定
const isVModel = typeof props.modelValue !== "undefined";

// 声明复选框是否选中状态
const isChecked = isVModel
    ? useVModel(props, "modelValue", emit)
    : ref(props.checked);

// 切换复选框选中、取消选中状态
const toggle = () => {
    // 切换状态
    isChecked.value = !isChecked.value;
    // 如果未使用双向数据绑定, 手动触发自定义事件将状态传递到组件外部
    // 如果使用了双向数据绑定, 则 useVModel 内部自动触发自定义事件
    if (!isVModel) emit("onChange", isChecked.value);
};

// 由于父组件状态发生变化 不会重新执行 setup 函数
// 所以此处开发者需要自定监听
watch(
    () => props.checked,
    () => {
        if (!isVModel) {
            isChecked.value = props.checked;
        }
    }
);
</script>

<template>
    <div class="xtx-checkbox" @click="toggle">
        <i class="iconfont icon-checked" v-if="isChecked"></i>
        <i class="iconfont icon-unchecked" v-else></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </div>
</template>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>