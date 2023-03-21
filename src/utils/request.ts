import axios from "axios";
import useUserStore from "@/stores/user";
import router from "@/router";

import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from "axios";

// readonly 只读属性, 初始化赋值后不可更改。
// private 私有属性, 只能在当前类中使用
// static 静态属性, 只能通过类访问
export default class XtxRequestManager {
    private _userStore = useUserStore()
    readonly _instance: AxiosInstance // axios 实例
    private static _singletonInstance: XtxRequestManager // 类的单例
    static baseURL: string = "https://pcapi-xiaotuxian-front-devtest.itheima.net"

    private constructor() {
        // 请求基准地址
        this._instance = axios.create({ baseURL: XtxRequestManager.baseURL })
        // 请求拦截 (安装 axios@0.27.2 否则有类型报错)
        this._instance.interceptors.request.use((config: AxiosRequestConfig) => {
            // 添加 token 到请求头
            let token = this._userStore.profile.token
            if (token) config.headers = { Authorization: `Bearer ${token}` }
            return config
        })
        // 响应拦截
        this._instance.interceptors.response.use((response: AxiosResponse) => {
            return response.data
        }, (err: AxiosError) => {
            if (err.response?.status == 401) {
                // 清空用户信息
                this._userStore.$reset()
                // 跳转登录页
                router.push('login')
            }
        })
    }

    // 创建单例
    static createInstance() {
        if (!XtxRequestManager._singletonInstance) this._singletonInstance = new XtxRequestManager()
        return XtxRequestManager._singletonInstance
    }
    // 给外部使用的请求函数
    request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
        return this._instance.request(config)
    }
}