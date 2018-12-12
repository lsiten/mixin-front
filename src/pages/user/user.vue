<template>
  <div class="user-index">
    <blur :blur-amount=40 :url="avatar || ''">
      <p class="center"><img :src="avatar"></p>
    </blur>
    <group>
      <cell :title="$t('components.user.account')" :value="$t('components.user.protected')" ></cell>
      <cell :title="$t('components.user.money')"  :is-loading="!userInfo.money" :value="userInfo.money"></cell>
    </group>

  </div>
</template>
<script>
import {Blur, Group, Cell} from 'vux'
import {mapGetters} from 'vuex'
export default {
  name: 'user-index',
  data () {
    return {
      userInfo: {
        money: 20
      }
    }
  },
  created () {
    this._initUser()
  },
  computed: {
    ...mapGetters({
      avatar: 'user_get_avatar',
      uname: 'user_get_uname',
      uid: 'user_get_uid'
    })
  },
  methods: {
    _initUser () {
      console.log(this.uid)
      if (!this.uid) {
        let authUrl = 'https://mixin.one/oauth/authorize?client_id=8f3f85bd-1f78-4cbc-9081-fb9d7d7b8672&scope=PROFILE:READ+PHONE:READ+ASSETS:READ&code_challenge=PKCE'
        let code = this.$route.query.code
        if (code) {
          this.$store.dispatch('com_set_code', code)
          this.$store.dispatch('user_get_user_info', {
            code: code
          })
            .then(res => {
              let dirct = localStorage.getItem('mixin_direct')
              dirct && (this.$router.push(JSON.parse(dirct)))
            })
        } else {
          code = localStorage.getItem('mixin_code')
        }
        !code && (window.location.href = authUrl)
      }
    }
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

