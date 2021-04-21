<template>
  <div class="login-background">
    <div class="logo"><img src="../../../public/logo4.png" alt="" height="300" width="300"></div>
    <div class="title">
      <p>漫漫人生路，慢慢体验</p>
      <p style="text-align:left">等风来！！！！！</p>
      <p style="text-align:left">长岛红茶</p>
    </div>
    <div class="login-container">
      <div class="login-title">欢迎进入哈哈博客</div>
      <a-menu v-model="current" mode="horizontal" @select="changeTab">
        <a-menu-item key="login">登录</a-menu-item>
        <a-menu-item key="register">注册</a-menu-item>
      </a-menu>
      <div class="content">
        <div v-show="login" class="login">
          <a-form :form="loginForm">
            <a-form-item>
              <a-input
                v-decorator="[
                  'userId',
                  { rules: [{ required: true, message: '请输入账号或邮箱!' }] }
                ]"
                placeholder="请输入账号或邮箱"
              />
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码!' }] }
                ]"
                placeholder="请输入密码"
                type="password"
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" block class="longin-button" @click="loginSubmit">登录</a-button>
            </a-form-item>
            <div class="footlogin">
              <div class="weixinLogin">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin" />
                </svg> 微信登录
              </div>
              <div class="forgetPass" @click="forgetPass">忘记密码?</div>
            </div>
          </a-form>
        </div>
        <div v-show="register" class="register">
          <a-form :form="registerForm" @submit="registerSubmit">
            <a-form-item>
              <a-input
                v-decorator="[
                  'userEmail',
                  { rules: [{ required: true, message: '请输入邮箱!' }] }
                ]"
                placeholder="请输入邮箱"
              />
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'nickname',
                  { rules: [{ required: true, message: '请输入昵称!' }] }
                ]"
                placeholder="请输入昵称"
              />
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password1',
                  { rules: [{ required: true, message: '请输入密码!' }] }
                ]"
                placeholder="请输入密码"
                type="password"
              />
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password2',
                  { rules: [{ required: true, message: '请再次输入密码!' }] }
                ]"
                placeholder="请再次输入密码"
                type="password"
                @blur="checkpasword"
              />
            </a-form-item>
            <a-form-item>
              <a-radio-group v-decorator="['sex']">
                <a-radio value="1">
                  男
                </a-radio>
                <a-radio value="2">
                  女
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" block>注册</a-button>
            </a-form-item>
          </a-form>
        </div>
        <!-- 发送邮件 -->
        <div class="sendMail">
          <a-locale-provider :locale="locale">
            <a-modal
              :locale="locale"
              title="忘记密码？"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <a-input
                v-decorator="[
                  'userEmail',
                  { rules: [{ required: true, message: '请输入您的邮箱地址!' }] }
                ]"
                placeholder="请输入您的邮箱地址"
                type="userEmail"
              />
            </a-modal>
          </a-locale-provider>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import zhCNAnTd from 'ant-design-vue/lib/locale-provider/zh_CN'
import userApi from '@/api/myUser'
import md5 from 'js-md5'
import { setToken } from '@/utils/auth'
export default {
  data() {
    return {
      locale: zhCNAnTd,
      // 忘记密码
      ModalText: 'Forget Longin password,reset Password!',
      visible: false,
      confirmLoading: false,

      current: ['login'],
      login: true,
      loginForm: this.$form.createForm(this),
      registerForm: this.$form.createForm(this),
      register: false
    }
  },
  methods: {
    changeTab(e) {
      const key = e.key
      if (key === 'login') {
        this.login = true
        this.register = false
      }
      if (key === 'register') {
        this.register = true
        this.login = false
      }
    },
    loginSubmit(e) {
      e.preventDefault()
      // eslint-disable-next-line handle-callback-err
      this.loginForm.validateFields((err, values) => {
        values.password = md5(values.password)
        if (values.userId.indexOf('@') !== -1) {
          values.userEmail = values.userId
          values.userId = undefined
        }
        userApi.login(values).then(res => {
          if (res.code === parseInt(process.env.VUE_APP_SUCCESS)) {
            this.$message.info(res.msg)
            this.$store.commit('SET_USER', res.data.user)
            console.log(this.$store.getters.getUser)
            setToken(res.data.token)
            this.$router.push('/')
          } else {
            this.$message.error(res.msg + '请检查输入信息！')
          }
        })
      })
    },
    registerSubmit(e) {
      e.preventDefault()
      // eslint-disable-next-line handle-callback-err
      this.registerForm.validateFields((err, values) => {
        values.name = values.nickname
        values.username = values.nickname
        values.password = md5(values.password1)
        userApi.register(values).then(res => {
          if (res.code === parseInt(process.env.VUE_APP_SUCCESS)) {
            this.$message.info(res.msg + '请查看邮箱账号信息！')
          } else {
            this.registerForm = null
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 检查密码
    checkpasword() {
      if (this.registerForm.password1 !== this.registerForm.password2) {
        this.$message.error('两次输入密码不一致')
      }
    },
    // 忘记密码显示发送邮件重置密码
    forgetPass() {
      this.visible = true
    },
    // 忘记密码 提交处理
    handleOk(e) {
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    // 取消提交
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>
<style scoped>
.login-background {
  width: 100%;
  height: 100%;
  position: fixed;
  background-image: url("../../assets/login-back.jpg");
  background-size:100% 100%;
}

.login-container {
  position: absolute;
  right: 139px;
  top: 20%;
  padding-top: 30px;
  width: 450px;
  height: 650px;
  background: rgba(255,255,255,.9);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e5e5;
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.ant-menu-item {
  width: 50%;
  text-align: center;
}

.content {
  margin-top: 20px;
}
.login{
  position: relative;
  margin:0 auto;
  margin-top: 20px;
  width: 70%;
}
.longin-button{
  margin-top:30px;
}
.register{
  position: relative;
  margin:0 auto;
  width: 70%;
}
.logo{
  position: absolute;
  left: 10px;
  height: 100px;
  width: 100px;
}
.title{
  position: absolute;
  top: 50%;
  left: 10%;
  text-align: center;
  color: white;
  font-size: 30px;
}
.footlogin{
  display: flex;
  justify-content: space-between;
  color: #CCCCCC;
}
.footlogin svg{
  font-size: 20px;
}
.footlogin .weixinLogin{
  width: 30%;
  color: dimgray;
  margin-right: 10px;
}
.footlogin .forgetPass{
  width: calc(70% - 10px);
  color: dimgray;
  text-align: left;
}
</style>
