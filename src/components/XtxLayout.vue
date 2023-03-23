<!-- 布局组件 src/components/XtxLayout.vue -->
<template>
    <XtxTopNav />
    <XtxHeader />
    <XtxHeaderSticky />
    <RouterView />
    <XtxFooter />
</template>

<script setup lang="ts">
import XtxTopNav from "@/components/XtxTopNav.vue";
import XtxHeader from "@/components/XtxHeader.vue";
import XtxFooter from "@/components/XtxFooter.vue";
import XtxHeaderSticky from "@/components/XtxHeaderSticky.vue";
</script>