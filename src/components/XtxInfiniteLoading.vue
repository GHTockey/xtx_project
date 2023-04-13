<!-- src/components/XtxInfiniteLoading.vue -->
<template>
    <div class="xtx-infinite-loading" ref="target">
        <div class="loading" v-if="loading">
            <span class="img"></span>
            <span class="text">正在加载...</span>
        </div>
        <div class="none" v-if="finished">
            <span class="img"></span>
            <span class="text">亲，没有更多了</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

// 从外部接收 loading 用于表示是否正在加载状态
// 从外部接收 finished 用于表示是否还有更多数据可以加载
const props = defineProps<{ loading: boolean; finished: boolean }>();
// 定义要触发的自定义事件 页码累加获取数据
const emit = defineEmits<{ (e: "infinite"): void }>();
// 被监听元素
const target = ref();
// 监听元素是否进入可视区
useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // 如果元素进入了可视区并且没有正在加载数据并且还有更多数据可以加载
    if (isIntersecting && !props.loading && !props.finished) {
        // 通知父组件加载更多数据
        emit("infinite");
    }
});
</script>
  
<style scoped lang="less">
.xtx-infinite-loading {
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;

        .img {
            width: 50px;
            height: 50px;
            background: url(@/assets/images/load.gif) no-repeat center / contain;
        }

        .text {
            color: #999;
            font-size: 16px;
        }
    }

    .none {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;

        .img {
            width: 200px;
            height: 134px;
            background: url(@/assets/images/none.png) no-repeat center / contain;
        }

        .text {
            color: #999;
            font-size: 16px;
        }
    }
}
</style>