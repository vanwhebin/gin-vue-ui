import router from './index'

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { // 判断是否需要登录
    // 判断用户是否登录
    if (store.state.user.token) {
      next()
    } else {
      // 跳转登录
      router.push({ name: 'login' })
    }
  } else {
    next()
  }
})

