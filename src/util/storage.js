import defaultConfig from '@/config/defaultSetting'

const storageSetting = defaultConfig.storageOptions

export function localSet(key, value, duration = null) {
  if (!key) return false
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  if (!duration || isNaN(duration)) {
    duration = storageSetting.defaultExpireTime
  }
  // duration = duration && !isNaN(duration) ? parseInt(duration) : storageSetting.defaultExpireTime
  const val = {}
  val.value = value
  val.expire = parseInt((new Date()).getTime()) + duration
  localStorage.setItem(key, JSON.stringify(val))
  return true
}

export function localGet(key) {
  if (!key) return
  let item = localStorage.getItem(key)
  if (item) {
    const now = parseInt((new Date()).getTime())
    item = JSON.parse(item)
    if (item && item.expire > now) {
      return item.value
    } else {
      localStorage.removeItem(key)
      return null
    }
  }
  return null
}

export function localRemove(key) {
  if (!key) return
  localStorage.removeItem(key)
}

