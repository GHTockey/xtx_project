import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import authGuard from "./authGuard";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL), // 黑丝的瑞
  history: createWebHashHistory(import.meta.env.BASE_URL), // 哈希
  scrollBehavior: () => ({ top: 0 }), // 路由一旦发生变化就回到顶部
  routes: [
    {
      path: '/',
      name: '布局',
      component: () => import('../components/XtxLayout.vue'),
      children: [
        // 在children中path留空表示父组件一旦加载同时加载此组件
        { path: '', name: '主页', component: () => import('@/views/home/HomePage.vue') },
        { path: 'category/:id', name: "一级分类", component: () => import('@/views/category/TopCategoryPage.vue') },
        { path: 'category/sub/:id/:sid', name: "二级分类", component: () => import('@/views/category/SubCategoryPage.vue') },
        { path: 'goods/:id', name: '商品详情', component: () => import('@/views/goods/GoodsDetailPage.vue') },
        { path: 'cart', name: '购物车', component: () => import('@/views/cart/CartPage.vue') },
        { path: 'checkout/order', name: '订单页', component: () => import('@/views/pay/CheckoutPage.vue') },
        { path: "checkout/pay", name: '支付结算页', component: () => import("@/views/pay/PayPage.vue") },
        { path: 'pay/callback', name: '支付回调页', component: () => import('@/views/pay/PayResultPage.vue') },
        {
          path: "member", name: '个人中心布局', component: () => import("@/components/XtxMemberLayout.vue"),
          redirect: '/member/home',
          children: [
            { path: 'home', name: '个人中心布局-右', component: () => import('@/views/member/home/MemberHomePage.vue') },
            { path: 'order', name: '订单列表', component: () => import('@/views/member/order/OrderListPage.vue') },
            { path: 'order/:id', name: '订单详情', component: () => import('@/views/member/order/OrderDetailPage.vue') }
          ]
        },
      ]
    },
    { path: '/login', name: '登录页', component: () => import('@/views/login/LoginPage.vue') },
    { path: '/login/callback', name: "联合登录页", component: () => import('@/views/login/QQLoginBack.vue') }
  ]
});


router.beforeEach(authGuard);
export default router;