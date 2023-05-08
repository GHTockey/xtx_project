import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'


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
        // 主页
        { path: '', name: '主页', component: () => import('@/views/home/HomePage.vue') },
        // 一级分类
        { path: 'category/:id', name: "一级分类", component: () => import('@/views/category/TopCategoryPage.vue') },
        // 二级分类
        { path: 'category/sub/:id/:sid', name: "二级分类", component: () => import('@/views/category/SubCategoryPage.vue') },
        // 商品详情
        { path: 'goods/:id', name: '商品详情', component: () => import('@/views/goods/GoodsDetailPage.vue') },
      ]
    },
    { path: '/login', name: '登录页', component: () => import('@/views/login/LoginPage.vue') },
    { path: '/login/callback', name: "联合登录页", component: () => import('@/views/login/QQLoginBack.vue') }
  ]
})

export default router
