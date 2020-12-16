<template>
  <div class="login-box">
    <div class="input-box">
      <div class="title-box">
        盘感BI
      </div>
      <span class="email-box">
        <el-input
          v-model="email"
          size="large"
          placeholder="请输入邮箱"
          clearable
          prefix-icon="el-icon-message"
        />
      </span>
      <span class="password-box">
        <el-input
          v-model="password"
          placeholder="请输入密码"
          size="large"
          clearable
          prefix-icon="el-icon-view"
          show-password
        />
      </span>
      <div class="login-btn">
        <el-button
          size="large"
          :loading="loading"
          :disabled="loading"
          type="primary"
          @click="login"
        >
          登录
        </el-button>
      </div>
    </div>

    <br>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import { getCurrentInstance, ref } from 'vue'
import { useNotify } from 'element3'
import Cookies from 'js-cookie'
export default {
    name: 'Login',
    components: {
    },
    setup() {
      const { ctx } = getCurrentInstance()
      const email = ref()
      const password = ref()
      const loading = ref(false)
      let notify = useNotify()

      function login() {
        loading.value = true
        let data = {
          email: email.value,
          password: md5(password.value)
        }
        ctx.postRequest('http://localhost:9521/login', data).then( res => {
          notify({ title: 'success', message: '登陆成功', type: 'success' });          
          Cookies.set('Authorization', res.data.token)
          window.localStorage.userInfo = JSON.stringify(res.data.user_info) //user information
          ctx.$router.push('/')
          loading.value = false
        })
        .catch( error => {
          notify({ title: 'error', message: error.message, type: 'error' });          
          loading.value = false
        })
      }

      return { email, password, loading, login }
    }
}
</script>
<style lang="stylus">
.login-box
  background #fff
  .input-box
    margin auto
    width 360px
    height 280px
    padding 48px 32px 72px
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    box-shadow: 0 0 12px rgba(0,0,0,.36);
    .title-box
      font-size 22px
      font-weight 600
      padding-bottom 32px
      text-align center
      color rgb(64, 158, 255)
    .password-box
      display block
      margin 18px 0 36px 0
      .el-input__inner
        height 52px
        font-size 16px
        line-height 52px
        text-indent 8px  
        border 1px solid #37a1f7
    .email-box
      .el-input__inner
        height 52px
        font-size 16px
        border 1px solid #37a1f7
        text-indent 8px
    .login-btn
      .el-button
        width 100%
        height 52px
        font-size 20px

.input-box
  .el-input__icon
    color #37a1f7
    font-size 16px
</style>