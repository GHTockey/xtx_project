<template>
    <div>
        <XtxBread>
            <XtxBreadItem path="/">主页</XtxBreadItem>
            <XtxBreadItem>{{ currentItem?.name }}</XtxBreadItem>
        </XtxBread>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

import XtxBread from "@/components/XtxBread.vue";
import XtxBreadItem from "@/components/XtxBreadItem.vue";

import useCategoryStore from "@/stores/categoryStore";

const category_store = useCategoryStore();
let { currentTop } = category_store;
const route = useRoute();
let currentItem = computed(() => currentTop(route.params.id as string));
</script>

<style lang="">
    
</style>