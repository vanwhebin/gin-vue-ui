/**
 * 项目默认配置项
 */


export default {
  ACCESS_TOKEN: 'Access-Token',
  REFRESH_TOKEN: 'Refresh-Token',
  storageOptions: {
    defaultExpireTime: 2 * 3600 * 1000,
    namespace: 'gv__', // key prefix
    storage: 'local',
    tokenExpire: {
      access_token: 2 * 3600 * 1000,
      refresh_token: 24 * 3600 * 1000
    }
  }
}
