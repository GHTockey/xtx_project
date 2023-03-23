import { onMounted, onUnmounted, ref } from "vue";
export default function useScrollTop() {
    const scrollTop = ref(0)
    const onScrollTopHandler = () => {
        scrollTop.value = document.documentElement.scrollTop
    }
    onMounted(() => {
        window.addEventListener('scroll', onScrollTopHandler)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', onScrollTopHandler)
    })
    return scrollTop
}