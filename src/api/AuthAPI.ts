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
   };
   // 手机验证码登录
   static loginByMobileMsgCode(mobile: string, code: string) {
      return XtxRequestManager.createInstance.request<Response<User>>({
         url: "/login/code",
         method: "post",
         data: { mobile, code },
      });
   };
   // QQ登录: 检索用户使用的QQ号是否已绑定本站账号 1: pc 2: webapp 3: 微信小程序 4: Android 5: ios 6: qq 7: 微信
   static loginByQQOpenid(unionId: string, source: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
      return XtxRequestManager.createInstance.request<Response<User>>({
         url: "/login/social",
         method: "post",
         data: { unionId, source },
      });
   };
   // 发送短信验证码(绑定已有账号)
   static sendMsgCodeOfBindQQ(mobile: string, unionId: string, source: number) {
      return XtxRequestManager.createInstance.request<Response<null>>({
         url: "/login/social/code",
         method: "get",
         data: { mobile, unionId, source },
      });
   };
   // QQ登录: 绑定站点已有账号
   static loginByBindAccount(mobile: string, code: string, unionId: string) {
      return XtxRequestManager.createInstance.request<Response<User>>({
         url: "/login/social/bind",
         method: "post",
         data: { mobile, code, unionId },
      });
   }
}