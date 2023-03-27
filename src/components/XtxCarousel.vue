<!-- src/components/XtxCarousel.vue -->
<template>
   <div class="xtx-carousel" @mouseenter="stopTimer" @mouseleave="beginTimer">
      <ul class="carousel-body">
         <li class="carousel-item" :class="{ 'fade': currentIndex == i }" v-for="item, i in list" :key="item.id">
            <RouterLink :to="item.hrefUrl">
               <img :src="item.imgUrl" alt="banner" />
            </RouterLink>
         </li>
      </ul>
      <a href="javascript:" class="carousel-btn prev" @click="toggle(-1)"><i class="iconfont icon-angle-left"></i></a>
      <a href="javascript:" class="carousel-btn next" @click="toggle(1)"><i class="iconfont icon-angle-right"></i></a>
      <div class="carousel-indicator">
         <span v-for="i in list.length" :key="i" :class="{ 'active': currentIndex == i - 1 }"
            @click="currentIndex = i - 1"></span>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Banner } from "@/types/Home"
const props = withDefaults(
   defineProps<{
      list: Banner[],
      // 是否自动轮播图
      autoPlay?: boolean,
      // 自动轮播间隔时间
      duration?: number,
   }>(), {
   autoPlay: true,
   duration: 3000
});

// 当前显示轮播图的下标
let currentIndex = ref<number>(3);
// 定时器
let timer: number | undefined = undefined;


// 自动轮播
function autoPlay() {
   clearInterval(timer);
   timer = setInterval(() => {
      if (currentIndex.value >= props.list.length - 1) {
         currentIndex.value = 0
         return
      };
      currentIndex.value++;
   }, props.duration)
};
// 按钮切换
function toggle(n: 1 | -1) {
   if (currentIndex.value >= props.list.length - 1 && n === 1) {
      currentIndex.value = 0
      return
   } else if (currentIndex.value <= 0 && n === -1) {
      currentIndex.value = props.list.length - 1
      return
   };
   currentIndex.value += n;
};
// 暂停轮播
function stopTimer() {
   clearInterval(timer)
};
// 开始轮播
function beginTimer(){
   if (props.autoPlay) {
      autoPlay()
   }
};

beginTimer();
</script>
  
<style scoped lang="less">
.xtx-carousel {
   width: 100%;
   height: 100%;
   min-width: 300px;
   min-height: 150px;
   position: relative;

   .carousel {
      &-body {
         width: 100%;
         height: 100%;
      }

      &-item {
         width: 100%;
         height: 100%;
         position: absolute;
         left: 0;
         top: 0;
         opacity: 0;
         transition: opacity 0.5s linear;

         &.fade {
            opacity: 1;
            z-index: 1;
         }

         img {
            width: 100%;
            height: 100%;
         }
      }

      &-indicator {
         position: absolute;
         left: 0;
         bottom: 20px;
         z-index: 2;
         width: 100%;
         text-align: center;

         span {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            cursor: pointer;

            ~span {
               margin-left: 12px;
            }

            &.active {
               background: #fff;
            }
         }
      }

      &-btn {
         width: 44px;
         height: 44px;
         background: rgba(0, 0, 0, 0.2);
         color: #fff;
         border-radius: 50%;
         position: absolute;
         top: 228px;
         z-index: 2;
         text-align: center;
         line-height: 44px;
         opacity: 0;
         transition: all 0.5s;

         &.prev {
            left: 20px;
         }

         &.next {
            right: 20px;
         }
      }
   }

   &:hover {
      .carousel-btn {
         opacity: 1;
      }
   }
}
</style>

<!-- 

-->