import { useIntervalFn } from "@vueuse/core";
import { ref } from "vue";

// src/logics/useCountdown.ts
export default function useCountdown() {
   // 秒数
   const count = ref(60);
   // 倒计时
   const { pause, resume, isActive } = useIntervalFn(
      () => {
         // 如果 count 大于 0
         if (count.value > 0) {
            // count 自身减一
            count.value--;
         } else {
            // 如果 count 小于等于 0 停止倒计时
            pause();
         }
      },
      1000,
      // 不要立即执行倒计时
      { immediate: false }
   );
   // 开始倒计时, 接收倒计时秒数
   const start = (seconds: number) => {
      // 如果正在倒计时, 阻止程序继续开启倒计时
      if (isActive.value) return;
      // 重置倒计时秒数
      count.value = seconds;
      // 开始倒计时
      resume();
   };
   return { count, start, isActive };
}