<template>
  <div>
  </div>
</template>
<script>
export default {
  name: 'user-index',
  created () {
    let authUrl = 'https://mixin.one/oauth/authorize?client_id=28fd840c-7cdf-4c1a-a8f0-4703b4cbec32&scope=PROFILE:READ+PHONE:READ+ASSETS:READ&code_challenge=PKCE'
    let code = this.$route.query.code
    if (code) {
      this.$store.dispatch('com_set_code', code)
      let dirct = localStorage.getItem('mixin_direct')
      dirct && (this.$router.push(JSON.parse(dirct)))
    } else {
      code = localStorage.getItem('mixin_code')
    }
    !code && (window.location.href = authUrl)
  }
}
</script>
