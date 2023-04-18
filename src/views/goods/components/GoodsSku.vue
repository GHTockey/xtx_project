<!-- src/views/goods/components/GoodsSku.vue -->
<script setup lang="ts">
// Spec: 在页面中展示的规格状态的类型
import type { Spec } from "@/types/Goods";
// specs: 在页面中展示的规格状态
const props = defineProps<{ specs: Spec[] }>();
</script>

<template>
    <div class="goods-sku">
        <dl v-for="spec in specs" :key="spec.id">
            <dt>{{ spec.name }}</dt>
            <dd>
                <template v-for="item in spec.values">
                    <img v-if="item.picture" :src="item.picture" :alt="item.name" />
                    <span v-else>{{ item.name }}</span>
                </template>
            </dd>
        </dl>
    </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;
    margin-bottom: 10px;

    &.selected {
        border-color: @xtxColor;
    }

    &.disabled {
        opacity: 0.6;
        border-style: dashed;
        cursor: not-allowed;
    }
}

.goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
        display: flex;
        padding-bottom: 5px;
        align-items: center;

        dt {
            width: 50px;
            color: #999;
        }

        dd {
            flex: 1;
            color: #666;

            >img {
                width: 50px;
                height: 50px;
                .sku-state-mixin ();
            }

            >span {
                display: inline-block;
                height: 30px;
                line-height: 28px;
                padding: 0 20px;
                .sku-state-mixin ();
            }
        }
    }
}
</style>