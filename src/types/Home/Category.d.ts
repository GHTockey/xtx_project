import type { Brand } from "../Home";

export interface Category {
    id: string;
    name: string;
    picture: string;
    children: Category[];
    goods: Goods[];

    saleInfo: string;

    saleProperties: SaleProperty[];
    brands: Brand[];

    layer: number;
    parent: Category | undefined;
}
/**666 */
interface SaleProperty {
    id: string;
    name: string;
    properties: Omit<SaleProperty, "properties">[];
}

/**获取商品列表的请求参数接口规范 */
export interface GoodsRequestParams {
    categoryId: string; // 二级分类ID
    inventory: boolean; // 是否仅显示有货商品
    onlyDiscount: boolean; // 是否只显示特惠商品
    // "": 默认排序  publishTime:最新商品  orderNum:最高人气  evaluate:评论最多  price:价格
    sortField: "" | "publishTime" | "orderNum" | "price" | "evaluateNum";
    // asc:升序  desc:降序
    sortMethod: "" | "asc" | "desc";
    brandId: string; // 品牌 ID
    // 筛选条件  groupName:筛选类别名称  propertyName:筛选条件名称
    attrs: { groupName: string; propertyName: string }[];
    page: number; // 当前页
    pageSize: number; // 每页显示的数据条数
    lowPrice: number; // 最低价
    highPrice: number; // 最高价
}

/** 商品列表 */
export interface Pagination<T> {
    page: number;
    pages: number;
    pageSize: number;
    counts: number;
    items: T[];
}