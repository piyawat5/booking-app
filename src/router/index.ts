import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue')
  },
  // {
  //   path: '/booking/:id',
  //   name: 'BookingView',
  //   component: () => import('../views/BookingView.vue')
  // },
  {
    path: '/all-booking',
    name: 'AllBookingView',
    component: () => import('../views/AllBookingView.vue')
  },
  // {
  //   path: '/all-room',
  //   name: 'AllRoomView',
  //   component: () => import('../views/BookingView.vue')
  // },
  // {
  //   path: '/form-booking',
  //   name: 'FormBookingView',
  //   component: () => import('../views/AllBookingView.vue')
  // },
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
