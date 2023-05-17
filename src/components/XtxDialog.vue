<!-- src/components/XtxDialog.vue -->
<template>
  <div class="xtx-dialog " ref="targetElement" v-if="domVisible">
    <div class="wrapper">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:" class="iconfont icon-close-new" @click="visibleModel = false"></a>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ref, watchEffect } from "vue";

const props = defineProps<{ title: string, visible: boolean }>();
const emits = defineEmits<{ (e: 'update:visible'): void }>();
const visibleModel = useVModel(props, "visible", emits);
const domVisible = ref(props.visible);
const targetElement = ref();

// 监听外部值的变化
watchEffect(() => {
  // 如果外部值为真
  if (props.visible) {
    // 挂载元素
    domVisible.value = true;
    setTimeout(() => {
      // 添加类名执行动画
      targetElement.value.classList.add("fade");
    }, 0);
  } else {
    // 如果外部值为假
    // 如果页面中的元素存在
    if (targetElement.value) {
      // 删除类型执行离场动画
      targetElement.value.classList.remove("fade");
      // 监听动画结束
      targetElement.value.addEventListener("transitionend", () => {
        // 销毁元素
        domVisible.value = false;
      });
    }
  }
});
</script>
 
<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);
  transition: all 0.4s;

  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    transition: all 0.4s;

    .body {
      padding: 20px 40px;
      font-size: 16px;

      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }

    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }

    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;

        &:hover {
          color: #666;
        }
      }
    }
  }

  &.fade {
    background: rgba(0, 0, 0, 0.5);

    .wrapper {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
}
</style>