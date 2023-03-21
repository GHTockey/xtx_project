<!-- src/components/XtxHeaderNav.vue -->
<template>
    <ul class="app-header-nav">
        <li class="home">
            <RouterLink to="/">首页</RouterLink>
        </li>
        <li v-for="item in categories.headerNav" v-if="categories.headerNav.length">
            <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
            <div class="layer">
                <ul>
                    <li v-for="sub in item.children" :key="sub.id">
                        <RouterLink :to="`/category/sub/${item.id}/${sub.id}`">
                            <img :src="sub.picture" alt="" />
                            <p>{{ sub.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </li>
        <li v-else v-for="item in CATEGORIES">
            <a href="#">
                <p>{{ item.name }}</p>
            </a>
        </li>
    </ul>
</template>


<script setup lang="ts">
import useCategoryStore from "@/stores/categoryStore";
import { storeToRefs } from "pinia";
import { CATEGORIES } from "@/contants";

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);
const { getCategories } = categoryStore;

getCategories();
</script>
  
<style scoped lang="less">
.app-header-nav {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    >li {
        margin-right: 40px;
        width: 38px;
        text-align: center;

        >a {
            font-size: 16px;
            line-height: 32px;
            height: 32px;
            display: inline-block;
        }

        &:hover {
            >a {
                color: @xtxColor;
                border-bottom: 1px solid @xtxColor;
            }

            >.layer {
                height: 132px;
                opacity: 1;
            }
        }
    }

    .layer {
        width: 1240px;
        background-color: #fff;
        position: absolute;
        left: -200px;
        top: 56px;
        height: 0;
        overflow: hidden;
        opacity: 0;
        box-shadow: 0 0 5px #ccc;
        transition: all 0.2s 0.1s;

        ul {
            display: flex;
            flex-wrap: wrap;
            padding: 0 70px;
            align-items: center;
            height: 132px;

            li {
                width: 110px;
                text-align: center;

                img {
                    width: 60px;
                    height: 60px;
                }

                p {
                    padding-top: 10px;
                }

                &:hover {
                    p {
                        color: @xtxColor;
                    }
                }
            }
        }
    }
}
</style>