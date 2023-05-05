import XtxMessage from "@/components/XtxMessage.vue";
import type { Props } from "@/components/XtxMessage.vue";
import { h, render } from "vue";

export default function msg(props: Props) {
   const vNode = h(XtxMessage, props) // 将组件转为虚拟 dom
   const container = document.createElement("div"); // 创建一个真实 dom
   document.body.appendChild(container); //  将真实 dom 渲染到页面中
   render(vNode, container); // 将虚拟 dom 渲染到真实 dom 中

   setTimeout(() => {
      const toggle = vNode.component?.exposed?.toggle;
      if (typeof toggle !== 'undefined') {
         toggle.value = false; // 执行离场动画
         setTimeout(() => {
            document.body.removeChild(container);
         }, 800);
      }
   }, 3000);
}