import fetch from '../api'
export default {
  /* 获取图片上传的signature */
  user_get_user_info (params) {
    return fetch('/api/user/getUserInfo', params)
  }
}
