<!-- 评价筛选组件: src/views/goods/components/CommentScreen.vue -->
<template>
    <div class="head">
        <div class="data">
            <p><span>{{ evaluateInfo.result.salesCount }}</span><span>人购买</span></p>
            <p><span>{{ evaluateInfo.result.praisePercent }}</span><span>好评率</span></p>
        </div>
        <div class="tags">
            <div class="dt">大家都在说：</div>
            <div class="dd">
                <a href="javascript:" @click="updateReqParams({ tag: '全部评价' })"
                    :class="{ active: reqParams.tag === '全部评价' }">全部评价 ({{ evaluateInfo.result.evaluateCount }})</a>
                <a @click="updateReqParams({ hasPicture: true })" :class="{ active: reqParams.hasPicture }"
                    href="javascript:;">有图 ({{ evaluateInfo.result.hasPictureCount }})</a>
                <a v-for="tag in evaluateInfo.result.tags" :key="tag.title" @click="updateReqParams({ tag: tag.title })"
                    :class="{ active: tag.title === reqParams.tag }" href="javascript:">{{ tag.title }} ({{
                        tag.tagCount }})</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useGoodsStore } from "@/stores/goodsStore";
import type { EvaluateRequestParams } from "@/types/Goods";
import { useVModel } from "@vueuse/core";

const props = defineProps<{ reqParams: EvaluateRequestParams }>();
const emit = defineEmits(["update:reqParams"]);

const goods_Store = useGoodsStore();
const { evaluateInfo } = storeToRefs(goods_Store);
const { getEvaluateInfoHandler } = goods_Store;
const route = useRoute();

getEvaluateInfoHandler(<string>route.params.id);

// 请求参数(双向数据绑定)
const reqParams = useVModel(props, "reqParams", emit);

// 更新请求参数
function updateReqParams(target: Partial<EvaluateRequestParams>) {
    reqParams.value = {
        // 获取原有值
        ...reqParams.value,
        // 如果用户选择了有图, 将 tag 设置为 "", 否则将 tag 设置为 target.tag
        // 如果用户没有选择有图, 就一定选择了 tag, 所以 tag 一定有值
        tag: target.hasPicture ? "" : target.tag!,
        // 如果用户选择了有图, 将 hasPicture 设置为 true, 否则设置为 false
        hasPicture: target.hasPicture !== undefined,
        // 每次点击筛选条件时重置页码
        page: 1,
    };
}
</script>

<style scoped lang="less">
.head {
    display: flex;
    padding: 30px 0;

    .data {
        width: 340px;
        display: flex;
        padding: 20px;

        p {
            flex: 1;
            text-align: center;

            span {
                display: block;

                &:first-child {
                    font-size: 32px;
                    color: @priceColor;
                }

                &:last-child {
                    color: #999;
                }
            }
        }
    }

    .tags {
        flex: 1;
        display: flex;
        border-left: 1px solid #f5f5f5;

        .dt {
            font-weight: bold;
            width: 100px;
            text-align: right;
            line-height: 42px;
        }

        .dd {
            flex: 1;
            display: flex;
            flex-wrap: wrap;

            >a {
                width: 132px;
                height: 42px;
                margin-left: 20px;
                margin-bottom: 20px;
                border-radius: 4px;
                border: 1px solid #e4e4e4;
                background: #f5f5f5;
                color: #999;
                text-align: center;
                line-height: 40px;

                &:hover {
                    border-color: @xtxColor;
                    background: lighten(@xtxColor, 50%);
                    color: @xtxColor;
                }

                &.active {
                    border-color: @xtxColor;
                    background: @xtxColor;
                    color: #fff;
                }
            }
        }
    }
}
</style>