<!-- src/components/XtxNumberBox.vue -->
<template>
  <div class="xtx-number-box">
    <div class="label">{{ label }}</div>
    <div class="number-box">
      <a href="javascript:" @click="onChange(-1)">-</a>
      <input type="text" readonly :value="number" />
      <a href="javascript:" @click="onChange(1)">+</a>
    </div>
  </div>
</template>

<script setup lang="ts">import { useVModel } from '@vueuse/core';

// 接收外部传递进来的状态
interface Props {
    // 库存量
    max: number;
    // 数量 (双向数据帮)
    count: number;
    // 数量选择框左边的文字
    label: string;
}
// 接收外部传递进来的状态
const props = defineProps<Props>();
// 声明当前组件要触发的自定义事件
const emit = defineEmits(["update:count"]);
// 实现[数量]的双向数据绑定
const number = useVModel(props, "count", emit);
// 更改数据
function onChange(step: 1 | -1) {
    const next = number.value + step;
    if (next < 1) {
        number.value = 1;
    } else if (next > props.max) {
        number.value = props.max;
    } else {
        number.value = next;
    }
}
</script>

<style scoped lang="less">
.xtx-number-box {
    display: flex;
    align-items: center;

    .label {
        width: 60px;
        color: #999;
        padding-left: 10px;
    }

    .number-box {
        width: 120px;
        height: 30px;
        border: 1px solid #e4e4e4;
        display: flex;

        >a {
            width: 29px;
            line-height: 28px;
            text-align: center;
            background: #f8f8f8;
            font-size: 16px;
            color: #666;

            &:first-of-type {
                border-right: 1px solid #e4e4e4;
            }

            &:last-of-type {
                border-left: 1px solid #e4e4e4;
            }
        }

        >input {
            width: 60px;
            padding: 0 5px;
            text-align: center;
            color: #666;
        }
    }
}</style>