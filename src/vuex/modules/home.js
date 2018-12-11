import api from '../../fetch/modules/home'
import * as types from '../types/home'
const state = {
  banners: [],
  hots: [],
  domainList: [],
  current_page: 1
}

const getters = {
  home_get_banners: state => state.banners,
  home_get_hots: state => state.hots,
  home_get_domain_list: state => state.domainList,
  home_get_current_page: state => state.current_page
}

const mutations = {
  // 更改code
  [types.HOME_SET_BANNERS] (state, banners) {
    state.banners = banners
  },
  // 更改code
  [types.HOME_SET_HOTS] (state, hots) {
    state.hots = hots
  },
  // 更改code
  [types.HOME_SET_DOMAIN_LIST] (state, domains) {
    state.domainList = domains
  },
  // 更改code
  [types.HOME_SET_CURRENT_PAGE] (state, page) {
    state.current_page = page
  }
}

const actions = {
  // 设置菜单项
  home_get_banner ({ commit }, param) {
    return new Promise((resolve, reject) => {
      api.home_get_banners(param)
        .then(res => {
          if (parseInt(res.code) === 1) {
            commit(types.HOME_SET_BANNERS, res.data)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(res => {
          reject(res)
        })
    })
  },
  // 获取热门域名
  home_get_hots ({ commit }, param) {
    return new Promise((resolve, reject) => {
      api.home_get_hots(param)
        .then(res => {
          if (parseInt(res.code) === 1) {
            commit(types.HOME_SET_HOTS, res.data.list)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(res => {
          reject(res)
        })
    })
  },
  // 获取热门域名
  home_get_domain_list ({ commit }, param) {
    return new Promise((resolve, reject) => {
      api.home_get_domain_list(param)
        .then(res => {
          if (parseInt(res.code) === 1) {
            commit(types.HOME_SET_DOMAIN_LIST, res.data.list)
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
