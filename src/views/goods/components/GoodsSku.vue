<template>
    <div class="goods-sku">
        <dl v-for="(spec, index) in specs">
            <dt>{{ spec.name }}</dt>
            <dd>
                <template v-for="(item, i) in spec.values">
                    <img :class="{ selected: UIStatus[index][i].selected, disabled: UIStatus[index][i].disabled }"
                        v-if="item.picture" :src="item.picture" :alt="item.name"
                        @click="setSelectedUIState(index, i); sendGoodsInfoToParent()" />
                    <span :class="{ selected: UIStatus[index][i].selected, disabled: UIStatus[index][i].disabled }" v-else
                        @click="setSelectedUIState(index, i); sendGoodsInfoToParent()">
                        {{ item.name }}
                    </span>
                </template>
            </dd>
        </dl>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { Sku, Spec } from "@/types/Goods";
import bwPowerSet from "@/vendors/power-set";
import type { Data } from "@/stores/goodsStore";

const props = defineProps<{
    specs: Spec[],
    skus: Sku[],
    skuId?: string
}>();
const emit = defineEmits<{
    (e: 'complete', data: Data): void;
    (e: 'uncomplete'): void;
}>();

const UIStatus = reactive(createUIStatus(props.specs))
// console.log(UIStatus);
// 规格查询对象
const pathMap = createPathMap();

setDisabledUIState();
setSpecDefaultSelected();

// 规格查询字典类型规范
interface PathMap {
    [key: string]: string | null;
}

// 规格选项对应的页面状态类型
interface UIStatus {
    selected: boolean; // 是否选中
    disabled: boolean; // 是否禁用
};


/** 根据规格数据创建其对应的界面状态 */
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
/** 更新规格的选中状态 */
function setSelectedUIState(index: number, i: number) {
    const current = UIStatus[index][i];
    const group = UIStatus[index];
    if (current.disabled) return; // 阻止选择
    if (current.selected) {
        current.selected = false;
    } else {
        group.forEach((item) => (item.selected = false));
        current.selected = true;
    }
    setDisabledUIState();
};

/** 创建规格对象 */
function createPathMap(): PathMap {
    let pathMap: PathMap = {};
    props.skus.filter(sku => sku.inventory != 0)
        .forEach(sku => {
            let valNames = sku.specs.map(spec => spec.valueName)
            // 组合
            let sets = bwPowerSet(valNames).filter(set => set.length > 0)
            sets.forEach(setKey => {
                const key = setKey.join("_");
                if (setKey.length === valNames.length) {
                    pathMap[key] = sku.id
                } else {
                    pathMap[key] = null
                }
            })
        })
    // console.log(pathMap);
    return pathMap
};

/** 设置规格的禁用状态 */
function setDisabledUIState() {
    // 获取页面中展示的规格数据
    const specs = props.specs;
    // 获取用户选择的规格名称数组
    const selected = getUserSelected();
    // console.log(selected);
    // 遍历规格组
    specs.forEach((spec, index) => {
        // 遍历每一个具体的规格
        spec.values.forEach((value, i) => {
            UIStatus[index][i].disabled = !(value.name in pathMap);

            // ----------------------
            // console.log(UIStatus[index][i].selected);
            if (UIStatus[index][i].selected) return;
            // console.log(value.name);
            // console.log(selected,1);
            selected[index] = value.name;
            // console.log(selected, 2);
            const key = selected.filter((name) => name).join("_");

            UIStatus[index][i].disabled = !(key in pathMap);
            console.log(!(key in pathMap), key);
            // ----------------------
        })
    });
};

/** 获取用户选择的规格名称数组 */
function getUserSelected() {
    // 声明用于存储用户选择的规格名称数组
    const names: (string | undefined)[] = [];
    // 遍历规格组
    props.specs.forEach((spec, index) => {
        // 查找当前规格组中被选中的规格的索引
        const selectedIndex = UIStatus[index].findIndex((item) => item.selected);
        if (selectedIndex !== -1) {
            names[index] = spec.values[selectedIndex].name;
        } else {
            names[index] = undefined;
        }
    });
    return names;
};

// 设置规格默认选中
function setSpecDefaultSelected() {
    if (typeof props.skuId !== "undefined") {
        // 查找默认选中的规格对象, 从中获取规格名称
        const selected = props.skus.find((sku) => sku.id === props.skuId);
        // console.log('props.skus',props.skus)

        // 如果没有找到默认选中的规格对象, 阻止程序继续运行
        if (typeof selected === "undefined") return;
        // 获取默认选中的规格名称数组
        const names = selected.specs.map((spec) => spec.valueName);
        // 遍历页面中展示的规格(组)
        props.specs.forEach((spec, index) =>
            // 遍历页面中展示的每一个具体的规格
            spec.values.forEach((value, i) => {
                // 查看当前遍历的规格的名称是否被包含在默认选中的规格名称数组中
                if (names.includes(value.name)) {
                    // 设置当前规格的选中状态
                    UIStatus[index][i].selected = true;
                    console.log(1);
                }
            })
        );
    }
};

// 向父组件传递商品信息
function sendGoodsInfoToParent() {
    // 获取用户选择的规格名称数组 ["黑色", undefined, undefined] => ["黑色"]
    const selected = getUserSelected().filter((item) => item);
    // 判断用户是否选择了完整的规格信息
    if (selected.length === props.specs.length) {
        // 获取规格 skuId
        // { "黑色_中国_10cm": "skuId", "黑色": null }
        const skuId = pathMap[selected.join("_")]!;
        // 根据 skuId 查找规格对象
        const sku = props.skus.find((sku) => sku.id === skuId);
        // 如果找到了规格对象
        if (typeof sku !== "undefined") {
            // 触发自定义事件, 向外部传递最新商品信息
            emit("complete", {
                price: sku.price,
                oldPrice: sku.oldPrice,
                inventory: sku.inventory,
                skuId: skuId,
            });
        }
    } else {
        // 用户没有选择完整的规则
        emit("uncomplete");
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