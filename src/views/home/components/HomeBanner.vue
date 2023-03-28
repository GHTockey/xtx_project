<!-- src/views/home/components/HomeBanner.vue -->
<script setup lang="ts">
import XtxCarousel from "@/components/XtxCarousel.vue"; // 公共轮播图组件

import useHomeStore from "@/stores/homeStore";
import { storeToRefs } from "pinia";
const home_store = useHomeStore();
// state
const { banner } = storeToRefs(home_store);
// actions
const { getBanners } = home_store;

getBanners(1);
</script>

<template>
    <!-- 主页轮播图 -->
    <div class="home-banner">
        <XtxCarousel :list="banner.result" :autoPlay="true" :duration="2000" v-if="banner.status === 'success'">
            <template v-for="item, i in banner.result" v-slot:[`default${i}`]>
                <RouterLink :to="item.hrefUrl">
                    <img :src="item.imgUrl" alt="banner" />
                </RouterLink>
            </template>
        </XtxCarousel>
    </div>
</template>
  
<style scoped lang="less">
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;

    .xtx-carousel {
        :deep(.carousel-btn.prev) {
            left: 270px;
        }

        :deep(.carousel-indicator) {
            padding-left: 250px;
        }
    }
}
</style>