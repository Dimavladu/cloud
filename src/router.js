import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/my',
    name: 'Home',
    alias: '/',
    meta:{
      auth: true,
      layout: 'main'
    },
    component: () => import('./views/Home.vue')
  },
  {
    path: '/my/:id',
    name: 'Folder',
    meta:{
      auth: true,
      layout: 'main'
    },
    component: () => import('./views/Home.vue')
  },
  {
    path: '/available',
    name: 'Available',
    meta:{
      auth: true,
      layout: 'main'
    },
    component: () => import('./views/Available.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta:{
      auth: true,
      layout: 'main'
    },
    component: () => import('./views/User.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'auth'},
    component: () => import('./views/auth/login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'auth'},
    component: () => import('./views/auth/register')
  },
  {
    path: '/password',
    name: 'password',
    meta: {layout: 'auth'},
    component: () => import('./views/auth/restorePassword')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.meta.layout === 'main' && !store.getters["auth/isAuth"]){
    next('/login')
  }
  else{
    next()
  }
})


export default router
