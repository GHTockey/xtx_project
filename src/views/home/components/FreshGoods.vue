<!-- src/views/home/components/FreshGoods.vue -->
<template>
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
        <!-- 查看全部 -->
        <template v-slot:right>
            <XtxMore />
        </template>
        <!-- 内容 -->
        <template v-slot:default>
            <div class="relative">
                <ul class="goods-list">
                    <li v-for="item in freshGoods.result" :key="item.id">
                        <RouterLink to="/">
                            <img :src="item.picture" :alt="item.id" />
                            <p class="name ellipsis">{{ item.name }}</p>
                            <p class="price">&yen;{{ item.price }}</p>
                        </RouterLink>
                    </li>
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
export default {
    // 注册组件
    components: { HomePanel, XtxMore },
    setup() {
        const homeStore = useHomeStore();
        const { freshGoods } = storeToRefs(homeStore);
        const { getFreshGoods } = homeStore;
        getFreshGoods(4)

        return {
            // return 属性以在模板中使用
            freshGoods
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