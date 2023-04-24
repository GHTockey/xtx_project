<!-- 评价排序组件: src/views/goods/components/CommentSort.vue -->
<template>
  <div class="sort">
    <span>排序：</span>
    <a href="javascript:" :class="{ active: reqParams.sortField === '' }" @click="updateParams('')">默认</a>
    <a href="javascript:" :class="{ active: reqParams.sortField === 'praiseCount' }"
      @click="updateParams('praiseCount')">最新</a>
    <a href="javascript:" :class="{ active: reqParams.sortField === 'createTime' }"
      @click="updateParams('createTime')">最热</a>
  </div>
</template>

<script setup lang="ts">
import type { EvaluateRequestParams } from "@/types/Goods";

const props = defineProps<{
  reqParams: EvaluateRequestParams
}>();
const emits = defineEmits<{
  (e: 'update:reqParams', obj: EvaluateRequestParams): void
}>();

function updateParams(target: "" | "praiseCount" | "createTime") {
  emits('update:reqParams', {
    ...props.reqParams,
    sortField: target,
    page: 1
  })
}
</script>

<style scoped lang="less">
.sort {
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  margin: 0 20px;
  color: #666;

  >span {
    margin-left: 20px;
  }

  >a {
    margin-left: 30px;

    &.active,
    &:hover {
      color: @xtxColor;
    }
  }
}
</style>