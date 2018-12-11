import fetch from '../api'
export default {
  home_get_banners (params) {
    return fetch('/api/index/getBanners', params)
  },
  home_get_hots (params) {
    return fetch('/api/Domain/gethotDomain', params)
  },
  home_get_domain_list (params) {
    return fetch('/api/domain/index', params)
  }
}
