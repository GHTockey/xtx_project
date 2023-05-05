import type { Response } from "@/types/Res";
import type { User } from "@/types/User";
import XtxRequestManager from "@/utils/request";

export class AuthAPI {
   // 账号密码登录
   static loginByAccount(account: string, password: string) {
      return XtxRequestManager.createInstance.request<Response<User>>({
         url: "http://pcapi-xiaotuxian-front-devtest.itheima.net/login",
         method: "post",
         data: {
            account,
            password,
         },
      });
   };
   // 发送短信验证码(手机号登录)
   static sendMsgCodeOfMobileLogin(mobile: string) {
      return XtxRequestManager.createInstance.request<Response<null>>({
         url: "/login/code",
         params: { mobile },
      });
   }
}