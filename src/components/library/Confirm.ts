import { h, render } from "vue";
import XtxConfirm from "../XtxConfirm.vue";

export type callback = () => void;

export default function Confirm(props: {
   title?: string;
   content: string;
   sure?: callback;
   cancel?: callback;
}) {
   // 创建虚拟 dom
   const vNode = h(XtxConfirm, { ...props, close })
   // 创建一个真实 dom 以将虚拟 dom 挂载上去
   const container = document.createElement("div");
   // 将虚拟 dom 挂载到真实 dom 上
   render(vNode, container);
   // 将真实 dom 挂载到页面上
   document.body.appendChild(container);
   // 关闭确认框的方法
   function close() {
      render(null, container);
      document.body.removeChild(container);
   }
};