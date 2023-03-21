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
        {
          path: '',
          name: 'home', // 主页
          component: () => import('@/views/home/HomePage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/category/:id',
      component: () => import('@/views/category/TopCategoryPage.vue'),
      // children: [
      //   { path: 'sub' }
      // ]
    }
  ]
})

export default router
