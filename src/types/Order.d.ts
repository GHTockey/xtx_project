// 创建订单时返回的订单对象
export interface OrderOfCreateResponse {
   userAddresses: Address[];
   goods: Goods[];
   summary: Summary;
}
// 用户的收货地址列表
export interface Address {
   id: string;
   provinceCode: string;
   cityCode: string;
   countyCode: string;
   address: string;
   isDefault: number;
   receiver: string;
   contact: string;
   fullLocation: string;
   postalCode: string;
}
// 订单中的商品列表
export interface Goods {
   id: string;
   name: string;
   picture: string;
   count: number;
   skuId: string;
   attrsText: string;
   price: string;
   payPrice: string;
   totalPrice: string;
   totalPayPrice: string;
}
// 订单中的结算信息
export interface Summary {
   goodsCount: number;
   totalPrice: number;
   totalPayPrice: number;
   postFee: number;
   discountPrice: number;
}

// 添加/修改收货地址的请求参数
export interface EditAdressObject {
   // 修改时使用
   id?: string;
   // 修改时使用
   fullLocation?: string;
   receiver: string;
   contact: string;
   provinceCode: string;
   cityCode: string;
   countyCode: string;
   address: string;
   postalCode: string;
   addressTags: string;
   isDefault: boolean | number;
}

export interface Address {
   id: string;
   provinceCode: string;
   cityCode: string;
   countyCode: string;
   address: string;
   isDefault: number | boolean;
   receiver: string;
   contact: string;
   fullLocation: string;
   postalCode: string;
}

// 提交订单的传递的订单对象
export interface SubmitOrderObject {
   // 商品数组
   goods: { skuId: string; count: number }[];
   // 收货地址 id
   addressId: string;
   // 配送时间类型, 1为不限, 2为工作日, 3为双休或假日
   deliveryTimeType: 1 | 2 | 3;
   // 支付方式, 1为在线支付, 2为货到付款
   payType: 1 | 2;
   // 支付渠道, 1支付宝, 2微信
   payChannel: 1 | 2;
   // 买家留言
   buyerMessage: string;
}
// 提交订单接口的返回值
export interface SubmitOrderResponse {
   id: string;
   payType: 1 | 2;
   payChannel: 1 | 2;
}