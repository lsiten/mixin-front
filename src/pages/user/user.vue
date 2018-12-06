<template>
  <div class="user-index">
    <blur :blur-amount=40 :url="userInfo.img">
      <p class="center"><img :src="userInfo.img"></p>
    </blur>
    <group>
      <cell :title="$t('components.user.account')" :value="$t('components.user.protected')" ></cell>
      <cell :title="$t('components.user.money')"  :is-loading="!userInfo.money" :value="userInfo.money"></cell>
    </group>

  </div>
</template>
<script>
import {Blur, Group, Cell} from 'vux'
export default {
  name: 'user-index',
  data () {
    return {
      userInfo: {
        img: 'http://wx3.sinaimg.cn/bmiddle/b432fab8gy1fi27yeop6cj20jg0jgjrr.jpg',
        money: 20
      }
    }
  },
  created () {
    let authUrl = 'https://mixin.one/oauth/authorize?client_id=8f3f85bd-1f78-4cbc-9081-fb9d7d7b8672&scope=PROFILE:READ+PHONE:READ+ASSETS:READ&code_challenge=PKCE'
    let code = this.$route.query.code
    if (code) {
      this.$store.dispatch('com_set_code', code)
      let dirct = localStorage.getItem('mixin_direct')
      dirct && (this.$router.push(JSON.parse(dirct)))
    } else {
      code = localStorage.getItem('mixin_code')
    }
    !code && (window.location.href = authUrl)
  },
  components: {
    Blur,
    Group,
    Cell
  }
}
</script>

<style lang="less" scoped>
.user-index {
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
}
</style>

