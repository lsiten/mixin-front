// import api from '../../fetch/modules/user'
import * as types from '../types/user'
const state = {
  code: localStorage.getItem('mixin_code') || ''
}

const getters = {
  user_code: state => state.code
}

const mutations = {
  // 更改code
  [types.USER_SET_CODE] (state, code) {
    state.code = code
  },
  // 存储code
  [types.USER_STORE_CODE] (state, code) {
    localStorage.setItem('mixin_code', code)
  }
}

const actions = {
  // 设置菜单项
  com_set_code ({ commit }, code) {
    commit(types.USER_SET_CODE, code)
    commit(types.USER_STORE_CODE, code)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
