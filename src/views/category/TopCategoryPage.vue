<template>
    <div class="container">
        <TopCategoryBread />
        <XtxCarousel v-if="banner.status === 'success'" :list="banner.result" style="height: 500px">
            <template v-for="(item, i) in banner.result" :key="item.id" v-slot:[`default${i}`]>
                <RouterLink :to="item.hrefUrl">
                    <img :src="item.imgUrl" :alt="item.imgUrl" />
                </RouterLink>
            </template>
        </XtxCarousel>
        <AllSubCategories />
    </div>
</template>

<script setup lang="ts">
import TopCategoryBread from "./components/TopCategoryBread.vue";
import AllSubCategories from "./components/AllSubCategories.vue";
import XtxCarousel from "@/components/XtxCarousel.vue";
import useHomeStore from "@/stores/homeStore";
import { storeToRefs } from 'pinia';

const home_store = useHomeStore();
let { getBanners } = home_store;
let { banner } = storeToRefs(home_store);
getBanners(2);
</script>

<style lang="">
    
</style>