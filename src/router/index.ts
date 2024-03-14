import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'about',
      component: () => import('@/views/user/userLogin.vue')
    },
    {
      path: '/blob',
      name: 'blob',
      component: () => import('@/views/blob/blobList.vue')
    }
  ]
})

export default router
