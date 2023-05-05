import Msg from "./Message";
import type { App } from "vue";
export default {
   install(app: App) {
      // 将 Msg 方法挂载到全局属性方便组件访问
      app.config.globalProperties['$msg'] = Msg
   }
}