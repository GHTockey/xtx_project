import { defineStore } from "pinia";
import type { Cart } from "@/types/Cart";
import { CartAPI } from "@/api/CartAPI";
import type { Status } from "@/types/Status";

type State = {
   carts: { result: Cart[], status: Status };
};
type Getter = {
   /** 有效商品列表 */
   effectiveCartList(): Cart[];
   /** 有效商品数量 */
   effectiveCartCount(): number;
   /** 用户选择的商品列表 */
   userSelectGoodsList(): Cart[]
   /** 用户选择的商品总数 */
   userSelectGoodsCount(): number
   /** 用户选择的商品总价 */
   userSelectGoodsAmount(): number
   /** 无效商品列表 */
   invalidCartList(): Cart[];
   /** 是否全部选中 */
   isAllSelected(): boolean;
};
type Actions = {
   /** 将商品加入购物车Handler */
   addProductToCart(sid: string, count: number): Promise<Cart>;
   /** 获取购物车列表Handler */
   getCarts(): Promise<void>;
   /** 删除购物车商品Handler */
   removeGoodsOfCart(args: {
      ids?: string[]; // 要删除的商品id
      clearAll?: boolean; // 是否清空
      clearInvalid?: boolean; // 是否清空失效商品
   }): Promise<void>;
   /** 修改商品信息Handler */
   alterCartGoods(args: {
      id: string; // 要修改的商品id
      selected?: boolean; // 是否选中
      count?: number; // 数量
   }): Promise<Cart>;
   /** 全选、取消全选Handler */
   selecteAndDeselect(selected: boolean): Promise<void>;
   /** 修改商品规格Handler */
   alterSku(oldSkuId: string, newSkuid: string): Promise<void>
};

export const useCartStore = defineStore<'cart_store', State, Getter, Actions>('cart_store', {
   state() {
      return {
         carts: { result: [], status: 'idle' }
      }
   },
   getters: {
      effectiveCartList() { // 库存 stock 大于 0
         return this.carts.result.filter(item => item.isEffective && item.stock)
      },
      effectiveCartCount() {
         return this.effectiveCartList.reduce((sum, item) => (sum += item.count), 0)
      },
      userSelectGoodsList() {
         return this.effectiveCartList.filter((item) => item.selected)
      },
      userSelectGoodsCount() {
         return this.effectiveCartList.reduce((sum, item) => {
            if (item.selected) sum += item.count
            return sum
         }, 0)
      },
      userSelectGoodsAmount() {
         return this.effectiveCartList.reduce((sum, item) => {
            if (item.selected) sum += (parseFloat(item.nowPrice) * item.count)
            // sum 只保留两位小数
            return parseFloat(sum.toFixed(2))
         }, 0)
      },
      invalidCartList() {
         return this.carts.result.filter(item => !item.isEffective || !item.stock)
      },
      isAllSelected() {
         if (this.userSelectGoodsList.length === 0) return false
         return this.userSelectGoodsList.length === this.effectiveCartList.length
      }

   },
   actions: {
      async addProductToCart(sid, count) {
         let res = await CartAPI.addProductToCart(sid, count)
         try {
            this.getCarts()
         } catch (error) { }
         return res.result // 返回添加的商品
      },
      async getCarts() {
         this.carts.status = 'loading';
         try {
            let res = await CartAPI.getCarts();
            this.carts.result = res.result;
            this.carts.status = 'success';
         } catch (error) {
            this.carts.status = 'error';
         }
      },
      async removeGoodsOfCart(args) {
         let res = await CartAPI.removeGoodsOfCart(args);
         // console.log(res,'res');
         // 如果删除成功，重新获取购物车列表
         if (res.result !== false) {
            this.getCarts()
         } else {
            throw new Error('删除购物车商品失败')
         }
      },
      async alterCartGoods(args) {
         const res = await CartAPI.alterCartGoods(args); // 发送修改请求
         this.getCarts(); // 更新购物车列表
         return res.result; // 返回修改后的商品信息
      },
      async selecteAndDeselect(selected) {
         try {
            await CartAPI.selecteAndDeselect(selected)
            this.getCarts()
         } catch (error) {

         }
      },
      async alterSku(oldSkuId: string, newSkuId: string) {
         // 根据旧商品的 skuId 查找旧的商品
         const oldGoods = this.carts.result.find(
            (item) => item.skuId === oldSkuId
         );
         // 如果找到了旧的商品
         if (typeof oldGoods == "undefined") return;
         // 从旧的商品中获取商品数量
         const goodsCount = oldGoods.count;
         // 删除旧商品
         await this.removeGoodsOfCart({ ids: [oldSkuId] });
         // 添加新商品ait this.addProductToCart(newSkuId, goodsCount);
         await this.addProductToCart(newSkuId, goodsCount);
      }
   },
})