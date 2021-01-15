import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
// import Home from '.@/views/Home.vue'
// import userRoutes from './module/user'
import MainLayout from '@/views/layout/MainLayout.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: 'home',
    component: MainLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/Register.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/UserProfile.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/Tables.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/Icons.vue')
      },
      {
        path: '/list',
        name: 'list',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/List.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/Card.vue')
      },
      {
        path: '/post',
        name: 'post',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/Post.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/Dashboard.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "gin-vue" */ '@/views/Maps.vue')
      }
    ]
  }
]

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: () => import(/* webpackChunkName: "about" */ '.@/views/About.vue')
//   },
//   ...userRoutes
// ]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
})

export default router
