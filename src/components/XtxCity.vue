<!-- src/components/XtxCity.vue -->
<template>
    <div class="xtx-city" ref="target">
        <div class="select" @click="toggle" :class="{ active: visible }">
            <span class="placeholder" v-if="!fullLocation">{{ pp }}</span>
            <span class="value" v-else>{{ fullLocation }}</span>
            <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="option" v-show="visible">
            <template v-if="status === 'success'">
                <span class="ellipsis" v-for="item in cities" :key="item.code"
                    @click="updateCities(item.code, item.level, item.name)">{{ item.name
                    }}</span>
            </template>
            <template v-if="status === 'loading'">
                <div class="loading"></div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from "axios";
import { onClickOutside } from "@vueuse/core";
import type { Status } from '@/types/Status';

const props = withDefaults(defineProps<{
    pp?: string,
    fullLocation: string, // 在页面中展示用户的选择结果(城市名称)
}>(), {
    pp: '请选择收货地址'
});

// 用于控制弹框的显示和隐藏
const visible = ref(false);
// 用于存储城市选择组件的最外层元素
const target = ref<HTMLDivElement>();
// 在页面中展示的城市状态
const cities = ref<City[]>([]);

// 在页面中展示用户的选择结果(城市名称)
// const fullLocation = useVModel(props, "fullLocation");

// 记录用户选择的省市区编码
const addressCode: Partial<AddressCode> = {};
const addressName: Partial<AddressName> = {};

// 声明城市数据类型
interface City {
    code: string;
    level: number;
    name: string;
    areaList: City[];
}
// 城市编码接口规范
interface AddressCode {
    provinceCode: string;
    cityCode: string;
    countyCode: string;
}
type AddressName = {
    provinceName: string;
    cityName: string;
    countyName: string;
};

// 控制弹框隐藏
function hide() {
    visible.value = false;
}
// 控制弹框切换
function toggle() {
    visible.value ? hide() : show();
}

// 在城市选择组件外部点击时隐藏该组件
onClickOutside(target, hide);


// 定义要触发的自定义事件 (用户选择城市结束后将城市码传递到组件外部)
const emit = defineEmits<{
    (e: "onChange", code: AddressCode): void;
    (e: "update:fullLocation", fullLocation: string): void;
}>();
// 声明城市数据
let cachedCities: City[] = [];
// 城市数据的加载状态
const status = ref<Status>("idle");
// 控制弹框显示
async function show() {
    visible.value = true;
    // 如果城市数据不存在
    if (cachedCities.length === 0) {
        // 更新城市数据加载状态
        status.value = "loading";
        // 发送请求获取城市数据
        let response = await axios.get(
            "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
        );
        // 存储城市数据
        cachedCities = response.data;
        // 更新城市数据加载状态
        status.value = "success";
        cities.value = cachedCities;
    }
}

// 更新城市弹层内容, 记录用户选择的城市编码
function updateCities(code: string, level: number, name: string) {
    // 更新城市弹层内容
    cities.value = cities.value.find((city) => city.code === code)!.areaList!;
    switch (level) {
        case 0:
            addressCode.provinceCode = code;
            addressName.provinceName = name;
            break;
        case 1:
            addressCode.cityCode = code;
            addressName.cityName = name;
            break;
        case 2:
            addressCode.countyCode = code;
            addressName.countyName = name;
            let fullLocation = addressName.provinceName! + addressName.cityName! + addressName.countyName!;
            // console.log(fullLocation);
            emit('update:fullLocation', fullLocation);
            emit('onChange', addressCode as Required<AddressCode>);
            hide();
            break;
    }
}
</script>
  
<style scoped lang="less">
.xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;

    .select {
        border: 1px solid #e4e4e4;
        height: 30px;
        padding: 0 5px;
        line-height: 28px;
        cursor: pointer;

        &.active {
            background: #fff;
        }

        .placeholder {
            color: #999;
        }

        .value {
            color: #666;
            font-size: 12px;
        }

        i {
            font-size: 12px;
            margin-left: 5px;
        }
    }

    .option {
        width: 542px;
        border: 1px solid #e4e4e4;
        position: absolute;
        left: 0;
        top: 29px;
        background: #fff;
        min-height: 30px;
        line-height: 30px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;

        >span {
            width: 130px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            padding: 0 3px;

            &:hover {
                background: #f5f5f5;
            }
        }

        .loading {
            height: 290px;
            width: 100%;
            background: url(@/assets/images/loading.gif) no-repeat center;
        }
    }
}
</style>