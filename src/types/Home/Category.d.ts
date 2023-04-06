import type { Brand } from "../Home";

export interface Goods {
    id: string;
    name: string;
    desc: string;
    price: string;
    picture: string;
    discount: number | null;
    orderNum: number | null;
}

export interface Category {
    id: string;
    name: string;
    picture: string;
    children: Category[];
    goods: Goods[];

    saleInfo: string;

    saleProperties: SaleProperty[];
    brands: Brand[];
}

interface SaleProperty {
    id: string;
    name: string;
    properties: Omit<SaleProperty, "properties">[];
}

