import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{
      layout: 'main'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta:{
      layout: 'main'
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/available',
    name: 'Available',
    meta:{
      layout: 'main'
    },
    component: () => import('../views/Available.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta:{
      layout: 'main'
    },
    component: () => import('../views/User.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'auth'
    },
    component: () => import('../views/auth/login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      layout: 'auth'
    },
    component: () => import('../views/auth/register')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
