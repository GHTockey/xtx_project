import type { Brand } from "./Home";

export interface Goods {
    id: string;
    name: string;
    desc: string;
    price: string;
    picture: string;
    discount: number | null;
    orderNum: number | null;
    // 添加属性
    spuCode: string;
    oldPrice: string;
    inventory: number;
    brand: Brand[];
    salesCount: number;
    commentCount: number;
    collectCount: number;
    mainVideos: string[];
    videoScale: number;
    mainPictures: string[];
    specs: Spec[];
    skus: Sku[];
    categories: Pick<Category, "id" | "name" | "layer" | "parent">[];
    details: GoodsDetailInfo;
    isPreSale: boolean;
    isCollect: boolean;
    userAddresses: null;
    similarProducts: Goods[];
    hotByDay: Goods[];
    evaluationInfo: null;
}
// 规格
export interface Spec {
    id: string;
    name: string;
    values: SpecValue[];
}
// 规格选项
export interface SpecValue {
    name: string;
    picture: string;
    desc: string;
}
// 库存单位
export interface Sku {
    id: string;
    skuCode: string;
    price: string;
    oldPrice: string;
    inventory: number;
    specs: { name: string; valueName: string }[];
}
// 商品详情信息
export interface GoodsDetailInfo {
    pictures: string[];
    properties: { name: string; value: string }[];
}

// 评价标签
export interface EvaluateTag {
    title: string; // 标签名称
    tagCount: number; // 被打标签的数量
}
// 评价信息
export interface EvaluateInfo {
    salesCount: number; // 售卖数量
    praisePercent: string; // 好评率
    evaluateCount: number; // 评价数量(总)
    hasPictureCount: number; // 评价数量(有图)
    tags: EvaluateTag[]; // 评价标签
}