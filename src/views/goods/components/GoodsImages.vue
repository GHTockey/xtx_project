<!-- src/views/goods/components/GoodsImages.vue -->
<template>
    <div class="goods-image">
        <!-- 放大 -->
        <div class="large" v-show="show" :style="{
            backgroundImage: `url(${mainPictures[current]})`,
            backgroundPositionX: bgPosition.x + 'px',
            backgroundPositionY: bgPosition.y + 'px',
        }"></div>
        <div class="middle" ref="middleElement">
            <img :src="mainPictures[current]" />
            <div class="layer" v-show="show" :style="{ top: layerPosition.top + 'px', left: layerPosition.left + 'px' }">
            </div>
            <!-- 商品销售信息组件 -->
            <GoodsSales />
        </div>
        <ul class="small">
            <!-- 小图列表 -->
            <li :class="{ active: i === current }" v-for="item, i in mainPictures" :key="i" @mouseenter="current = i">
                <img :src="item" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useGoodsStore } from "@/stores/goodsStore";
import { reactive, ref, watchEffect } from "vue";
import { useMouseInElement } from "@vueuse/core";

import GoodsSales from "./GoodsSales.vue";

const goods_store = useGoodsStore();
let { mainPictures } = storeToRefs(goods_store);

// 展示的图片的索引
const current = ref(0);
// 用于控制镜片和大图的显示和隐藏
const show = ref(false);
// 用于获取中图元素
const middleElement = ref(null);
// isOutside: 鼠标是否在元素的外部 true: 是 false: 否
// elementX/Y 鼠标在目标元素里的位置
const { isOutside, elementX, elementY } = useMouseInElement(middleElement);
// 用于记录镜片位置
const layerPosition = reactive({ left: 0, top: 0 });
// 用于记录大图位置
const bgPosition = reactive({ x: 0, y: 0 });

watchEffect(() => {
    show.value = !isOutside.value
    layerPosition.left = elementX.value - 100
    layerPosition.top = elementY.value - 100
    // 对镜片元素的水平方向位置进行限制
    if (layerPosition.left < 0) {
        layerPosition.left = 0;
    } else if (layerPosition.left > 200) {
        layerPosition.left = 200;
    }
    // 对镜片元素的垂直方向位置进行限制
    if (layerPosition.top < 0) {
        layerPosition.top = 0;
    } else if (layerPosition.top > 200) {
        layerPosition.top = 200;
    }
    // 记录大图位置
    bgPosition.x = -layerPosition.left * 2;
    bgPosition.y = -layerPosition.top * 2;
})
</script>

<style scoped lang="less">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;
    z-index: 500;

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
        position: relative;
        cursor: move;

        .layer {
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.2);
            left: 0;
            top: 0;
            position: absolute;
        }
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid @xtxColor;
            }
        }
    }

    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }
}
</style>
