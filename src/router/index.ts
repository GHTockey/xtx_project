import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/XtxLayout.vue'),
      children: [
        // 在children中path留空表示父组件一旦加载同时加载此组件
        // 主页
        { path: '', name: 'home', component: () => import('@/views/home/HomePage.vue') },
        // 一级分类
        { path: 'category/:id', name: "topCategory", component: () => import('@/views/category/TopCategoryPage.vue') },
        // 二级分类
        { path: 'category/sub/:id/:sid', name: "subCategory", component: () => import('@/views/category/SubCategoryPage.vue') },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
  ]
})

export default router
