<!-- src/components/XtxPagination.vue -->
<template>
    <div class="xtx-pagination">
        <a href="javascript:" @click="currentPage--" :class="{ disabled: currentPage <= 1 }">上一页</a>
        <span v-show="!(currentPage <= 3)">...</span>
        <a href="javascript:" v-for="item in pageInfo.pageArr" :key="item" :class="{ active: currentPage === item }"
            @click="currentPage = item">{{ item
            }}</a>
        <span v-show="!(currentPage >= pages - 3)">...</span>
        <a href="javascript:" @click="currentPage++" :class="{ disabled: currentPage >= pages }">下一页</a>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";


const props = withDefaults(defineProps<{
    currentPage: number, pages: number, maxPage?: number
}>(), { currentPage: 1, pages: 12, maxPage: 5 });
const emit = defineEmits<{
    (e: 'update:currentPage', v: number): void,
    (e: 'onChange'): void
}>();
let currentPage = ref(props.currentPage), // 当前页
    pages = ref(props.pages), // 总页数
    maxPage = ref(props.maxPage); // 最多显示页码数量

const pageInfo = computed(() => {
    const offset = Math.floor(maxPage.value / 2)

    let start = currentPage.value - offset
    let end = start + maxPage.value - 1

    if (start < 1) {
        start = 1
        let end_temp = start + maxPage.value - 1
        end = end_temp > pages.value ? pages.value : end_temp
    }
    if (end > pages.value) {
        end = pages.value;
        let start_tmp = end - maxPage.value + 1;
        start = start_tmp < 1 ? 1 : start_tmp;
    }

    let pageArr: number[] = [];
    for (let i = start; i <= end; i++) {
        pageArr.push(i);
    }

    return { start, pageArr, end }
});

watch(() => currentPage.value, (n, o) => {
    emit('update:currentPage', n)
    emit('onChange')
})
</script>
  
<style scoped lang="less">
.xtx-pagination {
    display: flex;
    justify-content: center;
    padding: 30px;

    >a {
        display: inline-block;
        padding: 5px 10px;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        margin-right: 10px;

        &:hover {
            color: @xtxColor;
        }

        &.active {
            background: @xtxColor;
            color: #fff;
            border-color: @xtxColor;
        }

        &.disabled {
            cursor: not-allowed;
            opacity: 0.4;
            pointer-events: none;

            &:hover {
                color: #333;
            }
        }
    }

    >span {
        margin-right: 10px;
    }
}
</style>