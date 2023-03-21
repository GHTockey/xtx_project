// 接口返回的数据
export interface Response<T> {
    msg: string;
    code: string;
    result: T
}