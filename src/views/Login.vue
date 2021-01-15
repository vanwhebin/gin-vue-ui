<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
            </div>
          </div>
        </div>
      </div>
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>用户登录</small>
          </div>
          <form role="form">
            <base-input class="input-group-alternative mb-3"
                        placeholder="请输入：手机号"
                        addon-left-icon="ni ni-single-02"
                        v-model="$v.form.telephone.$model">
            </base-input>

            <base-input class="input-group-alternative"
                        placeholder="请输入：密码"
                        type="password"
                        addon-left-icon="ni ni-lock-circle-open"
                        v-model="$v.form.password.$model">
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click.prevent="onsubmit">登录</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <router-link to="/register" class="text-light">
            <small>注册新账号</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    required, minLength, maxLength
  } from 'vuelidate/lib/validators'
  import customValidator from '@/util/validator'
  import { mapActions } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        loginBtn: false,
        form: {
          telephone: '',
          password: ''
        }
      }
    },
    validations: {
      form: {
        telephone: {
          required,
          telephone: customValidator.telephoneValidator
        },
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(18)
        }
      }
    },
    methods: {
      ...mapActions('user', ['Login']),
      validateState(name) {
        const { $dirty, $error } = this.$v.form[name]
        return $dirty ? !$error : null
      },
      onsubmit() {
        this.$v.$touch()
        if (this.$v.form.$anyError) {
          return
        }
        console.log(this.form)
        this.Login(this.form)
          .then((res) => this.loginSuccess(res))
          .catch((err) => this.requestFailed(err))
          .finally(() => {
            this.loginBtn = false
          })
      },
      loginSuccess(res) {
        console.log(res)
        const id = 'login_toast'
        this.$bvToast.toast(res.msg, {
          id,
          title: '登录成功',
          variant: 'success',
          solid: true,
          autoHideDelay: 1000
        })
        setTimeout(() => {
          this.$bvToast.hide(id)
          this.$router.push({ name: 'Home' })
        }, 1500)
      },
      requestFailed(error) {
        console.log(error)
        this.$bvToast.toast(error.msg, {
          title: '登录失败',
          variant: 'success',
          solid: true,
          autoHideDelay: 1000
        })
      }
    }
  }
</script>
<style>
</style>
