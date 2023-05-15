// 路由守卫
import isLogin from "@/utils/isLogin";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";


export default function authGuard(
   to: RouteLocationNormalized,
   from: RouteLocationNormalized,
   next: NavigationGuardNext
) {
   // 路由白名单
   const allowPath = ["/", "/login", "/login/callback"];
   // 如果用户访问的是需要登录的页面并且他还没登录
   if (!allowPath.includes(to.path) && !isLogin()) {
      // 如果用户访问的不是首页
      next({ path: "/login", query: { return: to.fullPath } });
   } else {
      next();
   }
}