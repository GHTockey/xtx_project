// 通过判断本地是否有 token 来检测用户是否登录
import { useUserStore } from "@/stores/userStore";

export default function isLogin() {
  // 获取 token
  const token = useUserStore().profile.result.token;
  // 根据 token 是否存在返回布尔值
  return typeof token !== "undefined";
}