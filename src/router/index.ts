import axios from 'axios'
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/booking/:id',
    name: 'BookingView',
    component: () => import('../views/BookingView.vue'),
  },
  {
    path: '/all-booking',
    name: 'AllBookingView',
    component: () => import('../views/AllBookingView.vue'),
  },

  {
    path: '/profile',
    name: 'ProfileView',
    component: () => import('../views/ProfileView.vue'),
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
    path: '/create-booking/:action/:id?',
    name: 'CreateBookingView',
    component: () => import('../views/createBooking/CreateBookingView.vue'),
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: () => import('../views/AdminView.vue'),
  },
  {
    path: '/announce/:id',
    name: 'AnnounceView',
    component: () => import('../views/AnnounceView.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: NotFound,
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
