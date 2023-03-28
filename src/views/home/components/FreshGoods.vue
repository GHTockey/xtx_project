<!-- src/views/home/components/FreshGoods.vue -->
<template>
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
        <!-- 查看全部 -->
        <template v-slot:right>
            <XtxMore />
        </template>
        <!-- 内容 -->
        <template v-slot:default>
            <div class="relative" ref="target">
                <ul class="goods-list">
                    <li v-for="item in freshGoods.result" :key="item.id">
                        <RouterLink to="/">
                            <img :src="item.picture" :alt="item.id" />
                            <p class="name ellipsis">{{ item.name }}</p>
                            <p class="price">&yen;{{ item.price }}</p>
                        </RouterLink>
                    </li>
                    <Transition name="fade">
                        <HomeSkeleton v-if="freshGoods.status === 'loading'" />
                    </Transition>
                <!-- <li v-for="(item, index) in 4" :key="index">
                        <XtxSkeleton width="100%" height="80%" />
                        <p class="name ellipsis">
                            <XtxSkeleton height="30px" />
                        </p>
                </li> -->
                </ul>
            </div>
        </template>
    </HomePanel>
</template>

<script lang="ts">
import HomePanel from "./HomePanel.vue"; // 公共面板组件
import XtxMore from "@/components/XtxMore.vue"; // 查看更多组件
import useHomeStore from "@/stores/homeStore";
import { storeToRefs } from "pinia";
import useLazyLoad from "@/logics/useLazy"; // 懒加载程序
import HomeSkeleton from "./HomeSkeleton.vue"; // 骨架屏
export default {
    // 注册组件
    components: { HomePanel, XtxMore, HomeSkeleton },
    setup() {
        const homeStore = useHomeStore();
        const { freshGoods } = storeToRefs(homeStore);
        const { getFreshGoods } = homeStore;
        // getFreshGoods(4)

        // 懒加载
        const target = useLazyLoad(getFreshGoods)


        return {
            // return 属性以在模板中使用
            freshGoods, target
        }
    }
}
</script>
  
<style scoped lang="less">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;
        background: #f0f9f4;
        .hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding: 12px 30px 0 30px;
            text-align: center;
        }

        .price {
            color: @priceColor;
        }
    }
}
</style>