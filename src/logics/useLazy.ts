import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

// 懒加载
export default function (apiFn: () => Promise<void>) {
    const target = ref<HTMLElement>();
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        // console.log(target,888);
        if (isIntersecting) {
            stop()
            apiFn()
        }
    }, {
        // 目标元素进入多少比例就触发 0|1
        threshold: 0
    });
    return target
}