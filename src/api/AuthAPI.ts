import type { Response } from "@/types/Res";
import type { User } from "@/types/User";
import XtxRequestManager from "@/utils/request";

export class AuthAPI {
   // 账号密码登录
   static loginByAccount(account: string, password: string) {
      return XtxRequestManager.createInstance.request<Response<User>,
         { account: string; password: string }
      >({
         url: "http://pcapi-xiaotuxian-front-devtest.itheima.net/login",
         method: "post",
         data: {
            account,
            password,
         },
      });
   }
}