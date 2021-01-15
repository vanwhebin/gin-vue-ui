<template>
  <div>
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card class="mt-3" header="登录">
          <b-form @submit.prevent="onsubmit">
            <b-form-group
              id="input-group-1"
              label="手机号:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                type="text"
                v-model.trim="$v.form.telephone.$model"
                placeholder="请输入：手机号"
                :state="validateState('telephone')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('telephone')">
                请输入手机号
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="input-group-3" label="密码:" label-for="input-3">
              <b-form-input
                id="input-3"
                type="password"
                v-model="$v.form.password.$model"
                placeholder="请输入：密码"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须大于等于 6 位
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="outline-primary"
                      block :disable="loginBtn">登录
            </b-button>
            <a @click="$router.push({'name': 'Register'})"
               style="display:block;margin-top: 10px;text-align: center;cursor:pointer">注册</a>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
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

<style scoped>

</style>
