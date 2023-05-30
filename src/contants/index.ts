import type { Category } from "@/types/Home/Category";

// Pick泛型方法：接收类型返回指定类型中的某些键的新类型
export const CATEGORIES: Pick<Category, 'id' | 'name'>[] = [
    { id: "1", name: "居家" },
    { id: "2", name: "美食" },
    { id: "3", name: "服饰" },
    { id: "4", name: "母婴" },
    { id: "5", name: "个护" },
    { id: "6", name: "严选" },
    { id: "7", name: "数码" },
    { id: "8", name: "运动" },
    { id: "9", name: "杂项" },
];

// 订单状态
export const orderStatus = [
    { name: "all", label: "全部订单" },
    { name: "unpay", label: "待付款" },
    { name: "deliver", label: "待发货" },
    { name: "receive", label: "待收货" },
    { name: "comment", label: "待评价" },
    { name: "complete", label: "已完成" },
    { name: "cancel", label: "已取消" },
];