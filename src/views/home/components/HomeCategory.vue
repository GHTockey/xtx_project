<!-- src/views/home/components/HomeCategory.vue -->
<script setup lang="ts">
import useCategoryStore from "@/stores/categoryStore";
import useHomeStore from "@/stores/homeStore";
import { storeToRefs } from "pinia";
const { categories } = storeToRefs(useCategoryStore());
const { brands } = storeToRefs(useHomeStore());
// 解构方法
const { getBrands } = useHomeStore();
getBrands(8);
</script>

<template>
   <div class="home-category">
      <ul class="menu">
         <li v-for="item in categories.homeCategory" :key="item.id">
            <RouterLink to="/">{{ item.name }}</RouterLink>
            <RouterLink to="/" v-for="sub in item.children" :key="sub.id">{{ sub.name }}</RouterLink>
            <div class="layer">
               <h4>
                  分类商品推荐 <small>根据您的购买或浏览记录推荐</small>
               </h4>
               <ul>
                  <li v-for="goods in item.goods" :key="goods.id">
                     <RouterLink to="/">
                        <img :src="goods.picture" alt="goods_img" />
                        <div class="info">
                           <p class="name ellipsis-2">{{ goods.name }}</p>
                           <p class="desc ellipsis">{{ goods.desc }}</p>
                           <p class="price"><i>¥</i>{{ goods.price }}</p>
                        </div>
                     </RouterLink>
                  </li>
               </ul>
            </div>
         </li>
         <!-- 品牌 -->
         <li>
            <RouterLink to="/">品牌</RouterLink>
            <RouterLink to="/">推荐品牌</RouterLink>
            <div class="layer">
               <h4>分类品牌推荐 <small>根据您的购买或浏览记录推荐</small></h4>
               <ul>
                  <!-- <template> -->
                     <li class="brand" v-for="item in brands.result" :key="item.id">
                        <RouterLink to="/">
                           <img :src="item.picture" :alt="item.name" />
                           <div class="info">
                              <p class="place">
                                 <i class="iconfont icon-dingwei"></i>{{ item.place }}
                              </p>
                              <p class="name ellipsis">{{ item.name }}</p>
                              <p class="desc ellipsis-2">{{ item.desc }}</p>
                           </div>
                        </RouterLink>
                     </li>
                  <!-- </template> -->
               </ul>
            </div>
         </li>
      </ul>
   </div>
</template>
  
<style scoped lang="less">
.home-category {
   width: 250px;
   height: 500px;
   background: rgba(0, 0, 0, 0.8);
   position: relative;
   z-index: 99;

   .menu {
      >li {
         padding-left: 40px;
         height: 50px;
         line-height: 50px;

         &:hover {
            background-color: @xtxColor;

            .layer {
               display: block;
            }
         }

         a {
            margin-right: 4px;
            color: #fff;

            &:first-child {
               font-size: 16px;
            }
         }
      }
   }

   .layer {
      width: 990px;
      height: 500px;
      background: rgba(255, 255, 255, 0.8);
      position: absolute;
      left: 250px;
      top: 0;
      display: none;
      padding: 0 15px;

      h4 {
         font-size: 20px;
         font-weight: normal;
         line-height: 80px;

         small {
            font-size: 16px;
            color: #666;
         }
      }

      ul {
         display: flex;
         flex-wrap: wrap;

         li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3n) {
               margin-right: 0;
            }

            li.brand {
               height: 180px;

               a {
                  align-items: flex-start;

                  img {
                     width: 120px;
                     height: 160px;
                  }

                  .info {
                     p {
                        margin-top: 8px;
                     }

                     .place {
                        color: #999;
                     }
                  }
               }
            }

            a {
               display: flex;
               width: 100%;
               height: 100%;
               align-items: center;
               padding: 10px;

               &:hover {
                  background: #e3f9f4;
               }

               img {
                  width: 95px;
                  height: 95px;
               }

               .info {
                  padding-left: 10px;
                  line-height: 24px;
                  width: 190px;

                  .name {
                     font-size: 16px;
                     color: #666;
                  }

                  .desc {
                     color: #999;
                  }

                  .price {
                     font-size: 22px;
                     color: @priceColor;

                     i {
                        font-size: 16px;
                     }
                  }
               }
            }
         }
      }
   }
}
</style>