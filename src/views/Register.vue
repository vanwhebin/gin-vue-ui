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
            <small>用户注册</small>
          </div>
          <form role="form">

            <base-input class="input-group-alternative mb-3"
                        placeholder="请输入：用户名"
                        addon-left-icon="ni ni-hat-3"
                        v-model="form.name">
            </base-input>

            <base-input class="input-group-alternative mb-3"
                        placeholder="请输入：手机号"
                        addon-left-icon="ni ni-email-83"
                        :state="validateState('telephone')"
                        v-model="$v.form.telephone.$model">
            </base-input>

            <base-input class="input-group-alternative"
                        placeholder="请输入：密码"
                        type="password"
                        addon-left-icon="ni ni-lock-circle-open"
                        :state="validateState('telephone')"
                        v-model="$v.form.password.$model">
            </base-input>

            <base-input class="input-group-alternative"
                        placeholder="确认密码"
                        type="password"
                        addon-left-icon="ni ni-lock-circle-open"
                        :state="validateState('repwd')"
                        v-model="$v.form.repwd.$model">
            </base-input>

            <div class="text-muted font-italic">
              <small>password strength: <span class="text-success font-weight-700">strong</span>
              </small>
            </div>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="onSubmit">创建账号</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <router-link to="/login" class="text-light">
            <small>登录</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    required, minLength, maxLength, sameAs
  } from 'vuelidate/lib/validators'
  import customValidator from '@/util/validator'
  import { mapActions } from 'vuex'

  export default {
    name: 'Register',
    data() {
      return {
        loginBtn: false,
        form: {
          telephone: '',
          name: '',
          repwd: '',
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
        },
        repwd: {
          required,
          minLength: minLength(6),
          sameAsPassword: sameAs('password')
        }
      }
    },
    methods: {
      ...mapActions('user', ['Register']),
      validateState(name) {
        const { $dirty, $error } = this.$v.form[name]
        return $dirty ? !$error : null
      },
      onSubmit(event) {
        this.$v.$touch()
        if (this.$v.form.$anyError) {
          return
        }
        event.preventDefault()
        this.Register(this.form)
          .then((res) => this.RegisterSuccess(res))
          .catch((err) => this.requestFailed(err))
          .finally(() => {
            this.loginBtn = false
          })
      },
      RegisterSuccess(res) {
        console.log(res)
        const id = 'register_toast'
        this.$bvToast.toast(res.msg, {
          id,
          title: '注册成功',
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
          title: '操作失败',
          variant: 'success',
          solid: true,
          autoHideDelay: 1000
        })
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style>
</style>
