// 左侧品牌数据类型
export interface Brand {
    id: string;
    name: string;
    nameEn: string;
    logo: string;
    picture: string;
    type: null;
    desc: string;
    place: string;
}

// 轮播图数据类型
export interface Banner {
    id: string;
    imgUrl: string;
    hrefUrl: string;
    type: string;
}

// 人气推荐数据类型
export interface HotRecommends {
    id: string
    picture: string
    title: string
    alt: string
}