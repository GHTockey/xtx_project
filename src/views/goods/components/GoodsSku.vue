<template>
    <div class="goods-sku">
        <dl v-for="spec, index in specs" :key="spec.id">
            <dt>{{ spec.name }}</dt>
            <dd>
                <template v-for="(item, i) in spec.values">
                    <img :class="{ selected: UIStatus[index][i].selected, disabled: UIStatus[index][i].disabled }"
                        v-if="item.picture" :src="item.picture" :alt="item.name" @click="setSelectedUIState(index, i)" />
                    <span :class="{ selected: UIStatus[index][i].selected, disabled: UIStatus[index][i].disabled }" v-else
                        @click="setSelectedUIState(index, i)">
                        {{ item.name }}
                    </span>
                </template>
            </dd>
        </dl>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { Spec } from "@/types/Goods";
const props = defineProps<{ specs: Spec[] }>();

const UIStatus = reactive(createUIStatus(props.specs))
// console.log(UIStatus);


// 规格选项对应的页面状态类型
interface UIStatus {
    selected: boolean; // 是否选中
    disabled: boolean; // 是否禁用
};


// 根据规格数据创建其对应的界面状态
function createUIStatus(specs: Spec[]) {
    const UIStatus: UIStatus[][] = [];
    specs.forEach((spec) => {
        const group: UIStatus[] = [];
        spec.values.forEach(() => {
            // 设置每一个规格选项的选中状态和禁用状态(初始值)
            group.push({ selected: false, disabled: false });
        });
        UIStatus.push(group);
    });
    // 返回 UI 状态数组
    return UIStatus;
};
// 更新规格的选中状态
function setSelectedUIState(index: number, i: number) {
    const current = UIStatus[index][i];
    const group = UIStatus[index];
    if (current.selected) {
        current.selected = false;
    } else {
        group.forEach((item) => (item.selected = false));
        current.selected = true;
    }
}
</script>

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