<!-- 评价列表组件: src/views/goods/components/CommentList.vue -->
<template>
    <div class="list">
        <div class="item" v-for="(item, index) in evaluateList.result.items" :key="item.id">
            <div class="user">
                <img :src="item.member.avatar" />
                <span>{{ item.member.nickname }}</span>
            </div>
            <div class="body">
                <div class="score">
                    <i :class="`iconfont icon-wjx0${i < item.score ? '1' : '2'}`" v-for="(soc, i) in 5" :key="i"></i>
                    <!-- <i class="iconfont icon-wjx02"></i> -->
                    <span class="attr" v-for="spe in item.orderInfo.specs">{{ spe.name }}：{{ spe.nameValue }}</span>
                </div>
                <div class="text">
                    {{ item.content }}
                </div>
                <!-- 评价图片 -->
                <CommentImage :pictures="item.pictures" />
                <div class="time">
                    <span>{{ item.createTime }}</span>
                    <span class="zan"><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CommentImage from "./CommentImage.vue";
import type { EvaluateRequestParams } from "@/types/Goods";
import { useGoodsStore } from "@/stores/goodsStore";
import { storeToRefs } from "pinia";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { watch } from "vue";

const props = defineProps<{
    reqParams: EvaluateRequestParams
}>();

const route = useRoute();
const goods_store = useGoodsStore();
const { getEvaluateList } = goods_store;
const { evaluateList } = storeToRefs(goods_store);

getEvaluateList(<string>route.params.id, props.reqParams);

watch(() => props.reqParams, () => {
    getEvaluateList(<string>route.params.id, props.reqParams)
});
onBeforeRouteUpdate(to => {
    getEvaluateList(<string>to.params.id, props.reqParams)
})
</script>
  
<style scoped lang="less">
.list {
    padding: 0 20px;

    .item {
        display: flex;
        padding: 25px 10px;
        border-bottom: 1px solid #f5f5f5;

        .user {
            width: 160px;

            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
            }

            span {
                padding-left: 10px;
                color: #666;
            }
        }

        .body {
            flex: 1;

            .score {
                line-height: 40px;

                .iconfont {
                    color: #ff9240;
                    padding-right: 3px;
                }

                .attr {
                    padding-left: 10px;
                    color: #666;
                }
            }
        }

        .text {
            color: #666;
            line-height: 24px;
        }

        .time {
            color: #999;
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
        }
    }
}
</style>