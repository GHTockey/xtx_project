import msg from "./src/components/library/Message";
declare module "vue" {
   interface ComponentCustomProperties {
      $msg: typeof msg;
   }
}