import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutViewVue from '../views/AboutView.vue'
import BookingViewVue from '../views/BookingView.vue'
import AdminViewVue from '../views/AdminView.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'หน้าแรก',
    component: HomeView
  },
  {
    path: '/booking',
    name: 'การจอง',
    component: BookingViewVue
  },
  {
    path: '/about',
    name: 'เกี่ยวกับเรา',
    component: AboutViewVue
  },
  {
    path: '/admin',
    name: 'แอดมิน',
    component: AdminViewVue
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
