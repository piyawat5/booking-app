import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/booking',
    name: 'BookingView',
    component: () => import('../views/BookingView.vue')
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: () => import('../views/AdminView.vue'),
  },
  {
    path: '/announce/:id',
    name: 'AnnounceView',
    component: () => import('../views/AnnounceView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
