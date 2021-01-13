const getters = {
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  nickname: (state) => state.user.name,
  roles: (state) => state.user.roles,
  userInfo: (state) => state.user.info
  // addRouters: state => state.permission.addRouters,
  // lang: state => state.i18n.lang
}

export default getters
