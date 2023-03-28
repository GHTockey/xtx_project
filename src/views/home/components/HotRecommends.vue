<!-- src/views/home/components/HotRecommends.vue -->
<template>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
        <div class="relative" ref="target">
            <ul class="goods-list">
                <li v-for="item in hotRecommends.result" :key="item.id">
                    <RouterLink to="/">
                        <img :src="item.picture" :alt="item.alt" />
                        <p class="name">{{ item.title }}</p>
                        <p class="desc">{{ item.alt }}</p>
                    </RouterLink>
                </li>
                <Transition name="fade">
                    <HomeSkeleton v-if="hotRecommends.status === 'loading'" />
                </Transition>
            </ul>
        </div>
    </HomePanel>
</template>

<script setup lang="ts">
import HomePanel from "./HomePanel.vue";
import useHomeStore from "@/stores/homeStore";
import { storeToRefs } from "pinia";
import useLazyLoad from "@/logics/useLazy";
import HomeSkeleton from "./HomeSkeleton.vue";

const homeStore = useHomeStore();
const { hotRecommends } = storeToRefs(homeStore);
const { getHotRecommends } = homeStore;

// return target !!!
const target = useLazyLoad(getHotRecommends)
</script>
  
<style scoped lang="less">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 426px;

    li {
        width: 306px;
        height: 406px;
        .hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
        }

        .desc {
            color: #999;
            font-size: 18px;
        }
    }
}
</style>