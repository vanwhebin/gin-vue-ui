import defaultSetting from '@/config/defaultSetting'
import {
  postRegister, postLogin, getUserInfo, getLogout
} from '@/api'
import { localRemove, localSet } from '@/util/storage'

const user = {
  namespaced: true,
  state: {
    token: '',
    refresh: '',
    name: '',
    roles: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      if (token) {
        localSet(defaultSetting.ACCESS_TOKEN, token,
          defaultSetting.storageOptions.defaultExpireTime)
      } else {
        localRemove(defaultSetting.ACCESS_TOKEN)
      }
    },
    SET_REFRESH_TOKEN: (state, refresh) => {
      state.refresh = refresh
      if (refresh) {
        localSet(defaultSetting.REFRESH_TOKEN, refresh)
      } else {
        localRemove(defaultSetting.REFRESH_TOKEN)
      }
    },
    SET_NAME: (state, { name }) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  actions: {
    // 注册
    Register({ commit }, form) {
      return new Promise((resolve, reject) => {
        postRegister(form)
          .then((response) => {
            commit('SET_TOKEN', response.data.access_token)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 登录
    Login({ commit }, form) {
      return new Promise((resolve, reject) => {
        postLogin(form)
          .then((response) => {
            commit('SET_TOKEN', response.data.access_token)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((response) => {
            // commit('SET_ROLES', result.role)
            commit('SET_INFO', response.result)
            // if (result.role && result.role.permissions.length > 0) {
            //   const role = result.role
            //   role.permissions = result.role.permissions
            //   role.permissions.map(per => {
            //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //       const action = per.actionEntitySet.map(action => {
            //         return action.action
            //       })
            //       per.actionList = action
            //     }
            //   })
            //   role.permissionList = role.permissions.map(permission => {
            //     return permission.permissionId
            //   })
            //   commit('SET_ROLES', result.role)
            //   commit('SET_INFO', result)
            // } else {
            //   reject(new Error('getInfo: roles must be a non-null array !'))
            // }
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 登出
    Logout({ commit }) {
      return new Promise((resolve) => {
        getLogout()
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
          .finally(() => {
            commit('SET_TOKEN', '')
            commit('SET_REFRESH_TOKEN', '')
            commit('SET_ROLES', [])
          })
      })
    }
  }
}

export default user
