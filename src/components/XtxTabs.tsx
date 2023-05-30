// src/components/XtxTabs.tsx
import type { FunctionalComponent } from "vue";
import styles from "./XtxTabs.module.less";

const XtxTabs: FunctionalComponent<
   { name: string },
   {
      "update:name": (activeName: string) => void;
      onTabClick: (index: number) => void;
   }
> = (props, context) => {
   // 获取默认插槽(每个选项卡对象)
   const defaultSlots = context.slots.default?.();
   // 用于存储代表具体元素的虚拟节点
   const target: any[] = [];
   // 遍历每个虚拟节点
   defaultSlots?.forEach((item) => {
      // 检测当前虚拟节点是否通过遍历产生
      if (typeof item.type === "symbol") {
         // 如果通过遍历产生
         // 判断其 children 是否为数组类型
         if (item.children instanceof Array) {
            // 存储代表具体元素的每一个虚拟节点
            item.children?.forEach((child) => target.push(child));
         }
      } else {
         // 当前节点不是通过遍历产生
         // 即当前节点就是代码具体元素的虚拟节点
         target.push(item);
      }
   });
   // 选项卡标题被点击时
   const tabClickHandler = (index: number, activeName: string) => {
      // 更改父组件的 active 激活类名
      context.emit("update:name", activeName);
      // 将当前点击的选项卡索引传递到父组件
      context.emit("onTabClick", index);
   };
   return (
      <div class={styles["xtx-tabs"]}>
         <nav>
            {target?.map((item, index) => {
               item.props.isActive = props.name === item.props.name;
               return (
                  <a
                     href="javascript:;"
                     class={item.props.name === props.name ? styles.active : ""}
                     onClick={() => tabClickHandler(index, item.props.name)}
                  >
                     {item.props?.label}
                  </a>
               );
            })}
         </nav>
         {defaultSlots}
      </div>
   );
};

export default XtxTabs;