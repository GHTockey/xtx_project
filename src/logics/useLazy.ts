import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

// 懒加载
export default function(apiFn: () => Promise<void>) {
    const target = ref<HTMLElement>();
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        // console.log(isIntersecting);
        if (isIntersecting) {
            stop()
            apiFn()
        }
    });
    return target
}