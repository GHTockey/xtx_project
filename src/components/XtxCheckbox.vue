<!-- src/components/XtxCheckbox.vue -->
<template>
    <div class="xtx-checkbox" @click="toggle">
        <!-- <i class="iconfont icon-checked" v-if="isChecked"></i> -->
        <!-- <i class="iconfont icon-unchecked" v-else></i> -->
        <i :class="`iconfont ${isChecked ? 'icon-checked' : 'icon-unchecked'}`"></i>
        <span><slot></slot></span>
    </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ref, watch } from "vue";

// modelValue: v-model
// checked 不使用双向数据绑定时, 状态的默认值
// 此处注意: 虽然 modelValue 是可选的, 但是它的默认值不是 undefined 而是 false
const props = withDefaults(defineProps<{ valueModel?: boolean, checked?: boolean }>(), {
    valueModel: undefined,
});
const emit = defineEmits<{
    // (e: "update:valueModel"): void
    (e: "onChange", checked: boolean): void;
}>();
let isVmodel = typeof props.valueModel !== "undefined";
let isChecked = isVmodel ? useVModel(props, "valueModel", emit) : ref(false);
const toggle = () => {
    isChecked.value = !isChecked.value
    // if (!isVmodel) emit('update:valueModel', !props.valueModel)
    if (!isVmodel) emit("onChange", isChecked.value)
    console.log(5623);
};

// 由于父组件状态发生变化 不会重新执行 setup 函数
// 所以此处开发者需要自定监听
watch(
  () => props.checked,
  () => {
    if (!isVmodel) {
      isChecked.value = props.checked;
    }
  }
);
</script>
  
<style scoped lang="less">
.xtx-checkbox {
    display: inline-block;
    margin-right: 2px;

    .icon-checked {
        color: @xtxColor;

        ~span {
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