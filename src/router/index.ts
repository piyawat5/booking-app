import axios from 'axios';
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

const verify = async () => {
  const authen = localStorage.getItem('authen')
  let token = ''
  if (authen) {
    token = JSON.parse(authen).token
  }
  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/api/verify`, null,
      {
        headers: {
          Authorization:
            "Bearer" + " " + token,
        },
      }

    );

    if (res.data.status) {
      return true
    } return false

  } catch (error) {
    console.log(error)

  }
  return false;  // return false หาก verify ไม่สำเร็จ
}

const isAuthenticated = async (to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext) => {
  if (!(await verify())) {
    next({ name: 'LoginView' });
  } else {
    next();
  }
};

const checkPublic = async (to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext) => {
  const checkVerify = await verify()
  if (checkVerify) {
    next({ name: 'HomeView' });
  } else {
    next();
  }
};

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue'),
    beforeEnter: checkPublic
  },
  {
    path: '/',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/booking/:id',
    name: 'BookingView',
    component: () => import('../views/BookingView.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/all-booking',
    name: 'AllBookingView',
    component: () => import('../views/AllBookingView.vue'),
    beforeEnter: isAuthenticated
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
    beforeEnter: isAuthenticated
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('../views/AboutView.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: () => import('../views/AdminView.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/announce/:id',
    name: 'AnnounceView',
    component: () => import('../views/AnnounceView.vue'),
    beforeEnter: isAuthenticated
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
