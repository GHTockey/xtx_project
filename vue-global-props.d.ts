import msg from "./src/components/library/Message";
import Confirm from "./src/components/library/Confirm";
declare module "vue" {
   interface ComponentCustomProperties {
      $msg: typeof msg;
      $confirm: typeof Confirm;
   }
}

declare global {
   interface Window {
     QC: any;
   }
 }