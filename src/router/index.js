import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home.vue'

import store from './../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
  },
  {
    path: '/poll',
    name: 'Poll',
    component: () => import(/* webpackChunkName: "about" */ '../views/Poll.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    //   beforeEnter: (to, from, next) => {
    //   if (from.name == 'Login') {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // },
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.name === "Profile" && from.name !== "Login" || store.getters.isLoggedin) {
      next('/')
    } else if (to.name === "Poll" && from.name !== "Admin" || store.getters.isLoggedin) {
      next('/')
    } else {
      next();
    }
  } else {
    next();
  }
  if ((to.name.toLowerCase() === 'login' || to.name.toLowerCase() === 'admin' || to.name.toLowerCase() === 'poll') && store.getters.logginUser === 'Guest') {
    next('/profile')
  } else {
    next();
  }
  if ((to.name.toLowerCase() === 'login' || to.name.toLowerCase() === 'admin' || to.name.toLowerCase() === 'profile') && store.getters.logginUser === 'Admin') {
    next('/poll')
  } else {
    next();
  }
})

export default router