const userRoutes = [
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../../views/user/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../../views/user/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { auth: true },
    component: () => import(/* webpackChunkName: "about" */ '../../views/user/Profile.vue')
  }
]

export default userRoutes
