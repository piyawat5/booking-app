import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutViewVue from '../views/AboutView.vue'
import BookingViewVue from '../views/BookingView.vue'
import AdminViewVue from '../views/AdminView.vue'
import AnnounceViewVue from '@/views/AnnounceView.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/booking',
    name: 'booking',
    component: BookingViewVue
  },
  {
    path: '/about',
    name: 'about',
    component: AboutViewVue
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminViewVue
  },
  {
    path: '/announce/:id',
    name: 'announce',
    component: AnnounceViewVue
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
