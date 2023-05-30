// src/components/XtxTabPane.tsx
import type { SetupContext } from "vue";

const XtxTabPane = (
   // label: 选项卡标题
   // name: 选项卡唯一标识
   // isActive: 选项卡是否渲染的标识
   props: Readonly<{ label: string; name: string; isActive?: boolean }>,
   context: SetupContext
) => {
   // 根据标识决定是否渲染选项卡内容
   return props.isActive ? <div>{context.slots.default?.()}</div> : null;
};
// 
export default XtxTabPane;