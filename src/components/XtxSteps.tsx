// src/components/XtxSteps.tsx
import type { FunctionalComponent } from "vue";
import styles from "@/components/XtxSteps.module.less";

interface Props {
   active: number;
}

export const XtxSteps: FunctionalComponent<Props> = (props, context) => {
   // 获取默认插槽内容
   const defaultSlots = context.slots?.default?.();
   // 存储最终要渲染的虚拟节点
   const result: any[] = [];
   // 遍历虚拟节点
   defaultSlots?.forEach((item) => {
      // 检测当前虚拟节点是否是 v-for 生成的
      if (typeof item.type === "symbol") {
         // 检测 children 是否为数组
         if (item.children instanceof Array) {
            // 存储最终要渲染的虚拟节点
            item.children.forEach(result.push);
         }
      } else {
         // 存储当前要渲染的虚拟节点
         result.push(item);
      }
   });
   return (
      <div class={styles["xtx-steps"]}>
         {result.map((item, index) => (
            <div
               class={`${styles["xtx-steps-item"]} ${index + 1 <= props.active ? styles.active : ""
                  }`}
            >
               <div class={styles["step"]}>
                  <span>{index + 1}</span>
               </div>
               <div class={styles["title"]}>{item.props.title}</div>
               <div class={styles["desc"]}>{item.props.desc}</div>
            </div>
         ))}
      </div>
   );
};