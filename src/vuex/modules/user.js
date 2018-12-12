import api from '../../fetch/modules/user'
import * as types from '../types/user'
const state = {
  code: localStorage.getItem('mixin_code') || '',
  user: {}
}

const getters = {
  user_code: state => {
    let code = state.code
    return code || localStorage.getItem('mixin_code')
  },
  user_get_uid: state => {
    let uid = state.user.userid
    return uid || localStorage.getItem('mixin_uid')
  },
  user_get_uname: state => {
    let uname = state.user.name
    return uname || localStorage.getItem('mixin_uname')
  },
  user_get_avatar: state => {
    let uavatar = state.user.avatar
    return uavatar || localStorage.getItem('mixin_avatar')
  },
  user_get_phone: state => {
    let uphone = state.user.phone
    return uphone || localStorage.getItem('mixin_uphone')
  },
  user_get_sessionid: state => {
    let usessionid = state.user.session_id
    return usessionid || localStorage.getItem('mixin_usessionid')
  }
}

const mutations = {
  // 更改code
  [types.USER_SET_CODE] (state, code) {
    state.code = code
  },
  // 存储code
  [types.USER_STORE_CODE] (state, code) {
    localStorage.setItem('mixin_code', code)
  },
  // 更改user
  [types.USER_SET_USER] (state, user) {
    state.user.userid = user.user_id
    state.user.name = user.full_name
    state.user.avatar = user.avatar_url
    state.user.phone = user.phone
    state.user.session_id = user.session_id
  },
  // 存储user
  [types.USER_STORE_USER] (state, user) {
    if (user) {
      localStorage.setItem('mixin_uid', user.user_id)
      localStorage.setItem('mixin_uname', user.full_name)
      localStorage.setItem('mixin_avatar', user.avatar_url)
      localStorage.setItem('mixin_uphone', user.phone)
      localStorage.setItem('mixin_usessionid', user.session_id)
    }
  }
}

const actions = {
  // 设置菜单项
  com_set_code ({ commit }, code) {
    commit(types.USER_SET_CODE, code)
    commit(types.USER_STORE_CODE, code)
  },
  user_get_user_info ({ commit }, param) {
    return new Promise((resolve, reject) => {
      api.user_get_user_info(param)
        .then(res => {
          if (parseInt(res.code) === 1) {
            commit(types.USER_SET_USER, res.data.data)
            commit(types.USER_STORE_USER, res.data.data)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(res => {
          reject(res)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
